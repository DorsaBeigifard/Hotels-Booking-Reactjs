import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import HotelsPage from "./components/HotelsPage/HotelsPage";
import SingleHotelDetails from "./components/SingleHotelDetails/SingleHotelDetails";
import HotelsProvider from "./components/context/HotelsProvider";

const App = () => {
  return (
    <HotelsProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/hotels" element={<HotelsLayout />}>
              <Route index element={<HotelsPage />} />
              <Route path=":id" element={<SingleHotelDetails />} />{" "}
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
     </HotelsProvider>
  );
};

export default App;
