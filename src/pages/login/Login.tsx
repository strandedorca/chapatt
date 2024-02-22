import React from "react";
import { Container, TextField, Button, Link, Typography } from "@mui/material";
import styles from "./Login.module.css";

function Login() {
  return (
    <Container
      className={`${styles.container} ${styles.loginContainer}`}
      maxWidth="sm"
      sx={{ marginTop: "100px", textAlign: "center" }}
    >
      <Typography  variant="h5" sx={{ color: "#F2F3F5" }} gutterBottom>
        Welcome back!
      </Typography>
      <Typography variant="h6" sx={{ color: "#B5BAC1" }} gutterBottom>
        We're so excited to see again!
      </Typography>
      <TextField
        label={
          <span style={{ color: "#B5BAC1", fontSize: "12px" }}>EMAIL OR PHONE NUMBER</span>
        }
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "black", input: { color: "white" } }}
      />
      <TextField
        label={<span style={{ color: "#B5BAC1", fontSize: "12px" }}>PASSWORD</span>}
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "black", input: { color: "white" } }}
      />
      <Link
        href="#"
        sx={{ display: "block", textDecoration: "none" }}
      >
        Forgot your password?
      </Link>
      <Button variant="contained" fullWidth sx={{ marginTop: "25px" }}>
        Log In
      </Button>
      <Typography sx={{ color: "#B5BAC1" }} marginTop={2} gutterBottom>
        Need an account?{" "}
        <a href="" style={{ color: "#1976d2" }}>
          Register
        </a>
      </Typography>
    </Container>
  );
}

export default Login;
