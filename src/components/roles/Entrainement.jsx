import { useState } from 'react';
import { navigation_primary_code } from '../common/codes';
import TowerBlocks from '../puzzles/TowerBlocks.jsx';

const Entrainement = ({ isEnvCentral }) => {
  return (
    <div className="roles-container">
      <div className="roles-title">Test de capacité</div>
      <div>
        <div className="roles-content">
          Vérification réflexes et perception après sortie de l'hypersommeil :
        </div>
        <TowerBlocks></TowerBlocks>
      </div>
    </div>
  );
};

export default Entrainement;
