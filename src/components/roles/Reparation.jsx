import { useState } from 'react';
import ConnexionPuzzle from '../puzzles/ConnexionPuzzle';
import { unlock_navigation_code } from '../common/codes';

const Reparation = ({ isEnvCentral }) => {
  const [unlockNavigationPuzzle, setunlockNavigationPuzzle] = useState(false);
  const [unlockNavigationCode, setunlockNavigationCode] = useState(false);

  const unlockNavPuzzle = () => {
    setunlockNavigationPuzzle(true);
  };

  const unlockNavCode = () => {
    setunlockNavigationCode(true);
  };

  return (
    <div className="roles-container">
      {isEnvCentral ? (
        <div>
          <div className="roles-title">Contrôle des systèmes</div>
          <div className="roles-subtitle">Propulsion :</div>
          <div className="roles-content">
            SYSTEME NOMINAL - PROPULSION OPERATIONNELLE
          </div>
          <div className="roles-subtitle">Systèmes de survie :</div>
          <div className="roles-content">
            SYSTEME NOMINAL - TOUTES LES FONCTIONS SONT OPERATIONNELLES
          </div>
          <div className="roles-subtitle">Gestion des soutes :</div>
          <div className="roles-content">SYSTEME NOMINAL </div>
          <div className="roles-subtitle">Capteurs :</div>
          <div className="roles-content">
            VAISSEAU HORS TRAJECTOIRE - CAPTEURS A REALIGNER
          </div>
          <div className="roles-content">
            {!unlockNavigationPuzzle ? (
              <div className="roles-content">
                <div className="roles-content">Réalignement des capteurs</div>
                <ConnexionPuzzle
                  targets={[7, 12, 8, 11]}
                  centerTile={[2, 2]}
                  shortCircuit={false}
                  onSuccess={unlockNavPuzzle}
                  key={0}
                />
              </div>
            ) : !unlockNavigationCode ? (
              <div className="roles-content">
                <div className="roles-content">Dévérouillage navigation</div>
                <ConnexionPuzzle
                  targets={[1, 2, 3, 4]}
                  centerTile={[2, 2]}
                  shortCircuit={false}
                  onSuccess={unlockNavCode}
                  key={1}
                />
              </div>
            ) : (
              <div className="roles-content">
                <div className="roles-content">Code de navigation : </div>
                <div className="roles-content">{unlock_navigation_code}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="roles-content">
          Accès interdit hors ordinateur central
        </div>
      )}
    </div>
  );
};

export default Reparation;
