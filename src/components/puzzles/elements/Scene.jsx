import { useRef, Suspense, useState } from 'react';
import { Physics } from '@react-three/cannon';
import {
  Text,
  Sparkles,
  OrbitControls,
  Billboard,
  Html,
} from '@react-three/drei';
import { Button } from 'antd';
import Stacks from './Stacks';
import './styles.css';
import { navigation_primary_code } from '../../common/codes';

const Scene = ({
  gameOver,
  setGameOver,
  score,
  setScore,
  canvasRef,
  isEnvCentral,
}) => {
  const mesh = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [stack, setStack] = useState([]);

  const targetScore = 10;

  //Helper function for getting gradient block colors based on the number of blocks
  ///////////////////////////////////////////////////////////////////////////////////
  const getColor = (index, darker = false) => {
    return `hsl(${index * 20}, ${darker ? '50%' : '100%'}, 80%)`;
  };

  //How to Play Banner text
  //////////////////////////////
  const HowToPlayBanner = ({ visible = true }) => {
    const onClick = () => {
      setGameOver(false);
      setIsPlaying(true);
    };

    return (
      <Html center wrapperClass="how-to-play-component-wrapper">
        <div
          style={{ display: visible ? 'block' : 'none' }}
          className="how-to-play-component-container"
        >
          <div className="how-to-play-inner-container">
            <p className="title">
              {gameOver
                ? score >= targetScore
                  ? 'Gagné !'
                  : 'Perdu !'
                : 'Test de réflexes'}
            </p>
            <hr />
            <p>
              {gameOver
                ? score >= targetScore
                  ? isEnvCentral
                    ? "Test de pilotage validé. Code primaire d'accès à la navigation : " +
                      navigation_primary_code
                    : "Test de réflexe validé. Vous pouvez lancer le test d'accès à la navigation sur l'ordinateur central."
                  : "Vos réflexes sont encore impactés par votre sortie de l'hypersommeil. Continuez de vous entrainer..."
                : 'Empilez les blocs les uns sur les autres et atteignez un score de ' +
                  targetScore +
                  '.'}
            </p>
            <p>
              Vous pouvez utiliser les touches suivantes:
              <span className="keys"> Click de souris </span> |
              <span className="keys"> Touche Entrée </span> |
              <span className="keys"> Flèche du bas </span> | pour empiler les
              blocs.
            </p>
            <Button className="play-retry-button" onClick={onClick}>
              {gameOver ? 'Recommencer' : 'Jouer'}
            </Button>
          </div>
        </div>
      </Html>
    );
  };

  // Score text
  ////////////////
  const ScoreText = ({ color = 'cyan' }) => {
    const mesh = useRef();
    return (
      <mesh ref={mesh}>
        <Text color={color} fontSize={0.1} position={[0, 1.7, 2]}>
          SCORE
        </Text>
        <Text color={color} fontSize={0.3} position={[0, 1.5, 2]}>
          {score}
        </Text>
      </mesh>
    );
  };

  return (
    <mesh ref={mesh}>
      <Suspense fallback={null}>
        <Physics>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate={true}
            autoRotateSpeed={1}
            enableRotate={false}
          />
          <ambientLight intensity={0.3} />
          <spotLight position={[0, 10, 0]} angle={0.5} intensity={0.5} />
          <pointLight position={[0, -1, 2]} intensity={0.5} />
          <Sparkles scale={100} size={30} speed={2} noise={10} />
          <Sparkles scale={50} size={20} color={getColor(stack.length)} />
          <Billboard>
            <ScoreText />
            <HowToPlayBanner visible={!isPlaying} />
            <mesh
              rotation={[Math.PI / 5, -Math.PI / 5, 0]}
              position={[0, 1, -2]}
            >
              <Stacks
                setScore={setScore}
                canvasRef={canvasRef}
                setGameOver={setGameOver}
                gameOver={gameOver}
                stack={stack}
                setStack={setStack}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                getColor={getColor}
              />
            </mesh>
          </Billboard>
        </Physics>
      </Suspense>
    </mesh>
  );
};

export default Scene;
