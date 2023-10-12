import Empty from '../images/Empty.png';
import Cable0 from '../images/Cable0.png';
import Cable1 from '../images/Cable1.png';
import Cable2 from '../images/Cable2.png';
import Cable3 from '../images/Cable3.png';
import Cable4 from '../images/Cable4.png';
import Cable5 from '../images/Cable5.png';
import '../../../styles/puzzles.css';
import { useState } from 'react';

const ConnexionItem = ({ content }) => {
  const [userCode, setUserCode] = useState('');

  let { position, type, rotation } = content;

  const pos = position[1] + (position[0] - 1) * 3;
  const divClassName = 'grid-item' + pos.toString() + ' grid-item';

  switch (userCode) {
    // courbe
    case 'CC1':
      type = 1;
      rotation = 0;
      break;
    case 'CC2':
      type = 1;
      rotation = 1;
      break;
    case 'CC3':
      type = 1;
      rotation = 2;
      break;
    case 'CC4':
      type = 1;
      rotation = 3;
      break;
    // ligne droite
    case 'LL1':
      type = 0;
      rotation = 0;
      break;
    case 'LL2':
      type = 0;
      rotation = 1;
      break;
    // Intersection en T
    case 'TT1':
      type = 2;
      rotation = 0;
      break;
    case 'TT2':
      type = 2;
      rotation = 1;
      break;
    case 'TT3':
      type = 2;
      rotation = 2;
      break;
    case 'TT4':
      type = 2;
      rotation = 3;
      break;
    // End
    case 'EE1':
      type = 5;
      rotation = 0;
      break;
    case 'EE2':
      type = 5;
      rotation = 1;
      break;
    case 'EE3':
      type = 5;
      rotation = 2;
      break;
    case 'EE4':
      type = 5;
      rotation = 3;
      break;
    // Croix
    case 'XX1':
      type = 4;
      rotation = 0;
      break;
    // double courbe
    case 'DC1':
      type = 3;
      rotation = 0;
      break;
    case 'DC2':
      type = 3;
      rotation = 1;
      break;
  }

  if (type < 0) {
    return (
      <div className={divClassName}>
        <input
          className="input-code"
          type="text"
          maxLength="5"
          value={userCode}
          onChange={(e) => {
            setUserCode(e.target.value.toLocaleUpperCase());
          }}
          placeholder="---"
        />
      </div>
    );
  }

  let imgClassName = 'img rotate' + (rotation * 90).toString();
  let img = <img className={imgClassName}></img>;
  switch (type) {
    case 0:
      img = <img className={imgClassName} src={Cable0} />;
      break;
    case 1:
      img = <img className={imgClassName} src={Cable1} />;
      break;
    case 2:
      img = <img className={imgClassName} src={Cable2} />;
      break;
    case 3:
      img = <img className={imgClassName} src={Cable3} />;
      break;
    case 4:
      img = <img className={imgClassName} src={Cable4} />;
      break;
    case 5:
      img = <img className={imgClassName} src={Cable5} />;
      break;
    default:
      img = <img className={imgClassName} src={Empty} r />;
  }

  return <div className={divClassName}>{img}</div>;
};

export default ConnexionItem;
