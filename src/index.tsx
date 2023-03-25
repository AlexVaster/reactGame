import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css'

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

const Game = () => {
	type GameStep = {
		squareArr: string[],
		player: string,
		finish: boolean,
		draw: boolean
	}

	const initial: GameStep[] = [{squareArr: Array(9).fill(''), player: 'O', finish: false, draw: false}];
	const [hist, setHist] = useState(initial);


   // Перебор победных комбинаций
	const isGameOver = () => {
    	for (let i = 0; i < winCombo.length; i++) {
        	const [a, b, c] = winCombo[i];
        	if (hist.at(-1)!.squareArr[a] 
          		&& hist.at(-1)!.squareArr[a] === hist.at(-1)!.squareArr[b] 
          		&& hist.at(-1)!.squareArr[a] === hist.at(-1)!.squareArr[c]){
            	return true;
        		}
    	}
    	return false;
  	};

	// Проверка на ничью
	const isDraw = () => {
    	return !hist.at(-1)!.squareArr.includes('')
	}

	const updateHist = (id: number, backup: boolean = false) => {
		const top = hist.at(-1);
    	if (top?.squareArr.at(id) === '' && !backup && !top?.finish){
      		const target_player = top?.player === 'X' ? 'O' : 'X';
      		top!.squareArr[id] = target_player === 'X' ? 'O' : 'X';
      		isGameOver() ? top!.finish = true : top!.finish = false
      		top!.finish === false && isDraw() ? top!.draw = true : top!.draw = false
      		setHist(
        		currentSteps => [...currentSteps, 
          		{squareArr: [...top!.squareArr], player: target_player, finish: top!.finish, draw: top!.draw}]
      		)
    	} else if (backup) {
      		if (id === 0) {
        		setHist(initial)
      		} else if (id < hist.length - 1){
        		setHist(hist.slice(0, id))
      		}
   		}
  	};

  	const Board = () => {
    	return (
      	<div className='board'>
        	{hist.at(-1)?.squareArr.map((item: string, index: number) => 
          		(<div 
            		key={index} 
            		className={'square' + (hist.at(-1)?.squareArr.at(index) !== '' ? ' clicked' : '')} 
            		onClick={() => updateHist(index)}>{item}</div>)
        		)}
      	</div>
    	)
  	}

  const Status = () => {
    return (
    	<div className="status-screen">
        	<span>{hist.at(-1).draw ? 
        	'Ничья!' 
        	: (hist.at(-1).finish ? ('Победил игрок ' + hist.at(-1).player) : ('Ходит игрок: ' + hist.at(-1).player))
        	}
        	</span>
        	<History />
    	</div>);
  	}

	const History = () => {
    	const handleButton = (id: number) => {
    		updateHist(id, true);
    	};

    	return (
    		<div className='history'>
        		<ol>
          			{hist.map((item: GameStep, index: number) => 
            			<li key={index}>
              				<button onClick={() => handleButton(index)}>
            				go to game 
              				{index === 0 ? ' start': ' move #' + index}
              				</button>
            			</li>)}
       			</ol>
      		</div>
    	)
  	}

	return (
    	<div className='game'>
      		<Board />
      		<Status />
    	</div>
  	)
}

// Всё приложение
const App = () => {
	return (
  		<div className="App">
      		<Game />
      	</div>
    	);
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);