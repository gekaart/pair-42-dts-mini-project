import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Login from "./pages/Login";
import React, { useState, useEffect } from "react";
import { auth, login, register } from "./config/firebase1";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const emailOnchangeHandler = (e) => {
    setCredential({ ...credential, email: e.target.value });
  };
  const passwordOnchangeHandler = (e) => {
    setCredential({ ...credential, password: e.target.value });
  };

  const registerHandler = () => {
    register(credential.email, credential.password);
  };

  const loginHandler = () => {
    login(credential.email, credential.password);
  };

  const [user, loading, error] = useAuthState;
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              // <ProtectedRoute loginOnly="true">
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                // emailError={emailError}
                // passwordError={passwordError}
              />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={<Home handleLogout={handleLogout} user={user} />}
          />

          <Route
            path="*"
            element={
              <Box sx={{ mt: 10 }}>Erorr 404 (Halaman Belum Tersedia)</Box>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
