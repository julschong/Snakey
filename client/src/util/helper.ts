import { BOX_SIZE, DIR, SPEED } from './../components/Board';

export const borderCheck = (
    x: number,
    y: number,
    board: HTMLDivElement,
    setX: Function,
    setY: Function,
    setDir: Function
): void => {
    if (x && x > board.clientWidth - BOX_SIZE) {
        setX(board.clientWidth - BOX_SIZE);
        setDir(DIR.STOP);
    }
    if (x && x < 0) {
        setX(0);
        setDir(DIR.STOP);
    }
    if (y && y > board.clientHeight - BOX_SIZE) {
        setY(board.clientHeight - BOX_SIZE);
        setDir(DIR.STOP);
    }
    if (y && y < 0) {
        setY(0);
        setDir(DIR.STOP);
    }
};

export const moveTo = (
    dir: DIR,
    setX: Function,
    setY: Function,
    x: number,
    y: number,
    snake: number[][],
    setSnake: Function
): void => {
    switch (dir) {
        case DIR.LEFT:
            setX(x - SPEED);
            break;
        case DIR.RIGHT:
            setX(x + SPEED);
            break;
        case DIR.UP:
            setY(y - SPEED);
            break;
        case DIR.DOWN:
            setY(y + SPEED);
    }
    if (dir !== DIR.STOP) updateSnake(snake, x, y, setSnake);
};

export const updateSnake = (
    snake: number[][],
    x: number,
    y: number,
    setSnake: Function
): void => {
    setSnake([[x, y], ...snake.slice(0, snake.length - 1)]);
};

export const initSnake = (
    initLength: number,
    board: HTMLDivElement
): number[][] => {
    let initArray: number[][] = [];

    for (let i = 0; i < initLength; i++) {
        initArray.push([
            (board.clientWidth - BOX_SIZE) / 2 - (i + 0.5) * BOX_SIZE,
            (board.clientHeight - BOX_SIZE) / 2 - 0.5 * BOX_SIZE
        ]);
    }

    return initArray;
};
