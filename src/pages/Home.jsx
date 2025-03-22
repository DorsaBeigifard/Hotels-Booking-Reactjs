import React from "react";
import Header from "../components/Header/Header";
import LocationList from "../components/LocationList/LocationList";
import Features from "../components/Features/Features";

function Home() {
  return (
    <div>
      <Header />
      <Features />
      <LocationList />
    </div>
  );
}

export default Home;
