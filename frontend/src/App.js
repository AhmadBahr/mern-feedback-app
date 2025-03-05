import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Feedback App
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/admin-login">Admin</Button>
                    </Toolbar>
                </AppBar>

                <Container sx={{ marginTop: 4 }}>
                    <Routes>
                        <Route path="/" element={<FeedbackForm />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
}

export default App;
