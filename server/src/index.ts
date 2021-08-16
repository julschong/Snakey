import express from 'express';
import cors from 'cors';
import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config({});
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

type Score = {
    name: string;
    score: number;
};

let userJson: { ranks: [{ name: string; score: number }?] };
try {
    userJson = JSON.parse(
        fs.readFileSync('./data/ranking.json', {
            encoding: 'utf8'
        })
    );
} catch (err) {
    fs.writeFileSync(
        './data/ranking.json',
        JSON.stringify({ ranks: [] }, null, 2)
    );
    userJson = { ranks: [] };
}

app.get('/score/top10', (req, res) => {
    res.status(200).json({
        sucess: true,
        data: [...userJson.ranks]
            .sort((a, b) => b!.score - a!.score)
            .slice(0, 10)
    });
});

app.post('/score/submit', (req, res) => {
    const { score, name }: Score = req.body;
    const newScore = { name, score };
    userJson.ranks.push(newScore);
    userJson.ranks.sort((a, b) => b!.score - a!.score);

    userJson.ranks.splice(10);

    fs.writeFileSync('./data/ranking.json', JSON.stringify(userJson, null, 2));

    res.status(200).json({
        sucess: true,
        data: [...userJson.ranks]
            .sort((a, b) => b!.score - a!.score)
            .slice(0, 10)
    });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${port}`);
});
