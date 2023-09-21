import '../../styles/roles.css';

const Pilote = ({ isEnvCentral }) => {
  return (
    <div className="roles-container">
      {isEnvCentral ? (
        <div className="roles-title">Truc à faire</div>
      ) : (
        <div className="roles-title">Rien à faire</div>
      )}
    </div>
  );
};

export default Pilote;
