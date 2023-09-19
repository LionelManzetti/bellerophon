import '../../styles/roles.css';

const Base = (currentUser) => {
  const { firstName, lastName, roles, helperMessage } = currentUser;
  return (
    <div className="roles-container">
      <div className="roles-title">
        Welcome {firstName} {lastName}
      </div>
      <div className="roles-content">You have {roles.length} roles.</div>
      <div className="roles-content">{helperMessage}</div>
      <div className="roles-content">...</div>
    </div>
  );
};

export default Base;
