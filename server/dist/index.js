"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
var app = express_1.default();
app.use(cors_1.default({ origin: '*' }));
app.use(express_1.default.json());
var userJson;
try {
    userJson = JSON.parse(fs_1.default.readFileSync('./data/ranking.json', {
        encoding: 'utf8'
    }));
}
catch (err) {
    fs_1.default.writeFileSync('./data/ranking.json', JSON.stringify({ ranks: [] }, null, 2));
    userJson = { ranks: [] };
}
app.get('/score/top10', function (req, res) {
    res.status(200).json({
        sucess: true,
        data: __spreadArray([], userJson.ranks).sort(function (a, b) { return b.score - a.score; })
            .slice(0, 10)
    });
});
app.post('/score/submit', function (req, res) {
    var _a = req.body, score = _a.score, name = _a.name;
    var newScore = { name: name, score: score };
    userJson.ranks.push(newScore);
    userJson.ranks.sort(function (a, b) { return b.score - a.score; });
    userJson.ranks.splice(10);
    fs_1.default.writeFileSync('./data/ranking.json', JSON.stringify(userJson, null, 2));
    res.status(200).json({
        sucess: true,
        data: __spreadArray([], userJson.ranks).sort(function (a, b) { return b.score - a.score; })
            .slice(0, 10)
    });
});
var port = process.env.PORT || 3003;
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("listening on " + port);
});
//# sourceMappingURL=index.js.map