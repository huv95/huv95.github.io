window.onload = function() {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');

    // Kích thước canvas
    const width = 500;
    const height = 500;
    const pixelSize = 20;
    canvas.width = width;
    canvas.height = height;

    // Mảng câu hỏi và đáp án
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

    let currentQuestionIndex = 0;
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');

    // Load hình ảnh (ban đầu là màu trắng)
    const image = new Image();
    image.src = 'images/lon.jpg';  // Thay đường dẫn ảnh của bạn
    image.onload = function() {
        // Vẽ ảnh màu trắng lên canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        // Khởi tạo lưới pixel
        createPixelGrid();
    };

    function createPixelGrid() {
        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
        // Hiển thị câu hỏi đầu tiên
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionElement.innerText = questions[currentQuestionIndex].question;
        } else {
            questionElement.innerText = "You've revealed the whole image!";
            submitButton.disabled = true;

            // Mở toàn bộ bức tranh khi trả lời hết tất cả các câu hỏi
            revealFullImage();
        }
    }

    // Xử lý khi nhấn nút "Submit"
    submitButton.addEventListener('click', function() {
        const userAnswer = answerElement.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            revealPixels();
            currentQuestionIndex++;
            answerElement.value = '';
            showQuestion();
        } else {
            alert("Incorrect! Try again.");
        }
    });

    // Tô màu các pixel dần dần khi trả lời đúng
    function revealPixels() {
        const revealCount = 10;  // Số pixel được mở ra sau mỗi câu trả lời đúng

        for (let i = 0; i < revealCount; i++) {
            const x = Math.floor(Math.random() * (width / pixelSize)) * pixelSize;
            const y = Math.floor(Math.random() * (height / pixelSize)) * pixelSize;
            ctx.drawImage(image, x, y, pixelSize, pixelSize, x, y, pixelSize, pixelSize);
        }
    }

    function revealFullImage() {
        ctx.drawImage(image, 0, 0, width, height);
    }
};
