import Empty from '../images/Empty.png';
import Cable0 from '../images/Cable0.png';
import Cable1 from '../images/Cable1.png';
import Cable2 from '../images/Cable2.png';
import Cable3 from '../images/Cable3.png';
import Cable4 from '../images/Cable4.png';
import Cable5 from '../images/Cable5.png';
import '../../../styles/puzzles.css';
import { useState } from 'react';

const ConnexionItem = ({ content, changeItemTypeAndRotationInGrid }) => {
  const [userCode, setUserCode] = useState('');

  let { position, type, rotation, locked } = content;

  const reset = () => {
    if (!locked) {
      changeItemTypeAndRotationInGrid(position, -1, rotation);
    }
  };

  const pos = position[1] + (position[0] - 1) * 3;
  const divClassName = 'grid-item' + pos.toString() + ' grid-item';

  const onTileCodeEntered = (e) => {
    const code = e.target.value.toLocaleUpperCase();
    switch (code) {
      // courbe
      case 'CA1':
      case 'CB1':
      case 'CC1':
        type = 1;
        rotation = 1;
        break;
      case 'CA2':
      case 'CB2':
      case 'CC2':
        type = 1;
        rotation = 0;
        break;
      case 'CA3':
      case 'CB3':
      case 'CC3':
        type = 1;
        rotation = 3;
        break;
      case 'CA4':
      case 'CB4':
      case 'CC4':
        type = 1;
        rotation = 2;
        break;
      // ligne droite
      case 'LA1':
      case 'LA3':
      case 'LB1':
      case 'LB3':
      case 'LC1':
      case 'LC3':
        type = 0;
        rotation = 0;
        break;
      case 'LA2':
      case 'LA4':
      case 'LB2':
      case 'LB4':
      case 'LC2':
      case 'LC4':
        type = 0;
        rotation = 1;
        break;
      // Intersection en T
      case 'TA1':
      case 'TB1':
      case 'TC1':
        type = 2;
        rotation = 3;
        break;
      case 'TA2':
      case 'TB2':
      case 'TC2':
        type = 2;
        rotation = 2;
        break;
      case 'TA3':
      case 'TB3':
      case 'TC3':
        type = 2;
        rotation = 1;
        break;
      case 'TA4':
      case 'TB4':
      case 'TC4':
        type = 2;
        rotation = 0;
        break;
      // End
      case 'FC1':
        type = 5;
        rotation = 2;
        break;
      case 'FC2':
        type = 5;
        rotation = 1;
        break;
      case 'FC3':
        type = 5;
        rotation = 0;
        break;
      case 'FC4':
        type = 5;
        rotation = 3;
        break;
      // Croix
      case 'JB1':
      case 'JB2':
      case 'JB3':
      case 'JB4':
        type = 4;
        rotation = 0;
        break;
      // double courbe
      case 'JA1':
      case 'JA3':
        type = 3;
        rotation = 0;
        break;
      case 'JA2':
      case 'JA4':
        type = 3;
        rotation = 1;
        break;
    }
    setUserCode(code);
    if (type >= 0) {
      e.target.value = '';
      setUserCode('');
      changeItemTypeAndRotationInGrid(position, type, rotation);
    }
  };

  if (type < 0) {
    return (
      <div className={divClassName}>
        <img className="img" src={Empty}></img>
        <input
          className="input-code"
          type="text"
          maxLength="3"
          value={userCode}
          onChange={onTileCodeEntered}
          placeholder="---"
        />
      </div>
    );
  }

  let imgClassName = 'img rotate' + (rotation * 90).toString();
  let img = <img className={imgClassName} src={Empty}></img>;
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
      img = <img className={imgClassName} src={Empty} />;
  }

  return (
    <div className={divClassName} onDoubleClick={reset}>
      {img}
    </div>
  );
};

export default ConnexionItem;
