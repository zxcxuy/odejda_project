const svgPlaceholder = `
<svg xmlns="http://www.w3.org/2000/svg" width="170px" viewBox="0 0 24 24" fill="none"
    stroke="#adadad99" stroke-linecap="round" stroke-linejoin="round"
    class="content__main_locate_wrap_svg">
    <desc>
        Circle Slash 2 Streamline Icon: https://streamlinehq.com
    </desc>
    <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" stroke-width="2"></path>
    <path d="M22 2 2 22" stroke-width="2"></path>
</svg>`
const btnsLeft = document.querySelectorAll(".left");
const btnHeadLeft = btnsLeft[0];
const btnBodyLeft = btnsLeft[1];
const btnLegsLeft = btnsLeft[2];
const btnFeetLeft = btnsLeft[3];
const btnsRight = document.querySelectorAll(".right");
const btnHeadRight = btnsRight[0];
const btnBodyRight = btnsRight[1];
const btnLegsRight = btnsRight[2];
const btnFeetRight = btnsRight[3];
const wrap = document.querySelectorAll(".content__main_locate_wrap");
const wrapHead = wrap[0];
const wrapBody = wrap[1];
const wrapLegs = wrap[2];
const wrapFeet = wrap[3];
const btnMenSort = document.querySelector("[data-filter='male']");
const btnWomenSort = document.querySelector("[data-filter='female']");
const btnUniSort = document.querySelector("[data-filter='unisex']");
const btnResetSort = document.querySelector("#btn-reset");
const btnBalenciagaSort = document.querySelector("[data-filter='balenciaga']");
const btnsLike = document.querySelectorAll('.content__main_locate_wrap_btn-like');
const btnLikeHead = btnsLike[0];
const btnLikeBody = btnsLike[1];
const btnLikeLegs = btnsLike[2];
const btnLikeFeet = btnsLike[3];
let idHead = 0;
let idBody = 0;
let idLegs = 0;
let idFeet = 0;
// sort default
const filter = {
    filterCurrentSex: false,
    filterCurrentBrand: false
}

btnHeadRight.addEventListener('click', () => {
    idHead++;
    updateImage(idHead, "head");
});
btnHeadLeft.addEventListener('click', () => {
    idHead--;
    updateImage(idHead, "head");
});
btnBodyRight.addEventListener('click', () => {
    idBody++;
    updateImage(idBody, "body");
});
btnBodyLeft.addEventListener('click', () => {
    idBody--;
    updateImage(idBody, "body");
});
btnLegsRight.addEventListener('click', () => {
    idLegs++;
    updateImage(idLegs, "legs");
});
btnLegsLeft.addEventListener('click', () => {
    idLegs--;
    updateImage(idLegs, "legs");
});
btnFeetRight.addEventListener('click', () => {
    idFeet++;
    updateImage(idFeet, "feet");
});
btnFeetLeft.addEventListener('click', () => {
    idFeet--;
    updateImage(idFeet, "feet");
});

//sort listeners
btnMenSort.addEventListener('click', () => {
    filter.filterCurrentSex = 1;
    updateFilter();
})
btnWomenSort.addEventListener('click', () => {
    filter.filterCurrentSex = 0;
    updateFilter();
})
btnUniSort.addEventListener('click', () => {
    filter.filterCurrentSex = 2;
    updateFilter();
})
btnBalenciagaSort.addEventListener('click', () => {
    filter.filterCurrentBrand = "balenciaga";
    updateFilter();
})
btnResetSort.addEventListener('click', () => {
    filter.filterCurrentSex = false;
    filter.filterCurrentBrand = false;
    updateFilter();
})

