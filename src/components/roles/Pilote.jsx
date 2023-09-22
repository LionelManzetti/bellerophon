import { useState } from 'react';
import {
  identity_check_navigation_code,
  unlock_navigation_code,
} from '../common/codes';

const Pilote = ({ isEnvCentral }) => {
  const [idCheckCode, setUserCode1] = useState('');
  const handleIdCheckChange = (e) => {
    setUserCode1(e.target.value.toLocaleUpperCase());
  };

  const [navCode, setUserCode2] = useState('');
  const handleNavCodeChange = (e) => {
    setUserCode2(e.target.value.toLocaleUpperCase());
  };

  const [navParams, setUserCode3] = useState('');
  const handleNavParamsChange = (e) => {
    setUserCode3(e.target.value.toLocaleUpperCase());
  };

  const GetNavigationSection = () => {
    return navCode == unlock_navigation_code ? (
      <div>
        <div className="roles-content">
          Saisie des nouveaux paramètres de navigation pour mise en orbite
          optimate :
        </div>
        <input
          className="roles-inputBox"
          type="text"
          maxLength="6"
          value={navParams}
          onChange={handleNavParamsChange}
          placeholder="......"
        />
      </div>
    ) : (
      <div className="roles-content">
        Suite au recalibrage des capteurs, le code de sécurité a changé. Merci
        de rentrer le nouveau code.
      </div>
    );
  };

  const GetIdentityCheckSection = () => {
    return idCheckCode == identity_check_navigation_code ? (
      <div>
        <div className="roles-content">Code déverrouillage navigation :</div>
        <input
          className="roles-inputBox"
          type="text"
          maxLength="6"
          value={navCode}
          onChange={handleNavCodeChange}
          placeholder="......"
        />
        {GetNavigationSection()}
      </div>
    ) : (
      <div className="roles-content">code navigateur incorrect...</div>
    );
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Navigation</div>
      {isEnvCentral ? (
        <div>
          <div className="roles-content">Code vérification identité :</div>
          <input
            className="roles-inputBox"
            type="text"
            maxLength="4"
            value={idCheckCode}
            onChange={handleIdCheckChange}
            placeholder="...."
          />
          {GetIdentityCheckSection()}
        </div>
      ) : (
        <div className="roles-content">
          {"Navigation seulement disponible sur l'ordinateur central"}
        </div>
      )}
    </div>
  );
};

export default Pilote;
