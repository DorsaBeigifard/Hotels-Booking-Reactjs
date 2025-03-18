import { MdLocationOn } from "react-icons/md";
import "./Header.css";
import { HiCalendar, HiSearch } from "react-icons/hi";

function Header() {
  return (
    <div id="header" className="w-full h-screen relative ">
      <div className="container mx-auto h-full flex items-center ">
        <div className="desc">
          <h1 className="text-6xl font-bold text-white z-20 relative mb-4">
            <span className="text-9xl">100+</span>
            <br /> Destinations
          </h1>
          <p className="text-2xl text-white z-10 relative font-normal">
            Amazing deals just a click away.
          </p>
        </div>
      </div>
      <div className="headerSearch container absolute  bottom-[-2rem] left-1/2 transform -translate-x-1/2 z-10 search-box">
        <div className="headerSearchItem">
          <MdLocationOn className="" />
          <input
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
        </div>
        <div className="headerSearchItem ">
          <HiCalendar className="headerIcon dateIcon" />
          <p>2023/20/12 to 20203/24/12</p>
        </div>
        <div className="headerSearchItem  ">
          <div id="optionDropDown">
            1 adult &nbsp;&bull;&nbsp; 2 children &nbsp;&bull;&nbsp; 1 room
          </div>
        </div>
        <div className="headerSearchItem btn">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
