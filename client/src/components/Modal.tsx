import { useRef, useEffect } from 'react';
import './Modal.css';
import Ranking from './Ranking';

interface ModalType {
    name: string | null;
    setName: Function;
    setGameStart: Function;
    gameOver: boolean;
    setGameOver: Function;
    gamePoints: number;
}

const Modal = ({
    name,
    setName,
    setGameStart,
    gameOver,
    setGameOver,
    gamePoints
}: ModalType) => {
    const submitted = (e: any) => {
        e.preventDefault();
        setGameStart(true);
        setName(e.target[0].value.trim());
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const gameOverRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!gameOver) {
            inputRef.current!.focus();
        } else {
            gameOverRef.current!.focus();
        }
    }, [gameOver]);

    if (!name || gameOver) {
        return (
            <div
                className="modal-container"
                tabIndex={0}
                ref={gameOverRef}
                onKeyUp={(e) => {
                    if (e.key === ' ') {
                        setGameOver(false);
                    }
                }}
            >
                {gameOver ? (
                    <>
                        <div className="gameOver">
                            <Ranking gamePoints={gamePoints} name={name!} />
                            <strong>Press Space to Restart</strong>
                        </div>
                    </>
                ) : (
                    <form className="name-form" onSubmit={submitted}>
                        <input
                            ref={inputRef}
                            name="name"
                            placeholder="Enter Name! Press Enter to Start"
                            autoFocus
                            autoComplete="off"
                            onKeyUp={(e: any) => {
                                if (e.key === 'enter') {
                                    submitted(e);
                                }
                            }}
                        />
                    </form>
                )}
            </div>
        );
    }

    return <div className="modal-container"></div>;
};

export default Modal;
