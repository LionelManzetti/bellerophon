import '../../styles/puzzles.css';
import { useState } from 'react';
import ConnexionItem from './elements/ConnexionItem';
import Target from './elements/Target';

const ConnexionPuzzle = ({ targets, centerTile }) => {
  const [grid, setGrid] = useState([]);

  const changeItemTypeAndRotationInGrid = (position, type, rotation) => {
    const newGrid = [...grid];
    newGrid.forEach((element) => {
      if (element.position === position) {
        element.type = type;
        element.rotation = rotation;
      }
    });
    setGrid(newGrid);
  };

  const generateTargets = () => {
    let targetsContent = [
      <div
        className={'target-itemtopleft target-angleItems target-none'}
        key={4}
      />,
      <div
        className={'target-itembottomright target-angleItems target-none'}
        key={5}
      />,
    ];

    for (var i = 0; i < 4; i++) {
      const position = targets[i];
      targetsContent.push(
        <Target position={position} type={i < 2 ? 0 : 1} key={i} />,
      );
    }

    return targetsContent;
  };

  const gridContent = [];

  const initGridContent = (gridContent) => {
    for (let i = 0; i < 9; i++) {
      if (i == 4) {
        gridContent.push({
          position: [Math.floor(i / 3) + 1, (i % 3) + 1],
          type: centerTile[0],
          rotation: centerTile[1],
        });
      } else {
        gridContent.push({
          position: [Math.floor(i / 3) + 1, (i % 3) + 1],
          type: -1,
          rotation: 0,
        });
      }
    }
    setGrid(gridContent);
  };

  if (grid.length === 0) {
    initGridContent(gridContent);
  }

  const generatePuzzleGrid = (content) => {
    return content.map((content, index) => {
      return (
        <ConnexionItem
          key={index}
          content={content}
          changeItemTypeAndRotationInGrid={changeItemTypeAndRotationInGrid}
        />
      );
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const onValidate = (e) => {
    e.preventDefault();
    console.log(grid);
  };

  return (
    <div className="container">
      <div className="grid-container">
        {grid.length > 0 && generatePuzzleGrid(grid)}
        {generateTargets()}
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
