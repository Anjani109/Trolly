import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500' // allow this origin
}));

const destinations = [
    { name: "Barcelona", preferences: [1, 0, 0, 1, 1, 0, 0, 0, 1, 3], picture: 'images/Barcelona.png' },
    { name: "Paris", preferences: [0, 3, 1, 0, 1, 0, 0, 2, 2, 1], picture: 'images/Paris.png' },
    { name: "Tokyo", preferences: [2, 2, 3, 1, 0, 0, 1, 2, 2, 3], picture: 'images/Tokyo.png' },
    { name: "New York", preferences: [1, 2, 1, 1, 1, 0, 3, 1, 1, 1], picture: 'images/NewYork.png' },
    { name: "Sydney", preferences: [2, 0, 1, 1, 0, 1, 2, 0, 2, 1], picture: 'images/Sydney.png' },
    { name: "London", preferences: [2, 0, 2, 1, 2, 0, 2, 1, 1, 1], picture: 'images/london.png' },
    { name: "Rome", preferences: [0, 3, 0, 2, 1, 0, 1, 2, 2, 0], picture: 'images/Rome.png' },
    { name: "Dubai", preferences: [3, 0, 0, 3, 0, 0, 2, 1, 0, 2], picture: 'images/Dubai.png' }
];

app.post('/api/quiz', (req, res) => {
    const userPreferences = req.body.preferences;
    let bestMatch = null;
    let bestScore = Infinity;

    destinations.forEach(destination => {
        let score = 0;
        for (let i = 0; i < userPreferences.length; i++) {
            score += Math.abs(destination.preferences[i] - userPreferences[i]);
        }
        if (score < bestScore) {
            bestScore = score;
            bestMatch = destination;
        }
    });

    if (bestMatch) {
        res.json({ destination: bestMatch.name, image: bestMatch.picture });
    } else {
        res.status(404).json({ error: 'No match found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
