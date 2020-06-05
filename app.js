/* eslint-disable quotes */
/* eslint-disable strict */
/**
 * Example store structure
 */

/* User stories
The starting screen should have a button that users can click to start the quiz.
Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
Users should be asked questions 1 after the other.
Users should only be prompted with 1 question at a time.
Users should not be able to skip questions.
Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
Upon submitting an answer, users should:
receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
be moved onto the next question (or interact with an element to move on).
Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
Users should be able to start a new quiz.
*/
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Is HTML/CSS a programming language?',
      answers: [
        'Yes, it is JavaScript',
        'Yes, it is JQuery',
        'No, they are not languages at all',
        'No, they are markup languages'
      ],
      correctAnswer: 'No, they are markup languages',
      funFact: `<p>Did you know that the <code>&lt;menuitem&gt;</code> HTML tag only works in Mozilla FireFox?</p>`
    },
    {
      question: 'What is the correct order for <code>git push</code>, <code>git add</code> and <code>git commit</code>?',
      answers: [
        '<code>add</code>, <code>commit</code>, <code>push</code>',
        '<code>add</code>, <code>push</code>, <code>commit</code>',
        '<code>commit</code>, <code>add</code>, <code>push</code>',
        '<code>push</code>, <code>commit</code>, <code>add</code>'
      ],
      correctAnswer: '<code>add</code>, <code>commit</code>, <code>push</code>',
      funFact: `I don't actually know how to use <code>git fetch</code>!`
    }
  ],
  score: 0,
  currentQuestion: 0
};




/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that recreates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function createStart() {
  return `
  <body>
    <div class="box">
      <p>Welcome to the quiz, press Start to begin</p>
      <button class="js-start-button">Start</button>
    </div>
  </body>`;
}

function createQuestion() {
  let question = store.questions[store.currentQuestion].question;
  let answer1 = store.questions[store.currentQuestion].answers[0];
  let answer2 = store.questions[store.currentQuestion].answers[1];
  let answer3 = store.questions[store.currentQuestion].answers[2];
  let answer4 = store.questions[store.currentQuestion].answers[3];

  return `
  <body>
    <div class="box">
      <label>${question}</label><br>
      <div class="box">
        <input type="radio" name="question" value="${answer1}">
        <label for="question">${answer1}</label><br>
        <input type="radio" name="question" value="${answer2}">
        <label for="question">${answer2}</label><br>
        <input type="radio" name="question" value="${answer3}">
        <label for="question">${answer3}</label><br>
        <input type="radio" name="question" value="${answer4}">
        <label for="question">${answer4}</label>
      </div class="box">
        <button class="js-submit-answer-button">Submit</button>
    </div>
  </body>`;
}

function createScore() {
  let score = store.score;
  let questionNumber = store.currentQuestion;
  let totalQuestions = store.questions.length;

  return `
    <body>
      <div class="box">
        <p>Score: ${score}<p>
        <p>Question ${questionNumber}/${totalQuestions}</p>
      </div>
    </body>`;
}

function createIncorrect() {
  let correctAnswer = store.questions[store.currentQuestion].correctAnswer;

  return `
  <body>
    <div class="box">
      <p>Not quite!</p>
      <p>The correct answer was ${correctAnswer}!</p>
      <button class="js-next-question-button">Next</button>
    </div>
  </body>`;
}

function createCorrect() {
  let currentQuestion = store.currentQuestion;
  let funFact = store.questions[currentQuestion].funFact;
  return `
  <body>
    <div class="box">
      <p>You're right!</p>
      <p>Fun fact: ${funFact}</p>
      <button class="js-next-question-button">Next</button>
    </div>`;
}

function createFinish() {
  let correctQuestions = store.score;
  let totalQuestions = store.questions.length;

  return `
  <div>
    <p>You've finished my quiz!</p>
    <p>Your score was ${correctQuestions} correct out of ${totalQuestions} questions.</p>
    <button class="js-restart-button">Restart</button>
  </div>`;
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderStart() {
  let html = createStart();

  $('main').html(html);
}

function renderQuestion() {
  let html = createScore();
  html += createQuestion();

  $('main').html(html);
}

function renderCorrect() {
  let html = createCorrect();
  $('main').html(html);
}

function renderIncorrect() {
  let html = createIncorrect();
  $('main').html(html);
}

function renderFinish() {
  let html = createFinish();
  $('main').html(html);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartClick() {
  $('main').on('click', '.js-start-button', event => {
    event.preventDefault();
    event.stopPropagation();
    renderQuestion();

  });
}

function handleSubmitQuestion() {
  $('main').on('click', '.js-submit-answer-button', event => {
    event.preventDefault();
    event.stopPropagation();
    let correctAnswer = store.questions[store.currentQuestion].correctAnswer;

    if ($('input:checked').val() === correctAnswer) {
      store.score ++;
      renderCorrect();
    } else if ($('input:checked').val() === undefined) {
      alert('You did not choose an answer!');
    } else {
      renderIncorrect();
    }
  });
}

function handleNextQuestion() {
  $('main').on('click', '.js-next-question-button', event => {
    event.preventDefault();
    event.stopPropagation();
    let currentQuestion = store.currentQuestion;
    let totalQuestions =store.questions.length;

    if (currentQuestion + 1 >= totalQuestions) {
      renderFinish();
    } else {
      store.currentQuestion ++;
      renderQuestion();
    }
  });
}

function handleRestart() {
  $('main').on('click', '.js-restart-button', event => {
    event.preventDefault();
    event.stopPropagation();
    store.score = 0;
    store.currentQuestion = 0;
    renderStart()
  });
}


// Everythign starts right here
function handleQuiz() {
  renderStart();
  handleStartClick();
  handleSubmitQuestion();
  handleNextQuestion();
  handleRestart();
}

$(handleQuiz);

