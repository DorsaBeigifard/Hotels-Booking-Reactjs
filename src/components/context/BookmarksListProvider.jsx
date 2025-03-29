import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };

    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };

    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };

    case "bookmark/updated":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.map((bookmark) =>
          bookmark.id === action.payload.id ? action.payload : bookmark
        ),
        currentBookmark: action.payload,
      };

    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ),
        currentBookmark: null,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action");
  }
}

function BookmarksListProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "Error fetching bookmarks" });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    // to not fetch the same bookmark
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "Error fetching bookmark" });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      toast.success("Bookmark added successfully!");
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "Error fetching bookmark" });
    }
  }

  async function updateBookmark(id, updatedBookmark) {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/bookmarks/${id}`,
        updatedBookmark
      );
      toast.success("Bookmark updated successfully!");
      dispatch({ type: "bookmark/updated", payload: data });
    } catch (error) {
      toast.error("Error updating bookmark.");
      dispatch({ type: "rejected", payload: "Error fetching bookmark" });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      toast.success("Bookmark deleted successfully!");
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error("Error deleting bookmark.");
      dispatch({ type: "rejected", payload: "Error fetching bookmark" });
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
        createBookmark,
        deleteBookmark,
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
