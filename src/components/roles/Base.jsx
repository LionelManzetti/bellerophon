import Responsable from './Logos/Responsable.png';
import Medical from './Logos/Médical.png';
import Colon from './Logos/Colon.png';
import Eugéniste from './Logos/Eugéniste.png';
import Clandestin from './Logos/Clandestin.png';
import Navigateur from './Logos/Navigateur.png';
import Politique from './Logos/Politique.png';
import Sécurité from './Logos/Sécurité.png';
import Technicien from './Logos/Technicien.png';
import Pontife from './Logos/Pontife.png';

const Base = ({ currentUser }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    job,
    specialty,
    helperMessage,
    logo,
  } = currentUser;

  const GetLogo = () => {
    switch (logo) {
      case 'Médical':
        return <img className="roles-img" src={Medical}></img>;
      case 'Clandestin':
        return <img className="roles-img" src={Clandestin}></img>;
      case 'Eugéniste':
        return <img className="roles-img" src={Eugéniste}></img>;
      case 'Responsable':
        return <img className="roles-img" src={Responsable}></img>;
      case 'Technicien':
        return <img className="roles-img" src={Technicien}></img>;
      case 'Navigateur':
        return <img className="roles-img" src={Navigateur}></img>;
      case 'Sécurité':
        return <img className="roles-img" src={Sécurité}></img>;
      case 'Politique':
        return <img className="roles-img" src={Politique}></img>;
      case 'Pontife':
        return <img className="roles-img" src={Pontife}></img>;
      case 'Colon':
      default:
        return <img className="roles-img" src={Colon}></img>;
    }
  };

  return (
    <div className="roles-container">
      <div className="roles-lines">
        {GetLogo()}
        <div className="roles-title">
          Bienvenue {firstName} {lastName}
        </div>
      </div>
      <div className="roles-lines">
        <div className="roles-content">Nom : {lastName}</div>
        <div className="roles-content">Prénom : {firstName}</div>
      </div>
      <div className="roles-lines">
        <div className="roles-content">Age : {age != '' ? age : 'Inconnu'}</div>
        <div className="roles-content">
          Genre : {gender != '' ? gender : 'Inconnu'}
        </div>
      </div>
      <div className="roles-lines">
        <div className="roles-content">Fonction : {job}</div>
        <div className="roles-content">Spécialité : {specialty}</div>
      </div>
      <div className="roles-content">Divers : {helperMessage}</div>
    </div>
  );
};

export default Base;
