const Base = ({ currentUser }) => {
  const { firstName, lastName, age, gender, job, specialty, helperMessage } =
    currentUser;
  return (
    <div className="roles-container">
      <div className="roles-title">
        Bienvenue {firstName} {lastName}
      </div>
      <div className="roles-lines">
        <div className="roles-content">Nom : {lastName}</div>
        <div className="roles-content">Prénom : {firstName}</div>
      </div>
      <div className="roles-lines">
        <div className="roles-content">Age : {age}</div>
        <div className="roles-content">Genre : {gender}</div>
      </div>
      <div className="roles-lines">
        <div className="roles-content">Fonction : {job}</div>
        <div className="roles-content">Spécialité : {specialty}</div>
      </div>
      <div className="roles-content">
        Informations spécifiques : {helperMessage}
      </div>
    </div>
  );
};

export default Base;
