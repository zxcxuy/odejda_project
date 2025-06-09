document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.welcome-popup');
    const closeBtn = document.querySelector('.welcome-popup__close');
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 200);
    
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
        popup.classList.remove('active');
        }
    });
});