import { useState } from 'react';
import ConnexionPuzzle from '../puzzles/ConnexionPuzzle';

const Technicien = () => {
  const [posteControleUnlocked, setposteControleUnlocked] = useState(false);
  const [blocMedicalUnlocked, setblocMedicalUnlocked] = useState(false);

  const unlockPC = () => {
    setposteControleUnlocked(true);
  };

  const unlockMedBay = () => {
    setblocMedicalUnlocked(true);
  };

  const [pcVisible, setPcVisible] = useState(false);
  const [bmVisible, setBmVisible] = useState(false);

  const ButtonTo = (Target) => {
    return (
      <button
        className="submenu-button"
        key={Target}
        onClick={() => setElementDisplayed(Target)}
      >
        {Target}
      </button>
    );
  };

  const GetPosteDeControle = () => {
    return (
      <div>
        <div className="roles-subtitle">Poste de contrôle :</div>
        <div className="roles-content">
          {!posteControleUnlocked ? (
            <div className="roles-content">
              <div className="roles-content">
                Le poste de controle est actuellement vérouillé.
              </div>
              <ConnexionPuzzle
                targets={[1, 2, 3, 5]}
                centerTile={[0, 1]}
                shortCircuit={true}
                onSuccess={unlockPC}
              />
            </div>
          ) : (
            <div className="roles-content">Poste de contrôle accessible</div>
          )}
        </div>
      </div>
    );
  };

  const GetBlocMédical = () => {
    return (
      <div>
        <div className="roles-subtitle">Bloc Médical :</div>
        <div className="roles-content">
          {!blocMedicalUnlocked ? (
            <div className="roles-content">
              <div className="roles-content">
                Le bloc médical est actuellement vérouillé.
              </div>
              <ConnexionPuzzle
                targets={[1, 6, 7, 12]}
                centerTile={[2, 0]}
                shortCircuit={true}
                onSuccess={unlockMedBay}
              />
            </div>
          ) : (
            <div className="roles-content">Bloc Médical accessible</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="roles-container">
      <div className="roles-title">{"Sas d'accès"}</div>
      <button
        className="submenu-button"
        onClick={() => setPcVisible((value) => !value)}
      >
        {pcVisible ? 'Poste de Controle <<<' : 'Poste de Controle >>>'}
      </button>
      {pcVisible && GetPosteDeControle()}
      <button
        className="submenu-button"
        onClick={() => setBmVisible((value) => !value)}
      >
        {bmVisible ? 'Bloc Médical <<<' : 'Bloc Médical >>>'}
      </button>
      {bmVisible && GetBlocMédical()}
    </div>
  );
};

export default Technicien;
