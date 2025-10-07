
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "সামাজিক ন্যায়বিচার নিয়ে কী ভাবো?",
            options: [
                "সবসময় সমতার জন্য লড়তে হবে",
                "যখন পারি সাপোর্ট করি",
                "মন খারাপ হয় কিন্তু কিছু করি না",
                "এসব আমার ব্যাপার না"
            ],
            correctAnswer: "A",
            scoreValue: 5 // Example score for this answer
        },
        {
            question: "গণতন্ত্রে তোমার ভূমিকা কী?",
            options: [
                "সক্রিয়ভাবে অংশগ্রহণ করি",
                "ভোট দিই, বাকিটা দেখি",
                "আমার ভোটে কিছু যায় আসে না",
                "গণতন্ত্রে বিশ্বাস করি না"
            ],
            correctAnswer: "A",
            scoreValue: 5
        },
        {
            question: "দুর্নীতি দেখলে তোমার প্রতিক্রিয়া কী হয়?",
            options: [
                "প্রতিবাদ করি এবং প্রতিকার চাই",
                "বিরক্ত হই কিন্তু কিছু করার নেই",
                "নিজের স্বার্থ না থাকলে চুপ থাকি",
                "সবাই করে, আমিও করি"
            ],
            correctAnswer: "A",
            scoreValue: 5
        },
        {
            question: "দেশের সংস্কৃতি ও ঐতিহ্য রক্ষায় তোমার মত কী?",
            options: [
                "এটি আমাদের পরিচয়, সংরক্ষণ করা উচিত",
                "কিছুটা গুরুত্বপূর্ণ, তবে আধুনিকতার সাথে চলতে হবে",
                "পুরোনো জিনিস, অতটা গুরুত্বের কিছু নেই",
                "বিদেশি সংস্কৃতিই বেশি ভালো"
            ],
            correctAnswer: "A",
            scoreValue: 5
        },
        {
            question: "দেশের প্রতি তোমার ভালোবাসা কতটা?",
            options: [
                "অপরিমেয়, দেশের জন্য সবকিছু করতে পারি",
                "ভালোবাসি, তবে নিজের জীবন আগে",
                "সাধারণত ভালোবাসি, তবে সমালোচনাও করি",
                "দেশ নিয়ে খুব একটা চিন্তা করি না"
            ],
            correctAnswer: "A",
            scoreValue: 5
        }
        // Add more fun and relevant questions here
        // {
        //     question: "Another question?",
        //     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        //     correctAnswer: "B",
        //     scoreValue: 3
        // }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.querySelector('.options');
    const optionButtons = document.querySelectorAll('.option-btn');
    const nextButton = document.getElementById('next-btn');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const resultSection = document.getElementById('result-section');
    const finalScoreSpan = document.getElementById('final-score');
    const resultMessageP = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-btn');

    totalQuestionsSpan.textContent = questions.length;

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionText.textContent = q.question;
            optionsContainer.innerHTML = ''; // Clear previous options

            q.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                button.textContent = `${optionLetter} ${option}`;
                button.dataset.answer = optionLetter;
                optionsContainer.appendChild(button);
                button.addEventListener('click', selectOption);
            });

            currentQuestionSpan.textContent = currentQuestionIndex + 1;
            nextButton.classList.add('hidden'); // Hide next button until an option is selected
            resultSection.classList.add('hidden'); // Hide result section
            optionButtons.forEach(btn => btn.classList.remove('selected', 'correct', 'incorrect'));
            selectedAnswer = null; // Reset selected answer
        } else {
            showResult();
        }
    }

    function selectOption(event) {
        // Remove 'selected' from previously selected button
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

        // Add 'selected' to the clicked button
        event.target.classList.add('selected');
        selectedAnswer = event.target.dataset.answer;
        nextButton.classList.remove('hidden'); // Show next button
    }

    function processAnswer() {
        if (selectedAnswer) {
            const q = questions[currentQuestionIndex];
            if (selectedAnswer === q.correctAnswer) {
                score += q.scoreValue; // Add score for correct answer
                // You can add visual feedback for correct/incorrect here if desired
                // For example, event.target.classList.add('correct');
            } else {
                 // event.target.classList.add('incorrect');
                 // document.querySelector(`.option-btn[data-answer="${q.correctAnswer}"]`).classList.add('correct');
            }
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert('অনুগ্রহ করে একটি উত্তর নির্বাচন করুন।'); // Please select an answer
        }
    }

    function showResult() {
        optionsContainer.classList.add('hidden');
        questionText.classList.add('hidden');
        document.querySelector('.question-icon').classList.add('hidden');
        nextButton.classList.add('hidden');
        resultSection.classList.remove('hidden');
        finalScoreSpan.textContent = score;

        let message = "";
        if (score >= questions.length * 4) { // Assuming max score per question is 5, so 4 is a good threshold
            message = "আপনি একজন প্রকৃত শাহবাগী! আপনার দেশপ্রেম ও প্রগতিশীল চিন্তা প্রশংসার যোগ্য।";
        } else if (score >= questions.length * 2) {
            message = "আপনার শাহবাগী স্কোর ভালো, তবে আরও সচেতনতা ও সক্রিয়তা প্রয়োজন।";
        } else {
            message = "আপনার শাহবাগী স্কোর তুলনামূলকভাবে কম। দেশের প্রতি আপনার দৃষ্টিভঙ্গি পুনর্বিবেচনা করুন।";
        }
        resultMessageP.textContent = message;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        optionsContainer.classList.remove('hidden');
        questionText.classList.remove('hidden');
        document.querySelector('.question-icon').classList.remove('hidden');
        resultSection.classList.add('hidden');
        loadQuestion();
    }

    nextButton.addEventListener('click', processAnswer);
    restartButton.addEventListener('click', restartQuiz);
    document.querySelector('.refresh-icon').addEventListener('click', restartQuiz); // Refresh icon also restarts

    loadQuestion(); // Initial load
});
