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
import app from "./config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearError();
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        default:
          setEmailError("");
          break;
        case "auth/invalid-email":
          setEmailError("Your email is Invalid");
          break;
        case "auth/user-disabled":
          setEmailError("user was disabled");
          break;
        case "auth/user-not-found":
          setEmailError("user not found");
          break;
        case "auth/wrong-password":
          setPasswordError("wrong password");
          break;
      }
      console.log(err);
    });
  };

  const handleSignup = () => {
    clearError();
    createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        default:
          setEmailError("");
          break;
        case "auth/email-already-in-use":
          setEmailError("your email already used");
          break;
        case "auth/invalid-email":
          setEmailError("invalid email");
          break;
        case "auth/weak-password":
          setPasswordError("your password is weak");
          break;
      }
      console.log(err);
    });
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
      clearInputs();
    }
    if (error) {
      console.log(error);
    }
  }, [loading, user, navigate, error]);

  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
              />
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
