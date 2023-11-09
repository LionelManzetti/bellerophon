import { useState } from 'react';
import '../../styles/login.css';
import '../../styles/roles.css';
import '../../styles/genetic.css';

export const GetNiceGeneticCode = (geneticCode) => {
  return (
    <div className="roles-lines">
      {geneticCode.split('').map((l, key) => {
        const classname = 'square ' + l;
        return <div className={classname} key={key} />;
      })}
    </div>
  );
};

const GetAlterableGeneticCode = (geneticCode, onClick) => {
  return (
    <div className="roles-lines">
      {geneticCode.split('').map((l, key) => {
        const classname = 'square ' + l;
        return (
          <div
            className={classname}
            key={key}
            onClick={() => {
              onClick(key);
            }}
          />
        );
      })}
    </div>
  );
};

const GetNextColor = (c) => {
  switch (c) {
    case 'B':
      return 'R';
    case 'R':
      return 'O';
    case 'O':
      return 'V';
    case 'V':
      return 'J';
    case 'J':
    default:
      return 'B';
  }
};

// eslint-disable-next-line react/prop-types
const PatientInfo = ({ patient }) => {
  const [alteredGeneticCode, setAlteredGeneticCode] = useState('');
  const [init, setInit] = useState(true);
  // eslint-disable-next-line react/prop-types
  const { id, firstName, lastName, geneticCode } = patient;

  if (init) {
    const storedGeneticCode = window.localStorage.getItem(id);
    setAlteredGeneticCode(
      storedGeneticCode == null ? geneticCode : storedGeneticCode,
    );
    setInit(false);
  }

  const OnAlterateGeneticCode = (pos) => {
    let newGenCode = alteredGeneticCode.split('');
    newGenCode[pos] = GetNextColor(newGenCode[pos]);
    const modifiedCode = newGenCode.join('');
    setAlteredGeneticCode(modifiedCode);
    window.localStorage.setItem(id, modifiedCode);
  };

  return (
    <div>
      <div>Nom : {lastName}</div>
      <div>Prénom : {firstName}</div>
      <div>Code hyper-sommeil : </div>
      {GetNiceGeneticCode(geneticCode)}
      <div>Code hyper-sommeil Hacké :</div>
      {GetAlterableGeneticCode(alteredGeneticCode, OnAlterateGeneticCode)}
    </div>
  );
};

export default PatientInfo;
