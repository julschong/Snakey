import { useEffect, useState } from 'react';
import axios from 'axios';

type UserData = {
    success: boolean;
    data: {
        name: string;
        score: number;
    }[];
};

const Ranking = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_URL);
        axios
            .get<UserData>(`${process.env.REACT_APP_BACKEND_URL}/score/top10`)
            .then((res) => {});
    }, []);
    return <div>{JSON.stringify(data)}</div>;
};

export default Ranking;
