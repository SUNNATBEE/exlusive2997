import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: loadUserFromStorage(),
        isAuthenticated: !!loadUserFromStorage(),
    },
    reducers: {
        signup: (state, action) => {
            const { email, password, username } = action.payload;
            const newUser = { email, username };
            localStorage.setItem('user', JSON.stringify(newUser));
            state.user = newUser;
            state.isAuthenticated = true;
        },
        login: (state, action) => {
            const storedUser = loadUserFromStorage();
            if (storedUser && storedUser.email === action.payload.email) {
                state.user = storedUser;
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;   