import express from 'express';

const port = 3000;
const app = express();

app.get('/audio', (req, res) => {
    res.send('audio stuff..');
})

console.log(`Listening on port ${port}`);
app.listen(port);