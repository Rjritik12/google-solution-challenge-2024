const exerciseList = [
  {
    name: 'Jumping Jacks',
    description: 'Stand with your feet hip-width apart and your arms at your sides. Jump your feet out to the sides while raising your arms above your head. Jump back to the starting position.',
    type: 'Cardio',
    target: 'Full body',
    duration: 3,
  },
  {
    name: 'Squats',
    description: 'Stand with your feet hip-width apart, toes pointing forward. Lower your body as if sitting back into a chair, keeping your weight in your heels. Push back up to the starting position.',
    type: 'Strength',
    target: 'Legs',
    duration: 4,
  },
  {
    name: 'Push-ups',
    description: 'Get into a high plank position. Lower your body until your chest nearly touches the floor. Pause, then push yourself back up to the starting position.',
    type: 'Strength',
    target: 'Upper body',
    duration: 2,
  },
  {
    name: 'Lunges',
    description: 'Stand with your feet hip-width apart. Take a big step forward with one leg and lower your body until your front knee is at a 90-degree angle. Push back up to the starting position.',
    type: 'Strength',
    target: 'Legs',
    duration: 3,
  },
  {
    name: 'Plank',
    description: 'Get into a high plank position. Engage your core and make sure your body forms a straight line from your head to your feet. Hold this position.',
    type: 'Core',
    target: 'Core',
    duration: 1,
  },
  {
    name: 'Mountain Climbers',
    description: 'Get into a high plank position. Bring one knee up towards your chest, then switch and bring the other knee up while extending the first leg back out. Keep alternating legs.',
    type: 'Cardio',
    target: 'Full body',
    duration: 1,
  },
  {
    name: 'Bicep Curls',
    description: 'Stand with your feet hip-width apart, holding a dumbbell in each hand with your palms facing forward. Bend your elbows and curl the weights up towards your shoulders. Lower back down to the starting position.',
    type: 'Strength',
    target: 'Arms',
    duration: 2,
  },
  {
    name: 'Tricep Dips',
    description: 'Sit on the edge of a chair or bench. Place your hands on the edge next to your hips. Slide your butt off the edge and lower your body down by bending your elbows. Push back up to the starting position.',
    type: 'Strength',
    target: 'Arms',
    duration: 2,
  },
  {
    name: 'Russian Twists',
    description: 'Sit on the floor with your knees bent and feet flat. Lean back slightly and lift your feet off the floor. Hold your hands together and twist your torso from side to side.',
    type: 'Core',
    target: 'Core',
    duration: 1,
  },
  {
    name: 'Calf Raises',
    description: 'Stand with your feet hip-width apart, holding onto something for balance if needed. Raise up onto your tiptoes, then lower back down.',
    type: 'Strength',
    target: 'Lower body',
    duration: 2,
  },
  {
    name: 'Glute Bridges',
    description: 'Lie on your back with your knees bent and feet flat on the floor. Lift your hips up off the floor until your body forms a straight line from your shoulders to your knees.',
    type: 'Strength',
    target: 'Lower body',
    duration: 2,
  },
  {
    name: 'Arm Circles',
    description: 'Stand with your feet hip-width apart and extend your arms out to the sides. Make small circles with your arms, then gradually make the circles larger.',
    type: 'Warm-up',
    target: 'Upper body',
    duration: 1,
  },
];

let currentExerciseIndex = 0;

function updateUpNextExercise() {
  const upNextExercise = exerciseList[currentExerciseIndex + 1];
  if (upNextExercise) {
    document.getElementById('exercise-name').textContent = upNextExercise.name;
    document.getElementById('exercise-description').textContent = upNextExercise.description;
  } else {
    document.getElementById('exercise-name').textContent = 'Congratulations! You have completed all exercises.';
    document.getElementById('exercise-description').textContent = '';
  }

  const chatbotMessage = generateChatbotMessage(upNextExercise);
  document.getElementById('chatbot-message').textContent = chatbotMessage;
}

function generateChatbotMessage(exercise) {
  const message = `You have completed the ${exercise.name} exercise. It is a ${exercise.type} exercise that targets ${exercise.target}. The duration of this exercise is ${exercise.duration} minutes. Remember to stretch after your workout.`;
  return message;
}

const webcam = document.getElementById('webcam');
const startExerciseButton = document.getElementById('start-exercise');
const stopExerciseButton = document.getElementById('stop-exercise');
const timer = document.getElementById('timer');
const chatbotMessage = document.getElementById('chatbot-message');
const chatbotInput = document.getElementById('chatbot-input');

let exerciseTimer;
let exerciseDuration = 60; // in seconds
let exerciseStartTime;

// Set up webcam
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    webcam.srcObject = stream;
    webcam.play();
  })
  .catch(error => {
    console.error('Error accessing webcam:', error);
  });

// Set up chatbot
const chatbotServerUrl = 'https://your-chatbot-server.com'; // Replace with your chatbot server URL

function handleChatbotInput(event) {
  if (event.key === 'Enter') {
    const inputText = event.target.value;
    sendChatbotMessage(inputText);
    event.target.value = '';
  }
}

function sendChatbotMessage(message) {
  fetch(`${chatbotServerUrl}/send-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
    .then(response => response.json())
    .then(data => {
      chatbotMessage.innerText = data.message;
    })
    .catch(error => {
      console.error('Error sending chatbot message:', error);
    });
}

function startExercise() {
  startExerciseButton.style.display = 'none';
  stopExerciseButton.style.display = 'block';
  exerciseStartTime = new Date();
  exerciseTimer = setInterval(() => {
    const elapsedTime = Math.floor((new Date() - exerciseStartTime) / 1000);
    timer.innerText = formatTime(exerciseDuration - elapsedTime);
    if (elapsedTime >= exerciseDuration) {
      stopExercise();
      currentExerciseIndex++;
      updateUpNextExercise();
    }
  }, 1000);
  sendChatbotMessage('Starting exercise...');
}

function stopExercise() {
  startExerciseButton.style.display = 'block';
  stopExerciseButton.style.display = 'none';
  clearInterval(exerciseTimer);
  sendChatbotMessage('Exercise stopped.');
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}