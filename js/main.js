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


const toogleModal = () => {
	modal.classList.toggle('is-open');
};

const toogleModalAuth = () => {
	loginInput.style.borderColor = '';
	modalAuth.classList.toggle('is-open');
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
		if(loginInput.value.trim()){
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

const createCardRestaurant = () => {
		const card = `
                  <a class="card card-restaurant">
                          <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
                          <div class="card-text">
                              <div class="card-heading">
                                <h3 class="card-title">Пицца плюс</h3>
                                <span class="card-tag tag">50 мин</span>
                              </div>
                              <div class="card-info">
                                <div class="rating">
                                      4.5
                                </div>
                                <div class="price">От 900 ₽</div>
                                <div class="category">Пицца</div>
                              </div>
                          </div>
                    </a>
		`;
  cardsRestaurans.insertAdjacentHTML('beforeend',card);
		
};

const createCardGood = () => {
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend',`
            <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Везувий</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
                  «Халапенье», соус «Тобаско», томаты.
                </div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">545 ₽</strong>
              </div>
            </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend',card);

};

const openGoods = (event) => {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    
    if(restaurant){
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      cardsMenu.textContent = '';

      createCardGood();
      createCardGood();
      createCardGood();
    }
};

cartButton.addEventListener('click', toogleModal);

close.addEventListener('click', toogleModal);

cardsRestaurans.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
      containerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');
});

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();