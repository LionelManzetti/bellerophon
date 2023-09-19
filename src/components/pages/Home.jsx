import { useParams } from 'react-router';
import { users } from '../../datasets/users.js';
import '../../styles/home.css';
import Base from '../roles/Base.jsx';
import Gestionnaire from '../roles/Gestionnaire.jsx';
import Medecin from '../roles/Medecin.jsx';
import Securite from '../roles/Securite.jsx';

const Home = () => {
  const { userId } = useParams();
  const currentUser = users.find((u) => u.id == userId);
  console.log(currentUser);

  const GetRolesSection = (roles) => {
    var result = [];

    var dict = {
      Base: Base,
      Médecin: Medecin,
      'Gestionnaire colonie': Gestionnaire,
      'Responsable sécurité': Securite,
    };

    for (var key in dict) {
      if (roles.indexOf(key) > -1) result.push(dict[key](currentUser));
    }
    return result;
  };

  return (
    <div className="home-container">
      {currentUser
        ? GetRolesSection(currentUser.roles)
        : "Pas d'utilisateur trouvé"}
    </div>
  );
};

export default Home;
