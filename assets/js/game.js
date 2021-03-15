const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Placeholder question 1',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 4,
    },
    {
        question: 'Placeholder question 2',
        choices: [
            { description: 'choice 1' },
            { description: 'choice 2' },
            { description: 'choice 3' },
            { description: 'choice 4' },
        ],
        answer: 3,
    },
     {
        question: 'Placeholder question 3',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 1,
    },
     {
        question: 'Placeholder question 4',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 2,
    },
     {
        question: 'Placeholder question 5',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 4,
    },
     {
        question: 'Placeholder question 6',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 1,
    },
     {
        question: 'Placeholder question 7',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 3,
    },
     {
        question: 'Placeholder question 8',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 1,
    },
     {
        question: 'Placeholder question 9',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 3,
    },
    {
        question: 'Placeholder question 10',
        choices: [
            { description: 'choice2 1' },
            { description: 'choice2 2' },
            { description: 'choice2 3' },
            { description: 'choice2 4' },
        ],
        answer: 2,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

const renderChoice = (choice, index) => {
    return `
        <div class="choice-container">
          <p class="choice-prefix">${String.fromCharCode(65 + index)}</p>
          <p class="choice-text" data-number="1">${choice.description}</p>
        </div>
    `;
}    

const renderQuestion = (question) => {
    let output = `<h2 id="question">${question.question}?</h2>`;
    question.choices.forEach((choice, index) => {
        output += renderChoice(choice, index);
    });
    return output;
}


choices.forEach(choice => {
  quizContainer.innerHTML = renderQuestion(questions[0]);

  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
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