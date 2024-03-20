import './pages/index.css';
import { initialCards } from './cards';
import { 
  deleteCard,
  createCard,
  handleLike
 } from './components/card';

import { 
  closeOnEscape,
  onClose,
} from './components/modals';

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
const profileEditForm = document.forms.edit_profile;                            //форма редактирования профиля

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
const popupCloseButton = popupEdit.querySelector('.popup__close');              //кнопка закрытия 

// Функция открытия модального окна
export function openModalCard (modalCard) {
  modalCard.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEscape);
  modalCard.addEventListener('click', function(evt) {
    if (
      evt.target.classList.contains('popup')) {
      onClose(modalCard);
    }      
  })
} 

// Функция закрытия модального окна по кнопке и оверлею
function closeOnButtonAndOverlay (button) {
  onClose(button);
  const modalCard = button.closest('.popup');
  modalCard.removeEventListener('click', function(evt) {
    if (
      evt.target.classList.contains('popup')) {
      onClose(modalCard);
    }      
  })
}

// Функция выведения большой карточки
function showCardContent(item) {
  cardLargeImage.src = item.link;
  cardLargeImage.alt = item.name;
  cardCaption.textContent = item.name;
  openModalCard (cardContent);
  const closeButton = cardContent.querySelector('.popup__close');
  function onCloseCardOnButtonAndIverlay () {
    closeOnButtonAndOverlay (closeButton);
  } 
  closeButton.addEventListener('click', onCloseCardOnButtonAndIverlay);

};

profileEditForm.elements.name.value = profileTitle.textContent;
profileEditForm.elements.description.value = profileDescribtion.textContent;

// Функция открытия модального окна "редактировать профиль" 
function openProfileEditPopup () {
  openModalCard (popupEdit);
  const closeButton = popupEdit.querySelector('.popup__close');
  function onCloseCardOnButtonAndIverlay () {
    closeOnButtonAndOverlay (closeButton);
  } 
  closeButton.addEventListener('click', onCloseCardOnButtonAndIverlay);
}

// Функция открытия модального окна "редактировать профиль" 
function openProfileAddPopup () {
  openModalCard (popupAdd);
  const closeButton = popupAdd.querySelector('.popup__close');
  function onCloseCardOnButtonAndIverlay () {
    closeOnButtonAndOverlay (closeButton);
  } 
  closeButton.addEventListener('click', onCloseCardOnButtonAndIverlay);
}

// Функция сабмита модального окна "редактировать профиль"
function handleEditFormSubmit(){
  profileTitle.textContent = nameInput.value;
  profileDescribtion.textContent = jobInput.value;
  const formToClose = nameInput.closest('.popup');
   onClose (formToClose);
}

// Функция сабмита модального окна "добавить новую карточку"
function addPlaceSubmit(){
  const item = {};
  item.name = placeInput.value;
  item.link = urlInput.value;
  return item;
}

// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', openProfileEditPopup);

// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', function (evt) {
evt.preventDefault();
handleEditFormSubmit();
});
  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', openProfileAddPopup);

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const item = addPlaceSubmit();
  const card = createCard(item, deleteCard, showCardContent, handleLike);
  cardContainer.prepend(card);
  popupCloseButton.addEventListener('click', function(){
    onClose(popupCloseButton);
  });
  newPlaceForm.reset();
});

// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, showCardContent, handleLike);                                    
  cardContainer.append(card);
});





