import React, { useState } from "react";

const Grid = () => {
    const [grid, setGrid] = useState(Array(3).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [moves, setMoves] = useState([]);

    const handleMove = (row, col) => {
        if(grid[row][col]) return;

        const newMove = { player: currentPlayer, row, col };
        const updatedMoves = [...moves, newMove];

        if(updatedMoves.length % 3 === 0) {
            const oldestMoveIndex = updatedMoves.findIndex((move) => move.player === currentPlayer);
            if (oldestMoveIndex !== -1) {
                const [removedMove] = updatedMoves.splice(oldestMoveIndex, 1);
                grid[removedMove.row][removedMove.col] = null;
            }
        }

        const newGrid = grid.map((rowArr, i) => 
            rowArr.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
        );

        setMoves(updatedMoves);
        setGrid(newGrid);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
            {
                grid.map((row, i) => 
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => handleMove(i, j)}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: cell ? '#ccc' : '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #000',
                                cursor: 'pointer',
                            }}
                        >
                            {cell}
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Grid;