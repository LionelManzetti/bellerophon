import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { users } from '../../datasets/users.js';

const Login = () => {
  const navigate = useNavigate();
  const { env } = useParams();
  const userIdArray = users.map((user) => user.id);
  const [userCode, setUserCode] = useState('');

  if (env === 'central') {
    window.localStorage.setItem('env', 'central');
  } else {
    window.localStorage.setItem('env', 'local');
  }

  const handleChange = (e) => {
    setUserCode(e.target.value.toLocaleUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIdArray.includes(userCode)) {
      navigate('/nostromo/user/' + userCode);
    } else {
      alert('Wrong code ' + userCode);
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
