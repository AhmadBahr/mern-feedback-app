import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", { password });

            if (response.status === 200) {
                localStorage.setItem("adminAuth", "true");
                localStorage.setItem("adminPassword", password); // Store password
                navigate("/admin");
            }
        } catch (error) {
            setError("Invalid admin password!");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Admin Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                type="password"
                label="Enter Admin Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Container>
    );
};

export default AdminLogin;
