import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const initialState = {
  favorites: [],
  isLoading: false,
  error: null,
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "favorites/set":
      return {
        ...state,
        favorites: action.payload,
      };
    case "favorite/add":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "favorite/remove":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Unknown actions (favorites)");
  }
};

const FavoritesContext = createContext();
const BASE_URL = "http://localhost:5000";

export const FavoritesProvider = ({ children }) => {
  const [{ favorites, isLoading }, dispatch] = useReducer(
    favoriteReducer,
    initialState
  );

  async function fetchFavorites() {
    dispatch({ type: "loading", payload: true });
    try {
      const { data } = await axios.get(`${BASE_URL}/favoritehotels`);
      dispatch({ type: "favorites/set", payload: data });
    } catch (error) {
      toast.error("Error fetching favorites.");
      dispatch({ type: "rejected", payload: "Error fetching favorites" });
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function addFavorite(hotel) {
    try {
      const { data } = await axios.post(`${BASE_URL}/favoritehotels`, hotel);
      dispatch({ type: "favorite/add", payload: data });
    } catch (error) {
      toast.error("Error adding favorite.");
      dispatch({ type: "rejected", payload: "Error adding favorite" });
    }
  }

  async function removeFavorite(hotel) {
    try {
      await axios.delete(`${BASE_URL}/favoritehotels/${hotel.id}`);
      dispatch({ type: "favorite/remove", payload: hotel });
    } catch (error) {
      toast.error("Error removing favorite.");
      dispatch({ type: "rejected", payload: "Error removing favorite" });
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        fetchFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
