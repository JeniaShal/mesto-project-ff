import './pages/index.css';
// import { initialCards } from './cards';
import { 
  deleteCard,
  createCard,
  handleLike,
  toggleDelButton
 } from './components/card';

import { 
  openModalCard,
  onClose,
} from './components/modals';

import { 
  clearValidation, 
  enableValidation 
} from './components/validation';

import {
  getProfileData,
  getInitialCards,
  editProfile,
  addCardToServer
} from './components/api';


// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');      //кнопка редактирования профиля
const profileTitle = document.querySelector('.profile__title');                 //заголовок с именем профиля, нужен, чтобы отображаться при открытии формы редактирования профиля
const profileDescribtion = document.querySelector('.profile__description');     //заголовок с работой, нужен, чтобы отображаться при открытии формы редактирования профиля
const formElement = document.querySelector('.popup__form');                     //форма редактирования (общая)
const nameInput = formElement.querySelector('.popup__input_type_name');         //поле имени
const jobInput = formElement.querySelector('.popup__input_type_description');   //поле вида деятельности
const popupEdit = document.querySelector('.popup_type_edit');                   //попап редактирования профиля 


//добавление карточки
const newCardButton = document.querySelector('.profile__add-button');           //кнопка добавления карточки
const newPlaceForm = document.forms.new_place;                                  //форма добавления новой карточки
const placeInput = newPlaceForm.elements.place_name;                            //поле названия карточки
const urlInput = newPlaceForm.elements.link;                                    //поле ссылки на карточку
const popupAdd = document.querySelector('.popup_type_new-card');                //попап добавления новой карточки
const cardContent = document.querySelector('.popup_type_image');                //контейнер большой карточки 
const cardLargeImage = cardContent.querySelector('.popup__image');              //большая карточка
const cardCaption = cardContent.querySelector('.popup__caption');               //подпись к карточке

//общее
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));  //массив кнопок закрытия 
const modalCards = Array.from(document.querySelectorAll('.popup'));             //массив модальных окон
const profileImage = document.querySelector('.profile__image');                 //картинка профиля

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

// Функция выведения большой карточки
function showCardContent(item) {
  cardLargeImage.src = item.link;
  cardLargeImage.alt = item.name;
  cardCaption.textContent = item.name;
  openModalCard (cardContent);
};

// Функция открытия модального окна "редактировать профиль" 
function openProfileEditPopup () {
  openModalCard (popupEdit);
  getProfileData()
  .then((profile) => {
    nameInput.value = profile.name
    jobInput.value = profile.about
  })
}

// Функция открытия модального окна "добавить карточку" 
function openProfileAddPopup () {
  openModalCard (popupAdd);
}

//Функция сабмита модального окна "добавить карточку"
function handleAddFormSubmit(evt){
  evt.preventDefault();
  const item = {};
  Promise.all([getProfileData(), addCardToServer()])
  .then (([profile, data]) =>{
  const card = createCard(data, profile, deleteCard, showCardContent, handleLike);
  cardContainer.prepend(card)
})
  newPlaceForm.reset();
  onClose(popupAdd);
  clearValidation (popupAdd, validationConfig);
}

// Функция сабмита модального окна "редактировать профиль"
function handleEditFormSubmit(evt){
  evt.preventDefault();
  editProfile()
  .then ((profile) => {
    profileTitle.textContent = profile.name
    profileDescribtion.textContent = profile.about
  })
  .catch((error) => {
    console.log(error)
  })
  onClose (popupEdit);
  clearValidation (popupEdit, validationConfig);
}

Promise.all([getProfileData(), getInitialCards()])
  .then (([profile, cards]) => {
    profileTitle.textContent = profile.name
    profileDescribtion.textContent = profile.about
    profileImage.style.backgroundImage = `url(${profile.avatar})`
    cards.forEach (function(item) {
      const card = createCard(item, profile, deleteCard, showCardContent, handleLike);                                    
      cardContainer.append(card);
    })
  })
  .catch ((error) => {
    console.log(error)
  })


// Запуск обработчика ввода на все формах документа
enableValidation(validationConfig); 


// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', openProfileEditPopup);

// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', handleEditFormSubmit);
  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', openProfileAddPopup);

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', handleAddFormSubmit);

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
popupCloseButtons.forEach (function (button) {
  button.addEventListener('click', function () {
    const modalCard = button.closest('.popup');
    onClose(modalCard);
  });
})

// Обработчик слушателя закрытия по оверлею на все модальные окна
modalCards.forEach (function (modalCard) {
  modalCard.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose(modalCard);
    }      
  });
});



























//  fetch('https://nomoreparties.co/v1/wff-cohort-10', {
//   headers: {
//     authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

// fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-10/cards', {
//   headers: {
//     authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512'}
// })
//   .then ((res) => {
//     return res.json()
//   })
//   .then ((data) => {
//     console.log(data)
//   })


// fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-10/users/me', {
//   headers: {
//     authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512'}
// })
//   .then ((res) => {
//     return res.json()
//   })
//   .then ((data) => {
//     console.log(data)
//   })

