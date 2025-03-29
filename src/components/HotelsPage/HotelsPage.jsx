import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { useFavorites } from "../context/FavoritesProvider";

function HotelsPage() {
  const { isLoading, hotels, currentHotel } = useHotels();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleFavorite = (e, item) => {
    e.preventDefault();
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    isFavorite ? removeFavorite(item) : addFavorite(item);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="searchList flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-4">
        Search Result ({hotels.length})
      </h2>
      {hotels.map((item) => {
        const isFavorite = favorites.some((fav) => fav.id === item.id);

        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="flex justify-between items-center">
              <div
                className={`searchItem ${
                  item.id === currentHotel?.id ? "current-hotel" : ""
                }`}
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.name}
                  className="rounded-2xl w-24 h-24 object-cover"
                />
                <div className="searchItemDesc">
                  <p className="Location font-semibold hover:text-blue-700 transition-all ease-in-out delay-300">
                    {item.smart_location}
                  </p>
                  <p className="name text-gray-500 mb-2">{item.name}</p>
                  <p className="price font-semibold">
                    €&nbsp;{item.price}{" "}
                    <span className="text-gray-500 font-normal text-sm">
                      per night
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="text-xl text-red-700 cursor-pointer transition-transform transform hover:scale-125 "
                  onClick={(e) => handleFavorite(e, item)}
                >
                  {isFavorite ? <TiHeart /> : <TiHeartOutline />}
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HotelsPage;
