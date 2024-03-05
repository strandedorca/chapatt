import React, { useState } from "react";
import { Button, TextField, Typography, Link, Container, useTheme } from "@mui/material";
import styles from "./Login.module.css";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { addUserDocument } from "../../redux-slices/currentUserSlice";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { addAnEmptyFriendsDoc } from "../../redux-slices/friendsSlice";
import { AppDispatch } from "../../main";

interface RegisterProps {
  onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [showUsernameWarning, setShowUsernameWarning] = useState(false);

  // Control form input
  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameExists = async (username: string) => {
    const usersCollectionRef = collection(db, 'users');
    const usernameQuery = query(usersCollectionRef, where('username', '==', username));
    const usernameQuerySnapshot = await getDocs(usernameQuery);
    if (!usernameQuerySnapshot.empty) {
      // Username already exists
      return Promise.reject('Username already exists');
    }
    return Promise.resolve();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usernameExists(username)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          // If registered successfully
          .then((userCredential) => {
            const { uid } = userCredential.user;
            const user = {
              uid,
              username,
              email,
              displayName,
              photoUrl: '',
            }
            dispatch(addUserDocument(user as any));
            updateProfile(userCredential.user, {
              displayName,
            });
            dispatch(addAnEmptyFriendsDoc(username))
            navigate('/');
          })
          .catch((error) => {
            console.log(error.code, error.message);
          });
      })
      .catch((error) => {
        setShowUsernameWarning(true);
        console.log(error);
      })
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
          <Typography
            display={showUsernameWarning ? 'block' : 'none'}
            sx={{ textAlign: 'left', marginBottom: '10px', marginTop: '-10px' }}
            color={theme.palette.error.main}
          >
            Username already exists!
          </Typography>
          <TextField

            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
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
