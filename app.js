/* eslint-disable strict */
/**
 * Example store structure
 */

let currentView = 0; // this stores our current view location, updates on each view change

let currentQuestion = 0; // this stores the question we're currently answering, updates on next question button click


const view = [
  '<p>Welcome to the quiz!</p><br><button>Start Quiz</button>',
  '<p>This is the question page</p>',
  '<p>This is the end of the quiz!</p><br><button>Restart Quiz</button>'
]

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
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

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

function getPageHTML(index) { // this should switch to id, not index
  return view[index] // this gets the right HTML from the view array
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderMainPage() {
  console.log('`renderView` ran')

  // render the quiz in the DOM
  const quizItemsString = getPageHTML(0);

  // insert that HTML into the DOM
  $('main').html(quizItemsString);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleQuiz() {
  renderMainPage();





}

$(handleQuiz);