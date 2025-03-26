import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarksListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  // Get a single bookmark by ID
  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }

  async function updateBookmark(id, updatedBookmark) {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/bookmarks/${id}`,
        updatedBookmark
      );
      toast.success("Bookmark updated successfully!");
      setCurrentBookmark(data);
    } catch (error) {
      toast.error("Error updating bookmark.");
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        updateBookmark,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksListProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
