const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

/* Add score to highscores list*/
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
  
  /* ----- EmailJs Newsletter sign up ----- */

function sendMail(newsletterSignup) {
    emailjs.send("service_c5ljukn", "template_a4yyv0p", {
        "from_name": newsletterSignup.name.value,
        "from_email": newsletterSignup.email.value,
    })
    .then(
        function(response) {
            $('#msgModal').modal('show');
            console.log("SUCCESS", response);
        },
        function(error) {
            console.error("FAILED", error);
        }
    );
    return false;  
}

