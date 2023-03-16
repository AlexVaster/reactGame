import React from "react";
import { createRoot } from 'react-dom/client';
import "./App.css";
import { useState } from "react";

// Массив комбинаций
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Статус игры
const GameStatus = ({player, gameFinished, draw }) => {
    return (
        <div className="status-screen">
            <span>{gameFinished ? (draw ? 'Ничья!' : 'Победил игрок: ' + (!player ? 'X' : 'O')) 
                : ('Ход игрока: ' + (player ? 'X' : 'O'))}
            </span>
        </div>);
  };

// Одна ячейка
const Square = ({ clickedArray, handleClick }) => {
    return (
    <div className="board">
        {clickedArray.map((item, index) => {
            if (item === null) {
                return (
                <div key={index} className="square" onClick={() => handleClick(index)}>{item}</div>);
            } else {
                return (
                <div key={index} className="square clicked">{item}</div>);
            }
            })}
    </div>);
};

// Поле игры
const Game = () => {
    // Массив ячеек игрового поля
    const [squareArr, setSquareArr] = useState(Array(9).fill(null));
    // Какой игрок ходит: O == false, X == true
    const [player, setPlayer] = useState(false);
    // Статус завершённости игры
    const [gameFinished, setGameFinished] = useState(false);
    // Была ли ничья
    const [draw, setDraw] = useState(false);
    
    // При нажатии проверяем по циклу, находим id === index'у ячейки и возврщаем X или Y
    // В ином случае неизменённую ячейку item
    // Меняем игрока на другого
    const handleClick = (id) => {
        setSquareArr(
            squareArr.map((item, index) => {
                return index === id ? (player ? 'X' : 'O') : item;
            })
        );
        setPlayer(!player);
    };


    const isGameOver = () => {
        if (!gameFinished) {
            // Перебор победных комбинаций
            for (let i = 0; i < winCombo.length; i++) {
                const [a, b, c] = winCombo[i];
                if (squareArr[a] && squareArr[a] === squareArr[b] && squareArr[a] === squareArr[c]){
                    setGameFinished(true);
                    return squareArr[a];
                }
            }
            // Проверка на ничью
            if (!squareArr.includes(null)) {
                setDraw(true);
                setGameFinished(true);
                return null;
            }
        }
        return null;
    };

    isGameOver();

    return (
    <div className="game">
        <Square clickedArray={squareArr} handleClick={handleClick} />
        <GameStatus player={player} gameFinished={gameFinished} draw={draw}/>
    </div>
    );
};

// Всё приложение
const App = () => {
    return (
    <div className="App">
        <Game />
        </div>
        );
    };

const root = createRoot(document.getElementById('root'));
root.render(<App />);