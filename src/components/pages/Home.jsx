import { useNavigate, useParams } from 'react-router';
import { users } from '../../datasets/users.js';
import '../../styles/home.css';
import Base from '../roles/Base.jsx';
import Responsable from '../roles/Responsable.jsx';
import Medecin from '../roles/Medecin.jsx';
import Pilote from '../roles/Pilote.jsx';
import Pirate from '../roles/Pirate.jsx';
import Securite from '../roles/Securite.jsx';
import Technicien from '../roles/Technicien.jsx';
import Reparation from '../roles/Reparation.jsx';
import Entrainement from '../roles/Entrainement.jsx';
import { useState } from 'react';
import LogoResponsable from '../roles/Logos/Responsable.png';
import LogoMedical from '../roles/Logos/Médical.png';
import LogoColon from '../roles/Logos/Colon.png';
import LogoEugéniste from '../roles/Logos/Eugéniste.png';
import LogoClandestin from '../roles/Logos/Clandestin.png';
import LogoNavigateur from '../roles/Logos/Navigateur.png';
import LogoPolitique from '../roles/Logos/Politique.png';
import LogoSécurité from '../roles/Logos/Sécurité.png';
import LogoTechnicien from '../roles/Logos/Technicien.png';
import LogoPontife from '../roles/Logos/Pontife.png';

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUser = users.find((u) => u.id == userId);
  const isEnvCentral = window.localStorage.getItem('env') === 'central';
  const [elementDisplayed, setElementDisplayed] = useState(null);

  const handleGetBack = (e) => {
    e.preventDefault();
    if (elementDisplayed) setElementDisplayed(null);
    else navigate(-1);
  };

  const getRoleElement = (role) => {
    switch (role) {
      case 'Base':
        return <Base currentUser={currentUser} />;
      case 'Médecin':
        return <Medecin />;
      case 'Responsable personnel spatial':
        return <Responsable fonction="Personnel Spatial" />;
      case 'Responsable passagers':
        return <Responsable fonction="Passager" />;
      case 'Responsable personnel terraformation':
        return <Responsable fonction="Terraformeur" />;
      case 'Sécurité':
        return <Securite />;
      case 'Pirate':
        return <Pirate isEnvCentral={isEnvCentral} />;
      case 'Technicien':
        return <Technicien />;
      case 'Entrainement':
        return <Entrainement isEnvCentral={isEnvCentral} />;
      case 'Pilote':
        return <Pilote isEnvCentral={isEnvCentral} />;
      case 'Réparation':
        return <Reparation isEnvCentral={isEnvCentral} />;

      default:
        return <div>Role non trouvé</div>;
    }
  };

  const buttonTranslate = (role) => {
    switch (role) {
      case 'Base':
        return 'Mes données personnelles';
      case 'Médecin':
        return 'Dossiers médicaux';
      case 'Responsable personnel spatial':
        return 'Liste du personnel spatial';
      case 'Responsable passagers':
        return 'Liste des passagers';
      case 'Responsable personnel terraformation':
        return 'Liste du personnel terraformation';
      case 'Sécurité':
        return 'Accès';
      case 'Pirate':
        return '/root/patient/database';
      case 'Technicien':
        return 'Technicien';
      case 'Entrainement':
        return 'Test de capacités';
      case 'Pilote':
        return 'Navigation';
      case 'Réparation':
        return 'Réparation';

      default:
        return role;
    }
  };

  const GetLogo = () => {
    switch (currentUser.logo) {
      case 'Médical':
        return <img className="roles-img" src={LogoMedical}></img>;
      case 'Clandestin':
        return <img className="roles-img" src={LogoClandestin}></img>;
      case 'Eugéniste':
        return <img className="roles-img" src={LogoEugéniste}></img>;
      case 'Responsable':
        return <img className="roles-img" src={LogoResponsable}></img>;
      case 'Technicien':
        return <img className="roles-img" src={LogoTechnicien}></img>;
      case 'Navigateur':
        return <img className="roles-img" src={LogoNavigateur}></img>;
      case 'Sécurité':
        return <img className="roles-img" src={LogoSécurité}></img>;
      case 'Politique':
        return <img className="roles-img" src={LogoPolitique}></img>;
      case 'Pontife':
        return <img className="roles-img" src={LogoPontife}></img>;
      case 'Colon':
      default:
        return <img className="roles-img" src={LogoColon}></img>;
    }
  };

  return (
    <div className="home-container">
      <div className="roles-container">
        <div className="roles-lines">
          {GetLogo()}
          <div className="roles-title">
            Bienvenue {currentUser.firstName} {currentUser.lastName}
          </div>
        </div>
      </div>
      {currentUser
        ? !elementDisplayed &&
          currentUser.roles.split(' - ').map((role) => {
            return (
              <button
                className="submenu-button"
                key={role}
                onClick={() => setElementDisplayed(role)}
              >
                {buttonTranslate(role)}
              </button>
            );
          })
        : "Pas d'utilisateur trouvé"}
      {elementDisplayed && getRoleElement(elementDisplayed)}
      <button
        type="submit"
        className="login-button get-back-button"
        onClick={handleGetBack}
      >
        RETOUR
      </button>
    </div>
  );
};

export default Home;
