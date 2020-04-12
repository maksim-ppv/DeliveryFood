const cartButton = document.getElementById('cart-button');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const logo = document.querySelectorAll('.logo');


cartButton.addEventListener('click', e => {
    modal.classList.add('is-open')   
});

modalClose.addEventListener('click', e=> {
    modal.classList.remove('is-open')
});


const animationActive = (i, time, animeActive, animeDeactive) => {
    i.addEventListener('mouseover', e=>{
        i.style.animationName = animeActive;
        i.style.animationDuration = time+'s';
        if(i.classList.contains('wow')){
            i.classList.remove('wow', animeDeactive)
        };
        setTimeout(() => i.style.animationName='', time*1000-100)
    });
};

logo.forEach(i=>{
    animationActive(i, 1, 'pulse', 'fadeInRight');
});
wow = new WOW({
    mobile: false,
    offset: 100

})
wow.init();
