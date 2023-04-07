import React from 'react';
import './App.css';
import useStatus from '../../hooks/useStatus';


export function History (prop) {
	const handleButton = (id: number) => {
		prop.resetHistory(id);
	};
	return (
		<div className='history'>
				<ol>
						{prop.history.map((item , index: number) => 
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

// Игровое поле с клетками
export function Board (prop) {
	return (
		<div className='board'>
			{prop.field.map((player: string, index: number) => 
				<button className='square' key={index} onClick={() => prop.move(index)}>{player}</button>
				)}
		</div>
	)
}

export function Status (prop) {
	return (
		<div className="status-screen" role='status'>
				<span>{prop.isDraw() ? 'Ничья!' 
					: (prop.gameOver() ? 
							('Победил игрок ' + (prop.whichPlayer() === 'X' ? 'O' : 'X')) : 
							('Ходит игрок: ' + prop.whichPlayer())
							)}
				</span>
				<History move={prop.move} field={prop.field} history={prop.history} resetHistory={prop.resetHistory}/>
		</div>);
}

export function Game () {
	const [field, move, gameOver, isDraw, whichPlayer, history, resetHistory] = useStatus(Array(9).fill(''));

	return (
		<div className='game'>
				<Board field={field} move={move}/>
				<Status field={field} move={move} gameOver={gameOver} isDraw={isDraw} whichPlayer={whichPlayer} history={history} resetHistory={resetHistory}/>
		</div>
	);
}

// Всё приложение
export function App () {
	return (
  		<div className="App" role="appcontainer">
      		<Game />
      	</div>
    	);
};
