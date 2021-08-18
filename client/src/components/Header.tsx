import './Header.css';
import { GiRattlesnake } from 'react-icons/gi';
import AppleSVG from '../asset/apple.svg';

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
                    style={{
                        display: 'flex',
                        textShadow: '2px 2px #000',
                        alignItems: 'center'
                    }}
                >
                    <img
                        height="100%"
                        src={AppleSVG}
                        style={{
                            marginRight: '20px',
                            transform: 'translateY(-5px)'
                        }}
                        alt="apple-score"
                    />
                    {gamePoints}
                </div>
            )}
            {name && (
                <div style={{ textShadow: '2px 2px #000' }}>Hello, {name}</div>
            )}
        </header>
    );
};

export default Header;
