import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const submitFeedback = createAsyncThunk(
    "feedback/submit",
    async (feedbackData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/feedback/submit", feedbackData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const feedbackSlice = createSlice({
    name: "feedback",
    initialState: { feedbacks: [], status: null, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(submitFeedback.pending, (state) => {
                state.status = "loading";
            })
            .addCase(submitFeedback.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.feedbacks.push(action.payload);
            })
            .addCase(submitFeedback.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default feedbackSlice.reducer;
