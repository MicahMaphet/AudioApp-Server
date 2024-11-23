import express from 'express';
import cors from 'cors'; 
import storage from './storage'
import path from 'path';
import model from './model'

const port = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/tails', async (req, res) => {
    res.send(await storage.tails.get());
});

app.get('/api', async (req, res) => {
    const prompt = req.query.prompt as string;
    const response = await model.generate(prompt);
    res.send(response);
});

model.load() // download model if needed

console.log(`Listening on port ${port}\n`);
app.listen(port);