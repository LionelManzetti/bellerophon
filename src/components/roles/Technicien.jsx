const Technicien = ({ isEnvCentral }) => {
  return (
    <div className="roles-container">
      {isEnvCentral ? <div className="roles-title">Technicien</div> : ''}
    </div>
  );
};

export default Technicien;
