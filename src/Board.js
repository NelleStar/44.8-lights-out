// board to hold idividual cells
// 3 properties:
// // nRows = number of rows default to 3
// // nCols = number of columns default to 3
// // chanceLightStartOn = float which is chance any cell lit at start of game
// State: board is an array of arrays all true/false
// renders HTML table of <Cell/> components
// NO EVENT HANDLING

import { useState } from "react";
import Cell from "./Cell";

// //Utility functions that can be kept outside of Board
// deep copy the array-of-arrays
function boardCopy(arr) {
    return arr.map(row => {
        return row.map(elem => elem)
    })
}
// function to flip cells
function flipCell(y, x, boardCopy) {
    if (x >= 0 && x < boardCopy[0].length && y >= 0 && y < boardCopy.length) {
        boardCopy[y][x] = !boardCopy[y][x];
    }
}

const Board = ({ nRows=3, nCols=3, chanceLightStartOn = .4 }) => {
    // 
    const createBoard = () => {
      const initialBoard = Array.from({ length: nRows }, () =>
        Array.from({ length: nCols }, () => Math.random() < chanceLightStartOn)
      );
      return initialBoard;
    };

    const [board, setBoard] = useState(createBoard());

    function hasWon() {
        for(let row = 0; row < board.length; row++) {
            for(let col = 0; col < board[row].length; col++) {
                if (!board[row][col]){
                    return false;
                }
            }
        }
        return true
    }

    function flipCellsAround(coord) {
        setBoard(oldBoard => {
            const [ y, x ] = coord.split("-").map(Number);
            const newBoard = boardCopy(oldBoard);
            flipCell(y, x, newBoard);

            const offSet = [[-1,0], [1,0], [0,-1], [0,1]]

            offSet.forEach(c => {
              const [offSetY, offSetX] = c;
              const newY = y + offSetY;
              const newX = x + offSetX;

              flipCell(newY, newX, newBoard);
              // console.log(`NewBoard2 ${newBoard}`)
            })      

            if (hasWon()) {
                alert("You Won!");
            }
            
            return newBoard;
        });

    }

    return (
      <table>
        <tbody>
            {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((isLit, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
                            isLit={isLit}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
      </table>
    );
}

export default Board;