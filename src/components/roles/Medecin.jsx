import "../../styles/home.css";

function Medecin(currentUser) {
	return (
		<div>
			<div>Dossiers médicaux : </div>
			<div>Nom : {currentUser.firstName}</div>
		</div>
	);
}

export default Medecin;
