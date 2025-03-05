import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { submitFeedback } from "../redux/feedbackSlice";

const FeedbackForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitFeedback(formData));
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Container>
            <Typography variant="h4">Feedback Form</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" name="name" onChange={handleChange} value={formData.name} />
                <TextField fullWidth label="Email" name="email" onChange={handleChange} value={formData.email} />
                <TextField fullWidth label="Message" name="message" multiline rows={4} onChange={handleChange} value={formData.message} />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Container>
    );
};

export default FeedbackForm;
