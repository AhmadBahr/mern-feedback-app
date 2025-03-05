import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const password = localStorage.getItem("adminPassword"); // Get stored admin password

                const response = await axios.post("http://localhost:5000/api/admin/feedbacks", { password });

                setFeedbacks(response.data);
            } catch (error) {
                setError("Error fetching feedbacks: " + (error.response?.data?.message || "Unknown error"));
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Admin Dashboard</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {feedbacks.map((feedback, index) => (
                <Card key={index} sx={{ marginTop: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{feedback.name}</Typography>
                        <Typography variant="body2">{feedback.email}</Typography>
                        <Typography variant="body1">{feedback.message}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default AdminDashboard;
