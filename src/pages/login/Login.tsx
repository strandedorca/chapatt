import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Link, Typography } from "@mui/material";
import styles from "./Login.module.css";
import validator from "validator"; // Import validator library for email validation
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth/cordova";
import {
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import {
  addUserDocument,
  getUserDocument,
} from "../../redux-slices/currentUserSlice";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  onSwitch: () => void;
  // onLogin: () => void;
  onForgotPassword: () => void;
}

function Login({ onSwitch, onForgotPassword }: LoginProps) {
  // Login State
  const [user] = useAuthState(auth);

  const handleLoginClick = () => {
    // Gọi prop onLogin khi nút Login được nhấn
    // onLogin();
  };

  // Redirect to Home when logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  // Google Login
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  // Manage input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
      return;
    }

    if (!password) {
      toast.error("Please enter your password", {
        position: "top-center",
      });
      return;
    }

    // Continue with login process
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/me");
      })
      .catch((error) => {
        toast.error("Invalid email or password. Please try again.", {
          position: "top-center",
        });
      });
  };

  const handleGoogleLogin = async () => {
    signInWithGoogle();
  };

  return (
    <>
      <ToastContainer />
      <Container
        className={styles.container}
        maxWidth="sm"
        sx={{ marginTop: "100px", textAlign: "center" }}
      >
        <Typography variant="h5" style={{ color: "#F2F3F5" }} gutterBottom>
          Welcome back!
        </Typography>
        <Typography variant="h6" style={{ color: "#B5BAC1" }} gutterBottom>
          We're so excited to see you again!
        </Typography>

        {/* Log in with email & password */}
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "#1E1F22",
              ".MuiOutlinedInput-root": {
                // Áp dụng style cho phần root của OutlinedInput
                borderRadius: "15px", // Bo tròn viền
                "& fieldset": {
                  // Áp dụng style cho phần viền của OutlinedInput
                  borderColor: "#555", // Màu viền
                },
                "&:hover fieldset": {
                  // Khi hover
                  borderColor: "#1976d2", // Thay đổi màu viền
                },
                "&.Mui-focused fieldset": {
                  // Khi field được focus
                  borderColor: "#1976d2", // Thay đổi màu viền
                },
              },
              borderRadius: "15px",
              input: { color: "#B5BAC1" },
            }}
            InputLabelProps={{
              style: { color: "#B5BAC1" },
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "#1E1F22",
              ".MuiOutlinedInput-root": {
                // Áp dụng style cho phần root của OutlinedInput
                borderRadius: "15px", // Bo tròn viền
                "& fieldset": {
                  // Áp dụng style cho phần viền của OutlinedInput
                  borderColor: "#555", // Màu viền
                },
                "&:hover fieldset": {
                  // Khi hover
                  borderColor: "#1976d2", // Thay đổi màu viền
                },
                "&.Mui-focused fieldset": {
                  // Khi field được focus
                  borderColor: "#1976d2", // Thay đổi màu viền
                },
              },
              borderRadius: "15px",
              input: { color: "#B5BAC1" },
            }}
            InputLabelProps={{
              style: { color: "#B5BAC1" },
            }}
          />

          {/* Login with email + password */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "25px", borderRadius: "8px" }}
          >
            Log In
          </Button>

          {/* Login with Google */}
          <Button
            variant="contained"
            onClick={() => {
              signInWithGoogle();
            }}
            sx={{ marginTop: "15px", width: "100%", borderRadius: "8px" }}
          >
            Sign in with Google
          </Button>
        </form>
        <Link
          component="button"
          onClick={onForgotPassword}
          sx={{ cursor: "pointer", marginTop: "15px" }}
        >
          Forgot your password?
        </Link>
        {/* Other log-in options */}

        {/* Registration */}
        <Typography sx={{ color: "#B5BAC1", marginTop: "20px" }}>
          Need an account?{" "}
          <Link href="#" onClick={onSwitch}>
            Register
          </Link>
        </Typography>
      </Container>
    </>
  );
}

export default Login;
