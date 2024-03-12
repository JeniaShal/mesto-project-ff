import './pages/index.css';
import { initialCards } from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
let card = cardTemplate.querySelector('.card');
const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки

// @todo: Функция создания карточки
function createCard(data, onDelete, onPopup) {
  const cardItem = card.cloneNode(true);                                //клонировать шаблон
  const cardImage = cardItem.querySelector('.card__image');             //установить значения вложенных элементов
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  delButton.addEventListener('click', onDelete);                    //добавить обработчик клика для любой обработки  карточки
  cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  card = cardItem
  return card;
}
    
// @todo: Функция удаления карточки
function deleteCard(event) {
  const delIcon = event.target.closest('.card');
  delIcon.remove();
};

   //функция выведения большой карточки
function showCardContent(evt) {
  const cardContent = document.querySelector('.popup_type_image');
  const cardLargeImage = cardContent.querySelector('.popup__image');
  const cardCaption = cardContent.querySelector('.popup__caption');
  const popupCloseButton = cardContent.querySelector('.popup__close');
    
  cardLargeImage.src = evt.link;
  cardLargeImage.alt = evt.name;
  cardCaption.textContent = evt.name;

  handleModalCard(cardContent, popupCloseButton);
};

  //функция открытия и закрытия модального окна 
function handleModalCard (card, button) {
  card.classList.add('popup_is-opened');

  button.addEventListener('click', function() {
    onClose(button);
  });

  window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
      onClose(card);
      };
    });

  card.addEventListener('click', function(){
    onClose(card);
  });
}
  

// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {                              
 createCard(item, deleteCard, showCardContent);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
 cardContainer.append(card);
});

//открытие поля "редактировать профиль" по кнопке "редактировать" 
profileEditButton.addEventListener('click', function() {
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupCloseButton = popupEdit.querySelector('.popup__close');
  handleModalCard (popupEdit, popupCloseButton);
});

  
//открытие поля "новая карточка" по кнопке "добавить" 
newCardButton.addEventListener('click', function () {
  const popupAdd = document.querySelector('.popup_type_new-card');
  const popupCloseButton = popupAdd.querySelector('.popup__close');
  handleModalCard (popupAdd, popupCloseButton);
});

//функция закрытия окна  
function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}








