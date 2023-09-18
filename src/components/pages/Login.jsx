import "../../styles/login.css";
import "../../styles/stars.css";
import { useState } from "react";
import { users } from "../../datasets/users.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const userIdArray = users.map((user) => user.id);
	const [userCode, setUserCode] = useState("");

	const handleChange = (e) => {
		const reg = RegExp(/^(\s*|\d+)$/);
		if (reg.test(e.target.value)) {
			setUserCode(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userIdArray.includes(userCode)) {
			navigate(userCode);
		} else {
			alert("Wrong code " + userCode);
		}
	};

	return (
		<div className="login-container">
			<div className="background-container">
				<div className="stars" />
				<div className="twinkling" />
			</div>
			<h1 className="login-title">
				Bienvenue sur la page de connexion du Nostromo
			</h1>
			<h2 className="login-helper">Saisissez votre code personnel :</h2>
			<form>
				<div className="input-wrapper">
					<input
						type="text"
						maxLength="4"
						value={userCode}
						className="login-input"
						onChange={handleChange}
						placeholder="Code personnel"
					/>
					<span className="underline" />
				</div>
				<button type="submit" className="login-button" onClick={handleSubmit}>
					VALIDER
				</button>
			</form>
		</div>
	);
};

export default Login;
