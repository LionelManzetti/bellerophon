import '../../styles/roles.css';

const Base = (currentUser) => {
  return (
    <div className="roles-container">
      <div className="roles-title">
        Welcome {currentUser.firstName} {currentUser.lastName}
      </div>
      <div className="roles-content">Nom : {currentUser.lastName}</div>
      <div className="roles-content">Prénom : {currentUser.firstName}</div>
      <div className="roles-content">Age : {currentUser.age}</div>
      <div className="roles-content">Genre : {currentUser.gender}</div>
      <div className="roles-content">Fonction : {currentUser.function}</div>
      <div className="roles-content">Spécialité : {currentUser.specialty}</div>
      <div className="roles-content">
        Informations spécifiques : {currentUser.helperMessage}
      </div>
    </div>
  );
};

export default Base;
