import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) <p>Loading... </p>;

  return (
    <div className="container mx-auto section-spacing">
      <div className="nearbyLocations">
        <h2>Nearby Locations </h2>
        <div className="grid grid-flow-col grid-rows-2">
          {data.map((item) => {
            return (
              <div
                className="locationItem rounded-xl overflow-hidden bg-white"
                key={item.id}
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.name}
                  className="w-full h-50 object-cover"
                />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    €&nbsp;{item.price}&nbsp;<span>night</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LocationList;
