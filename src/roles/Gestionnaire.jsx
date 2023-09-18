import { useParams } from "react-router";
import { users } from "../datasets/users.js"
import "../styles/home.css"

function Gestionnaire() {
	const { userId } = useParams();
    const currentUser = users.find(u => u.id == userId);

	return  <div>
				<div>Gestionnaire de colonie</div>
			</div>;
};

export default Gestionnaire;
