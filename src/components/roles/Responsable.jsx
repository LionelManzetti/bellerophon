import { users } from '../../datasets/users.js';

const Responsable = ({ fonction }) => {
  const GetColonsSection = () => {
    let result = [];
    result.push(
      <div className="roles-listParent">Nom Prénom, Spécialisation</div>,
    );
    for (const user of users) {
      if (user.job == fonction)
        result.push(
          <div className="roles-listItem">
            {user.lastName} {user.firstName}, {user.specialty}
          </div>,
        );
    }
    return result;
  };

  let title = '';
  switch (fonction) {
    case 'Personnel Spatial':
      title = 'Liste du Personnel Spatial';
      break;
    case 'Passager':
      title = 'Liste des Passagers';
      break;
    case 'Terraformeur':
      title = 'Liste du Personnel Terraformeur';
      break;
    default:
      title = 'Erreur !!!';
  }

  return (
    <div className="roles-container">
      <div className="roles-title">{title}: </div>
      {GetColonsSection()}
    </div>
  );
};

export default Responsable;
