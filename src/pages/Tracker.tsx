import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";

function Tracker() {
	const user = useAppSelector((state) => state.auth.user);
	return (
		<div>
			<h1>Tracker for {user?.name}</h1>
			<Link to="/">Back to Home page</Link>
		</div>
	);
}

export default Tracker;
