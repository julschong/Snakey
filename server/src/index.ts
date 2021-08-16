import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config({});
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

type Score = {
    name: string;
    score: number;
};

const user: Score[] = [];

app.get('/score/top10', (req, res) => {
    res.status(200).json({
        sucess: true,
        data: [...user].sort((a, b) => b.score - a.score).slice(0, 10)
    });
});

app.post('/score/submit', (req, res) => {
    const { score, name }: Score = req.body;
    const newScore = { name, score };
    user.push(newScore);

    res.status(200).json({
        sucess: true,
        data: [...user].sort((a, b) => b.score - a.score).slice(0, 10)
    });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${port}`);
});
