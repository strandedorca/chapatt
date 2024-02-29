import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const AuthPage: React.FC = () => {
  const [view, setView] = useState<"login" | "register" | "forgotPassword">(
    "login"
  );

  const switchToLogin = () => setView("login");
  const switchToRegister = () => setView("register");
  const switchToForgotPassword = () => setView("forgotPassword");

  return (
    <Box >
      <Container maxWidth="sm" sx={{ mt: "100px", textAlign: "center" }}>
        {view === "login" && (
          <Login
            onSwitch={switchToRegister}
            onForgotPassword={switchToForgotPassword}
          />
        )}
        {view === "register" && <Register onSwitch={switchToLogin} />}
        {view === "forgotPassword" && (
          <ForgotPassword onSwitchToLogin={switchToLogin} />
        )}
      </Container>
    </Box>
  );
};

export default AuthPage;
