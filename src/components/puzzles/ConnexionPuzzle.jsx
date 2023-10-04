import '../../styles/puzzles.css';
import ConnexionItem from './elements/ConnexionItem';
import Target from './elements/Target';

const ConnexionPuzzle = () => {
  return (
    <div className="grid-container">
      <ConnexionItem type={1} position={[1, 1]} rotation={0} />
      <ConnexionItem type={1} position={[1, 2]} rotation={1} />
      <ConnexionItem type={1} position={[1, 3]} rotation={2} />
      <ConnexionItem type={1} position={[2, 1]} rotation={3} />
      <ConnexionItem type={-1} position={[2, 2]} rotation={0} />
      <ConnexionItem type={-1} position={[2, 3]} rotation={0} />
      <ConnexionItem type={-1} position={[3, 1]} rotation={0} />
      <ConnexionItem type={-1} position={[3, 2]} rotation={0} />
      <ConnexionItem type={-1} position={[3, 3]} rotation={0} />
      <Target type={1} position={1} />
      <Target type={0} position={2} />
      <Target type={-1} position={3} />
      <Target type={-1} position={4} />
      <Target type={-1} position={5} />
      <Target type={-1} position={6} />
      <Target type={1} position={7} />
      <Target type={-1} position={8} />
      <Target type={-1} position={9} />
      <Target type={-1} position={10} />
      <Target type={0} position={11} />
      <Target type={-1} position={12} />
    </div>
  );
};

export default ConnexionPuzzle;
