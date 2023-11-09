import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Nurses from './components/pages/Nurses';
import './styles/login.css';
import './styles/roles.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/bellerophon/user/:userId" element={<Home />} />
          <Route path="/bellerophon" element={<Login />} />
          <Route path="/bellerophon/nurses" element={<Nurses />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
