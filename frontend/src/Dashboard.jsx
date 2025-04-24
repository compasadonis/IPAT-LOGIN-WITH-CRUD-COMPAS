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
        backgroundColor: "#f5f5f5",
        padding: 3
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#ffffff",
          color: "#333",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "500", color: "#333", textAlign: "center", marginBottom: 2 }}
        >
          Welcome, {user}
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Add a user"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={addUser}>
            Add User
          </Button>
        </Box>

        {editId && (
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Edit user name"
              variant="outlined"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ marginBottom: 1 }}
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={saveEditedUser}
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
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <ListItemText primary={user.name} />
              <Box>
                <IconButton onClick={() => editUser(user.id, user.name)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteUser(user.id)} color="secondary">
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ marginTop: 3 }}
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
