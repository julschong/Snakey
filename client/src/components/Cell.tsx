import './Cell.css';

const Cell = ({ x, snake, food }: cellType) => {
    let color = '';

    if (snake) {
        color = 'red';
    }

    return <div className="cell" style={{ backgroundColor: color }} />;
};

export default Cell;

export interface cellType {
    x: number;
    snake?: boolean;
    food?: boolean;
}
