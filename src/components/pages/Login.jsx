import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../datasets/users.js';

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
      navigate('/nostromo/user/' + userCode);
    } else {
      if (userCode === 'CEN') {
        window.localStorage.setItem('env', 'central');
        alert('Ordinateur définit comme central');
      } else if (userCode === 'LOC') {
        window.localStorage.setItem('env', 'local');
        alert('Ordinateur définit comme local');
      } else if (userCode === 'NUR') {
        window.localStorage.setItem('env', 'nurses');
        navigate('/nostromo/nurses');
      } else {
        alert('Wrong code ' + userCode);
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        Bienvenue sur la page de connexion du Bellérophon
      </h1>
      <h2 className="login-helper">Saisissez votre code personnel :</h2>
      <input
        className="login-input"
        type="text"
        maxLength="4"
        value={userCode}
        onChange={handleChange}
        placeholder="____"
      />
      <button type="submit" className="login-button" onClick={handleSubmit}>
        VALIDER
      </button>
    </div>
  );
};

export default Login;
