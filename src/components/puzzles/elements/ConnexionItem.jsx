import Empty from '../images/Empty.png';
import Cable0 from '../images/Cable0.png';
import Cable1 from '../images/Cable1.png';
import Cable2 from '../images/Cable2.png';
import Cable3 from '../images/Cable3.png';
import Cable4 from '../images/Cable4.png';
import Cable5 from '../images/Cable5.png';
import '../../../styles/puzzles.css';

const ConnexionItem = ({ type = 0, position = [1, 1], rotation = 0 }) => {
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
  const pos = position[1] + (position[0] - 1) * 3;
  const divClassName = 'grid-item' + pos.toString() + ' grid-item';
  return <div className={divClassName}>{img}</div>;
};

export default ConnexionItem;
