import React, { useState } from 'react';
import './TicTacToe.css';
import circleIcon from '../Assets/icon-o.svg';
import crossIcon from '../Assets/icon-x.svg';
import resetIcon from '../Assets/icon-restart.svg';

const initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [message, setMessage] = useState(" ");
    const [winnerIcon, setWinnerIcon] = useState(null);
    const [xwin, xwinCount] = useState(0);
    const [owin, owinCount] = useState(0);
    const [xoties, xotiesCount] = useState(0);

    const toggle = (index) => {
        if (lock || data[index]) {
            return;
        }
        const newData = [...data];
        newData[index] = count % 2 === 0 ? 'x' : 'o';
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
        if (newData.every(cell => cell !== "")) {
            setLock(true);
            setMessage("It's a draw!");
            xotiesCount(xoties + 1);
        }
    };

    const won = (winner) => {
        setLock(true);
        setWinnerIcon(winner === 'x' ? crossIcon : circleIcon);
        if (winner === 'x') {
            xwinCount(xwin + 1);
        } else {
            owinCount(owin + 1);
        }
    };

    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setLock(false);
        setMessage("");
        setWinnerIcon(null);
    };

    return (
        <div className="container">

            <div className="boardHead">
                <div className="icon">
                    <img src={crossIcon} />
                    <img src={circleIcon} />
                </div>
                <div className="turn">
                <img src={count % 2 === 0 ? crossIcon : circleIcon} alt="Turn Icon" />
                <p>TURN</p>
                </div>
                <div className="reset" onClick={resetGame}>
                    <button><img src={resetIcon} /></button>
                </div>
            </div>
            <h1 className="title">
                {winnerIcon ? (
                    <>
                        <img src={winnerIcon} alt="winner" />Wins
                    </>
                ) : (
                    <span dangerouslySetInnerHTML={{ __html: message }} />
                )}
            </h1>
            <div className="board">
                {data.map((cell, index) => (
                    <div className="box" key={index} onClick={() => toggle(index)}>
                        {cell && <img src={cell === 'x' ? crossIcon : circleIcon} alt={cell} />}
                    </div>
                ))}
            </div>
            <div className="stats">
                <div>
                    <p>x player wins</p>
                    <h4>{xwin}</h4>
                </div>
                <div>
                    <p>ties</p>
                    <h4>{xoties}</h4>
                </div>
                <div>
                    <p>o player wins</p>
                    <h4>{owin}</h4>
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
