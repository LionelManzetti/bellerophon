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

  const GetTileConnexionsFrom = (tile, from) => {
    //Array of connexions [0,1,...] 0=top, 1=right, 2= bottom, 3=left
    switch (tile.type) {
      case 0: //ligne
      case 4: //croisement
        return [(from + 2) % 4];
      case 1: //arc
      case 3: // double courbe
        switch (tile.rotation) {
          case 0:
            return [3 - from];
          case 1:
            return [5 - from];
          case 2:
            return [3 - from];
          case 3:
          default:
            return [1 - from];
        }
      case 2: {
        // T
        return [0, 1, 2, 3].filter((v) => v != tile.rotation && v != from);
      }
      case 5: // cul de sac
        return [];
    }
    return [];
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

  const GetEntryTileAndDirection = (computer) => {
    if (computer <= 3) {
      return [computer - 1, 0];
    } else if (computer <= 6) {
      return [(computer - 3) * 3 - 1, 1];
    } else if (computer <= 9) {
      return [15 - computer, 2];
    } else {
      return [(12 - computer) * 3, 3];
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
          if (!targets.includes(4 + Math.floor(i / 3))) {
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
        if (c == 0 && i > 2) {
          const connectedTile = grid[i - 3];
          const connectedTileConnexions = GetTileConnexions(connectedTile);
          if (!connectedTileConnexions.includes(2)) {
            alert(
              'La tuile ' +
                (i + 1) +
                ' est connectée à du vide (vers le haut).',
            );
            anyWrongConnexion = true;
            return;
          }
        }
        if (c == 2 && i < 6) {
          const connectedTile = grid[i + 3];
          const connectedTileConnexions = GetTileConnexions(connectedTile);
          if (!connectedTileConnexions.includes(0)) {
            alert(
              'La tuile ' + (i + 1) + ' est connectée à du vide (vers le bas).',
            );
            anyWrongConnexion = true;
            return;
          }
        }
        if (c == 1 && (i + 1) % 3 != 0) {
          const connectedTile = grid[i + 1];
          const connectedTileConnexions = GetTileConnexions(connectedTile);
          if (!connectedTileConnexions.includes(3)) {
            alert(
              'La tuile ' +
                (i + 1) +
                ' est connectée à du vide (vers la droite).',
            );
            anyWrongConnexion = true;
            return;
          }
        }
        if (c == 3 && i % 3 != 0) {
          const connectedTile = grid[i - 1];
          const connectedTileConnexions = GetTileConnexions(connectedTile);
          if (!connectedTileConnexions.includes(1)) {
            alert(
              'La tuile ' +
                (i + 1) +
                ' est connectée à du vide (vers la gauche).',
            );
            anyWrongConnexion = true;
            return;
          }
        }
      });
      if (anyWrongConnexion) {
        return;
      }
    }
    //Test if same types computer are properly linked
    let computersDone = [];
    const ConnectedGroups = new Array(
      new Array(),
      new Array(),
      new Array(),
      new Array(),
    );
    let i = 0;
    console.log(targets);
    console.log(ConnectedGroups);
    targets.forEach((c) => {
      if (!computersDone.includes(c)) {
        ConnectedGroups[i].push(c);
        computersDone.push(c);
        let tilesAlreadyProcessed = new Array();
        //what is the entry tile for this computer
        const EntryTileNumberAndDirection = GetEntryTileAndDirection(c);
        console.log('result : ');
        console.log(EntryTileNumberAndDirection);
        let TilesToProcess = new Array(EntryTileNumberAndDirection);
        //loop while we have tiles to process
        while (TilesToProcess.length > 0) {
          const tileNumberAndDirection = TilesToProcess.shift();
          const tileNumber = tileNumberAndDirection[0];
          const fromDirection = tileNumberAndDirection[1];
          console.log('current tile');
          console.log(tileNumberAndDirection);
          if (!tilesAlreadyProcessed.includes(tileNumber)) {
            const tile = grid[tileNumber];
            if (tile.type != 3 && tile.type != 4) {
              tilesAlreadyProcessed.push(tileNumber);
            }
            const connexions = GetTileConnexionsFrom(tile, fromDirection);
            console.log(connexions);
            connexions.forEach((c) => {
              if (c == 0 && tileNumber <= 2) {
                //handle target on top row
                const target = tileNumber + 1;
                computersDone.push(target);
                ConnectedGroups[i].push(target);
              } else if (c == 2 && tileNumber >= 6) {
                //handle target on bottom row
                const target = 15 - tileNumber;
                computersDone.push(target);
                ConnectedGroups[i].push(target);
              } else if (c == 1 && (tileNumber + 1) % 3 == 0) {
                //handle target on right column
                const target = 4 + Math.floor(tileNumber / 3);
                computersDone.push(target);
                ConnectedGroups[i].push(target);
              } else if (c == 3 && tileNumber % 3 == 0) {
                //handle target on left column
                const target = 12 - tileNumber / 3;
                computersDone.push(target);
                ConnectedGroups[i].push(target);
              } else if (c == 0 && tileNumber > 2) {
                //handle next tile on top
                const nextTileNumber = tileNumber - 3;
                TilesToProcess.push([nextTileNumber, 2]);
                console.log('we push');
                console.log([nextTileNumber, 2]);
              } else if (c == 2 && tileNumber < 6) {
                //handle next tile on bottom
                const nextTileNumber = tileNumber + 3;
                TilesToProcess.push([nextTileNumber, 0]);
                console.log('we push');
                console.log([nextTileNumber, 0]);
              } else if (c == 1 && (tileNumber + 1) % 3 != 0) {
                //handle next tile on bottom
                const nextTileNumber = tileNumber + 1;
                TilesToProcess.push([nextTileNumber, 3]);
                console.log('we push');
                console.log([nextTileNumber, 3]);
              } else if (c == 3 && tileNumber % 3 != 0) {
                //handle next tile on bottom
                const nextTileNumber = tileNumber - 1;
                TilesToProcess.push([nextTileNumber, 1]);
                console.log('we push');
                console.log([nextTileNumber, 1]);
              }
            });
          }
        }
        console.log(ConnectedGroups[i]);
        //We are done with this group/computer, go to next if any
        i++;
      }
    });

    console.log('ConnectedGroups');
    console.log(ConnectedGroups);
    //on check les connections (2 possibilités : soit tout dans le premier groupe, soit rouge dans groupe 0 et bleu dans 1)
    if (
      ConnectedGroups[0].includes(targets[0]) &&
      !ConnectedGroups[0].includes(targets[1])
    ) {
      alert('Les ordinateurs rouges ne sont pas connectés entre eux...');
      return;
    }
    if (
      ConnectedGroups[0].includes(targets[2]) &&
      !ConnectedGroups[0].includes(targets[3])
    ) {
      alert('Les ordinateurs bleus ne sont pas connectés entre eux...');
      return;
    }
    if (
      ConnectedGroups[1].includes(targets[2]) &&
      !ConnectedGroups[1].includes(targets[3])
    ) {
      alert('Les ordinateurs bleus ne sont pas connectés entre eux...');
      return;
    }

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