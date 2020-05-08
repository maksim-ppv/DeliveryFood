'use strict';

const cartButton = document.querySelector('#cart-button'),
			modal = document.querySelector(".modal"),
			close = document.querySelector(".close"),
			buttonAuth = document.querySelector('.button-auth'),
			modalAuth = document.querySelector('.modal-auth'),
			closeAuth = document.querySelector('.close-auth'),
			logInForm = document.querySelector('#logInForm'),
			loginInput = document.querySelector('#login'),
			userName = document.querySelector('.user-name'),
			buttonOut = document.querySelector('.button-out'),
      cardsRestaurans = document.querySelector('.cards-restaurants'),
      containerPromo = document.querySelector('.container-promo'),
      restaurants = document.querySelector('.restaurants'),
      menu = document.querySelector('.menu'),
      logo = document.querySelector('.logo'),
      cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');


const getData = async (url) => {

    const response = await fetch(url);

    if(!response.ok){
      throw new Error (`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
    }

    return await response.json();
};


const valid = (str) => {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    return nameReg.test(str);
};
const toogleModal = () => {
	modal.classList.toggle('is-open');
};

const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
	loginInput.style.borderColor = '';
};

const authorized = () => {
		const logOut = () => {
			login = null;
			localStorage.removeItem('gloDelivery');
			buttonAuth.style.display = '';
			userName.style.display = '';
			buttonOut.style.display = '';
			buttonOut.removeEventListener('click', logOut)
      checkAuth();
      returnMain();
		};
		userName.textContent = login;

		buttonAuth.style.display = 'none';
		userName.style.display = 'inline';
		buttonOut.style.display = 'block';

		buttonOut.addEventListener('click', logOut)
};

const notAuthorized = () => {
	
	const logIn = (event) =>{
		event.preventDefault();
		if(valid(loginInput.value.trim())){
      login = loginInput.value;
			localStorage.setItem('gloDelivery', login);
			toogleModalAuth();
			buttonAuth.removeEventListener('click', toogleModalAuth);
			closeAuth.removeEventListener('click', toogleModalAuth);
			logInForm.removeEventListener('submit', logIn);
			logInForm.reset();
			checkAuth();
		}else{
      loginInput.style.borderColor = 'tomato';
      loginInput.value = '';
		}
	};

	buttonAuth.addEventListener('click', toogleModalAuth);
	closeAuth.addEventListener('click', toogleModalAuth);
	logInForm.addEventListener('submit', logIn);
};

const checkAuth = () => {
	if(login){
		authorized();
	}else{
		notAuthorized();
	}
};

const createCardRestaurant = (restaurant) => {

    const { image, kitchen, name, price, products, stars, time_of_delivery:timeOfDelivery } = restaurant;

		const card = `
                  <a class="card card-restaurant" data-products="${products}">
                          <img src="${image}" alt="image" class="card-image"/>
                          <div class="card-text">
                              <div class="card-heading">
                                <h3 class="card-title">${name}</h3>
                                <span class="card-tag tag">${timeOfDelivery} мин</span>
                              </div>
                              <div class="card-info">
                                <div class="rating">
                                      ${stars}
                                </div>
                                <div class="price">От ${price} ₽</div>
                                <div class="category">${kitchen}</div>
                              </div>
                          </div>
                    </a>
		`;
  cardsRestaurans.insertAdjacentHTML('beforeend',card);
		
};

const createCardGood = (goods) => {

    const { description, id, image, name, price } = goods;

    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend',`
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">${description}
                </div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">${price} ₽</strong>
              </div>
            </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend',card);

};

const openGoods = (event) => {
    const target = event.target;
    if(login){
      const restaurant = target.closest('.card-restaurant');
      if(restaurant){
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        getData(`./db/${restaurant.dataset.products}`).then((data) => {
          data.forEach(createCardGood);
        });
      }
    }else{
      toogleModalAuth();
    }
};

const init = () => {
  getData('./db/partners.json').then((data) => {
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener('click', toogleModal);
  
  close.addEventListener('click', toogleModal);
  
  cardsRestaurans.addEventListener('click', openGoods);
  
  logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
  });
  
  checkAuth();
  
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 1000
    },
    sliderPerView: 2,
  })
};

init();