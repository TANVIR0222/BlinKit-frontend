import { createSlice } from "@reduxjs/toolkit";

const loadUserFormLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return { user: null };

    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error);
  }
};

const initialState = loadUserFormLocalStorage();

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logout: (state) =>{
        state.user = null;
        localStorage.removeItem('user');
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser , logout } = authSlice.actions;

export default authSlice.reducer;
