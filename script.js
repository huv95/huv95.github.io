window.onload = function() {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');

    const width = 500;
    const height = 500;
    const pixelSize = 20;
    canvas.width = width;
    canvas.height = height;

    const questions = [
        { question: "What is 5 + 5?", answer: "10" },
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", answer: "Mars" },
        { question: "What is H2O commonly known as?", answer: "Water" },
        { question: "How many continents are there?", answer: "7" },
        { question: "What is the largest ocean?", answer: "Pacific" },
        { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
        { question: "What is the freezing point of water?", answer: "0" },
        { question: "Which element has the chemical symbol 'O'?", answer: "Oxygen" },
        { question: "What is the square root of 64?", answer: "8" }
    ];

    const questionContainer = document.getElementById('question-container');

    // Load hình ảnh (ban đầu là màu trắng)
    const image = new Image();
    image.src = 'images/lon.jpg';  // Thay đường dẫn ảnh của bạn

    image.onload = function() {
        // Vẽ ảnh màu trắng lên canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        createPixelGrid();
        displayQuestions();
    };

    // Tạo lưới pixel
    function createPixelGrid() {
        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // Hiển thị tất cả câu hỏi và input cho người chơi trả lời
    function displayQuestions() {
        questions.forEach((item, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');

            const questionText = document.createElement('p');
            questionText.innerText = `Question ${index + 1}: ${item.question}`;
            questionBlock.appendChild(questionText);

            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerInput.id = `answer-${index}`;
            answerInput.placeholder = 'Your answer';
            questionBlock.appendChild(answerInput);

            const submitButton = document.createElement('button');
            submitButton.innerText = 'Submit';
            submitButton.id = `submit-${index}`;
            submitButton.addEventListener('click', function() {
                checkAnswer(index, answerInput.value);
            });
            questionBlock.appendChild(submitButton);

            questionContainer.appendChild(questionBlock);
        });
    }

    // Kiểm tra câu trả lời và mở pixel nếu đúng
    function checkAnswer(index, userAnswer) {
        const correctAnswer = questions[index].answer.toLowerCase();
        if (userAnswer.trim().toLowerCase() === correctAnswer) {
            revealPixels();
            document.getElementById(`answer-${index}`).disabled = true;
            document.getElementById(`submit-${index}`).disabled = true;  // Vô hiệu hóa nút Submit
        } else {
            alert("Incorrect answer, try again!");
        }
    }

    // Tô màu các pixel dần dần khi trả lời đúng
    function revealPixels() {
        const revealCount = 10;  // Số pixel được mở ra sau mỗi câu trả lời đúng

        for (let i = 0; i < revealCount; i++) {
            const x = Math.floor(Math.random() * (width / pixelSize)) * pixelSize;
            const y = Math.floor(Math.random() * (height / pixelSize)) * pixelSize;
            ctx.drawImage(image, x, y, pixelSize, pixelSize, x, y, pixelSize, pixelSize);
        }
    }
};
