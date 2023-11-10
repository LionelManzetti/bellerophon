import { useState } from 'react';
import {
  identity_check_navigation_code,
  navigation_primary_code,
  unlock_navigation_code,
} from '../common/codes';
import { ErrorMessage } from '../common/messaging';

const Pilote = ({ isEnvCentral }) => {
  const [primaryCheckCode, setprimaryCheck] = useState('');
  const handlePrimaryCheckChange = (e) => {
    setprimaryCheck(e.target.value.toLocaleUpperCase());
  };

  const [idCheckCode, setUserCode1] = useState('');
  const handleIdCheckChange = (e) => {
    setUserCode1(e.target.value.toLocaleUpperCase());
  };

  const [navCode, setUserCode2] = useState('');
  const handleNavCodeChange = (e) => {
    setUserCode2(e.target.value.toLocaleUpperCase());
  };

  const [ancrage1, setancrage1] = useState('');
  const [ancrage2, setancrage2] = useState('');
  const [ancrage3, setancrage3] = useState('');
  const [ancrage4, setancrage4] = useState('');
  const [direction, setDirection] = useState('');

  const [init, setInit] = useState(true);
  if (init) {
    setancrage1(window.localStorage.getItem('Ancrage1'));
    setancrage2(window.localStorage.getItem('Ancrage2'));
    setancrage3(window.localStorage.getItem('Ancrage3'));
    setancrage4(window.localStorage.getItem('Ancrage4'));
    setDirection(window.localStorage.getItem('Direction'));
    setInit(false);
  }

  const onAncrageChange = (e, i) => {
    const value = isNaN(e.target.value) ? '' : e.target.value;
    switch (i) {
      case 1:
        setancrage1(value);
        break;
      case 2:
        setancrage2(value);
        break;
      case 3:
        setancrage3(value);
        break;
      case 4:
        setancrage4(value);
        break;
    }
    window.localStorage.setItem('Ancrage' + i, value);
    if (!isNaN(value) && Number(value) > 13) {
      ErrorMessage('Ancrage' + i + ' : DEPASSEMENT RESERVE CARBURANT !');
    }
  };

  const GetAncrageSection = (i) => {
    return (
      <div className="roles-lines">
        <div className="roles-content">Ancrage {i}:</div>
        <input
          className="roles-inputBox"
          type="text"
          maxLength="2"
          value={
            i == 1 ? ancrage1 : i == 2 ? ancrage2 : i == 3 ? ancrage3 : ancrage4
          }
          onChange={(e) => {
            onAncrageChange(e, i);
          }}
          placeholder=".."
        />
      </div>
    );
  };

  const GetNavigationSection = () => {
    return navCode == unlock_navigation_code ? (
      <div className="roles-centeredContent">
        <div className="roles-content">
          Saisie des nouveaux paramètres de navigation pour mise en orbite
          optimate :
        </div>
        <div className="roles-lines">
          <div className="roles-content">Direction :</div>
          <select
            className="roles-inputBox"
            value={direction}
            onChange={(e) => {
              const val = e.target.value;
              setDirection(val);
              window.localStorage.setItem('Direction', val);
            }}
          >
            <option value="---">---</option>
            <option value="A16">A16</option>
            <option value="P1">P1</option>
          </select>
        </div>
        <div className="roles-content">Consommation carburant :</div>
        {GetAncrageSection(1)}
        {GetAncrageSection(2)}
        {GetAncrageSection(3)}
        {GetAncrageSection(4)}
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
      <div className="roles-centeredContent">
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

  const GetPrimaryCheckSection = () => {
    return primaryCheckCode == navigation_primary_code ? (
      <div className="roles-centeredContent">
        <div className="roles-content">
          Code vérification identité (4 chiffres) :
        </div>
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
      <div className="roles-content">code primaire incorrect...</div>
    );
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Navigation</div>
      {isEnvCentral ? (
        <div className="roles-centeredContent">
          <div className="roles-content">{"Code primaire d'accès :"}</div>
          <input
            className="roles-inputBox"
            type="text"
            maxLength="6"
            value={primaryCheckCode}
            onChange={handlePrimaryCheckChange}
            placeholder="......"
          />
          {GetPrimaryCheckSection()}
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
