import { useState } from 'react';
import '../../Styles/roles.css';
import { getHighestScores } from '../../helpers/FirebaseHelper';
import EasterPuzzle from '../puzzles/EasterPuzzle';

const EasterEgg = () => {
  const [highScores, setHighScores] = useState([]);
  const [avoidRerender, setAvoidRerender] = useState(false);

  if (highScores.length === 0 && !avoidRerender) {
    setAvoidRerender(true);
    getHighestScores().then((scores) => {
      setHighScores(scores);
      return scores;
    });
  }
  return (
    <div className="roles-container secret-page">
      <div className="roles-title">Page secrète !</div>
      {highScores.length > 0 && <EasterPuzzle highScores={highScores} />}
    </div>
  );
};

export default EasterEgg;
