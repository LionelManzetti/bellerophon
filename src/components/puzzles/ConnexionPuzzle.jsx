import '../../styles/puzzles.css';
import ConnexionItem from './elements/ConnexionItem';
import Target from './elements/Target';

const ConnexionPuzzle = () => {
  const targetContent = [];
  targetContent.push(<Target type={1} position={1} />);
  targetContent.push(<Target type={0} position={2} />);
  targetContent.push(<Target type={-1} position={3} />);
  targetContent.push(<Target type={-1} position={4} />);
  targetContent.push(<Target type={-1} position={5} />);
  targetContent.push(<Target type={-1} position={6} />);
  targetContent.push(<Target type={1} position={7} />);
  targetContent.push(<Target type={-1} position={8} />);
  targetContent.push(<Target type={-1} position={9} />);
  targetContent.push(<Target type={-1} position={10} />);
  targetContent.push(<Target type={0} position={11} />);
  targetContent.push(<Target type={-1} position={12} />);

  const gridContent = [
    {
      position: [1, 1],
      type: -1,
      rotation: 0,
    },
    {
      position: [1, 2],
      type: -1,
      rotation: 0,
    },
  ];

  const generatePuzzleGrid = (content) => {
    return content.map((content, index) => {
      return <ConnexionItem content={content} key={index} />;
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const onValidate = (e) => {
    e.preventDefault();
    gridContent.forEach((element) => {
      console.log(element);
    });
  };

  return (
    <div className="container">
      <div className="grid-container">
        {generatePuzzleGrid(gridContent)}
        {targetContent}
      </div>
      <button className="button" onClick={onReset}>
        Remise à zéro
      </button>
      <button className="button" onClick={onValidate}>
        Valider les connections
      </button>
    </div>
  );
};

export default ConnexionPuzzle;
