import { useEffect, useRef } from 'react';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gameConstants } from './constants';

const Block = ({
  args = [2, 0.4, 2],
  position = [0, 0, 0],
  active = false,
  i,
  spawnOffset,
  drop,
  setDrop,
  setLastBlockData,
  stack = [],
  gameOver,
  color,
  isTrimmedBit = false,
}) => {
  const mesh = useRef();
  let moveForward = true;
  let direction, directionInverted;

  //Adding new arguments on first render
  /////////////////////////////////////////
  useEffect(() => {
    mesh.current.args = args;
  }, []);

  //Controlling each individual block movement
  ///////////////////////////////////////////////
  useFrame(() => {
    direction = i % 2 === 0 ? 'x' : 'z';
    if (active && !gameOver) {
      directionInverted = i % 2 !== 0 ? 'x' : 'z';

      if (stack.length > 1)
        mesh.current.position[directionInverted] =
          stack[i - 1].pos[directionInverted];
      if (mesh.current.position[direction] <= -spawnOffset) moveForward = true;
      else if (mesh.current.position[direction] >= spawnOffset)
        moveForward = false;

      moveForward
        ? (mesh.current.position[direction] += gameConstants.SPEED)
        : (mesh.current.position[direction] -= gameConstants.SPEED);

      if (drop) {
        setLastBlockData({
          pos: mesh.current.position,
          args: mesh.current.args,
          direction,
        });
        setDrop(false);
      }
    }
    //Dropping the entire block if gameOver
    else if ((gameOver && i === stack.length - 1) || isTrimmedBit) {
      mesh.current.position.y -= gameConstants.SPEED * 2;
      mesh.current.rotation[direction] -= gameConstants.SPEED / 2;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[0, 0, 0]}>
      <Box args={args}>
        <meshStandardMaterial color={color} />
      </Box>
    </mesh>
  );
};

export default Block;
