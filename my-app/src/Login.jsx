import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: 3
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#282828",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          color: "#FFFFFF"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1DB954",
            marginBottom: 2
          }}
        >
          Login
        </Typography>
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              color: "#121212"
            }
          }}
          InputLabelProps={{ style: { color: "#999" } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              color: "#121212"
            }
          }}
          InputLabelProps={{ style: { color: "#999" } }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            backgroundColor: "#1DB954",
            color: "#FFFFFF",
            fontWeight: "bold",
            padding: "10px 0",
            borderRadius: 4,
            fontSize: "16px",
            ":hover": {
              backgroundColor: "#1AA34A"
            }
          }}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
