import express from 'express';
import cors from 'cors'; 
import storage from './storage'
import path from 'path';
import model from './model'

const port = 3000;
const app = express();

// This takes a while and will only finish after everything else
(async () => {
    console.log(await model.generate('This is a story written by TinTails-1M:'));
})();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/tails', async (req, res) => {
    res.send(await storage.tails.get());
});

app.get('/api', async (req, res) => {
    const prompt = req.query.prompt as string;
    const response = await model.generate(prompt);
    console.log(response);
    res.send(response);
});

console.log(`Listening on port ${port}\n`);
app.listen(port);