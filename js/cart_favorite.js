let likedItems = JSON.parse(localStorage.getItem('likes')) || [];

function saveLikes() {
    localStorage.setItem('likes', JSON.stringify(likedItems));
}

function updateCardsDisplay() {
    const allCards = document.querySelectorAll('.content__main-cart_card');

    allCards.forEach(card => {
        const likeBtn = card.querySelector('.content__main_locate_wrap_btn-like');
        const itemId = card.dataset.id;
        const isLiked = likedItems.some(item => item.id === itemId);

        if (likeBtn) {
            likeBtn.classList.toggle('active', isLiked);
        }

        if (window.location.pathname.includes('cart.html')) {
            card.style.display = isLiked ? 'block' : 'none';
        }
    });
}

function handleLikeClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const card = this.closest('.content__main-cart_card');
    const itemId = card.dataset.id;
    const item = {
        id: itemId,
        name: card.querySelector('.card_heading').textContent,
        img: card.querySelector('.card_wrap_img').src,
        page: card.href
    };

    const itemIndex = likedItems.findIndex(i => i.id === itemId);
    if (itemIndex === -1) {
        likedItems.push(item);
    } else {
        likedItems.splice(itemIndex, 1);
    }

    saveLikes();
    updateCardsDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.content__main_locate_wrap_btn-like').forEach(btn => {
        btn.addEventListener('click', handleLikeClick);
    });

    updateCardsDisplay();
});