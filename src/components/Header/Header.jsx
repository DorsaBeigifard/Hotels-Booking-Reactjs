import { MdLocationOn } from "react-icons/md";
import "./Header.css";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

function Header() {
  const [destination, setDestination] = useState("");

  // Guest options
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024); // true if width > 1024px
    };
    checkDesktop();

    window.addEventListener("resize", checkDesktop);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //Date options
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div id="header" className="w-full h-screen relative ">
      <div className="container mx-auto h-full flex items-center headerContent px-4 sm:px-0">
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
          <div
            onClick={() => {
              setOpenDate(!openDate);
            }}
            id="dateDropDown"
          >
            {`${format(date[0].startDate, "yyyy-MM-dd")} to ${format(
              date[0].endDate,
              "yyyy-MM-dd"
            )}`}
          </div>
          {openDate && isDesktop && (
            <DateRangeDesktop
              setDate={setDate}
              date={date}
              setOpenDate={setOpenDate}
            />
          )}
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
          {/* Conditionally render based on screen size */}
          {openOptions && isDesktop && (
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
            <span className="lg:hidden">Search for Deals</span>
          </button>
        </div>
      </div>
      {/* Open GuestList Modal */}
      {openOptions && !isDesktop && (
        <>
          <div className="overlay "></div>
          <GuestOptionsListMobile
            handleOptions={handleOptions}
            options={options}
            setOpenOptions={setOpenOptions}
            openOptions={openOptions}
          />
        </>
      )}
      {openDate && !isDesktop && (
        <>
          <div className="overlay "></div>
          <DateRangeMobile
            date={date}
            setDate={setDate}
            setOpenDate={setOpenDate}
          />
        </>
      )}
    </div>
  );
}

export default Header;

// Desktop
function GuestOptionsList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef(); //ref.current=== guesOptions div

  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div ref={optionsRef} className="guestOptions optionsModalAbsolute">
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

//mobile -> modal:
function GuestOptionsListMobile({
  options,
  handleOptions,
  setOpenOptions,
  openOptions,
}) {
  const optionsRef = useRef();

  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div ref={optionsRef} className="guestOptions modal">
      <div className="font-bold ">Set Your Preferences</div>
      <div>
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
      <button className="btn" onClick={() => setOpenOptions(!openOptions)}>
        Save Changes
      </button>
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

function DateRangeDesktop({ setDate, date, setOpenDate }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));
  return (
    <div ref={dateRef} className="">
      <DateRange
        onChange={(item) => setDate([item.selection])}
        ranges={date}
        className="date dateModalAbsolut"
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
      />
    </div>
  );
}

function DateRangeMobile({ date, setDate, setOpenDate }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));
  return (
    <div ref={dateRef} className="modal">
      <div className="font-bold">Select Dates</div>
      <DateRange
        onChange={(item) => setDate([item.selection])}
        ranges={date}
        className="date "
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
      />
      <button onClick={() => setOpenDate(false)} className="btn">
        Save Changes
      </button>
    </div>
  );
}
