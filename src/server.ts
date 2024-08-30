import express from 'express';
import cors from 'cors'; 
import storage from './storage'

const port = 3000;
const app = express();

app.use(cors());

app.get('/tails', async (req, res) => {
    res.send(await storage.tails.get());
})

console.log(`Listening on port ${port}`);
app.listen(port);