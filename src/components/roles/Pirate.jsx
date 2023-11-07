import { useState } from 'react';
import { users } from '../../datasets/users.js';

import PatientInfo from '../common/PatientInfo.jsx';

function Pirate({ isEnvCentral }) {
  const [userName, setUserName] = useState('');

  const handlePatientSearch = (e) => {
    setUserName(e.target.value);
  };

  const GetPatientSection = () => {
    const patient = users.find(
      (u) => u.lastName.toLocaleLowerCase() == userName.toLocaleLowerCase(),
    );

    return (
      <div className="roles-content">
        {patient ? <PatientInfo patient={patient} /> : 'Passager non trouvé...'}
      </div>
    );
  };

  return (
    <div className="roles-container">
      {isEnvCentral ? (
        <div className="roles-title">Tentative d'accès interdit !</div>
      ) : (
        <>
          <div className="roles-title">Piratage en cours : </div>
          <h2 className="roles-content">Saisissez le nom du passager :</h2>
          <input
            className="roles-inputBox"
            type="text"
            maxLength="20"
            value={userName}
            onChange={handlePatientSearch}
            placeholder="nom du passager"
          />
          {GetPatientSection()}
        </>
      )}
    </div>
  );
}

export default Pirate;
