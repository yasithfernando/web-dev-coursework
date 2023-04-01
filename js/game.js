const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

    {
        question: "What is HTML??",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 1
    },

    {
        question: "What is Css??",
        choice1: "C",
        choice2: "D",
        choice3: "E",
        choice4: "F",
        answer: 4
    },
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 2;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width =`${(questionCounter / MAX_QUESTIONS) * 100}% `;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();