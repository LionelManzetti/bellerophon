import { users } from '../../datasets/users.js';
import '../../styles/roles.css';

const Gestionnaire = () => {
  const GetColonsSection = () => {
    let result = [];
    result.push(<div className="roles-content">Nom Prénom, Fonction</div>);
    for (const user of users) {
      if (user.category != 'Eugéniste' && user.category != 'Inactif')
        result.push(
          <div className="roles-content">
            {user.lastName} {user.firstName}, {user.function}
          </div>,
        );
    }
    return result;
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Liste des colons: </div>
      {GetColonsSection()}
    </div>
  );
};

export default Gestionnaire;
