document.getElementById('problem-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const problem = document.getElementById('problem').value;

    const response = await fetch('solutions.json');
    const data = await response.json();

    const solution = data[problem][gender][age];

    if (solution) {
        document.getElementById('solution-text').textContent = solution;
        document.getElementById('solution').style.display = 'block';
    } else {
        alert('No solution found for the given age, gender, and problem.');
    }
});