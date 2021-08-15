import { KeyboardEvent } from 'react';
import { Apple, Snake, SnakePoint } from './../type.d';
import { BOX_COUNTX, BOX_COUNTY, BOX_SIZE, DIR, SPEED } from '../config/init';

const borderCheck = (
    head: SnakePoint,
    board: HTMLDivElement,
    snake: Snake
): boolean => {
    if (head[0] && head[0] > board.clientWidth - BOX_SIZE) {
        return true;
    }
    if (head[0] && head[0] < 0) {
        return true;
    }
    if (head[1] && head[1] > board.clientHeight - BOX_SIZE) {
        return true;
    }
    if (head[1] && head[1] < 0) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        const [headX, headY] = head;
        const [checkX, checkY] = snake[i];
        if (headX === checkX && headY === checkY) {
            console.log('hit');
            return true;
        }
    }

    return false;
};

export const moveTo = (
    dir: DIR,
    head: SnakePoint,
    setHead: Function,
    snake: Snake,
    setSnake: Function,
    board: HTMLDivElement,
    setDir: Function,
    apple: Apple,
    setApple: Function,
    setGamePoints: Function,
    setGameOver: Function
): void => {
    if (borderCheck(head, board, snake)) {
        setGameOver(true);
        return setDir(DIR.STOP);
    }

    switch (dir) {
        case DIR.LEFT:
            setHead((s: SnakePoint) => [s[0]! - SPEED, s[1]!]);
            break;
        case DIR.RIGHT:
            setHead((s: SnakePoint) => [s[0]! + SPEED, s[1]!]);
            break;
        case DIR.UP:
            setHead((s: SnakePoint) => [s[0]!, s[1]! - SPEED]);
            break;
        case DIR.DOWN:
            setHead((s: SnakePoint) => [s[0]!, s[1]! + SPEED]);
    }
    if (dir !== DIR.STOP) {
        updateSnake(
            snake,
            head,
            setSnake,
            apple,
            setApple,
            board,
            setGamePoints
        );
    }
};

const updateSnake = (
    snake: Snake,
    head: SnakePoint,
    setSnake: Function,
    apple: Apple,
    setApple: Function,
    board: HTMLDivElement,
    setGamePoints: Function
): void => {
    if (ateApple(head, apple)) {
        setGamePoints((score: number) => score + 1);
        setSnake([head, ...snake]);
        setApple(generateRandomApple(board));
        return;
    }
    setSnake([head, ...snake.slice(0, snake.length - 1)]);
};

const ateApple = (head: SnakePoint, apple: Apple): boolean => {
    if (
        Math.abs(head[0]! - apple[0]!) < 3 &&
        Math.abs(head[1]! - apple[1]!) < 3
    ) {
        return true;
    }
    return false;
};

export const initSnake = (
    initLength: number,
    board: HTMLDivElement,
    setHead: Function,
    setSnake: Function,
    setGamePoints?: Function
) => {
    let initArray: Snake = [];
    setHead([
        Math.floor(
            Math.floor(board.clientWidth - BOX_SIZE) / 2 - 0.5 * BOX_SIZE
        ),
        Math.floor(
            Math.floor(board.clientHeight - BOX_SIZE) / 2 - 0.5 * BOX_SIZE
        )
    ]);

    for (let i = 0; i < initLength; i++) {
        initArray.push([
            (board.clientWidth - BOX_SIZE) / 2 - (i + 0.5) * BOX_SIZE,
            (board.clientHeight - BOX_SIZE) / 2 - 0.5 * BOX_SIZE
        ]);
    }
    if (setGamePoints) {
        setGamePoints(0);
    }

    setSnake(initArray);
};

export const keyInputActions = (
    dir: DIR,
    setDir: Function,
    e: KeyboardEvent
) => {
    if (e.key === 'ArrowLeft' && dir !== DIR.RIGHT && dir !== DIR.LEFT) {
        setDir(DIR.LEFT);
    } else if (
        e.key === 'ArrowRight' &&
        dir !== DIR.LEFT &&
        dir !== DIR.RIGHT
    ) {
        setDir(DIR.RIGHT);
    } else if (e.key === 'ArrowDown' && dir !== DIR.UP && dir !== DIR.DOWN) {
        setDir(DIR.DOWN);
    } else if (e.key === 'ArrowUp' && dir !== DIR.DOWN && dir !== DIR.UP) {
        setDir(DIR.UP);
    }
};

export const generateRandomApple = (board: HTMLDivElement): Apple => {
    const x = Math.floor(Math.random() * BOX_COUNTX) * BOX_SIZE;
    const y = Math.floor(Math.random() * BOX_COUNTY) * BOX_SIZE;

    return [x, y, generateRandomColor()];
};

export const generateRandomColor = (): string => {
    const r = ~~(Math.random() * 300) - 45;
    const g = ~~(Math.random() * 300) - 45;
    const b = ~~(Math.random() * 300) - 45;

    return `rgb(${r},${g},${b})`;
};
