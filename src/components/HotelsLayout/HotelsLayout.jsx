import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Outlet } from "react-router-dom";

function HotelsLayout() {
  return (
    <div>
      <div className="sidebar">
        {location.pathname === "/hotels" && (
          <div className="border-b border-gray-200">
            <SearchBar searchBarClasses="searchBar" />
          </div>
        )}
        <Outlet />
      </div>
      <div className="map">map</div>
    </div>
  );
}

export default HotelsLayout;
