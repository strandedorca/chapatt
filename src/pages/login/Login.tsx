import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface LoginProp {
  onLogIn: React.MouseEventHandler<HTMLButtonElement>,
}

const Login = ({ onLogIn }: LoginProp) => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center" 
      alignItems="center"
      height="100%"
    >
      <div style={{ textAlign: "center"}}>
        <h1>Login Page</h1>
        <Button onClick={(e) => {
          onLogIn(e);
          navigate("/")
        }}>LogIn</Button>
      </div>
    </Box>
  )
}

export default Login