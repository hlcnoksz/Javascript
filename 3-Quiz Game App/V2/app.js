const musicQuestions = [
  {
    question: 'Which is largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Nepal', correct: false },
      { text: 'Shri Lanka', correct: false },
    ],
  },
  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Antartica', correct: true },
    ],
  },
  {
    question: 'Which is the smallest continent in the world ? ',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
    ],
  },
]

const animalQuestions = [
  {
    question: 'animal is largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Nepal', correct: false },
      { text: 'Shri Lanka', correct: false },
    ],
  },
  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Antartica', correct: true },
    ],
  },
  {
    question: 'Which is the smallest continent in the world ? ',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
    ],
  },
]

const technologyQuestions = [
  {
    question: 'technology is largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Nepal', correct: false },
      { text: 'Shri Lanka', correct: false },
    ],
  },
  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Antartica', correct: true },
    ],
  },
  {
    question: 'Which is the smallest continent in the world ? ',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
    ],
  },
]

const appDiv = document.querySelector('.app')
const { quizDiv, questionElement, answerButtons, nextButton } = createQuizUI()

let currentQuestionIndex = 0
let score = 0
let selectedCategory = ''

const categories = [
  { id: 'music', name: 'Music', questions: musicQuestions },
  { id: 'animals', name: 'Animals', questions: animalQuestions },
  { id: 'technology', name: 'Technology', questions: technologyQuestions },
]

initialize()

//! Başlangıçta Kategoriler arayüzü oluşumu ve tıklama olursa
function initialize() {
  const h1 = document.createElement('h1')
  h1.textContent = 'Simple Quiz'
  appDiv.appendChild(h1)

  const categoriesDiv = document.createElement('div')
  categoriesDiv.classList.add('categories')

  categories.forEach((category) => {
    const categoryDiv = document.createElement('div')
    categoryDiv.classList.add('category')
    categoryDiv.id = category.id
    categoryDiv.classList.add('category')
    categoryDiv.textContent = category.name
    categoriesDiv.appendChild(categoryDiv)
    categoryDiv.addEventListener('click', () => selectCategory(category))
  })

  appDiv.appendChild(categoriesDiv)
}

//! Kategori seçildiğinde
function selectCategory(category) {
  selectedCategory = category
  currentQuestionIndex = 0
  score = 0
  nextButton.textContent = 'Next'
  appDiv.innerHTML = ''
  appDiv.appendChild(quizDiv)
  showQuestion()
}

//! Quiz arayüzü oluşturma
function createQuizUI() {
  const quizDiv = document.createElement('div')
  quizDiv.classList.add('quiz')

  const questionElement = document.createElement('h2')
  questionElement.id = 'question'

  const answerButtons = document.createElement('div')
  answerButtons.id = 'answer-buttons'

  const nextButton = document.createElement('button')
  nextButton.id = 'next-btn'
  nextButton.textContent = 'Next'

  quizDiv.appendChild(questionElement)
  quizDiv.appendChild(answerButtons)
  quizDiv.appendChild(nextButton)

  return {
    quizDiv,
    questionElement,
    answerButtons,
    nextButton,
  }
}

//! Soruları Gösterme
function showQuestion() {
  resetState()
  const currentQuestion = selectedCategory.questions[currentQuestionIndex]
  const questionNo = currentQuestionIndex + 1
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.textContent = answer.text
    answerButtons.appendChild(button)
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
  })
}

//! Durumu resetle
function resetState() {
  nextButton.style.display = 'none'
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

//! Cevap seçildiğinde
function selectAnswer(e) {
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === 'true'
  if (isCorrect) {
    selectedBtn.classList.add('correct')
    score++
  } else {
    selectedBtn.classList.add('incorrect')
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct')
    }
    button.disabled = true
  })
  nextButton.style.display = 'block'
}

//! Scoru göster
function showScore() {
  resetState()
  questionElement.textContent = `You scored ${score} out of ${selectedCategory.questions.length}!`
  nextButton.textContent = 'Play Again'
  nextButton.style.display = 'block'
}

//! Next butonuna tıklandığında (score' daki Play Again değilse)
function handleNextButton() {
  currentQuestionIndex++
  if (currentQuestionIndex < selectedCategory.questions.length) {
    showQuestion()
  } else {
    showScore()
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < selectedCategory.questions.length) {
    handleNextButton()
  } else {
    selectedCategory = ''
    appDiv.innerHTML = ''
    initialize()
  }
})
