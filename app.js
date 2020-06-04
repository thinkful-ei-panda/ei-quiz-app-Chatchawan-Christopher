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
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
};

let currentView = 0; // this stores our current view location, updates on each view change

let currentQuestion = 0; // this stores the question we're currently answering, updates on next question button click

let score = 0;

let html = '';

let questionCorrectIncorrect = '';

const view = [
  `<div>
    <p>Welcome to the quiz!</p>
    <button class="js-start-button">Start</button>
  </div>`, // 0 start view
  `<div>
    <p>Here is the first question!</p>
    <p>${store.questions[currentQuestion].question}</p>
    <input type="radio" id="answ0" name="question" value="${store.questions[currentQuestion].answers[0]}">
    <label for="answ0">${store.questions[currentQuestion].answers[0]}</label>
    <input type="radio" id="answ1" name="question" value="${store.questions[currentQuestion].answers[1]}">
    <label for="answ1">${store.questions[currentQuestion].answers[1]}</label>
    <input type="radio" id="answ2" name="question" value="${store.questions[currentQuestion].answers[2]}">
    <label for="answ2">${store.questions[currentQuestion].answers[2]}</label>
    <input type="radio" id="answ3" name="question" value="${store.questions[currentQuestion].answers[3]}">
    <label for="answ3">${store.questions[currentQuestion].answers[3]}</label>
    <button class="js-submit-question-button">Submit</button>
</div>`, // 1 question view
  `<div>
  <p>Your answer was ${questionCorrectIncorrect}</p>
  <button class="js-next-question-button">Next</button>
</div>`, // 2 question response view
  `<div>
    <p>Here is the quiz finish!</p>
    <button class="js-restart-button">Restart</button>
  </div>`, // 3 quiz finish view
  `<div>
  <p>Here is the scoreboard!</p>
    <p>Question: ${currentQuestion + 1}/${store.questions.length}</p>
    <p>Score: ${score}</p>
  </div>`, // 4 scoreboard view
];


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
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


function getStartView(index) { // this should switch to id, not index
  console.log('`getStartView` ran');
  return view[index]; // this gets the right HTML from the view array
}

function getQuestion(index) {
  console.log('`getQuestion` ran');
  return view[1]; // return the question view
}

function getScoreBoard() {
  console.log('`getScoreBoard` ran');
  return view[4]; // return the scoreboard
}

function getQuestionEval(answer) {
  console.log('`getQuestionEval` ran');
  console.log(`Your answer is ${answer}`)
  console.log(`Correct answer is ${store.questions[currentQuestion].correctAnswer}`)
  if (store.questions[currentQuestion].correctAnswer === answer) { // evaluate against the correctAnswer key
    return 'Correct';
    console.log('correct')
  } else {
    return 'Incorrect';
    console.log('incorrect')
  }
}

function getQuestionResponse() {
  console.log('`getQuestionResponse` ran');
  return view[2];
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render(index) {
  console.log('`render` ran');
  // empty the html variable so we can give a new value
  html = '';

  // depending on the index we're given, return different HTML views
  switch (index) {
  case 0: // Start view
    html = getStartView(index);
    break;
  case 1: // Question view
    html = getScoreBoard(); // scoreboard is visible over all questions and the finish view
    html += getQuestion(index);
    break;
  case 2: // Question response view
    html = getScoreBoard();
    html += getQuestionResponse(index);
    break;
  case 3: // Quiz finish view
    html = getScoreBoard();
    html += getFinish();
    break;
  case 4: // Scoreboard view
    html = getScoreBoard(); // this should not trigger normally
    break;
  default:
    html = 'Something broke!!!';
    break;
  }
  
  // insert that HTML into the DOM
  $('main').html(html);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartClick() {
  $('main').on('click', '.js-start-button', event => {
    event.preventDefault();
    console.log('`handleStartClick` ran')
    render(1) // go to question view
  })
}

function handleSubmitQuestion() {
  $('main').on('click', '.js-submit-question-button', event => {
    event.preventDefault();
    console.log('`handleSubmitQuestion` ran');
    questionCorrectIncorrect = getQuestionEval($('input:checked').val());
    render(2); // go to question response view
  })
}

function handleNextQuestion() {
  console.log('`handleNextQuestion` ran')
  $('main').on('click', '.js-next-question-button', event => {
    currentQuestion ++; // move to the next question
    render(1) // go to question view
  })
}

function handleRestart() {
  console.log('`handleRestart` ran')
}


// Everythign starts right here
function handleQuiz() {
  render(0);
  handleStartClick();
  handleSubmitQuestion();
  handleNextQuestion();
  handleRestart();
}

$(handleQuiz);

