let questionIndex = 0;

function startQuiz() {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    fetch(`/get_question?question_index=${questionIndex}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("question").innerText = data.question;
        });
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer-input").value;

    fetch('/check_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question_index: questionIndex,
            answer: userAnswer
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.getElementById("result").innerText = "Correct!";
        } else {
            document.getElementById("result").innerText = "Incorrect!";
        }

        questionIndex++;
        document.getElementById("answer-input").value = "";

        if (questionIndex < 3) {
            loadQuestion();
        } else {
            document.getElementById("result").innerText += " Quiz Completed!";
            document.getElementById("question-container").style.display = "none";
        }
    });
}
