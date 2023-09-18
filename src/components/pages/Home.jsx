import { useParams } from "react-router";
import { users } from "../../datasets/users.js";

const Home = () => {
	const { userId } = useParams();
    const currentUser = users.find(u => u.id == userId);
    console.log(currentUser);

	return <div className="login-container">
				<div>Welcome {currentUser.firstName} {currentUser.lastName}</div>
				<div>You have {currentUser.roles.length} roles.</div>
				<div>{currentUser.helperMessage}</div>
		   </div>;
};

export default Home;
