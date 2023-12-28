// a single cell on the board
// no state 
// 2 props
// // flipCellAroundMe - function received from Board/parent to flip the cells around this cell - is responsible for click events
// // isLit - boolean 


import './Cell.css';

const Cell = ({ flipCellsAroundMe, isLit}) => {
    const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
    return (
        <td className={classes} onClick={flipCellsAroundMe} />
    )
}

export default Cell;