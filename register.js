// JavaScript for the register page
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Registration successful!");
    this.reset();
});




// scripts.js
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
