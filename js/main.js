const cartButton = document.getElementById('cart-button');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close')


cartButton.addEventListener('click', e =>{
    modal.classList.add('is-open')   
});

modalClose.addEventListener('click', e=>{
    modal.classList.remove('is-open')
});

new WOW().init();
