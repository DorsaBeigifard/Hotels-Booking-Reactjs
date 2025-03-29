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
import "./App.css";
import BookmarksLayout from "./components/BookmarksLayout/BookmarksLayout";
import BookmarksListProvider from "./components/context/BookmarksListProvider";
import BookmarksList from "./components/BookmarksList/BookmarksList";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmar/AddNewBookmark";
import { FavoritesProvider } from "./components/context/FavoritesProvider";
import FavoriteHotels from "./components/FavoriteHotels/FavoriteHotels";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <AuthProvider>
      <BookmarksListProvider>
        <FavoritesProvider>
          <HotelsProvider>
            <div className="flex flex-col min-h-screen">
              <Toaster />
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="/hotels" element={<HotelsLayout />}>
                    <Route index element={<HotelsPage />} />
                    <Route path=":id" element={<SingleHotelDetails />} />
                    <Route path="favorites" element={<FavoriteHotels />} />
                  </Route>
                  <Route path="/bookmarks" element={<BookmarksLayout />}>
                    <Route index element={<BookmarksList />} />
                    <Route path=":id" element={<SingleBookmark />} />
                    <Route path="add" element={<AddNewBookmark />} />
                  </Route>
                </Routes>
              </div>
              <Footer />
            </div>
          </HotelsProvider>
        </FavoritesProvider>
      </BookmarksListProvider>
    </AuthProvider>
  );
};

export default App;
