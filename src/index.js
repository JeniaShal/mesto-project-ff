import './pages/index.css';
import { initialCards } from './cards';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
let card = cardTemplate.querySelector('.card');
const popupNewCard = document.querySelector('.popup_type_new-card');//поле новой карточки
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

   //функция выведения поля добавления
   function showCardContent(evt) {
    const cardContent = document.querySelector('.popup_type_image');
    const cardImage = cardContent.querySelector('.popup__image');
    const cardText = cardContent.querySelector('.popup__caption');
    const popupCloseButton = cardContent.querySelector('.popup__close');
    
    cardContent.classList.add('popup_is-opened');
    cardImage.src = evt.link;
    cardImage.alt = evt.name;
    cardText.textContent = evt.name;

    popupCloseButton.addEventListener('click', function() {
      onClose(popupCloseButton);
    });
  }

// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {                              
 createCard(item, deleteCard, showCardContent);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
 cardContainer.append(card);
});

//открытие поля "редактировать профиль" по кнопке "редактировать" 
profileEditButton.addEventListener('click', showPopupEdit);

  //функция выведения поля редактирования
function showPopupEdit() {
   const popupEdit = document.querySelector('.popup_type_edit')
   popupEdit.classList.add('popup_is-opened');

   const popupCloseButton = popupEdit.querySelector('.popup__close');
   popupCloseButton.addEventListener('click', function() {
    onClose(popupCloseButton);
   });
}

//открытие поля "новая карточка" по кнопке "добавить" 
newCardButton.addEventListener('click', showPopupAdd);

  //функция выведения поля добавления
  function showPopupAdd() {
    const popupAdd = document.querySelector('.popup_type_new-card')
    popupAdd.classList.add('popup_is-opened');

    const popupCloseButton = popupAdd.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function() {
      onClose(popupCloseButton);
    });
  }

  function onClose(evt) {
    const popupToClose = evt.closest('.popup'); 
    popupToClose.classList.remove('popup_is-opened');
  }








