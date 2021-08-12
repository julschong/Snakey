const Header = ({
    name,
    gamePoints
}: {
    name: string | null;
    gamePoints: number;
}) => {
    return (
        <header
            style={{
                fontSize: 60,
                fontFamily: 'fantasy',
                padding: 16,
                color: 'white',
                backgroundColor: 'rgb(0, 102, 204)',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around'
            }}
        >
            <div> Snakey </div>
            {name && <div>{`Points: ${gamePoints}`}</div>}
            {name && <div>Hello, {name}</div>}
        </header>
    );
};

export default Header;
