import { BOX_SIZE } from '../../config/init';
import { Snake } from '../../type';
import { headStyle } from '../../util/snakeStyle';
import './SnakeBody.css';

type SnakeBodyType = {
    snakePoints: Snake;
};

const SnakeBody = ({ snakePoints }: SnakeBodyType) => {
    return (
        <div className="snake-body">
            {snakePoints.map(([x, y, direction], i) => {
                return (
                    <div
                        key={`snake-body-${x}-${y}-${i}`}
                        className="snake-segment"
                        style={{
                            width: BOX_SIZE,
                            height: BOX_SIZE,
                            borderRadius: headStyle(direction!, i),
                            left: x,
                            top: y
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default SnakeBody;
