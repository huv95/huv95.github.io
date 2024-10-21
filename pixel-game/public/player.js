const playerId = window.location.pathname.split('/')[1];

fetch(`/api/player/${playerId}`)
    .then(response => response.json())
    .then(data => {
        renderQuestions(data.player, data.questions); // Render câu hỏi
        renderImage(data.player.progress); // Render hình ảnh với tiến trình hiện tại
    });

function renderQuestions(playerData, questions) {
    const questionsDiv = document.getElementById('questions');

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        const disabled = playerData.progress.some(p => p.questionId == question.question_id && p.correct);
        
        questionDiv.innerHTML = `
            <p>${question.question}: 
            <input type="text" id="answer-${question.question_id}" ${disabled ? 'disabled' : ''}/> 
            <button id="submit-${question.question_id}" ${disabled ? 'disabled' : ''} onclick="submitAnswer(${question.question_id})">Submit</button></p>
        `;
        questionsDiv.appendChild(questionDiv);
    });
}

function submitAnswer(questionId) {
    const answer = document.getElementById(`answer-${questionId}`).value;

    fetch(`/api/player/${playerId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById(`submit-${questionId}`).disabled = true;
        document.getElementById(`answer-${questionId}`).disabled = true;

        // Cập nhật lại hình ảnh sau khi câu trả lời đúng
        renderImage(data.progress); // Gọi hàm renderImage để cập nhật hình ảnh
    });
}

function renderImage(progress) {
    const imageDiv = document.getElementById('image');
    const gridSize = 10;
    const imageUrl = '/images/lon.jpg';

    // Xóa pixel cũ nếu có
    while (imageDiv.firstChild) {
        imageDiv.removeChild(imageDiv.firstChild);
    }

    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        const x = (i % gridSize) * (100 / gridSize);
        const y = Math.floor(i / gridSize) * (100 / gridSize);

        pixel.style.left = `${x}%`;
        pixel.style.top = `${y}%`;
        pixel.style.backgroundImage = `url(${imageUrl})`;
        pixel.style.backgroundSize = `${gridSize * 10}% ${gridSize * 10}%`;

        // Kiểm tra nếu phần này đã được mở ra
        if (progress.includes(i)) {
            pixel.style.opacity = 1; // Hiển thị pixel nếu đã mở
        } else {
            pixel.style.opacity = 1; // Hiển thị toàn bộ pixel lúc đầu
        }

        imageDiv.appendChild(pixel);
    }

    // Hiển thị toàn bộ hình ảnh lúc bắt đầu
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = imageDiv.children[i];
        pixel.style.opacity = 1; // Đảm bảo tất cả các pixel đều hiển thị
    }
}
