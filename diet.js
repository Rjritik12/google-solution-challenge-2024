const dietForm = document.getElementById('diet-form');
const dietInfo = document.getElementById('diet-info');
const dietName = document.getElementById('diet-name');
const dietDescription = document.getElementById('diet-description');
const startDietButton = document.getElementById('start-diet');
const stopDietButton = document.getElementById('stop-diet');
const dietTimer = document.getElementById('diet-timer');
let dietTimerInterval;

dietForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const bodyType = dietForm.elements['body-type'].value;
    const dietaryPreference = dietForm.elements['dietary-preference'].value;
    getDietPlan(bodyType, dietaryPreference);
});

function getDietPlan(bodyType, dietaryPreference) {
    // Make an API call to get the diet plan based on the selected body type and dietary preference
    // and populate the diet-info section with the returned data
    dietInfo.style.display = 'block';
    dietName.innerText = 'Diet Plan for ' + bodyType + ' - ' + dietaryPreference;
    dietDescription.innerText = 'This is a sample diet plan for ' + bodyType + ' with ' + dietaryPreference + ' diet.';
    startDiet();
}

function startDiet() {
    startDietButton.style.display = 'none';
    stopDietButton.style.display = 'block';
    dietTimerInterval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - dietStartTime) / 1000);
        dietTimer.innerText = formatTime(elapsedTime);
    }, 1000);
}

function stopDiet() {
    startDietButton.style.display = 'block';
    stopDietButton.style.display = 'none';
    clearInterval(dietTimerInterval);
    dietTimer.innerText = '0:00';
}

let dietStartTime;
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}