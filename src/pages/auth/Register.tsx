import { useState } from "react";
import AuthService from "../../utils/service/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate(); // Import useNavigate to redirect

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, password } = formData;

		if (!name || !email || !password) {
			alert("Please fill in all fields.");
			return;
		}

		const firebaseService = new AuthService(dispatch);
		try {
			await firebaseService.signUp({ email, password, name });
			navigate("/"); // Redirect to home after successful registration
		} catch (error) {
			console.error("Registration failed:", error);
			alert("Registration failed.");
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				{["name", "email", "password"].map((field) => (
					<fieldset key={field}>
						<label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
						<input
							type={field === "password" ? "password" : "text"}
							name={field}
							id={field}
							value={formData[field as keyof typeof formData]}
							onChange={handleChange}
							required
						/>
					</fieldset>
				))}
				<button type="submit">Submit</button>
				<h2>
					Have an account? <Link to="/login">Log in</Link>
				</h2>
			</form>
		</div>
	);
}

export default Register;
