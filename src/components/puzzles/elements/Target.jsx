import '../../../styles/puzzles.css';
import TargetImg from '../images/Target.png';

const Target = ({ type, position }) => {
  let divClassName = 'target-item' + position.toString() + ' target-item';
  switch (type) {
    case 0:
      divClassName += ' target-redItem';
      break;
    case 1:
      divClassName += ' target-blueItem';
      break;
    default:
      divClassName += ' target-none';
      break;
  }

  let imgClassName =
    ' target-item rotate' + (Math.floor((position - 1) / 3) * 90).toString();
  return (
    <div className={divClassName}>
      <img className={imgClassName} src={TargetImg} />
    </div>
  );
};

export default Target;
