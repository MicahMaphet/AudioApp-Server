import express from 'express';
import storage from './storage'

const port = 3000;
const app = express();

app.get('/tails', async (req, res) => {
    res.send(await storage.tails.get());
})

console.log(`Listening on port ${port}`);
app.listen(port);