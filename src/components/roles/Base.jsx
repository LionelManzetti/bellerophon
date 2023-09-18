import "../../styles/home.css";

const Base = (currentUser) => {
	const { firstName, lastName, roles, helperMessage } = currentUser;
	return (
		<div>
			<div>
				Welcome {firstName} {lastName}
			</div>
			<div>You have {roles.length} roles.</div>
			<div>{helperMessage}</div>
			<div>...</div>
		</div>
	);
};

export default Base;
