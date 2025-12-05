// src/redux/slice/SaginUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saginUp = createAsyncThunk(
  "saginAuth/saginUp",
  async (data) => {
    // Kichik kechikish
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser = {
      id: Date.now(),
      name: data.name || "",
      email: data.email,
      createdAt: new Date().toISOString(),
    };

    // ✅ SESSION STORAGE GA SAQLASH
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    
    return newUser;
  }
);

const SaginUpSlice = createSlice({
  name: "saginAuth",
  
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saginUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saginUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(saginUp.rejected, (state) => {
        state.loading = false;
        state.error = "Error occurred";
      });
  },
});

export const { clearError } = SaginUpSlice.actions;
export default SaginUpSlice.reducer;