import './Board.css';
import { useEffect, useState, useRef } from 'react';
import { useInterval } from './../util/useInterval';
import {
    initSnake,
    moveTo,
    keyInputActions,
    generateRandomApple
} from './../util/gameLogic';
import { Apple, Snake, SnakePoint } from '../type';
import { BOX_COUNTX, BOX_SIZE, DELAY, DIR } from '../config/init';
import { BORDER_SIZE, BOX_COUNTY } from './../config/init';
import { headStyle } from './../util/snakeStyle';

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
    const [apple, setApple] = useState<Apple>([]);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);

    function keyPressed(e: any) {
        if (!inputDisabled) {
            keyInputActions(dir, setDir, e);
        }
        setInputDisabled(true);
    }

    useEffect(() => {
        initSnake(10, boardRef.current!, setHead, setSnake);
        setApple(generateRandomApple(boardRef.current!));
    }, []);

    useEffect(() => {
        if (gameStart) {
            boardRef.current!.focus();
        }
    }, [gameStart, gameOver]);

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
                setGameOver
            );

            // Disable input to reduce input delay when same key is repeatedly pressed
            if (inputDisabled) {
                setInputDisabled(false);
            }
        }
    }, DELAY);

    return (
        <div
            className="board"
            style={{
                border: `${BORDER_SIZE}px solid black`,
                width: `${~~(BOX_SIZE * BOX_COUNTX + 2 * BORDER_SIZE)}px`,
                height: `${~~(BOX_SIZE * BOX_COUNTY + 2 * BORDER_SIZE)}px`,
                margin: 'auto'
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
            <div
                style={{
                    backgroundColor: apple[2] || undefined,
                    borderRadius: '50%',
                    position: 'absolute',
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                    left: apple[0],
                    top: apple[1]
                }}
            ></div>

            {/* Below draws the snakes body onto the board */}
            {snakePoints.map(([x, y], i) => {
                return (
                    <div
                        key={`snake-body-${x}-${y}-${i}`}
                        style={{
                            backgroundColor: ' #99ff99',
                            border: '1px solid black',
                            width: BOX_SIZE,
                            height: BOX_SIZE,
                            position: 'absolute',
                            borderRadius: headStyle(dir, i),
                            left: x,
                            top: y
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Board;
