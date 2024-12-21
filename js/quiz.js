const questions = [
    {
        question: 'What kind of activities do you prefer on a vacation?',
        answers: ['Exploring historical sites and museums', 'Relaxing on a beach or at a resort', 'Adventurous activities like hiking or water sports', 'Experiencing local culture and cuisine']
    },
    {
        question: 'What type of climate do you prefer for your vacation?',
        answers: ['Warm and sunny', 'Cool and breezy', 'Cold and snowy', 'Mild and temperate']
    },
    {
        question: 'What kind of accommodation do you prefer?',
        answers: ['Luxury hotel or resort', 'Budget-friendly hotel or hostel', 'Airbnb or vacation rental', 'Camping or glamping']
    },
    {
        question: 'How do you like to spend your evenings on vacation?',
        answers: ['Dining at fine restaurants', 'Enjoying local nightlife and clubs', 'Relaxing at a cozy café or bar', 'Watching cultural performances or events']
    },
    {
        question: 'What is your preferred mode of transportation during a trip?',
        answers: ['Renting a car or bike', 'Using public transportation', 'Walking and exploring on foot', 'Joining guided tours']
    },
    {
        question: 'What kind of destinations do you usually prefer?',
        answers: ['Popular tourist cities', 'Quiet countryside or small towns', 'Mountainous regions', 'Coastal areas or islands']
    },
    {
        question: 'What type of travel companions do you prefer?',
        answers: ['Traveling solo', 'Traveling with family', 'Traveling with friends', 'Traveling with a significant other']
    },
    {
        question: 'What is your main goal when traveling?',
        answers: ['Relaxation and unwinding', 'Adventure and excitement', 'Learning and discovery', 'Socializing and meeting new people']
    },
    {
        question: 'How do you usually plan your trips?',
        answers: ['Meticulously planning every detail', 'Having a rough plan and being flexible', 'Spontaneously deciding as you go', 'Letting someone else plan it']
    },
    {
        question: 'What kind of souvenirs do you like to bring back from your travels?',
        answers: ['Local handicrafts and art', 'Clothing and accessories', 'Food and drink', 'Photos and memories']
    }
];

let currentQuestionIndex = 0;
const userPreferences = [];

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('find-destination').addEventListener('click', findDestination);
});

function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    questionElement.innerText = questions[currentQuestionIndex].question;
    answerButtonsElement.innerHTML = '';

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const radioContainer = document.createElement('div');
        radioContainer.classList.add('radio-container');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'answer';
        radioInput.id = `answer${index}`;
        radioInput.classList.add('radio-input');
        radioInput.value = index;
        radioInput.addEventListener('change', () => selectAnswer(index));

        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = `answer${index}`;
        radioLabel.classList.add('radio-label');
        radioLabel.innerText = answer;

        radioContainer.appendChild(radioInput);
        radioContainer.appendChild(radioLabel);
        answerButtonsElement.appendChild(radioContainer);
    });
}

function selectAnswer(answerIndex) {
    userPreferences[currentQuestionIndex] = answerIndex;
}

function nextQuestion() {
    if (userPreferences[currentQuestionIndex] === undefined) {
        alert('Please select an answer.');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        document.querySelector('.quiz').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('find-destination').classList.remove('hidden');
    }
}

async function findDestination() {
    try {
        console.log('Fetching destination...'); // Debugging log
        const response = await fetch('http://localhost:3000/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences: userPreferences })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Received result:', result); // Debugging log

        const resultElement = document.getElementById('destination');
        resultElement.innerHTML = ''; // Clear previous results

        const destinationElement = document.createElement('div');
        destinationElement.classList.add('destination');

        const destinationName = document.createElement('h3');
        destinationName.innerText = result.destination;

        const destinationImage = document.createElement('img');
        destinationImage.src = result.image;
        destinationImage.alt = result.destination;

        destinationElement.appendChild(destinationName);
        destinationElement.appendChild(destinationImage);

        resultElement.appendChild(destinationElement);
    } catch (error) {
        console.error('Error fetching destination:', error);
        alert('Failed to fetch destination. Please try again later.');
    }
}