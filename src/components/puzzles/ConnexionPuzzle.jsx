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

  const GetTileConnexions = (tile) => {
    //Array of connexions [0,1,...] 0=top, 1=right, 2= bottom, 3=left
    switch (tile.type) {
      case 0: //ligne
        switch (tile.rotation) {
          case 0:
            return [0, 2];
          case 1:
          default:
            return [1, 3];
        }
      case 1: //arc
        switch (tile.rotation) {
          case 0:
            return [1, 2];
          case 1:
            return [2, 3];
          case 2:
            return [3, 0];
          case 3:
          default:
            return [0, 1];
        }
      case 2: // T
        switch (tile.rotation) {
          case 0:
            return [1, 2, 3];
          case 1:
            return [2, 3, 0];
          case 2:
            return [3, 0, 1];
          case 3:
          default:
            return [0, 1, 2];
        }
      case 3: // double courbe
        return [0, 1, 2, 3];
      case 4: // croisement
        return [0, 1, 2, 3];
      case 5: // cul de sac
        switch (tile.rotation) {
          case 0:
            return [2];
          case 1:
            return [3];
          case 2:
            return [0];
          case 3:
          default:
            return [1];
        }
    }
    return [];
  };

  const GetTileNameFromType = (type) => {
    switch (type) {
      case 0:
        return 'Ligne droite';
      case 1:
        return 'Courbe';
      case 2:
        return 'Intersection en T';
      case 3:
        return 'Double courbe';
      case 4:
        return 'Croisement en X';
      case 5:
      default:
        return 'Fin de cable';
    }
  };

  const onValidate = (e) => {
    e.preventDefault();
    //test if any grid tile is not set
    const numberOfTilesNotSet = grid.filter((t) => t.type == -1).length;
    if (numberOfTilesNotSet > 0) {
      alert(
        'Il manque ' +
          numberOfTilesNotSet +
          ' connexion' +
          (numberOfTilesNotSet == 1 ? ' !' : 's !'),
      );
      return;
    }
    //test number of tiles types
    for (let i = 0; i < 3; i++) {
      const numberOfTilesOfThisType = grid.filter((t) => t.type == i).length;
      if (numberOfTilesOfThisType > 3) {
        alert(
          'Trop de connexion de type ' +
            GetTileNameFromType(i) +
            ' utilisées (max 3) !',
        );
        return;
      }
    }
    for (let i = 3; i < 6; i++) {
      const numberOfTilesOfThisType = grid.filter((t) => t.type == i).length;
      if (numberOfTilesOfThisType > 2) {
        alert(
          'Trop de connexion de type ' +
            GetTileNameFromType(i) +
            ' utilisées (max 1) !',
        );
        return;
      }
    }
    //Test if there are any wrong connexion
    let anyWrongConnexion = false;
    for (let i = 0; i < 9; i++) {
      const tile = grid[i];
      const connexions = GetTileConnexions(tile);
      connexions.forEach((c) => {
        //test wall connexions
        if (c == 0 && i <= 2) {
          if (!targets.includes(i + 1)) {
            alert(
              'La tuile ' + (i + 1) + ' est connectée à un mur (vers le haut).',
            );
            anyWrongConnexion = true;
            return;
          }
        }
        if (c == 1 && (i + 1) % 3 == 0) {
          if (!targets.includes(4 + (i % 3))) {
            alert(
              'La tuile ' +
                (i + 1) +
                ' est connectée à un mur (vers la droite).',
            );
            anyWrongConnexion = true;
          }
        }
        if (c == 2 && i >= 6) {
          if (!targets.includes(15 - i)) {
            alert(
              'La tuile ' + (i + 1) + ' est connectée à un mur (vers le bas).',
            );
            anyWrongConnexion = true;
          }
        }
        if (c == 3 && i % 3 == 0) {
          if (!targets.includes(12 - i / 3)) {
            alert(
              'La tuile ' +
                (i + 1) +
                ' est connectée à un mur (vers la gauche).',
            );
            anyWrongConnexion = true;
          }
        }
        //test internal connexions
        // TODOOOOOOOOOOOOOOOOOO
      });
      if (anyWrongConnexion) {
        return;
      }
    }
    //Test if same types computer are properly linked
    // TOODDDDDDOOOOOOOOOOOOO

    //If no failures before, we are good
    alert('Ca semble bon gros !!!');
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
