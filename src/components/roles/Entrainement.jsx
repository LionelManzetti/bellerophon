import TowerBlocks from '../puzzles/TowerBlocks.jsx';

const Entrainement = ({ isEnvCentral }) => {
  return (
    <div className="roles-container">
      <div className="roles-content">
        {isEnvCentral
          ? "Vérification réflexes et perception après sortie de l'hypersommeil :"
          : 'Entrainement réflexes pour test de pilotage'}
      </div>
      <TowerBlocks isEnvCentral={isEnvCentral}></TowerBlocks>
    </div>
  );
};

export default Entrainement;
