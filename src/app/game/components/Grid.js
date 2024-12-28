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

    
}