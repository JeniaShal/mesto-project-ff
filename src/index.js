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

// Функция выведения большой карточки
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

// Функция открытия и закрытия модального окна 
function handleModalCard (modalCard, button) {
  modalCard.classList.add('popup_is-opened');

  button.addEventListener('click', function() {
    onClose(button);
  });

  window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
      onClose(modalCard);
      };
    });

  modalCard.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup')) {
      onClose(modalCard)
    };
  });
}

// Функция закрытия окна  
function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}

// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {                              
 createCard(item, deleteCard, showCardContent);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
 cardContainer.append(card);
});

// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', function() {
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupCloseButton = popupEdit.querySelector('.popup__close');
  handleModalCard (popupEdit, popupCloseButton);
  const name = prflEditForm.elements.name;
  const description = prflEditForm.elements.description; 
  name.value = prflTitle.textContent;
  description.value = prflDescribtion.textContent;
});

// Функция сабмита модального окна "редактировать профиль"
function handleFormSubmit(evt){
  evt.preventDefault();
  prflTitle.textContent = nameInput.value;
  prflDescribtion.textContent = jobInput.value;
  const formToClose = nameInput.closest('.popup');
  onClose (formToClose);
}

// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', handleFormSubmit);

  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', function () {
  const popupAdd = document.querySelector('.popup_type_new-card');
  const popupCloseButton = popupAdd.querySelector('.popup__close');
  handleModalCard (popupAdd, popupCloseButton);
});

// Функция сабмита модального окна "добавить новую карточку"
function addPlaceSubmit(){
  const item = {};
  item.name = placeInput.value;
  item.link = urlInput.value;
  createCard(item, deleteCard, showCardContent);                                           
  cardContainer.prepend(card);
  const formToClose = nameInput.closest('.popup');
  onClose (formToClose);
}

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  addPlaceSubmit();
  newPlaceForm.reset();
});






