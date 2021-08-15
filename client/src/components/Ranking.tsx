import { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css';

type UserData = {
    success: boolean;
    data: User[];
};

type User = {
    name: string;
    score: number;
    current: boolean | undefined;
};

const Ranking = ({
    gamePoints,
    name
}: {
    gamePoints: number;
    name: string;
}) => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_URL);
        axios
            .get<UserData>(`${process.env.REACT_APP_BACKEND_URL}/score/top10`)
            .then((res) => {
                setData(res.data.data);
                axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/score/submit`,
                    { name, score: gamePoints }
                );
            });
    }, [gamePoints, name]);
    return (
        <>
            <header className="ranking-header">Top 10!</header>
            {[...data, { name, score: gamePoints, current: true }]
                .sort((a, b) => b.score - a.score)
                .map((user) => (
                    <div
                        key={user.name + user.score}
                        className="ranked-score"
                        style={{ fontWeight: user.current ? 900 : 400 }}
                    >
                        <div>{user.name}</div>
                        <div>{user.score}</div>
                    </div>
                ))}
            <div style={{ paddingBlock: '30px', margin: 'auto' }}>
                Your Score is: {gamePoints} !!
            </div>
        </>
    );
};

export default Ranking;
