import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../datasets/users.js';
import '../../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const userIdArray = users.map((user) => user.id);
  const [userCode, setUserCode] = useState('');

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
      alert('Wrong code ' + userCode);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        Bienvenue sur la page de connexion du Nostromo
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
