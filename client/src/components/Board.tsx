import './Board.css';
import { useEffect, useState, useRef } from 'react';
import { useInterval } from './../util/useInterval';
import {
    initSnake,
    moveTo,
    keyInputActions,
    generateRandomApple
} from './../util/helper';
import { Apple, Snake, SnakePoint } from '../type';
import { BOX_COUNTX, BOX_SIZE, DELAY, DIR } from '../config/init';
import { BORDER_SIZE, BOX_COUNTY } from './../config/init';
import Header from './Header';

const Board = ({
    gameStart,
    setGamePoints
}: {
    gameStart: boolean;
    setGamePoints: Function;
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
    }, [gameStart]);

    useInterval(() => {
        if (gameStart) {
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
                setGamePoints
            );
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
                if (e.key === ' ') {
                    setDir(DIR.DOWN);
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
            {snakePoints.map(([x, y], i) => (
                <div
                    key={`snake-body-${x}-${y}-${i}`}
                    style={{
                        backgroundColor: 'red',
                        border: '1px solid black',
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                        position: 'absolute',
                        left: x,
                        top: y
                    }}
                />
            ))}
        </div>
    );
};

export default Board;
