let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let logs = new Map();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/log', function (req, res) {
    res.send('provide key to access logged data');
});

app.get('/log/:key', function (req, res) {
    let key = req.params.key;
    let entry = logs.get(key);

    if (!entry) res.send('nothing found with key ' + key);
    else res.status(200).send(JSON.stringify(entry));
});

app.post('/log/:key', function (req, res) {
    let log = createLog(req);
    let key = req.params.key;
    let current_logs = logs.get(key);

    if (!current_logs) current_logs = [];

    current_logs.push(log);
    logs.set(key, current_logs);
    res.status(201).send('added ' + log.message + ' to ' + key + ' at ' + log.logged_dttm);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

function createLog(req) {
    return {
        "message": req.body.message,
        "logged_dttm": new Date()
    };
}