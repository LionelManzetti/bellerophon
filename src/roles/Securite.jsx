import { useParams } from "react-router";
import { users } from "../datasets/users.js"
import "../styles/home.css"

function Securite() {
	const { userId } = useParams();
    const currentUser = users.find(u => u.id == userId);

	return  <div>
				<div>Securité</div>
		    </div>;
};

export default Securite;
