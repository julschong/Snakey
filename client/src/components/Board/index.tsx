import './Board.css';
import { useEffect, useState, useRef } from 'react';
import { useInterval } from '../../util/useInterval';
import {
    initSnake,
    moveTo,
    keyInputActions,
    generateRandomApple
} from '../../util/gameLogic';
import { Apple, Snake, SnakePoint } from '../../type';
import { BOX_COUNTX, BOX_SIZE, DELAY, DIR } from '../../config/init';
import { BORDER_SIZE, BOX_COUNTY } from '../../config/init';
import background from '../../asset/forest.jpg';
import AppleFood from '../AppleFood';
import SnakeBody from '../SnakeBody';

const Board = ({
    gameStart,
    setGamePoints,
    gameOver,
    setGameOver
}: {
    gameStart: boolean;
    setGamePoints: Function;
    gameOver: boolean;
    setGameOver: Function;
}) => {
    const boardRef = useRef<HTMLDivElement>(null);

    const [dir, setDir] = useState<DIR>(DIR.DOWN);
    const [head, setHead] = useState<SnakePoint>([]);
    const [snakePoints, setSnake] = useState<Snake>([]);
    const snakeRef = useRef(snakePoints);
    const [apple, setApple] = useState<Apple>([]);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const [delay, setDelay] = useState(DELAY);

    function keyPressed(e: any) {
        if (!inputDisabled) {
            keyInputActions(dir, setDir, e);
        }
        setInputDisabled(true);
    }

    useEffect(() => {
        initSnake(10, boardRef.current!, setHead, setSnake);
        setApple(generateRandomApple(boardRef.current!, snakeRef.current));
    }, []);

    useEffect(() => {
        if (gameStart) {
            boardRef.current!.focus();
        }
        if (!gameOver) {
            setDir(DIR.DOWN);
            setGameOver(false);
            initSnake(10, boardRef.current!, setHead, setSnake, setGamePoints);
        }
    }, [gameStart, gameOver, setGamePoints, setGameOver]);

    useInterval(() => {
        if (gameStart && !gameOver) {
            moveTo(
                dir,
                head,
                setHead,
                snakePoints,
                setSnake,
                boardRef.current!,
                setDir,
                apple,
                setApple,
                setGamePoints,
                setGameOver,
                setDelay
            );

            // Disable input to reduce input delay when same key is repeatedly pressed
            if (inputDisabled) {
                setInputDisabled(false);
            }
        }
    }, delay);

    return (
        <main style={{ backgroundImage: `url(${background})` }}>
            <div
                className="board animate__animated animate__fadeIn animate__delay-1s"
                style={{
                    border: `${BORDER_SIZE}px solid #8B4513`,
                    width: `${~~(BOX_SIZE * BOX_COUNTX + 2 * BORDER_SIZE)}px`,
                    height: `${~~(BOX_SIZE * BOX_COUNTY + 2 * BORDER_SIZE)}px`
                }}
                ref={boardRef}
                tabIndex={1}
                onKeyDown={(e) => keyPressed(e)}
                onKeyUp={(e) => {
                    if (e.key === ' ' && gameOver) {
                        setDir(DIR.DOWN);
                        setGameOver(false);
                        initSnake(
                            10,
                            boardRef.current!,
                            setHead,
                            setSnake,
                            setGamePoints
                        );
                    }
                }}
            >
                {/* Draws an Apple */}
                <AppleFood apple={apple} />
                {/* Below draws the snakes body onto the board */}
                <SnakeBody snakePoints={snakePoints} />
            </div>
        </main>
    );
};

export default Board;
