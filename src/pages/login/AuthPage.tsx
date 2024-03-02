import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Toast from "../../components/Toast";
import { toast } from "react-toastify";
import styles from "./Login.module.css";
import image from "../../assets/Blue Night Sky Cute Whale.png";

const AuthPage: React.FC = () => {
  const notify = (input: string) => {
    if (input === "success") {
      toast.success("Password reset sent successfully");
    } else if (input === "error") {
      toast.error("Failed to reset password. Please try again..");
    } else {
      toast.warning(
        "Requires recent login. Please log in again to change password."
      );
    }
  };
  const [view, setView] = useState<"login" | "register" | "forgotPassword">(
    "login"
  );

  const switchToLogin = () => setView("login");
  const switchToRegister = () => setView("register");
  const switchToForgotPassword = () => setView("forgotPassword");

  const handleForgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      notify("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("${image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toast />
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {view === "login" && (
          <Login
            onSwitch={switchToRegister}
            onForgotPassword={switchToForgotPassword}
          />
        )}
        {view === "register" && <Register onSwitch={switchToLogin} />}
        {view === "forgotPassword" && (
          <ForgotPassword
            onSwitchToLogin={switchToLogin}
            onForgotPassword={handleForgotPassword}
          />
        )}
      </Container>
    </Box>
  );
};

export default AuthPage;
