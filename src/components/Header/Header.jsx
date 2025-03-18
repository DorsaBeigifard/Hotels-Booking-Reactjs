import { MdLocationOn } from "react-icons/md";
import "./Header.css";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div id="header" className="w-full h-screen relative ">
      <div className="container mx-auto h-full flex items-center headerContent px-4 sm:px-0">
        <div className="desc">
          <h1 className="text-6xl font-bold text-white z-20 relative mb-4 ">
            <span className="text-9xl">100+</span>
            <br /> Destinations
          </h1>
          <p className="text-2xl text-white z-10 relative font-normal">
            Amazing deals just a click away.
          </p>
        </div>
      </div>
      <div className="headerSearch  ">
        <div className="headerSearchItem">
          <MdLocationOn className="text-red-600 headerIcon " />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Type your destination..."
            className="headerSearchInput input"
            name="destination"
            id="destination"
          />
        </div>
        <div className="headerSearchItem ">
          <HiCalendar className="headerIcon dateIcon text-blue-800" />
          <p>2023/20/12 to 20203/24/12</p>
        </div>
        <div className="headerSearchItem  ">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOptions)}
            className="cursor-pointer"
          >
            {options.Adult} adult &nbsp;&bull;&nbsp; {options.Children} children
            &nbsp;&bull;&nbsp; {options.Room} room
          </div>
          {openOptions && (
            <GuestOptionsList
              handleOptions={handleOptions}
              options={options}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
        <div className="headerSearchItem btn flex items-center justify-center gap-2">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon hidden lg:inline " />
            <span className=" lg:hidden">Search for Deals</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({
  options,
  handleOptions,
  setOpenOptions,
  optionDropDown,
}) {
  const optionsRef = useRef(); //ref.current=== guesOptions div

  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div
      ref={optionsRef}
      className="guestOptions bg-white shadow-lg rounded-lg p-4 border border-gray-200 absolute top-20 w-56 z-50"
    >
      <OptionItem
        type="Adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionsItem flex items-center justify-between gap-4 mb-4">
      <span className="optionText text-sm flex-1">{type}</span>
      <div className="optionCounter flex items-center gap-2">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn "
          disabled={options[type] <= minLimit}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber flex items-center justify-center text-center w-4">
          {options[type]}
        </span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function GuestOptionsListMobile() {}
