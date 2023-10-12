import '../../styles/puzzles.css';
import { useState } from 'react';
import ConnexionItem from './elements/ConnexionItem';
import Target from './elements/Target';

const ConnexionPuzzle = () => {
  const [grid, setGrid] = useState([]);
  const [target, setTarget] = useState([]);

  const changeItemRotationInGrid = (position) => {
    const newGrid = [...grid];
    newGrid.forEach((element) => {
      if (element.position === position) {
        element.rotation = (element.rotation + 1) % 4;
      }
    });
    setGrid(newGrid);
  };

  const targetContent = [];

  const initTargetContent = (targetContent) => {
    for (let i = 0; i < 12; i++) {
      targetContent.push({
        position: i + 1,
        type: -1,
      });
    }
    let type0 = 0;
    let type1 = 0;
    while (type0 < 2) {
      const rand = Math.floor(Math.random() * 12);
      if (targetContent[rand].type === -1) {
        targetContent[rand].type = 0;
        type0++;
      }
    }
    while (type1 < 2) {
      const rand = Math.floor(Math.random() * 12);
      if (targetContent[rand].type === -1 && targetContent[rand].type !== 0) {
        targetContent[rand].type = 1;
        type1++;
      }
    }
  };

  initTargetContent(targetContent);

  if (target.length === 0) {
    setTarget(targetContent);
  }

  const generateTarget = (content) => {
    return content.map((content, index) => {
      return <Target content={content} key={index} />;
    });
  };

  const gridContent = [];

  const initGridContent = (gridContent) => {
    for (let i = 0; i < 9; i++) {
      gridContent.push({
        position: [Math.floor(i / 3) + 1, (i % 3) + 1],
        type: Math.floor(Math.random() * 6),
        rotation: Math.floor(Math.random() * 4),
      });
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
          changeItemRotationInGrid={changeItemRotationInGrid}
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
    gridContent.forEach((element) => {
      console.log(element);
    });
  };

  return (
    <div className="container">
      <div className="grid-container">
        {grid.length > 0 && generatePuzzleGrid(grid)}
        {target.length > 0 && generateTarget(target)}
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
