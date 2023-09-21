import { useState } from 'react';
import { users } from '../../datasets/users.js';

function Medecin() {
  const [userName, setUserCode] = useState('');
  const handleChange = (e) => {
    setUserCode(e.target.value);
  };

  const GetPatientInfo = (patient) => {
    const { id, firstName, lastName, age, gender, geneticCode } = patient;
    const hackedGeneticCode = window.localStorage.getItem(id);
    return (
      <div>
        <div>Nom : {lastName}</div>
        <div>Prénom : {firstName}</div>
        <div>Age : {age}</div>
        <div>Genre : {gender}</div>
        <div>Code Génétique : {hackedGeneticCode || geneticCode}</div>
      </div>
    );
  };

  const GetPatientSection = () => {
    const patient = users.find(
      (u) => u.lastName.toLocaleLowerCase() == userName.toLocaleLowerCase(),
    );
    return (
      <div className="roles-content">
        {patient ? GetPatientInfo(patient) : 'Patient non trouvé...'}
      </div>
    );
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Dossiers médicaux : </div>
      <h2 className="roles-content">Saisissez le nom du patient :</h2>
      <input
        className="roles-inputBox"
        type="text"
        maxLength="20"
        value={userName}
        onChange={handleChange}
        placeholder="nom du patient"
      />
      {GetPatientSection()}
    </div>
  );
}

export default Medecin;
