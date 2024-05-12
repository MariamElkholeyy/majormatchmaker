const quizData = [
    {question: "What aspect of engineering interests you the most??",
    a: " Design and creativity",
    b: "Research and innovation",
    c: "Problem-solving and analytical thinking",
    correct: "a"},
    {question: "Are you comfortable with heavy math and physics requirements? ",
    a: "ASomewhat, but I prefer practical applications",
    b: "Yes, I enjoy math and physics",
    c: "Not particularly, but I'm willing to put in the effort",
    correct: "b"},
    {question: "How do you feel about working in teams versus working independently?",
    a: "Enjoy working in teams",
    b: "Prefer working independently",
    c: "Comfortable with both, depending on the situation",
    correct: "b"},
    {question: "What are some of your hobbies or extracurricular activities?",
    a: " Robotics teams, building things, tinkering with electronics",
    b: "Programming clubs, coding challenges, math competitions",
    c: "Environmental clubs, science olympiads, outdoor activities",
    correct: "a"},
    {question: "What are you most curious about?",
    a: "How machines work and how to design new ones",
    b: "How to use data and code to solve complex problems",
    c: "How the natural world works and how to preserve it",
    correct: "b"},

    {question: "How important is sustainability and environmental impact to you in your career choice? ",
    a: "Very important, it's a top priority",
    b: "Somewhat important, but not a deciding factor",
    c: "Not a priority, but I'm open to it if opportunities arise",
    correct: "b"},

    {question: "Are you interested in emerging technologies and innovation, or do you prefer working with established principles?",
    a: "Emerging technologies and innovation",
    b: "Both, but with a preference for one over the other",
    c: "Established principles",
    correct: "b"}
];

const quiz = document.getElementById("quiz");
const countQuestion = document.getElementById("count-question");
const totalNumberOfQuestion = document.getElementById("tol-num-que");
const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answerLabels = document.querySelectorAll(".answer-label");
const nextQuestionBtn = document.getElementById("next-question-btn");
const submitBtn = document.getElementById("submite");

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion(questionIndex) {
    const currentQuizData = quizData[questionIndex];
    countQuestion.innerText = questionIndex + 1; // Update the question count
    questionNumber.innerText = questionIndex + 1;
    questionTitle.innerText = currentQuizData.question;
    const answers = Object.entries(currentQuizData);
    for (let i = 0; i < answerLabels.length; i++) {
        answerLabels[i].innerText = answers[i + 1][1];
    }
}

nextQuestionBtn.addEventListener("click", () => {
    const selectedAnswer = Array.from(document.querySelectorAll("input[type='radio']")).find(input => input.checked);
    if (selectedAnswer) {
        userAnswers[currentQuestion] = selectedAnswer.value;
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion(currentQuestion);
        } else {
            nextQuestionBtn.style.display = "none";
            submitBtn.style.display = "block";
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
});

submitBtn.addEventListener("click", () => {
    if (userAnswers.length === quizData.length) {
        let counts = { "a": 0, "b": 0, "c": 0 };

        // Count the occurrences of each answer
        userAnswers.forEach(answer => {
            counts[answer]++;
        });

        // Find the most chosen answer
        let mostChosen = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

        let redirectLink = "";
        if (mostChosen === "a") {
            redirectLink = "ide.html";
        } else if (mostChosen === "b") {
            redirectLink = "ecce.html";
        } else if (mostChosen === "c") {
            redirectLink = "eece.html";
        }

        window.location.href = redirectLink;
    } else {
        alert("Please answer all questions before submitting.");
    }
});


function initializeQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    loadQuestion(currentQuestion);
    nextQuestionBtn.style.display = "block";
    submitBtn.style.display = "none";
}

initializeQuiz();
