import React, { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Modal from './components/Modal';

const App = () => {
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [gamePoints, setGamePoints] = useState<number>(0);

    return (
        <div
            className="App"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                position: 'relative'
            }}
        >
            {!playerName && (
                <Modal
                    name={playerName}
                    setName={setPlayerName}
                    setGameStart={setGameStart}
                />
            )}
            <Header name={playerName} gamePoints={gamePoints} />
            <Board gameStart={gameStart} setGamePoints={setGamePoints} />
        </div>
    );
};

export default App;
