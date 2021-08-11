import React from 'react';
import Board from './components/Board';
import Header from './components/Header';

const App = () => {
    return (
        <div
            className="App"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh'
            }}
        >
            <Header />
            <Board />
        </div>
    );
};

export default App;
