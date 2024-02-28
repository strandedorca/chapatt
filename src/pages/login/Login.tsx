import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Link, Typography } from "@mui/material";
import styles from "./Login.module.css";
import validator from "validator"; // Import validator library for email validation
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth/cordova";
import { browserPopupRedirectResolver, createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

interface LoginProps {
  onSwitch: () => void;
  onForgotPassword: () => void;
}

function Login({ onSwitch, onForgotPassword }: LoginProps) {
  // Login State
  const [user] = useAuthState(auth);

  // Redirect to Home when logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])
  
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
      alert("Please enter a valid email address");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    // Continue with login process
    signInWithEmailAndPassword(auth, email, password);
  };

  // const handleGoogleLogin = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider, browserPopupRedirectResolver )
  //     .then(result => {
  //       console.log("result",result)
  //   }).catch ((error) => {
  //       console.error(error);
  //       alert(error.message);
  //   });;
  // }

  return (
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
        <Link
          component="button"
          onClick={onForgotPassword}
          sx={{ cursor: "pointer" }}
        >
          Forgot your password?
        </Link>

        {/* Login with email + password */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "25px", borderRadius: "10px" }}
        >
          Log In
        </Button>
        
        {/* Login with Google */}
        <Button 
          variant="contained" 
          onClick={() => { signInWithGoogle() }}
        >
          Sign in with Google
        </Button>
      </form>

      {/* Other log-in options */}
      {/* <Button onClick={handleGoogleLogin}>Login with Google</Button> */}

      {/* Registration */}
      <Typography sx={{ color: "#B5BAC1", marginTop: "20px" }}>
        Need an account?{" "}
        <a
          href="#"
          onClick={onSwitch}
          style={{ color: "#1976d2", cursor: "pointer" }}
        >
          Register
        </a>
      </Typography>
    </Container>
  );
}

export default Login;
