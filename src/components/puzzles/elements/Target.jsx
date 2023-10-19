import '../../../styles/puzzles.css';

const Target = ({ type, position }) => {
  let divClassName = 'target-item' + position.toString();
  if (position <= 3 || (position >= 7 && position <= 9)) {
    divClassName += ' target-topItem';
  } else {
    divClassName += ' target-sideItem';
  }
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
  return <div className={divClassName} />;
};

export default Target;
