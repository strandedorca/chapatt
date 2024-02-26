import React, { useState } from "react";
import { Button, TextField, Typography, Link, Container } from "@mui/material";
import styles from "./Login.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { addUserDocument } from "../../redux-slices/userSlice";


interface RegisterProps {
  onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      // If registered successfully
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(addUserDocument(user) as any);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Container
        className={styles.container}
        maxWidth="sm"
        sx={{ marginTop: "100px", textAlign: "center" }}
      >
        <Typography variant="h5" sx={{ color: "#F2F3F5", mb: 2 }}>
          Create an account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
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
            fullWidth
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{
              mb: 2,
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
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
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
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
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
            fullWidth
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            sx={{
              mb: 2,
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
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography>
          Already have an account?{" "}
          <Link
            component="button"
            onClick={onSwitch}
            style={{ cursor: "pointer" }}
          >
            Login here!
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default Register;
