/*General Variables*/
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/* Set max number of highscores to be displayed*/
const MAX_HIGH_SCORES = 6;
finalScore.innerText = mostRecentScore;
 /* Display different message depending on score*/
if (mostRecentScore <= 30) {
    finalScore.innerText = "Your score is " + mostRecentScore + ". You're barking up the wrong tree!";
} else if (mostRecentScore > 30 && mostRecentScore <= 70) {
    finalScore.innerText = "Your score is " + mostRecentScore + ". You must be having a ruff day!";
}  else if (mostRecentScore > 70) {
    finalScore.innerText = "Your score is " + mostRecentScore + ". You're a leader of the pack!";
}
/* Add username to save score */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
    e.preventDefault();

const score = {
        score: mostRecentScore,
        name: username.value,
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(6);
/* Add score to local storage*/
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscores.html'); 
};

