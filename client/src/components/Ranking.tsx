import { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css';
import { BACKEND_DEV_URL } from '../util/helper';

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
        axios.get<UserData>(`${BACKEND_DEV_URL}/score/top10`).then((res) => {
            setData(res.data.data);
            axios.post(`${BACKEND_DEV_URL}/score/submit`, {
                name: name.length > 10 ? name.slice(0, 9) + '...' : name,
                score: gamePoints
            });
        });
    }, [gamePoints, name]);
    return (
        <>
            <header className="ranking-header">Top 10!</header>
            {[...data, { name, score: gamePoints, current: true }]
                .sort((a, b) => b.score - a.score)
                .map((user, i) => (
                    <div
                        key={user.name + user.score + i}
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
