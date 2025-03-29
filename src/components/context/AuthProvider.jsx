import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "User",
  email: "user@email.com",
  password: "1234",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthorized: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthorized: true,
      };

    case "logout":
      return {
        user: null,
        isAuthorized: false,
      };

    default:
      throw new Error("Unknown Action");
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAuthorized }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout", payload: FAKE_USER });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
