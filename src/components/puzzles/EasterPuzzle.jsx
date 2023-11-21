import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './elements/Scene';
import './elements/styles.css';

import { setHighScore } from '../../helpers/FirebaseHelper';

const EasterPuzzle = ({ isEnvCentral, highScores }) => {
  const canvasRef = useRef();

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleNewHighScore = () => {
    if (score > highScores[highScores.length - 1].score) {
      const playerName = prompt(
        'Entre ton nom pour le classement (10 lettres max) :',
      );
      if (playerName.length > 0) {
        if (highScores.length >= 10) {
          highScores.pop();
        }
        highScores.push({ name: playerName.split(0, 10), score: score });
        highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
        setHighScore(highScores);
      }
    }
  };

  useEffect(() => {
    if (gameOver) {
      handleNewHighScore();
    }
  }, [gameOver]);

  return (
    <Canvas className="easter-canvas" ref={canvasRef}>
      <Scene
        isEnvCentral={isEnvCentral}
        gameOver={gameOver}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        canvasRef={canvasRef}
        highScores={highScores}
      />
    </Canvas>
  );
};

export default EasterPuzzle;
