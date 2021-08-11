import './Board.css';
import {
    useEffect,
    useState,
    useRef,
    useCallback,
    KeyboardEventHandler
} from 'react';
import { useInterval } from './../util/useInterval';
import { borderCheck, initSnake, moveTo } from './../util/helper';

export enum DIR {
    UP,
    LEFT,
    DOWN,
    RIGHT,
    STOP
}

export const BOX_SIZE = 25;
export const BORDER_SIZE = 20;
export const SPEED = 25;
export const DELAY = 100;

const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null);

    const [dir, setDir] = useState(DIR.STOP);
    const dirRef = useRef(dir);
    const [x, setX] = useState<number | null>(0);
    const [y, setY] = useState(0);
    const [snakePoints, setSnake] = useState<number[][]>([]);

    function keyPressed(e: any) {
        console.log(dir);
        if (e.key === 'ArrowLeft') {
            setDir(DIR.LEFT);
        }
        if (e.key === 'ArrowRight') {
            setDir(DIR.RIGHT);
        }
        if (e.key === 'ArrowDown') {
            setDir(DIR.DOWN);
        }
        if (e.key === 'ArrowUp') {
            setDir(DIR.UP);
        }
        if (e.key === ' ') {
            setDir(DIR.STOP);
        }
    }

    borderCheck(x!, y!, boardRef.current!, setX, setY, setDir);

    useEffect(() => {
        setX((boardRef.current!.clientWidth - BOX_SIZE) / 2 - 0.5 * BOX_SIZE);
        setY((boardRef.current!.clientHeight - BOX_SIZE) / 2 - 0.5 * BOX_SIZE);
        setSnake(initSnake(6, boardRef.current!));
        boardRef.current!.focus();
    }, []);

    useInterval(() => {
        moveTo(dir, setX, setY, x!, y, snakePoints, setSnake);
    }, DELAY);

    return (
        <div
            className="board"
            style={{
                border: `${BORDER_SIZE}px solid black`,
                width: `${BOX_SIZE * 60 + 2 * BORDER_SIZE}px`,
                height: `${BOX_SIZE * 32 + 2 * BORDER_SIZE}px`,
                margin: 'auto'
            }}
            ref={boardRef}
            tabIndex={0}
            onKeyDown={(e) => keyPressed(e)}
        >
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
