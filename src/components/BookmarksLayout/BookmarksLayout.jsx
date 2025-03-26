import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import SearchBar from "../SearchBar/SearchBar";
import { useBookmarks } from "../context/BookmarksListProvider";

function BookmarksLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div>
      {location.pathname.startsWith("/bookmarks") && (
        <div className="border-b border-gray-200">
          <SearchBar
            searchBarClasses="searchBar"
            dateAbsolut="top-30 right-145"
            optionAbsolut="top-30"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between h-[calc(100vh-153px)] items-stretch container mx-auto">
        <div className="h-[45%] lg:h-full lg:w-[45%] overflow-y-scroll overflow-x-hidden pr-4 pt-4">
          <Outlet />
        </div>
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarksLayout;
