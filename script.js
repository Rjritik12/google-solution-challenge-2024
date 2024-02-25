document.addEventListener('DOMContentLoaded', function() {
    const exerciseButton = document.querySelector('#exercise button');
    const dietButton = document.querySelector('#diet button');
    const ayurvedicButton = document.querySelector('#ayurvedic button');
    const yogaButton = document.querySelector('#yoga button');
    const doctorButton = document.querySelector('#doctor button');

    exerciseButton.addEventListener('click', function() {
        window.location.href = 'exercise.html';
    });

    dietButton.addEventListener('click', function() {
        window.location.href = 'diet.html';
    });

    ayurvedicButton.addEventListener('click', function() {
        window.location.href = 'ayurvedic.html';
    });

    yogaButton.addEventListener('click', function() {
        window.location.href = 'yoga.html';
    });

    doctorButton.addEventListener('click', function() {
        window.location.href = 'doctor.html';
    });
});