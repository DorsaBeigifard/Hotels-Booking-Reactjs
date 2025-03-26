import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarksListProvider";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

function BookmarksList() {
  const { isLoading, bookmarks, currentBookmark } = useBookmarks();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

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
              <div className="text-blue-700">
                <span className="material-icons">
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
