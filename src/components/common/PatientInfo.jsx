import { useState } from 'react';

import '../../styles/login.css';
import '../../styles/roles.css';

// eslint-disable-next-line react/prop-types
const PatientInfo = ({ patient }) => {
  const [alteredGeneticCode, setAlteredGeneticCode] = useState('');
  // eslint-disable-next-line react/prop-types
  const { id, firstName, lastName, geneticCode } = patient;
  const storedGeneticCode =
    window.localStorage.getItem(id) || 'Pas de code hacké';

  const handleAlteredGeneticCode = (e) => {
    setAlteredGeneticCode(e.target.value.toLocaleUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reg = RegExp(/^[RJVOB]+$/);
    if (alteredGeneticCode.length == 4 && reg.test(alteredGeneticCode)) {
      window.localStorage.setItem(id, alteredGeneticCode);
      alert('Code du passager alteré avec succès !');
    } else {
      alert(
        'Attention, un code génétique est composé de 4 lettres aléatoires parmis les lettres R, J, V, O et B (ex: RRJB)',
      );
    }
  };

  return (
    <div>
      <div>Nom : {lastName}</div>
      <div>Prénom : {firstName}</div>
      <div>Code hyper-sommeil : {geneticCode}</div>
      <div>
        Code hyper-sommeil Hacké :{' '}
        {alteredGeneticCode.length === 4
          ? alteredGeneticCode
          : storedGeneticCode}
      </div>
      <div className="hacking-container">
        <h2 className="roles-content">
          Saisissez un nouveau code hyper-sommeil :
        </h2>
        <input
          className="roles-genCodeInput"
          type="text"
          maxLength="4"
          value={alteredGeneticCode}
          onChange={handleAlteredGeneticCode}
          placeholder="____"
        />
        <button type="button" className="login-button" onClick={handleSubmit}>
          VALIDER
        </button>
      </div>
    </div>
  );
};

export default PatientInfo;
