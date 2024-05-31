const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/data', (req, res) => {
    const newData = req.body;
    fs.writeFile('data.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error writing data');
            return;
        }
        res.send('Data saved');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});