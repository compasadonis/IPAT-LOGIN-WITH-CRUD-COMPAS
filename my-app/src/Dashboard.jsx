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
        backgroundColor: "#121212",
        padding: 3
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#282828",
          color: "#FFFFFF",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1DB954", textAlign: "center", marginBottom: 2 }}
        >
          Welcome, {user}
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Add a user"
            variant="filled"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
                color: "#121212"
              }
            }}
            InputLabelProps={{ style: { color: "#999" } }}
            sx={{ marginBottom: 1 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={addUser}
            sx={{
              backgroundColor: "#1DB954",
              color: "#FFFFFF",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "#1AA34A"
              }
            }}
          >
            Add User
          </Button>
        </Box>

        {editId && (
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Edit user name"
              variant="filled"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: 4,
                  color: "#121212"
                }
              }}
              InputLabelProps={{ style: { color: "#999" } }}
              sx={{ marginBottom: 1 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={saveEditedUser}
              sx={{
                backgroundColor: "#1DB954",
                color: "#FFFFFF",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#1AA34A"
                }
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}

        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              divider
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#333",
                borderRadius: 2,
                padding: "8px 16px",
                marginBottom: 1
              }}
            >
              <ListItemText
                primary={user.name}
                primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
              />
              <Box>
                <IconButton onClick={() => editUser(user.id, user.name)} sx={{ color: "#1DB954" }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteUser(user.id)} sx={{ color: "#E53935" }}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 3,
            borderColor: "#E53935",
            color: "#E53935",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#E53935",
              color: "#FFFFFF"
            }
          }}
          onClick={() => {
            localStorage.removeItem("username");
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