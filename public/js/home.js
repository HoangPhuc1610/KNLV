
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mainMenu');
const dropdownLinks = document.querySelectorAll('.dropdown > a');

// Toggle menu chính
hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Toggle menu con trên mobile
dropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Ngăn reload
            const parent = this.parentElement;
            parent.classList.toggle('open');
        }
    });
});