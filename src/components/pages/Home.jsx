import { useParams } from 'react-router';
import { users } from '../../datasets/users.js';
import '../../styles/home.css';
import Base from '../roles/Base.jsx';
import Gestionnaire from '../roles/Gestionnaire.jsx';
import Medecin from '../roles/Medecin.jsx';
import Pirate from '../roles/Pirate.jsx';
import Securite from '../roles/Securite.jsx';
import Technicien from '../roles/Technicien.jsx';
import Pilote from '../roles/Pilote.jsx';

const Home = () => {
  const { userId } = useParams();
  const currentUser = users.find((u) => u.id == userId);
  const isEnvCentral = window.localStorage.getItem('env') === 'central';

  const getRoleElement = (role) => {
    switch (role) {
      case 'Base':
        return <Base currentUser={currentUser} />;
      case 'Médecin':
        return <Medecin />;
      case 'Gestionnaire colonie':
        return <Gestionnaire />;
      case 'Responsable sécurité':
        return <Securite />;
      case 'Pirate':
        return <Pirate isEnvCentral={isEnvCentral} />;
      case 'Technicien':
        return <Technicien isEnvCentral={isEnvCentral} />;
      case 'Pilote':
        return <Pilote isEnvCentral={isEnvCentral} />;

      default:
        return <div>Role non trouvé</div>;
    }
  };

  return (
    <div className="home-container">
      {currentUser
        ? currentUser.roles.map((role) => {
            return (
              <div className="home-content" key={role}>
                {getRoleElement(role)}
              </div>
            );
          })
        : "Pas d'utilisateur trouvé"}
    </div>
  );
};

export default Home;
