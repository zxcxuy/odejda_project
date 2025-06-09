let likedItems = JSON.parse(localStorage.getItem('likes')) || [];

document.querySelectorAll('.content__main_locate_wrap_btn-like').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const id = this.dataset.id;
        const name = this.dataset.name;
        const img = this.dataset.img;
        const page = this.dataset.page;
        const locate = this.dataset.locate;

        const index = likedItems.findIndex(item => item.id === id);

        if (index === -1) {
            likedItems.push({ id, name, img, page, locate });
            this.classList.add('active');
        } else {
            likedItems.splice(index, 1);
            this.classList.remove('active');
        }

        localStorage.setItem('likes', JSON.stringify(likedItems));
    });

    if (likedItems.some(item => item.id === btn.dataset.id)) {
        btn.classList.add('active');
    }
});