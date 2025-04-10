import express from 'express';
import cors from 'cors'; 
import storage from './storage'
import path from 'path';
import model from './model'
import { parseArgs } from 'util';

let args = process.argv.slice(2);
const port = args.length > 0 ? args[0] : 3000;
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

app.get('/api/search', async (req, res) => {
    const keywords = req.query.keywords as string;
    const response = await storage.tails.search(keywords);
    res.send(response);
});

model.load() // download model if needed

console.log(`Listening on port ${port}\n`);
app.listen(port);