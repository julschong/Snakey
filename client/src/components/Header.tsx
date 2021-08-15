import './Header.css';
import { GiRattlesnake } from 'react-icons/gi';

const Header = ({
    name,
    gamePoints
}: {
    name: string | null;
    gamePoints: number;
}) => {
    return (
        <header className="header-container animate__animated animate__fadeIn">
            <div style={{ textShadow: '2px 2px #000' }}>
                Snakey
                <GiRattlesnake
                    className="snake-logo"
                    style={{ marginLeft: 10 }}
                />
            </div>
            {name && (
                <div
                    style={{ textShadow: '2px 2px #000' }}
                >{`Points: ${gamePoints}`}</div>
            )}
            {name && (
                <div style={{ textShadow: '2px 2px #000' }}>Hello, {name}</div>
            )}
        </header>
    );
};

export default Header;
