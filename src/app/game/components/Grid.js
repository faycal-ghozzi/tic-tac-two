import React, { useState } from "react";

const Grid = () => {
    const [grid, setGrid] = useState(Array(3).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleMove = (row, col) => {
        if(grid[row][col]) return;

        const newGrid = grid.map((rowArr, i) => 
            rowArr.map((cell, j) => (i === row && j === coll ? currentPlayer : cell))
        );

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