import express from 'express';
import storage from './storage'

const port = 3000;
const app = express();

app.get('/audio', (req, res) => {
    res.send(storage.tails.get());
})

console.log(`Listening on port ${port}`);
app.listen(port);