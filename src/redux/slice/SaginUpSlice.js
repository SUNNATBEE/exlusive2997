// src/redux/slice/SaginUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saginUp = createAsyncThunk(
  "saginAuth/saginUp",
  async (data, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // User ma'lumotlarini to'liq saqlash
      const newUser = {
        id: Date.now(),
        firstName: data.name.split(' ')[0] || data.name,
        lastName: data.name.split(' ')[1] || "",
        name: data.name, // name ni ham saqlaymiz
        email: data.email,
        password: data.password, // ✅ PASSWORD NI SAQLASH
        address: "",
        createdAt: new Date().toISOString(),
      };

      // ✅ LOCALSTORAGE GA SAQLASH
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("✅ User saved to localStorage:", newUser);
      
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "saginAuth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const savedUser = localStorage.getItem("user");
      
      if (!savedUser) {
        throw new Error("No user found. Please sign up first.");
      }

      const parsedUser = JSON.parse(savedUser);
      console.log("📋 User from localStorage:", parsedUser);
      console.log("🔑 Login credentials:", credentials);
      
      // Email tekshirish
      if (credentials.email !== parsedUser.email) {
        console.log("❌ Email doesn't match:", credentials.email, parsedUser.email);
        throw new Error("Invalid email or password");
      }

      // Password tekshirish
      if (credentials.password !== parsedUser.password) {
        console.log("❌ Password doesn't match");
        throw new Error("Invalid email or password");
      }

      console.log("✅ Login successful!");
      return parsedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const SaginUpSlice = createSlice({
  name: "saginAuth",
  
  initialState: {
    user: null,
    loading: false,
    error: null,
    signupSuccess: false, // ✅ Yangi state: signup muvaffaqiyati
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.signupSuccess = false;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearSignupSuccess: (state) => {
      state.signupSuccess = false; // ✅ SignUp muvaffaqiyatini tozalash
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saginUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(saginUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.signupSuccess = true; // ✅ SignUp muvaffaqiyatli
        state.error = null;
      })
      .addCase(saginUp.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload || "Error occurred";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error occurred";
      });
  },
});

export const { clearError, logout, setUser, clearSignupSuccess } = SaginUpSlice.actions;
export default SaginUpSlice.reducer;