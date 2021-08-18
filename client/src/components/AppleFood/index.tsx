import { BOX_SIZE } from '../../config/init';
import { Apple } from '../../type';
import AppleSVG from '../../asset/apple.svg';
import './AppleFood.css';

type AppleFoodType = {
    apple: Apple;
};

const AppleFood = ({ apple }: AppleFoodType) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: BOX_SIZE,
                height: BOX_SIZE,
                left: apple[0],
                top: apple[1]
            }}
        >
            <img id="apple" src={AppleSVG} alt="apple-food"></img>
        </div>
    );
};

export default AppleFood;
