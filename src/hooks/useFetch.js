import axios from "axios";
import { useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url, query = "") {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_START });

      try {
        const { data } = await axios.get(`${url}?${query}`);
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: FETCH_ERROR,
          payload: err?.message || "An error occurred",
        });
        toast.error(err?.message || "An error occurred");
      }
    };

    fetchData();
  }, [query, url]);

  return { isLoading: state.isLoading, data: state.data, error: state.error };
}
