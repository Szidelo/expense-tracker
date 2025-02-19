import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";

function Home() {
	const user = useAppSelector((state) => state.auth.user);
	console.log(user);
	return (
		<div>
			<header>Home</header>
			<h1>Hello {user?.name}!</h1>
			<div>
				<ul>
					<Link to={"register"}>Auth</Link>
					<Link to={"tracker"}>Tracker</Link>
				</ul>
			</div>
		</div>
	);
}

export default Home;
