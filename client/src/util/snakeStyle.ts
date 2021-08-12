import { DIR } from '../config/init';

export const headStyle = (dir: DIR, i: number): string => {
    if (i === 0) {
        switch (dir) {
            case DIR.UP:
                return '50% 50% 0 0';
            case DIR.LEFT:
                return '50% 0 0 50%';
            case DIR.DOWN:
                return '0 0 50% 50%';
            case DIR.RIGHT:
                return '0 50% 50% 0';
        }
    }
    return '';
};
