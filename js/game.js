const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let timeLeft = document.querySelector(".time-left");
let countdown;
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

    {
        question: "Where is the famous Lotus Tower situated?",
        choice1: "Colombo",
        choice2: "Kandy",
        choice3: "Jaffna",
        choice4: "Badulla",
        answer: 1
    },

    {
        question: "What is the currency of Sri Lanka?",
        choice1: "Euro",
        choice2: "Dollar",
        choice3: "Yen",
        choice4: "Rupees",
        answer: 4
    },
    {
        question: "In which SriLankan city,is the Esela Perahera festival held",
        choice1: "Galle",
        choice2: "Kandy",
        choice3: "Nuwara Eliya",
        choice4: "Jaffna",
        answer: 2
    },
    {
        question: "What city is called as Little Rome",
        choice1: "Colombo",
        choice2: "Nuwara Eliya",
        choice3: "Negombo",
        choice4: "Hambantota",
        answer: 3
    },
    {
        question: "What is the tallest waterfall in the country?",
        choice1: "Dunhinda",
        choice2: "Saint Clair",
        choice3: "Diyaluma",
        choice4: "Bambarakanda",
        answer: 4
    },
    {
        question: "What is the tallest mountain of Sri Lanka",
        choice1: "Kirigalpottha",
        choice2: "Knuckles",
        choice3: "Namunukula",
        choice4: "Piduruthalagala",
        answer: 4
    },
    {
        question: "What is the main language use in Sri Lanka?",
        choice1: "Hindi",
        choice2: "Tamil",
        choice3: "Sinhala",
        choice4: "Urdu",
        answer: 3
    },
    {
        question: "What city is popular for coral reefs?",
        choice1: "Arugambay",
        choice2: "Hikkaduwa",
        choice3: "Unawatuna",
        choice4: "Galle Face",
        answer: 2
    },
    {
        question: "When did Sri Lanka got the independence?",
        choice1: "1996",
        choice2: "1818",
        choice3: "1848",
        choice4: "1948",
        answer: 4
    },
    {
        question: "What city is famous for making masks?",
        choice1: "Ambalangoda",
        choice2: "Matara",
        choice3: "Kandy",
        choice4: "Colombo",
        answer: 1
    }
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

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

    clearInterval(countdown);
    timerDisplay();

    function initial() {
        count = 11;
        clearInterval(countdown);
        timerDisplay();
      }
      initial();
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
        }, 2000);

    });
    //clear interval(stop timer)
  clearInterval(countdown);
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if (count == 0) {
        clearInterval(countdown);
      }
    }, 1000);
  };

  

  

startGame();