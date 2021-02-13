// IE11 Polyfill to NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

import Siema from 'siema'

import { Product, ProductProps, PRODUCT_CLASSES } from './classes/Product'

import { Navigation, NAVIGATION_ACTIVE_LINK_CLASS } from './classes/Navigation'

// Creates Products from HTML Markup

document.querySelectorAll<HTMLElement>('.product').forEach((i: HTMLElement) => {
    new Product(i);
});

// Extends Siema prototype to make able to create pagination.

Siema.prototype.addPagination = function(sliderPagination: HTMLElement) {

    this.innerElements.forEach((item: HTMLElement, index: number) => {
        const elem: HTMLElement = document.createElement('div');
        elem.classList.add('slider__pagination-item');

        if(this.currentSlide === index) {
            elem.classList.add('slider__pagination-item_current');
        }

        elem.addEventListener('click', () => { 
            this.goTo(index);
        });

        if(sliderPagination !== null) sliderPagination.appendChild(elem);
    });
}

// Slider initialization

const sliderElm: HTMLElement | null = document.querySelector('.slider');
const SLIDER_TIME_TO_SWITCH: number =  3000;

if(sliderElm !== null) {
    const sliderPagination: HTMLElement | null = sliderElm!.querySelector('.slider__pagination');

    let slider = new Siema({
        selector: '.slider__slides',
        perPage: 1,
        threshold: 100,
        loop: true,
        onChange: function() {
            sliderPagination?.querySelectorAll<HTMLElement>('.slider__pagination-item').forEach((item: HTMLElement, index: number) => {
                item.classList.remove('slider__pagination-item_current');
                if(this.currentSlide === index) item.classList.add('slider__pagination-item_current');
            });
        }
    });

    slider.addPagination(sliderPagination)

    setInterval(() => slider.next(), SLIDER_TIME_TO_SWITCH);
}

// Hooks to Html navigation markup.

let nav: HTMLElement | null = document.querySelector('.navigation');

if(nav !== null) {
    let navController: Navigation;

    try {
        navController = new Navigation(nav);
    } catch(e) {
        console.error(e);

        nav.querySelectorAll<HTMLLinkElement>(`.${NAVIGATION_ACTIVE_LINK_CLASS}`).forEach((i: HTMLLinkElement) => {
            if(location.href === i.href) return;
            i.classList.remove(NAVIGATION_ACTIVE_LINK_CLASS);
        });

        navController = new Navigation(nav);
    }

    // Adds side effect to click on link, it will be useful for animations, popups (advertisment, for example).
    
    navController.addEventToAllLinks('click', (e: Event, link: HTMLLinkElement, index: number) => {
            e.preventDefault();
            navController.changeActiveLink(index);
    
            setTimeout(() => {
                let href = link.getAttribute('href');
                if(href) location.assign(href);
            }, 300);
    });
}

//  Footer initialization

let footer: HTMLElement | null = document.querySelector('.footer');

if(footer !== null) {
    footer.innerHTML = `Copyright © 2019-${new Date().getFullYear()}, BERIONLINE.RU`;
}

// Disclaimer popup and Policy

let disclaimer: HTMLElement | null = document.querySelector('.disclaimer');
let disclaimerBtn: HTMLElement | null = document.querySelector('.disclaimer__btn');
let disclaimerPolicy: HTMLElement | null = document.querySelector('.disclaimer__link');
let policy: HTMLElement | null = document.querySelector('.policy');

if(disclaimer !== null && !localStorage.getItem('disclaimer')) {
    disclaimer.classList.remove('disclaimer_hidden');
}

if(disclaimerBtn !== null && disclaimerPolicy !== null && policy !== null) {
    
    disclaimerBtn?.addEventListener('click', () => {
        localStorage.setItem('disclaimer', '1');
        disclaimer?.classList.add('disclaimer_hidden');
    });

    disclaimerPolicy?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        document.body.style.overflowY = 'hidden';

        if(policy !== null) {
            policy.classList.remove('policy_hidden');
        }
    });

    policy?.addEventListener('click', (e: Event) => {
        let elms: NodeListOf<HTMLElement> | undefined = policy?.querySelectorAll<HTMLElement>('*');

        if(e.target === policy) {
            document.body.style.overflowY = 'scroll';
            policy?.classList.add('policy_hidden');
        }
    });
}