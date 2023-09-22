import TowerBlocks from '../puzzles/TowerBlocks';

const Technicien = () => {
  return (
    <div className="roles-container">
      <div className="roles-title">{"Sas d'accès"}</div>
      <div className="roles-subtitle">Poste de contrôle :</div>
      <div className="roles-content">-- Puzzle TODO --</div>
      <div className="roles-subtitle">Bloc Médical :</div>
      <div className="roles-content">
        <TowerBlocks />
      </div>
    </div>
  );
};

export default Technicien;
