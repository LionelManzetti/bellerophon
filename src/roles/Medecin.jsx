import { useParams } from "react-router";
import { users } from "../datasets/users.js"
import "../styles/home.css"

function Medecin() {
	const { userId } = useParams();
    const currentUser = users.find(u => u.id == userId);

	return 	<div>
				<div>Dossiers médicaux : </div>
				<div>Nom : </div>
			</div>;
};

export default Medecin;
