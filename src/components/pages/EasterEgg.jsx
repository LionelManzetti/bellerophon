import '../../Styles/roles.css';
import TowerBlocks from '../puzzles/TowerBlocks';

const EasterEgg = () => {
  return (
    <div className="roles-container">
      <div className="roles-title">Analyse médicale </div>
      <h2 className="roles-content">Saisissez le nom du patient :</h2>
      <TowerBlocks />
    </div>
  );
};

export default EasterEgg;
