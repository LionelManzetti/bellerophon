import "./App.css";
import "./styles/stars.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div id="root">
			<div className="background-container">
				<div className="stars" />
				<div className="twinkling" />
			</div>
			<Router>
				<Routes>
					<Route path="/nostromo/:userId" element={<Home />} />
					<Route path="/nostromo/" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
