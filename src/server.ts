import express from 'express';
import cors from 'cors'; 
import storage from './storage'
import path from 'path';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/tails', async (req, res) => {
    res.send(await storage.tails.get());
});

console.log(`Listening on port ${port}`);
app.listen(port);