import './pages/index.css';
import { initialCards } from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
let card = cardTemplate.querySelector('.card');
const profileEditButton = document.querySelector('.profile__edit-button');      //кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button');           //кнопка добавления карточки
const prflEditForm = document.forms.edit_profile;                               //форма редактирования профиля
const prflTitle = document.querySelector('.profile__title');                    //заголовок с именем профиля, нужен, чтобы отображаться при открытии формы редактирования профиля
const prflDescribtion = document.querySelector('.profile__description');        //заголовок с работой, нужен, чтобы отображаться при открытии формы редактирования профиля
const formElement = document.querySelector('.popup__form');                      //форма редактирования (общая)
const nameInput = formElement.querySelector('.popup__input_type_name');          //поле имени
const jobInput = formElement.querySelector('.popup__input_type_description');    //поле вида деятельности
const newPlaceForm = document.forms.new_place;                                   //форма добавления новой карточки
const placeInput = newPlaceForm.elements.place_name;                             //поле названия карточки
const urlInput = newPlaceForm.elements.link;                                     //поле ссылки на карточку

import { onClose } from './components/card';

// @todo: Функция создания карточки
function createCard(data, onDelete, onPopup, onLike) {
  const cardItem = card.cloneNode(true);                                //клонировать шаблон
  const cardImage = cardItem.querySelector('.card__image');             //установить значения вложенных элементов
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  delButton.addEventListener('click', onDelete);                    //добавить обработчик клика для любой обработки  карточки
  cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  likeButton.addEventListener('click', ()=> {
    onLike(likeButton)
  }); 
  card = cardItem
  return card;
}
    
import { deleteCard } from './components/card';

import { showCardContent } from './components/card';

import { handleLike } from './components/card';

import { handleModalCard } from './components/modals';

// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {                              
 createCard(item, deleteCard, showCardContent, handleLike);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
 cardContainer.append(card);
});

import { openModal } from './components/modals';

// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', function() {
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupCloseButton = popupEdit.querySelector('.popup__close');
  handleModalCard (popupEdit, popupCloseButton);
  openModal (prflEditForm, prflTitle, prflDescribtion);
});


import { handleFormSubmit } from './components/modals'
// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', function (evt) {
evt.preventDefault();
handleFormSubmit(prflTitle, nameInput, prflDescribtion, jobInput, onClose);
});
  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', function () {
  const popupAdd = document.querySelector('.popup_type_new-card');
  const popupCloseButton = popupAdd.querySelector('.popup__close');
  handleModalCard (popupAdd, popupCloseButton);
});

import { addPlaceSubmit } from './components/modals';

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  addPlaceSubmit(placeInput, urlInput, createCard, deleteCard, showCardContent, cardContainer, card, nameInput, onClose);
  newPlaceForm.reset();
});






