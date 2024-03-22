import './pages/index.css';
import { initialCards } from './cards';
import { 
  deleteCard,
  createCard,
  handleLike
 } from './components/card';

import { 
  openModalCard,
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

// Функция выведения большой карточки
function showCardContent(item) {
  cardLargeImage.src = item.link;
  cardLargeImage.alt = item.name;
  cardCaption.textContent = item.name;
  openModalCard (cardContent);
};

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescribtion.textContent;

// Функция открытия модального окна "редактировать профиль" 
function openProfileEditPopup () {
  openModalCard (popupEdit);
}

// Функция открытия модального окна "добавить карточку" 
function openProfileAddPopup () {
  openModalCard (popupAdd);
}

//Функция сабмита модального окна "добавить карточку"
function handleAddFormSubmit(evt){
  evt.preventDefault();
  const item = {};
  item.name = placeInput.value;
  item.link = urlInput.value;
  const card = createCard(item, deleteCard, showCardContent, handleLike);
  cardContainer.prepend(card);
  newPlaceForm.reset();
  onClose(popupAdd);
}

// Функция сабмита модального окна "редактировать профиль"
function handleEditFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescribtion.textContent = jobInput.value;
  onClose (popupEdit);
}

// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', openProfileEditPopup);

// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', handleEditFormSubmit);
  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', openProfileAddPopup);

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', handleAddFormSubmit);

// Вывести карточки на страницу    
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, showCardContent, handleLike);                                    
  cardContainer.append(card);
});

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
popupCloseButtons.forEach (function (button) {
  button.addEventListener('click', function () {
    const modalCard = button.closest('.popup');
    onClose(modalCard);
  }

  );
})


// Обработчик слушателя закрытия по оверлею на все модальные окна
modalCards.forEach (function (modalCard) {
  modalCard.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose(modalCard);
    }      
  });
});





