import { useParams } from "react-router";
import { users } from "../../datasets/users.js";
import "../../styles/home.css";
import Base from "../roles/Base.jsx";
import Medecin from "../roles/Medecin.jsx";
import Gestionnaire from "../roles/Gestionnaire.jsx";
import Securite from "../roles/Securite.jsx";

const Home = () => {
	const { userId } = useParams();
	const currentUser = users.find((u) => u.id == userId);
	console.log(currentUser);

	const GetRolesSection = (roles) => {
		var result = [];
		if (roles.indexOf("Base") > -1) {
			result.push(Base(currentUser));
		}
		if (roles.indexOf("Médecin") > -1) {
			result.push(Medecin(currentUser));
		}
		if (roles.indexOf("Gestionnaire colonie") > -1) {
			result.push(Gestionnaire(currentUser));
		}
		if (roles.indexOf("Responsable sécurité") > -1) {
			result.push(Securite(currentUser));
		}
		return result;
	};

	return (
		<div className="home-container">
			{currentUser
				? GetRolesSection(currentUser.roles)
				: "Pas d'utilisateur trouvé"}
		</div>
	);
};

export default Home;
