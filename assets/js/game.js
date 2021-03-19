  
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What was the name of the first dog to go to space in 1957?',
        choice1: 'Belka',
        choice2: 'Strelka',
        choice3: 'Mushka',
        choice4: 'Laika',
        answer: 4,
    },
    {
        question: 'Through what part of the body do dogs sweat?',
        choice1: 'Ears',
        choice2: 'Armpits',
        choice3: 'Paws',
        choice4: 'Nose',
        answer: 3,
    },
    {
        question: 'What is the most popular breed of the dog in the United States?',
        choice1: 'Labrador Retriever',
        choice2: 'Jack Russell',
        choice3: 'Pitbull',
        choice4: 'Chihuahua',
        answer: 1,
    },
    {
        question: 'Which human organs do dogs not have?',
        choice1: 'Spleen',
        choice2: 'Appendix',
        choice3: 'Pancreas',
        choice4: 'Uterus',
        answer: 2,
    },
    {
        question: 'Which breed of dog could beat a cheetah in a race?',
        choice1: 'Whippet',
        choice2: 'Greyhound',
        choice3: 'Lurcher',
        choice4: 'Saluki',
        answer: 2,
    },
    {
        question: 'The Guinness World Record for holding the most tennis balls in a dogs mouth went to Finley Molloy in 2020. How many could he hold?',
        choice1: '3',
        choice2: '8',
        choice3: '6',
        choice4: '7',
        answer: 3,
    },
    {
        question: 'How many tastebuds do dogs have?',
        choice1: '1,700',
        choice2: '7,000',
        choice3: '900',
        choice4: '4,000',
        answer: 1,
    },
    {
        question: 'Who was the father of the 101 Dalmations?',
        choice1: 'Patch',
        choice2: 'Pongo',
        choice3: 'Rolly',
        choice4: 'Lucky',
        answer: 2,
    },
    {
        question: 'What breed of dog is Shadow from the movie Homeward Bound?',
        choice1: 'American Bulldog',
        choice2: 'Golden Retriever',
        choice3: 'Border Collie',
        choice4: 'Dalmation',
        answer: 2,
    },
    {
        question: 'What makes the Basenji a unique dog?',
        choice1: 'It is the smallest dog breed',
        choice2: 'It has an extra toe on each paw',
        choice3: 'It has a pink nose',
        choice4: 'It yodels instead of barking',
        answer: 4,
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
        return window.location.assign('/end.html');
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

choices.forEach(choice => {
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