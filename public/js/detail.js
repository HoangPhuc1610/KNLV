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