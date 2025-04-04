import "./Hero.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

import SearchBar from "../SearchBar/SearchBar";

function Hero() {
  const searchBarClasses = "headerSearch";

  return (
    <div
      id="header"
      className="w-full h-screen relative min-h-[500px] md:min-h-[700px] mb-50 lg:mb-10 "
    >
      <div className="container mx-auto sm:px-0 md:px-4  h-full flex items-center headerContent px-4 ">
        <div className="desc">
          <h1 className="text-4xl md:text-6xl font-bold text-white z-20 relative mb-4 ">
            <span className=" text-6xl md:text-9xl">100+</span>
            <br /> Destinations
          </h1>
          <p className="text-xl md:text-2xl text-white z-10 relative font-normal">
            Amazing deals just a click away.
          </p>
        </div>
      </div>
      <SearchBar
        searchBarClasses={searchBarClasses}
        dateAbsolut="top-20 right-117"
        optionAbsolut="top-20"
      />
    </div>
  );
}

export default Hero;
