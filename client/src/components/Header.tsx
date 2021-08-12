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
                fontSize: 40,
                fontFamily: 'fantasy',
                padding: 16,
                backgroundColor: 'rgb(50,50,255)',
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
