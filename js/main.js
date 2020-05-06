const cartButton = document.querySelector('#button'),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close"),
      buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

const toogleModalAuth = () => {
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
    login = loginInput.value;

    localStorage.setItem('gloDelivery', login);

    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth);
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
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

checkAuth();