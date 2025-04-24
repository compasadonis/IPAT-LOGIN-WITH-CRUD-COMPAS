import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Box
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (userName.trim()) {
      setUsers([...users, { id: Date.now(), name: userName }]);
      setUserName("");
    }
  };

  const editUser = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const saveEditedUser = () => {
    setUsers(users.map(user => (user.id === editId ? { ...user, name: editName } : user)));
    setEditId(null);
    setEditName("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#000",
        padding: { xs: 2, md: 5 }
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#111",
          color: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 5,
          width: "100%",
          maxWidth: "900px"
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#FFA500", textAlign: "center", marginBottom: 3 }}
        >
          Welcome, {user}
        </Typography>

        <Box sx={{ marginY: 3 }}>
          <TextField
            label="User Name"
            variant="filled"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ backgroundColor: "#333", borderRadius: 1, input: { color: "#fff" } }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFA500", color: "#000", marginTop: 2 }}
            fullWidth
            onClick={addUser}
          >
            Add User
          </Button>
        </Box>

        {editId && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h5" sx={{ color: "#FFA500", textAlign: "center", marginBottom: 1 }}>
              Edit User
            </Typography>
            <TextField
              label="User Name"
              variant="filled"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ backgroundColor: "#333", borderRadius: 1, input: { color: "#fff" } }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FF4500", color: "#fff", marginTop: 2 }}
              fullWidth
              onClick={saveEditedUser}
            >
              Save Changes
            </Button>
          </Box>
        )}

        <List>
          {users.map((user) => (
            <ListItem key={user.id} divider sx={{ backgroundColor: "#222", borderRadius: 1, marginY: 1 }}>
              <ListItemText primary={user.name} sx={{ color: "#fff" }} />
              <IconButton onClick={() => editUser(user.id, user.name)} sx={{ color: "#FFA500" }}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteUser(user.id)} sx={{ color: "#FF4500" }}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#FF4500", color: "#fff", marginTop: 3 }}
          fullWidth
          onClick={() => {
            localStorage.removeItem("Username");
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Container>
    </Box>
  );
};

export default Dashboard;
