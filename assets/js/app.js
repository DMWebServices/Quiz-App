let questions = []; 
const ques = document.getElementById("ques");

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if ( !response.ok) {
            throw new Error("Something is wrong... No data!!");
        }
        const data = await response.json();
        questions = data.results;
        console.log("It is working!");
    } catch (error) {
        console.log(error);
        ques.innerHTML = `<h5 style="color: red">${error}</h5>`
    }
}
fetchQuestions();

let currQuestion = 0;
let score = 0;

if ( questions.length === 0) {
    ques.innerHTML = `<h5 style="color: #fff;text-decoration: underline">Loading the mother ship, please wait...</h5>`;
}

function decdoeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function loadQues() { 
    const opt = document.getElementById("opt");
    let currentQuestion = questions[currQuestion].question;
    ques.innerText = decdoeHTML(currentQuestion);
    opt.innerHTML = "";
    const correctAnswer = questions[currQuestion].correct_answer;
    const incorrectAnswer = questions[currQuestion].incorrect_answers;
    const options = [correctAnswer, ...incorrectAnswer];
    options.sort(() => Math.random() - 0.5);
    options.forEach((option) => {
        const choicesDiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");
        choice.type = "radio";
        choice.name = "answer";
        choice.value = option;
        choiceLabel.textContent = option;
        choicesDiv.appendChild(choice);
        choicesDiv.appendChild(choiceLabel);
        opt.appendChild(choicesDiv);
    });

}
setTimeout(() => {
    loadQues();
    if ( questions.length === 0) {
        ques.innerHTML = `<h5 style="color: red;">Danger, unable to fetch data</h5>`
    }
}, 2000);

function loadScore() { 
    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${questions.length}`;
    totalScore.innerHTML += "<h3>All Anwsers</h3>";
    questions.forEach((el, index) => {
        totalScore.innerHTML += `<p>${index + 1}. ${el.correct_answer}</p>`;
    });
}

function resetBtn() {
        const resetBtn = document.getElementById("reset-btn");
        resetBtn.style.display = "block";
        resetBtn.addEventListener("click", () => {
            location.reload();
        });
        }

function nextQuestion() {
    if ( currQuestion < questions.length - 1 ) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        loadScore();
        resetBtn();
    }

}

function checkAns() {
    const selectedAns = document.querySelector("input[name='answer']:checked");
    if ( selectedAns) {
        const answerVaule = selectedAns.value;
        if ( answerVaule === questions[currQuestion].correctAnswer) { 
            score++;
        }
        nextQuestion();
    } else {
        alert("Answer a Dam question!");
    }
}


