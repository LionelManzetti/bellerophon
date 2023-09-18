import "../../styles/home.css";
import { useState } from "react";
import { users } from "../../datasets/users.js";

function Medecin(currentUser) {
	const [userName, setUserCode] = useState("");
	const handleChange = (e) => {
		setUserCode(e.target.value);
	};

	const GetPatientInfo = (patient) => {
		    const { firstName, lastName, age, gender, geneticCode } = patient;
			return 	<div>
						<div>Nom : {lastName}</div>
						<div>Prénom : {firstName}</div>
						<div>Age : {age}</div>
						<div>Genre : {gender}</div>
						<div>Code Génétique : {geneticCode}</div>
					</div>;
	}

	const GetPatientSection = () => {
		const patient = users.find((u) => u.lastName == userName);
			return 	<div>
						{patient 
						? GetPatientInfo(patient)
						: "Patient non trouvé..."}
					</div>;
	}

	return (
		<div>
			<div>Dossiers médicaux : </div>
			<h2>Saisissez le nom du patient :</h2>
			<form>
				<div>
					<input
						type="text"
						maxLength="20"
						value={userName}
						onChange={handleChange}
						placeholder="nom du patient"
					/>
					<span className="underline" />
				</div>
				{GetPatientSection()}
			</form>
		</div>
	);
}

export default Medecin;
