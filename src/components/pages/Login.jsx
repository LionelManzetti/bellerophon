import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../datasets/users.js';
import logo from '../../assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const userIdArray = users.map((user) => user.id);
  const [userCode, setUserCode] = useState('');

  const handleChange = (e) => {
    setUserCode(e.target.value.toLocaleUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIdArray.includes(userCode)) {
      navigate('/bellerophon/user/' + userCode);
    } else {
      if (userCode === 'CEN') {
        window.localStorage.setItem('env', 'central');
        alert('Ordinateur définit comme central');
      } else if (userCode === 'LOC') {
        window.localStorage.setItem('env', 'local');
        alert('Ordinateur définit comme local');
      } else if (userCode === 'NUR') {
        window.localStorage.setItem('env', 'nurses');
        navigate('/bellerophon/nurses');
      } else {
        alert('Wrong code ' + userCode);
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Bienvenue sur la page de connexion du</h1>
      <img src={logo} className="login-logo" alt="logo du projet bellerophon" />
      <h2 className="login-helper">Veuillez saisir votre code personnel :</h2>
      <input
        className="login-input"
        type="text"
        maxLength="3"
        value={userCode}
        onChange={handleChange}
        placeholder="___"
      />
      <button type="submit" className="login-button" onClick={handleSubmit}>
        VALIDER
      </button>
    </div>
  );
};

export default Login;
