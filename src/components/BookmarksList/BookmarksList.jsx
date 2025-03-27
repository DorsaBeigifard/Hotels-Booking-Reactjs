import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarksListProvider";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import Loader from "../Loader/Loader";
import { IoTrashBinOutline } from "react-icons/io5";

function BookmarksList() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return (
      <p>
        You currently have no bookmarks. <br />
        Add bookmarks by clicking on the map.
      </p>
    );
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Your Bookmarks</h2>
      <div className="space-y-4">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            className="block"
          >
            <div
              className={`flex items-center justify-between p-4 border-1 rounded-xl hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                item.id === currentBookmark?.id
                  ? "current-bookmark"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <ReactCountryFlag
                  svg
                  countryCode={item.countryCode}
                  className="w-8 h-8"
                />
                <div>
                  <span className="font-medium mr-2 name">{item.cityName}</span>
                  <span className="text-sm text-gray-500">{item.country}</span>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <span
                  className="text-red-700 hover:text-yellow-500"
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                >
                  <IoTrashBinOutline />
                </span>
                <span className="text-blue-700 hover:text-yellow-500">
                  <IoChevronForward />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookmarksList;
