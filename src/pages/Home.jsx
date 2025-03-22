import React from "react";
import Header from "../components/Header/Header";
import LocationList from "../components/LocationList/LocationList";
import Features from "../components/Features/Features";
import Parallax from "../components/parallax/parallax";
import Reviews from "../components/Reviews/Reviews";

function Home() {
  return (
    <div>
      <Header />
      <Features />
      <LocationList />
      <Parallax />
      <Reviews />
    </div>
  );
}

export default Home;
