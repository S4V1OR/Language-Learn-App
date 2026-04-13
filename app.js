// Vocabulary data (English to Spanish)
const vocabulary = [
    { word: 'Hello', translation: 'Hola' },
    { word: 'Goodbye', translation: 'Adiós' },
    { word: 'Thank you', translation: 'Gracias' },
    { word: 'Please', translation: 'Por favor' },
    { word: 'Water', translation: 'Agua' },
    { word: 'Food', translation: 'Comida' },
    { word: 'House', translation: 'Casa' },
    { word: 'Car', translation: 'Coche' },
    { word: 'School', translation: 'Escuela' },
    { word: 'Book', translation: 'Libro' },
    { word: 'Friend', translation: 'Amigo' },
    { word: 'Family', translation: 'Familia' },
    { word: 'Time', translation: 'Tiempo' },
    { word: 'Day', translation: 'Día' },
    { word: 'Night', translation: 'Noche' },
    { word: 'Love', translation: 'Amor' },
    { word: 'Work', translation: 'Trabajo' },
    { word: 'Money', translation: 'Dinero' },
    { word: 'Happy', translation: 'Feliz' },
    { word: 'Sad', translation: 'Triste' }
];

// Progress tracking with localStorage
let progress = JSON.parse(localStorage.getItem('progress')) || { flashcards: 0, quizzes: 0 };

function updateProgress() {
    document.getElementById('progress').textContent = `Progress: ${progress.flashcards} flashcards, ${progress.quizzes} quizzes`;
    localStorage.setItem('progress', JSON.stringify(progress));
}

updateProgress();

// Navigation functions
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Event listeners for navigation
document.getElementById('home-btn').addEventListener('click', () => showSection('landing'));
document.getElementById('flashcards-btn').addEventListener('click', () => showSection('flashcards'));
document.getElementById('quiz-btn').addEventListener('click', () => showSection('quiz'));

// Flashcards functionality
let currentCardIndex = 0;

function displayCard() {
    const card = vocabulary[currentCardIndex];
    document.getElementById('front').textContent = card.word;
    document.getElementById('back').textContent = card.translation;
    document.getElementById('flashcard').classList.remove('flipped');
}

document.getElementById('flip-btn').addEventListener('click', () => {
    document.getElementById('flashcard').classList.toggle('flipped');
    progress.flashcards = (progress.flashcards || 0) + 1;
    updateProgress();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % vocabulary.length;
    displayCard();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + vocabulary.length) % vocabulary.length;
    displayCard();
});

document.getElementById('start-flashcards').addEventListener('click', () => {
    showSection('flashcards');
    displayCard();
});

// Quiz functionality
let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;

function generateQuiz() {
    quizQuestions = [];
    const shuffledVocabulary = [...vocabulary].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(10, shuffledVocabulary.length); i++) {
        const correctAnswer = shuffledVocabulary[i];
        const options = [correctAnswer.translation];
        while (options.length < 4) {
            const randomTranslation = vocabulary[Math.floor(Math.random() * vocabulary.length)].translation;
            if (!options.includes(randomTranslation)) {
                options.push(randomTranslation);
            }
        }
        options.sort(() => Math.random() - 0.5);
        quizQuestions.push({
            word: correctAnswer.word,
            options: options,
            correct: correctAnswer.translation
        });
    }
}

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = `What is the Spanish translation of "${question.word}"?`;
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.onclick = () => {
            if (button.textContent === question.correct) {
                quizScore++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                displayQuestion();
            } else {
                showQuizResults();
            }
        };
    });
}

function showQuizResults() {
    document.getElementById('score').textContent = `Score: ${quizScore}/${quizQuestions.length}`;
    document.getElementById('score').classList.remove('hidden');
    document.getElementById('restart-quiz').classList.remove('hidden');
    document.getElementById('options').classList.add('hidden');
    progress.quizzes = (progress.quizzes || 0) + 1;
    updateProgress();
}

document.getElementById('start-quiz').addEventListener('click', () => {
    showSection('quiz');
    generateQuiz();
    currentQuestionIndex = 0;
    quizScore = 0;
    document.getElementById('score').classList.add('hidden');
    document.getElementById('restart-quiz').classList.add('hidden');
    document.getElementById('options').classList.remove('hidden');
    displayQuestion();
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    showSection('quiz');
    generateQuiz();
    currentQuestionIndex = 0;
    quizScore = 0;
    document.getElementById('score').classList.add('hidden');
    document.getElementById('restart-quiz').classList.add('hidden');
    document.getElementById('options').classList.remove('hidden');
    displayQuestion();
});