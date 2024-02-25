import React, { useState } from "react";
import { Button, TextField, Typography, Container, Link } from "@mui/material";
import styles from "./Login.module.css";

interface ForgotPasswordProps {
  onSwitchToLogin: () => void; // Chuyển người dùng trở lại trang đăng nhập
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    // Tại đây bạn sẽ gọi API để xử lý reset mật khẩu
    alert(
      "If the email matches an account, a password reset link will be sent."
    );
    onSwitchToLogin(); // Chuyển người dùng trở lại trang đăng nhập sau khi yêu cầu
  };

  return (
    <Container
      className={styles.container}
      maxWidth="sm"
      sx={{ mt: "100px", textAlign: "center" }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "#F2F3F5" }}>
        Forgot Password
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
            borderRadius: "15px",
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
          Continute
        </Button>
        <Typography>
          <Link
            component="button"
            onClick={onSwitchToLogin}
            sx={{ cursor: "pointer", color: "#1976d2" }}
          >
            Back to login
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default ForgotPassword;
