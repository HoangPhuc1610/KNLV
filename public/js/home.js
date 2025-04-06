// Toggle menu khi nhấn hamburger
function toggleMenu() {
    const menu = document.getElementById("mainMenu");
    menu.classList.toggle("active");
}

// Cho dropdown hoạt động trên mobile
document.addEventListener("DOMContentLoaded", () => {
    const dropdownLinks = document.querySelectorAll(".dropdown > a");

    dropdownLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle("open");
            }
        });
    });
});
