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
        backgroundColor: "#000",
        padding: 2
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#111",
          padding: 4,
          borderRadius: 3,
          boxShadow: 5,
          color: "#fff"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#FFA500",
            marginBottom: 3
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
          sx={{ backgroundColor: "#333", borderRadius: 1, input: { color: "#fff" }, label: { color: "#fff" } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ backgroundColor: "#333", borderRadius: 1, input: { color: "#fff" }, label: { color: "#fff" } }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{ backgroundColor: "#FFA500", color: "#000", marginTop: 2 }}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
