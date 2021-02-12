document.body.addEventListener('transitionend', (event: Event) => {

    if(event.target == document.body) {
        console.log(1)
        document.querySelector('.back-btn')!.classList.remove('back-btn_hidden');
    }
})

window.onload = () => {
    document.body.style.backgroundColor = "#333";
}