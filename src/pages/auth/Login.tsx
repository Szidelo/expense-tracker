import { useState } from "react";
import AuthService from "../../utils/service/AuthService";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const dispatch = useDispatch();
	const firebaseService = new AuthService(dispatch);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = formData;

		if (!email) {
			alert("Please fill in all fields.");
			return;
		}

		firebaseService.signIn({ email, password });
	};

	const handleLogOut = () => {
		firebaseService.logOut();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Sign in</h1>
				{["email", "password"].map((field) => (
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
					Don't have a account? <Link to="/register">register here</Link>
				</h2>
				<button onClick={handleLogOut}>log out</button>
			</form>
		</div>
	);
}

export default Login;
