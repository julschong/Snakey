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
var app = express_1.default();
app.use(express_1.default.json());
var user = [
    { name: 'Julius', score: 10 },
    { name: 'Marb', score: 20 },
    { name: 'Foosh', score: 20 },
    { name: 'Goop', score: 30 },
    { name: 'Christine', score: 12 }
];
app.get('/score/top10', function (req, res) {
    res.status(200).json({
        sucess: true,
        data: __spreadArray([], user).sort(function (a, b) { return b.score - a.score; }).slice(0, 10)
    });
});
app.post('/score/submit', function (req, res) {
    var _a = req.body, score = _a.score, name = _a.name;
    var newScore = { name: name, score: score };
    user.push(newScore);
    res.status(200).json({
        sucess: true,
        data: __spreadArray([], user).sort(function (a, b) { return b.score - a.score; }).slice(0, 10)
    });
});
app.listen(3003, function () {
    // eslint-disable-next-line no-console
    console.log('listening on 3003');
});
//# sourceMappingURL=index.js.map