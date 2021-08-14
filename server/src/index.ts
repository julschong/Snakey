import express from 'express';

const app = express();

app.use(express.json());

type Score = {
    name: string;
    score: number;
};

const user: Score[] = [
    { name: 'Julius', score: 10 },
    { name: 'Marb', score: 20 },
    { name: 'Foosh', score: 20 },
    { name: 'Goop', score: 30 },
    { name: 'Christine', score: 12 }
];

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

app.listen(3003, () => {
    // eslint-disable-next-line no-console
    console.log('listening on 3003');
});
