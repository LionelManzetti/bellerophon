import { useParams } from "react-router";
import { users } from "../datasets/users.js"
import "../styles/home.css"

function Base() {
	const { userId } = useParams();
    const currentUser = users.find(u => u.id == userId);

	return 	<div>
				<div>Welcome {currentUser.firstName} {currentUser.lastName}</div>
				<div>You have {currentUser.roles.length} roles.</div>
				<div>{currentUser.helperMessage}</div>
				<div>...</div>
			</div>;
};

export default Base;
