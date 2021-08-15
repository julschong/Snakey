import './Header.css';

const Header = ({
    name,
    gamePoints
}: {
    name: string | null;
    gamePoints: number;
}) => {
    return (
        <header className="header-container">
            <div> Snakey </div>
            {name && <div>{`Points: ${gamePoints}`}</div>}
            {name && <div>Hello, {name}</div>}
        </header>
    );
};

export default Header;
