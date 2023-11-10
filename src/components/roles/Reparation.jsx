import { useState } from 'react';
import ConnexionPuzzle from '../puzzles/ConnexionPuzzle';
import { unlock_navigation_code } from '../common/codes';
import {
  handlePuzzleStatus,
  validatePuzzle,
} from '../../helpers/FirebaseHelper';

const Reparation = ({ isEnvCentral }) => {
  const [unlockNavigationPuzzle, setunlockNavigationPuzzle] = useState(false);
  const [unlockNavigationCode, setunlockNavigationCode] = useState(false);

  const [firstLoading, setFirstLoading] = useState(true);

  if (firstLoading) {
    handlePuzzleStatus('AlignCapteurs', (status) => {
      setunlockNavigationPuzzle(status);
    });
    handlePuzzleStatus('ActivateNavigation', (status) => {
      setunlockNavigationCode(status);
    });
    setFirstLoading(false);
  }

  const unlockNavPuzzle = () => {
    validatePuzzle('AlignCapteurs');
    setunlockNavigationPuzzle(true);
  };

  const unlockNavCode = () => {
    validatePuzzle('ActivateNavigation');
    setunlockNavigationCode(true);
  };

  const ancrage1 = window.localStorage.getItem('Ancrage1');
  const ancrage2 = window.localStorage.getItem('Ancrage2');
  const ancrage3 = window.localStorage.getItem('Ancrage3');
  const ancrage4 = window.localStorage.getItem('Ancrage4');
  const direction = window.localStorage.getItem('Direction');

  const GetCapteurSection = () => {
    console.log(unlockNavigationPuzzle);
    console.log(unlockNavigationCode);
    if (ancrage1 != null && ancrage1 != '') {
      return (
        <div className="roles-content">
          <div className="roles-content">NAVIGATION OPERATIONNELLE</div>
          <div className="roles-content">Paramètres : </div>
          <div className="roles-lines">
            <div className="roles-content">Direction :</div>
            <div className="roles-content">{direction}</div>
          </div>
          <div className="roles-lines">
            <div className="roles-content">Ancrage 1 :</div>
            <div className="roles-content">{ancrage1}</div>
          </div>
          <div className="roles-lines">
            <div className="roles-content">Ancrage 2 :</div>
            <div className="roles-content">{ancrage2}</div>
          </div>
          <div className="roles-lines">
            <div className="roles-content">Ancrage 3 :</div>
            <div className="roles-content">{ancrage3}</div>
          </div>
          <div className="roles-lines">
            <div className="roles-content">Ancrage 4 :</div>
            <div className="roles-content">{ancrage4}</div>
          </div>
        </div>
      );
    }

    return !unlockNavigationPuzzle ? (
      <div className="roles-content">
        <div className="roles-content">
          VAISSEAU HORS TRAJECTOIRE - CAPTEURS A REALIGNER
        </div>
        <button
          className="submenu-button"
          onClick={() => setalignCapteursVisible((value) => !value)}
        >
          {alignCapteursVisible
            ? 'Réalignement des capteurs <<<'
            : 'Réalignement des capteurs >>>'}
        </button>
        {alignCapteursVisible && (
          <div className="roles-content">
            <ConnexionPuzzle
              targets={[7, 12, 8, 11]}
              centerTile={[2, 2]}
              shortCircuit={false}
              onSuccess={unlockNavPuzzle}
              key={0}
            />
          </div>
        )}
      </div>
    ) : !unlockNavigationCode ? (
      <div className="roles-content">
        <div className="roles-content">CAPTEURS NOMINAUX</div>
        <div className="roles-content">
          VAISSEAU HORS TRAJECTOIRE - ACTIVER LA NAVIGATION
        </div>
        <button
          className="submenu-button"
          onClick={() => setactivateNavigationVisible((value) => !value)}
        >
          {activateNavigationVisible
            ? 'Activer la navigation <<<'
            : 'Activer la navigation >>>'}
        </button>
        {activateNavigationVisible && (
          <div className="roles-content">
            <ConnexionPuzzle
              targets={[2, 7, 6, 11]}
              centerTile={[5, 2]}
              shortCircuit={false}
              onSuccess={unlockNavCode}
              key={1}
            />
          </div>
        )}
      </div>
    ) : (
      <div className="roles-content">
        <div className="roles-content">CAPTEURS NOMINAUX</div>
        <div className="roles-content">
          NAVIGATION ACTIVE (code : {unlock_navigation_code}){' '}
        </div>
        <div className="roles-content">
          VAISSEAU EN ATTENTE DE COORDONNEES DE NAVIGATION
        </div>
      </div>
    );
  };

  const [propulsionVisible, setPropulsionVisible] = useState(false);
  const [lifeSystemVisible, setlifeSystemVisible] = useState(false);
  const [gestionSoutesVisible, setgestionSoutesVisible] = useState(false);
  const [capteursVisible, setcapteursVisible] = useState(false);
  const [alignCapteursVisible, setalignCapteursVisible] = useState(false);
  const [activateNavigationVisible, setactivateNavigationVisible] =
    useState(false);

  return (
    <div className="roles-container">
      {isEnvCentral ? (
        <div className="roles-container">
          <div className="roles-title">Contrôle des systèmes</div>
          <button
            className="submenu-button"
            onClick={() => setPropulsionVisible((value) => !value)}
          >
            {propulsionVisible ? 'Propulsion <<<' : 'Propulsion >>>'}
          </button>
          {propulsionVisible && (
            <div className="roles-content">
              SYSTEME NOMINAL - PROPULSION OPERATIONNELLE
            </div>
          )}
          <button
            className="submenu-button"
            onClick={() => setlifeSystemVisible((value) => !value)}
          >
            {lifeSystemVisible
              ? 'Systèmes de survie <<<'
              : 'Systèmes de survie >>>'}
          </button>
          {lifeSystemVisible && (
            <div className="roles-content">
              SYSTEME NOMINAL - TOUTES LES FONCTIONS SONT OPERATIONNELLES
            </div>
          )}
          <button
            className="submenu-button"
            onClick={() => setgestionSoutesVisible((value) => !value)}
          >
            {gestionSoutesVisible
              ? 'Gestion des soutes <<<'
              : 'Gestion des soutes >>>'}
          </button>
          {gestionSoutesVisible && (
            <div className="roles-content">SYSTEME NOMINAL</div>
          )}
          <button
            className="submenu-button"
            onClick={() => setcapteursVisible((value) => !value)}
          >
            {capteursVisible ? 'Capteurs <<<' : 'Capteurs >>>'}
          </button>
          {capteursVisible && GetCapteurSection()}
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
