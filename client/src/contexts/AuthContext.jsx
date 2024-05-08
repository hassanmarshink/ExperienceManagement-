import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isAuthenticated:
    localStorage.getItem("isAuthenticated") === "true" ? true : false,
  surveyForms: [],
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", "true");
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("user")),
        isAuthenticated: true,
      };
    case "logout":
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("user");
      return { ...state, isAuthenticated: false };
    case "setSurveyForms":
      return { ...state, surveyForms: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Admin",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  async function fetchSurveyForms() {
    try {
      const response = await axios.get(`${apiUrl}/getAllSurveyForms`);

      let originalArray = response.data;
      let dummyObject = { _id: 0, surveyName: "Select A Form" };
      originalArray.unshift(dummyObject); //Using unshift to add at the beginning
      dispatch({ type: "setSurveyForms", payload: originalArray });
      dispatch({ type: "setLoading", payload: false });
    } catch (error) {
      dispatch({ type: "setError", payload: error });
      dispatch({ type: "setLoading", payload: false });
    }
  }

  useEffect(() => {
    // Fetch survey forms only if authenticated
    if (authState.isAuthenticated) {
      fetchSurveyForms();
    }
  }, [authState.isAuthenticated]); // Fetch only when isAuthenticated changes

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const authContextValue = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
    surveyForms: authState.surveyForms,
    loading: authState.loading,
    error: authState.error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
