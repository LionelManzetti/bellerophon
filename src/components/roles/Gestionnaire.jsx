import '../../styles/home.css';

const Gestionnaire = (currentUser) => {
  return (
    <div>
      <div>Gestionnaire de colonie : {currentUser.firstName}</div>
    </div>
  );
};

export default Gestionnaire;
