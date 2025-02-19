import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Tracker from "./pages/Tracker";
import { useAppSelector } from "./redux/hooks/hooks";
import { useDispatch } from "react-redux";
import Login from "./pages/auth/Login";
import AuthService from "./utils/service/AuthService";

function App() {
	const reduxUser = useAppSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const firebaseService = new AuthService(dispatch);
		firebaseService.handleAuthStateChange(() => {
			setLoading(false);
		});
	}, [dispatch]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<main>
			<Routes>
				<Route path="/" element={reduxUser ? <Home /> : <Navigate to="/register" />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/tracker" element={<Tracker />} />
			</Routes>
		</main>
	);
}

export default App;