function updateImage(locate_id, locate) {
    fetchInfo(locate_id, locate)
        .then(filtered => {
            if (filtered.length === 0) {
                // console.log('Нет данных для данного locate и locate_id');
                return;
            }

            const product = filtered[0];
            let container;
            let img;

            switch (locate) {
                case 'head':
                    container = wrapHead;
                    break;
                case 'body':
                    container = wrapBody;
                    break;
                case 'legs':
                    container = wrapLegs;
                    break;
                case 'feet':
                    container = wrapFeet;
                    break;
                default:
                    console.error('Неизвестный locate:', locate);
                    return;
            }

            const svg = container.querySelector('.content__main_locate_wrap_svg');
            if (svg) {
                svg.remove();
            }

            img = container.querySelector('img.content__main_locate_wrap_img');
            if (!img) {
                img = document.createElement('img');
                img.className = 'content__main_locate_wrap_img';
                img.alt = '';
                container.prepend(img);
            }

            switch (locate) {
                case 'head':
                    img.id = 'img-head';
                    break;
                case 'body':
                    img.id = 'img-body';
                    break;
                case 'legs':
                    img.id = 'img-legs';
                    break;
                case 'feet':
                    img.id = 'img-feet';
                    break;
            }

            img.src = product.LinkImg;
            img.alt = product.Name;

            const btnLike = container.querySelector(".content__main_locate_wrap_btn-like")
            btnLike.classList.remove('disabled');
            btnLike.setAttribute('data-id', product.id);
            btnLike.setAttribute('data-name', product.Name);
            btnLike.setAttribute('data-img', product.LinkImg);
            btnLike.setAttribute('data-page', product.LinkPage);
            btnLike.setAttribute('data-locate', product.Locate);
            updateLike(product, btnLike);

            const linkPageElem = container.closest('.content__main_locate_wrap');
            linkPageElem.href = product.LinkPage;

            // console.log(`Обновлено изображение для ${locate} с locate_id ${locate_id}`);
        })
        .catch(err => {
            console.error('Ошибка при обновлении изображения:', err);
        });
}


async function fetchInfo(locate_id, locate) {
    const response = await fetch('https://dummyjson.com/c/a3e0-25af-48d6-babd');
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();

    let filtered;
    filtered = data.filter(item => item.Locate === locate);
    if (filter.filterCurrentSex) {
        filtered = filtered.filter(item => item.Sex === filter.filterCurrentSex)
    }
    if (filter.filterCurrentBrand) {
        filtered = filtered.filter(item => item.Brand === filter.filterCurrentBrand)
    }

    const idMap = {
        head: idHead,
        body: idBody,
        legs: idLegs,
        feet: idFeet
    };

    if (!(locate in idMap)) {
        throw new Error(`Неизвестное значение locate: ${locate}`);
    }

    let currentId = locate_id;

    if (filtered.length < currentId || currentId <= 0) {
        if (filtered.length < currentId) {
            currentId = 1;
        }
        else if (currentId <= 0) {
            currentId = filtered.length;
        }
        switch (locate) {
            case 'head':
                idHead = currentId;
                break;
            case 'body':
                idBody = currentId;
                break;
            case 'legs':
                idLegs = currentId;
                break;
            case 'feet':
                idFeet = currentId;
                break;
        }
        // console.log('Обновлен locate_id для', locate, ':', currentId);
    }

    filtered = [filtered[currentId - 1]]
    // const filtered = filteredByLocate.filter(item => item.locate_id === currentId);
    // console.log(filtered)
    return filtered;
}


function updateFilter() {
    wrapHead.innerHTML = svgPlaceholder;
    wrapHead.append(btnLikeHead);
    wrapBody.innerHTML = svgPlaceholder;
    wrapBody.append(btnLikeBody);
    wrapLegs.innerHTML = svgPlaceholder;
    wrapLegs.append(btnLikeLegs);
    wrapFeet.innerHTML = svgPlaceholder;
    wrapFeet.append(btnLikeFeet);

    idHead = 0;
    idBody = 0;
    idLegs = 0;
    idFeet = 0;

    wrapHead.removeAttribute("href");
    wrapBody.removeAttribute("href");
    wrapLegs.removeAttribute("href");
    wrapFeet.removeAttribute("href");

    [btnLikeHead, btnLikeBody, btnLikeLegs, btnLikeFeet].forEach(btn => {
        if (!btn.classList.contains('disabled')) {
            btn.classList.add('disabled');
        }
    });
}

function updateLike(product, btn) {
    const likes = JSON.parse(localStorage.getItem('likes')) || [];
    const result = likes.filter(item => item.id === String(product.id));
    console.log(result);
    if (result.length !== 0) {
        btn.classList.add('active');
    }
    else {
        btn.classList.remove('active');
    }
}