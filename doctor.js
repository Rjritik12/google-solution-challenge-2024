const form = document.getElementById("appointment-form");
const ratingContainer = document.getElementById("rating-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());
  // Send data to server for appointment booking
  // Display rating container after successful booking
  setTimeout(() => {
    ratingContainer.hidden = false;
  }, 1000);
});

function rateDoctor(rating) {
  // Send rating to server for doctor rating
  alert(`Doctor rated ${rating}`);
}