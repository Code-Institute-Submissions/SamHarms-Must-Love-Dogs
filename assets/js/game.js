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
        question: 'What was the name of the first dog to go to space in 1957?',
        choices: [
            { description: 'Belka' },
            { description: 'Strelka' },
            { description: 'Mushka' },
            { description: 'Laika' },
        ],
        answer: 4,
    },
    {
        question: 'Through what part of the body do dogs sweat?',
        choices: [
            { description: 'Ears' },
            { description: 'Armpits' },
            { description: 'Paws' },
            { description: 'Nose' },
        ],
        answer: 3,
    },
     {
        question: 'What is the most popular breed of the dog in the United States?',
        choices: [
            { description: 'Retriever' },
            { description: 'Jack Russell' },
            { description: 'Pitbull' },
            { description: 'Chihuahua' },
        ],
        answer: 1,
    },
     {
        question: 'Which human organs do dogs not have?',
        choices: [
            { description: 'Spleen' },
            { description: 'Appendix' },
            { description: 'Pancreas' },
            { description: 'Uterus' },
        ],
        answer: 2,
    },
     {
        question: 'Which breed of dog could beat a cheetah in a race?',
        choices: [
            { description: 'Whippet' },
            { description: 'Saluki' },
            { description: 'Lurcher' },
            { description: 'Greyhound' },
        ],
        answer: 4,
    },
     {
        question: 'The Guinness World Record for holding the most tennis balls in a dogs mouth went to Finley Molloy in 2020. How many could he hold?',
        choices: [
            { description: '6' },
            { description: '8' },
            { description: '3' },
            { description: '7' },
        ],
        answer: 1,
    },
     {
        question: 'How many tastebuds do dogs have?',
        choices: [
            { description: '4,000' },
            { description: '7,000' },
            { description: '1,700' },
            { description: '900' },
        ],
        answer: 3,
    },
     {
        question: 'Who was the father of the 101 Dalmations?',
        choices: [
            { description: 'Pongo' },
            { description: 'Patch' },
            { description: 'Rolly' },
            { description: 'Lucky' },
        ],
        answer: 1,
    },
     {
        question: 'What makes the Basenji a unique dog?',
        choices: [
            { description: 'It is the smallest dog breed' },
            { description: 'It has an extra toe on each paw' },
            { description: 'It yodels instead of barking' },
            { description: 'It has a pink nose' },
        ],
        answer: 3,
    },
    {
        question: 'What breed of dog is Shadow from the movie Homeward Bound?',
        choices: [
            { description: 'American Bulldog' },
            { description: 'Golden Retriever' },
            { description: 'Border Collie' },
            { description: 'Dalmation' },
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