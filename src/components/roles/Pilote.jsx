const Pilote = ({ isEnvCentral }) => {
  return (
    <div className="roles-container">
      {isEnvCentral ? <div className="roles-title">Pilotage</div> : ''}
    </div>
  );
};

export default Pilote;
