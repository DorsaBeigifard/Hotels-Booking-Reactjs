import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Outlet } from "react-router-dom";

function HotelsLayout() {
  return (
    <div>
      {location.pathname === "/hotels" && (
        <div className="border-b border-gray-200">
          <SearchBar
            searchBarClasses="searchBar"
            dateAbsolut="top-30 right-145"
            optionAbsolut="top-30"
          />
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between h-[calc(100vh-185px)] items-stretch container mx-auto">
        <div className="h-[45%] lg:h-full lg:w-[45%] overflow-y-scroll pr-4 pt-4">
          <Outlet />
        </div>
        <div className="map bg-amber-800 flex-1">map</div>
      </div>
    </div>
  );
}

export default HotelsLayout;
