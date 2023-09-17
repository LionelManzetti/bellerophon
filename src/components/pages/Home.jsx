import { useParams } from "react-router";

const Home = () => {
	const { userId } = useParams();
	return <div>Welcome {userId}</div>;
};

export default Home;
