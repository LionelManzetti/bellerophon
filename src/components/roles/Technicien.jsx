import ConnexionPuzzle from '../puzzles/ConnexionPuzzle';

const Technicien = () => {
  return (
    <div className="roles-container">
      <div className="roles-title">{"Sas d'accès"}</div>
      <div className="roles-subtitle">Poste de contrôle :</div>
      <div className="roles-content">
        <ConnexionPuzzle targets={[1, 2, 3, 5]} centerTile={[0, 1]} />
      </div>
      <div className="roles-subtitle">Bloc Médical :</div>
      <div className="roles-content">
        <ConnexionPuzzle targets={[1, 6, 7, 12]} centerTile={[3, 0]} />
      </div>
    </div>
  );
};

export default Technicien;
