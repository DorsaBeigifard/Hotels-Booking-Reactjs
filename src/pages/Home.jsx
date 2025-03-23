import React from "react";
import LocationList from "../components/LocationList/LocationList";
import Features from "../components/Features/Features";
import Parallax from "../components/parallax/parallax";
import Reviews from "../components/Reviews/Reviews";
import Hero from "../components/Hero/Hero";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <LocationList />
      <Parallax />
      <Reviews />
    </div>
  );
}

export default Home;
