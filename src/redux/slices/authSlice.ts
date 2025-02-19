import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "firebase/auth";
import { ReduxUser } from "../../utils/interfaces/items";

export interface AuthState {
	user: null | ReduxUser;
	isAuthenticated: boolean;
	token: string;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		saveUser(state, action: PayloadAction<ReduxUser | null>) {
			state.user = action.payload;
		},

		setAuthenticated(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
	},
});

export const { setAuthenticated, setToken, saveUser } = authSlice.actions;
export default authSlice.reducer;
