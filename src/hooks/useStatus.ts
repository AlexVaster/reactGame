import { useEffect, useState } from "react";

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

const useStatus = (initialStatus: string[]): [string[], (index: number, player: string) => void, () => void, () => void, () => string, string[][], (id: number) => void] => {
  const [field, setField] = useState(initialStatus);
  const [history, setHistory] = useState([field])

  const move = (index: number) => {
    if (field.at(index) === '' && !gameOver()) {
      let newArr = [...field];
      newArr[index] = whichPlayer()
      setField(newArr)
      setHistory([...history, newArr])
    }
  }

  useEffect(() => {
    console.log(field)
  }, [field]);

  useEffect(() => {
    console.log(history.at(-1))
  }, [history]);

  const resetHistory = (id: number) => {
    if (id === 0) {
      setField(Array(9).fill(''))
      setHistory([field])
    } else if (id < history.length - 1){
      const test = [...history.slice(0, id + 1)];
      setHistory([...test])
      setField(test.at(-1))
    }
  }

  const gameOver = () => {
    for (let i = 0; i < winCombo.length; i++) {
      const [a, b, c] = winCombo[i];
      if (field[a] 
          && field[a] === field[b] 
          && field[a] === field[c]){
          return true;
        }
      }
    return false;
  }

  const isDraw = () => {
    return !field.includes('')
  }

  const whichPlayer = () => {
    return field.filter(el => el === 'O').length - 1 < field.filter(el => el === 'X').length ? 'O' : 'X'
  }

  return [field, move, gameOver, isDraw, whichPlayer, history, resetHistory]
};

export default useStatus;

