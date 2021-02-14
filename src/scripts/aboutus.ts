require('./requires/everywhere');

function isPartiallyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();
    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;
 
    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

const changeCardsVisibility: () => void = () => {
    
    let cards: NodeListOf<HTMLElement> | null = document.querySelectorAll('.cards__card_hidden');

    cards.forEach((i: HTMLElement, index: number) => {
        
        if(isPartiallyVisible(i)) {
            setTimeout(() => {
                i.classList.remove('cards__card_hidden');
            }, (index+1)*300);
        }
    });
}


document.body.addEventListener('transitionend', (event: Event) => {

    let btn: HTMLElement | null = document.querySelector('.back-btn');
    let title: HTMLElement | null = document.querySelector('.main__text');

    if(btn !== null) {

        if(event.target == document.body) {
            btn.classList.remove('back-btn_hidden');
        }
    
        if(event.target === btn && title !== null) {
            title.classList.remove('main__text_hidden')
        }
    }
})

window.onload = () => {
    document.body.style.backgroundColor = "#333";
    changeCardsVisibility();
}

window.onscroll = () => {
    changeCardsVisibility();
}
