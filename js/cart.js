document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content__main-cart');
    const likedItems = JSON.parse(localStorage.getItem('likes')) || [];

    if (likedItems.length === 0) {
        container.innerHTML = '<p class="cart_paragraph-no-items">Вы ещё ничего не лайкнули</p>';
        container.setAttribute('style', 'justify-content: center')
        return;
    }

    container.innerHTML = likedItems.map(item => `
        <div class="content__main-cart_card" data-id="${item.id}">
        <a class="card_wrap" href="${item.page}" target="_blank">
        <img src="${item.img}" alt="${item.name}" class="card_wrap_img ${item.locate}">
        </a>
        <a href="${item.page}" target="_blank"><h3 class="card_heading">${item.name}</h3></a>
        <button class="content__main_locate_wrap_btn-like active" type="button" title="like button" style="opacity: 1; right: 16px">
            <svg class="like-icon" viewBox="0 0 24 24" style="width: 35px; height: 35px;">
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </button>
        </div>
    `).join('');
});