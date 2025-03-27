import useFetch from "../../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../Loader/Loader";

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <Loader />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: (
      <SlickButtonFix>
        <ChevronRightIcon className="h-8 w-8 text-blue-900 hidden lg:block" />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <ChevronLeftIcon className="h-8 w-8 text-blue-900 hidden lg:block" />
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="container mx-auto section-spacing ">
        <div className="nearbyLocations">
          <div className="text-center mb-8">
            <h2>Nearby Locations </h2>
            <p className="text-gray-600 mt-2">
              Find top-rated hotels near you for a comfortable and convenient
              stay.
            </p>
          </div>
          <div>
            <Slider {...settings}>
              {data.map((item) => (
                <div
                  className="locationItem rounded-xl overflow-hidden bg-white "
                  key={item.id}
                >
                  <img
                    src={item.medium_url}
                    alt={item.name}
                    className="w-full h-50 object-cover"
                  />
                  <div className="locationItemDesc h-30 lg:h-40 p-4 flex flex-col justify-between">
                    <div>
                      <p className="location font-medium">
                        {item.smart_location}
                      </p>
                      <p className="name mb-4">{item.name}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="price font-bold">
                        €&nbsp;{item.price}&nbsp;<span>per night</span>
                      </p>
                      <button className="text-blue-700 delay-100 ease-in-out transition-all hover:text-yellow-500">
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationList;
