import React, { useState } from 'react';
import './App.css';

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

type GameStep = {
	squareArr: string[],
	player: string,
	finish: boolean,
	draw: boolean
}

export function Game () {
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

	const updateHist = (id: number, reset_steps: boolean = false) => {
		const top = hist.at(-1);
    	if (top?.squareArr.at(id) === '' && !reset_steps && !top?.finish){
      		const target_player = top?.player === 'X' ? 'O' : 'X';
      		top!.squareArr[id] = target_player;
      		isGameOver() ? top!.finish = true : top!.finish = false
      		top!.finish === false && isDraw() ? top!.draw = true : top!.draw = false

      		setHist(
        		currentSteps => [...currentSteps, 
          		{squareArr: [...top!.squareArr], player: target_player, finish: top!.finish, draw: top!.draw}]
      		)
    	} else if (reset_steps) {
      		if (id === 0) {
        		setHist(initial)
      		} else if (id < hist.length - 1){
        		setHist(hist.slice(0, id))
      		}
   		}
  	};

	return (
    	<div className='game'>
      		<Board updateHist={updateHist} squareArr={hist.at(-1)?.squareArr}/>
      		<Status updateHist={updateHist} hist={hist}/>
    	</div>
  	);
};

export function Square (prop) {
	return (
		<button
			key={prop.index} 
			className='square'
      onClick={() => prop.updateHist(prop.index)}>{prop.item}</button>
	);
};

export function Board (prop) {
	return (
		<div className='board'>
			{prop.squareArr.map((item: string, index: number) => 
				<Square updateHist={prop.updateHist} item={item} index={index}/>
				)}
		</div>
	)
}

export function Status (prop) {
	return (
		<div className="status-screen" role='status'>
				<span>{prop.hist.at(-1).draw ? 'Ничья!' 
					: (prop.hist.at(-1).finish ? 
							('Победил игрок ' + prop.hist.at(-1).player) : 
							('Ходит игрок: ' + prop.hist.at(-1).player)
							)}
				</span>
				<History updateHist={prop.updateHist} hist={prop.hist}/>
		</div>);
	}

export function History (prop) {
		const handleButton = (id: number) => {
			prop.updateHist(id, true);
		};

		return (
			<div className='history'>
					<ol>
							{prop.hist.map((item: GameStep, index: number) => 
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

// Всё приложение
export function App () {
	return (
  		<div className="App" role="appcontainer">
      		<Game />
      	</div>
    	);
};
