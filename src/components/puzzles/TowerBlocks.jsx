import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './elements/Scene';
import './elements/styles.css';

const TowerBlocks = ({ isEnvCentral }) => {
  const canvasRef = useRef();

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) {
      //You can update a leader-board DB from here
    }
  }, [gameOver]);

  return (
    <Canvas className="canvas" ref={canvasRef}>
      <Scene
        isEnvCentral={isEnvCentral}
        gameOver={gameOver}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        canvasRef={canvasRef}
      />
    </Canvas>
  );
};

export default TowerBlocks;
