import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

function SingleHotelDetails() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <p>Loading....</p>;

  return (
    <div className="room p-6 sm:max-lg:pl-0 bg-white shadow-lg rounded-lg">
      <div className="roomDetail">
        <h2 className="text-2xl font-semibold mb-2">{currentHotel.name}</h2>
        <div className="text-gray-600 mb-4">
          {currentHotel.smart_location} &bull; {currentHotel.number_of_reviews}{" "}
          reviews
        </div>
        <img
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
          className="rounded-lg object-cover h-64 w-full mb-4"
        />

        <div className="mb-4">
          <span className="font-medium">Description: </span>
          <p className="italic text-gray-700 pl-2">
            {currentHotel.description}
          </p>
        </div>

        <div className="flex items-center gap-4 border-t pt-4">
          <img
            src={currentHotel.host_picture_url}
            alt={currentHotel.host_name}
            className="h-12 w-12 rounded-full border object-cover"
          />
          <div>
            <p className="font-medium">Host: {currentHotel.host_name}</p>
            <a
              href={currentHotel.host_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-4">
          <p>
            <span className="text-gray-700">Room Type:</span>{" "}
            {currentHotel.room_type} in {currentHotel.property_type}
          </p>
          <p>
            <span className="text-gray-700">Guests:</span>{" "}
            {currentHotel.accommodates}
          </p>
          <p>
            <span className="text-gray-700">Beds:</span> {currentHotel.beds} (
            {currentHotel.bed_type})
          </p>
          <p>
            <span className="text-gray-700">Bathrooms:</span>{" "}
            {currentHotel.bathrooms}
          </p>
        </div>

        <div className="mt-4 p-4 flex justify-between items-center border border-gray-300 rounded-lg">
          <p className=" font-bold">€&nbsp;{currentHotel.price} / night</p>
          <a
            href={currentHotel.listing_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View on Airbnb
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleHotelDetails;
