const Reparation = ({ isEnvCentral }) => {
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
          <div className="roles-content">-- GROS TODO ICI --</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Reparation;
