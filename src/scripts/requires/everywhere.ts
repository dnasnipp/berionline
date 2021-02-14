// IE11 Polyfill for NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    }
}

//  Footer initialization

let footer: HTMLElement | null = document.querySelector('.footer');

if(footer !== null) {
    footer.innerHTML = `Copyright © 2019-${new Date().getFullYear()}, BERIONLINE.RU`;
}