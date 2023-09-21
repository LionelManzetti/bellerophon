import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import './styles/stars.css';
import './styles/login.css';
import './styles/roles.css';

function App() {
  return (
    <div id="root">
      <div className="background-container">
        <div className="stars" />
        <div className="twinkling" />
      </div>
      <Router>
        <Routes>
          <Route path="/nostromo/user/:userId" element={<Home />} />
          <Route path="/nostromo/:env" element={<Login />} />
          <Route path="/nostromo" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
