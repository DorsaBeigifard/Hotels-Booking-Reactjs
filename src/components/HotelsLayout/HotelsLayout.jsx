import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useLocation } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

function HotelsLayout() {
  const location = useLocation();
  const { hotels } = useHotels();

  return (
    <div>
      {location.pathname.startsWith("/hotels") && (
        <div className="border-b border-gray-200">
          <SearchBar
            searchBarClasses="searchBar"
            dateAbsolut="top-25 left-1/2 transform -translate-x-1/2"
            optionAbsolut="top-25"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between h-[calc(100vh-153px)] items-stretch container mx-auto">
        <div className="h-[45%] lg:h-full lg:w-[45%] overflow-y-scroll overflow-x-hidden pr-4 pt-4">
          <Outlet />
        </div>
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default HotelsLayout;
