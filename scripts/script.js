const quizData = [
  {
    question: 'What does the chemical element with the symbol "O" represent?',
    first_option: "Oxygen",
    second_option: "Carbon monoxide",
    third_option: "Ozone",
    fourth_option: "Tin",
    correct: "first_option",
  },
  {
    question: "Which of the following programming languages is object-oriented?",
    first_option: "C",
    second_option: "Python",
    third_option: "Assembly",
    fourth_option: "SQL",
    correct: "second_option",
  },
  {
    question: "Who was the first President of the United States?",
    first_option: "Thomas Jefferson",
    second_option: "Abraham Lincoln",
    third_option: "George Washington",
    fourth_option: "John Adams",
    correct: "third_option",
  },
  {
    question: "Which of the following countries is not part of the European Union?",
    first_option: "Germany",
    second_option: "France",
    third_option: "Norway",
    fourth_option: "Italy",
    correct: "third_option",
  },
  {
    question: 'Who wrote the novel "Crime and Punishment"?',
    first_option: "Fyodor Dostoevsky",
    second_option: "Leo Tolstoy",
    third_option: "Ivan Turgenev",
    fourth_option: "Anton Chekhov",
    correct: "first_option",
  },
  {
    question: 'What represents the chemical element with the symbol "Na"?',
    first_option: "Sodium",
    second_option: "Nickel",
    third_option: "Silicon",
    fourth_option: "Silver",
    correct: "first_option",
  },
  {
    question: 'Which planet is known as the "Red Planet"?',
    first_option: "Mars",
    second_option: "Venus",
    third_option: "Jupiter",
    fourth_option: "Saturn",
    correct: "first_option",
  }
];

let quizConter = 0;
let score = 0;

const quiz = document.querySelector(".quiz-block");

const question = document.querySelector(".question");
const questionCounter = document.querySelector(".question-counter");

const first_option = document.querySelector("#first_option-text");
const second_option = document.querySelector("#second_option-text");
const third_option = document.querySelector("#third_option-text");
const fourth_option = document.querySelector("#fourth_option-text ");

const answersElements = document.querySelectorAll(".answer");

function deselectElement() {
  answersElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answerElement.checked = false;
    }
  });
}

function nextQuestion() {
  quizConter++;
  if (quizConter < quizData.length) {
    availableElements();
    loadQuiz();
  } else {
    quiz.innerHTML = `<h2>Your reslut:</h2>
      <p>${score} out of ${quizConter} correct answers <p>`;
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}

function availableElements() {
  answersElements.forEach((answerElement) => {
    answerElement.removeAttribute("disabled");
    answerElement
      .closest(".answers-list-item")
      .classList.remove("no-hover", "right_answer", "wrong_answer");
  });
  const submitButton = document.getElementById("submit_next");
  submitButton.innerText = "Answer";
  submitButton.removeAttribute("id");
  submitButton.setAttribute("id", "submit");
  submitButton.removeEventListener("click", nextQuestion);
  submitButton.addEventListener("click", checkAnswer);
}

function unavailableElements() {
  answersElements.forEach((answerElement) => {
    answerElement.setAttribute("disabled", true);
    answerElement.closest(".answers-list-item").classList.add("no-hover");
  });
  const nextButton = document.getElementById("submit");
  nextButton.innerText = "Next";
  nextButton.removeAttribute("submit");
  nextButton.setAttribute("id", "submit_next");
  nextButton.removeEventListener("click", checkAnswer);

  nextButton.addEventListener("click", nextQuestion);
}

function getSelected() {
  let answer = undefined;

  answersElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
}

function loadQuiz() {
  deselectElement();
  const currentQuiz = quizData[quizConter];

  question.innerText = currentQuiz.question;
  questionCounter.innerText = `${quizConter + 1} of ${
    quizData.length
  } Questions`;
  first_option.innerText = currentQuiz.first_option;
  second_option.innerText = currentQuiz.second_option;
  third_option.innerText = currentQuiz.third_option;
  fourth_option.innerText = currentQuiz.fourth_option;
}

loadQuiz();

function checkAnswer() {
  const answer = getSelected();

  if (answer) {
    let rightAnswerElement = document
      .getElementById(answer)
      .closest(".answers-list-item");
    if (answer === quizData[quizConter].correct) {
      deselectElement();
      unavailableElements();
      rightAnswerElement.classList.add("right_answer");
      score++;
    } else {
      rightAnswerElement.classList.add("wrong_answer");
      let correctAnswerElement = document
        .getElementById(quizData[quizConter].correct)
        .closest(".answers-list-item");
      correctAnswerElement.classList.add("right_answer");
      deselectElement();
      unavailableElements();
    }
  } else {
    alert("Choose an answer");
  }
}

submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", checkAnswer);
