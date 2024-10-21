const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
app.use(express.static('public'));
app.use(express.json());

let questions = [];

// Đọc file CSV để lấy câu hỏi và đáp án
function loadQuestions() {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('questions.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', reject);
    });
}

// Load câu hỏi từ CSV vào khi server khởi động
loadQuestions().then((data) => {
    questions = data;
    console.log('Questions loaded:', questions);
}).catch((error) => {
    console.error('Error loading questions:', error);
});

let players = {
    1: { name: 'Player 1', correctAnswers: 0, progress: [] },
    2: { name: 'Player 2', correctAnswers: 0, progress: [] },
    3: { name: 'Player 3', correctAnswers: 0, progress: [] },
    4: { name: 'Player 4', correctAnswers: 0, progress: [] }
};

// Trang người chơi
app.get('/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    if (players[playerId]) {
        res.sendFile(__dirname + '/public/player.html');
    } else {
        res.status(404).send('Player not found');
    }
});

// Trang tổng quát
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/progress.html');
});

// API lấy thông tin người chơi và câu hỏi
app.get('/api/player/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    res.json({ player: players[playerId], questions });
});

// API gửi câu trả lời
app.post('/api/player/:playerId/answer', (req, res) => {
    const playerId = req.params.playerId;
    const { questionId, answer } = req.body;
    
    // Tìm câu hỏi
    const question = questions.find(q => q.question_id == questionId);
    
    // Kiểm tra câu trả lời
    const correct = question && question.answer.toLowerCase() === answer.toLowerCase();

    if (correct) {
        players[playerId].correctAnswers++;
    }
    players[playerId].progress.push({ questionId, answer, correct });
    res.json(players[playerId]);
});

// API lấy tiến trình tất cả người chơi
app.get('/api/players', (req, res) => {
    res.json(players);
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
