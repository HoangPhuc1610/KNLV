   //hamburger menu
    // JavaScript để làm menu hamburger hoạt động
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('mainMenu');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
    console.log('Hamburger menu script loaded.');

// Lấy tất cả các dropdown
const dropdowns = document.querySelectorAll('.dropdown');

// Thêm sự kiện khi nhấn vào dropdown
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    dropdownLink.addEventListener('click', function(event) {
        // Ngăn không cho link chuyển trang khi nhấn
        event.preventDefault();
        
        // Toggle class 'open' để mở hoặc đóng menu
        dropdown.classList.toggle('open');
        
        // Đảm bảo rằng khi nhấn vào một dropdown thì các dropdown khác sẽ đóng lại
        dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('open');
            }
        });
    });

    // Đảm bảo khi nhấn bên ngoài dropdown thì dropdown cũng sẽ đóng lại
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
});

   
   
   // Toggle Steps Section
   const toggleStepsBtn = document.querySelector('.toggle-steps-btn');
   const stepsContent = document.querySelector('.steps-content');

   toggleStepsBtn.addEventListener('click', () => {
       stepsContent.classList.toggle('hidden');
       toggleStepsBtn.textContent = stepsContent.classList.contains('hidden') ? 'Hiện các bước' : 'Ẩn các bước';

       // Add fade-in effect when showing steps
       if (!stepsContent.classList.contains('hidden')) {
           stepsContent.style.opacity = '0';
           setTimeout(() => {
               stepsContent.style.opacity = '1';
           }, 50);
       }
   });

   // Toggle Favorite Button
   function toggleFavorite() {
       const favoriteBtn = document.querySelector('.favorite-btn');
       const favoriteIcon = document.querySelector('.favorite-icon');
       const isFavorited = favoriteBtn.classList.toggle('favorited');

       if (isFavorited) {
           favoriteIcon.textContent = '💖';
           favoriteBtn.innerHTML = '<span class="favorite-icon">💖</span> Đã thêm vào yêu thích';
       } else {
           favoriteIcon.textContent = '❤️';
           favoriteBtn.innerHTML = '<span class="favorite-icon">❤️</span> Thêm vào yêu thích';
       }
   }

   // Smooth Scrolling for Anchor Links
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
           e.preventDefault();
           document.querySelector(this.getAttribute('href')).scrollIntoView({
               behavior: 'smooth'
           });
       });
   });