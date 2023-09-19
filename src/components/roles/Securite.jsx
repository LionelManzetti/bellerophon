import '../../styles/home.css';

function Securite(currentUser) {
  return (
    <div>
      <div>Securité : {currentUser.firstName}</div>
    </div>
  );
}

export default Securite;
