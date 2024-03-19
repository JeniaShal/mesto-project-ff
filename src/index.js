import './pages/index.css';
import { initialCards } from './cards';
import { 
  deleteCard,
  createCard,
  handleLike
 } from './components/card';

import { 
  onClose,
  openModalCard,
  closeModalCard,
} from './components/modals';

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');      //кнопка редактирования профиля
const profileTitle = document.querySelector('.profile__title');                    //заголовок с именем профиля, нужен, чтобы отображаться при открытии формы редактирования профиля
const profileDescribtion = document.querySelector('.profile__description');        //заголовок с работой, нужен, чтобы отображаться при открытии формы редактирования профиля
const formElement = document.querySelector('.popup__form');                     //форма редактирования (общая)
const nameInput = formElement.querySelector('.popup__input_type_name');         //поле имени
const jobInput = formElement.querySelector('.popup__input_type_description');   //поле вида деятельности
const popupEdit = document.querySelector('.popup_type_edit');                   //попап редактирования профиля 
const profileEditForm = document.forms.edit_profile;                               //форма редактирования профиля



//добавление карточки
const newCardButton = document.querySelector('.profile__add-button');           //кнопка добавления карточки
const newPlaceForm = document.forms.new_place;                                  //форма добавления новой карточки
const placeInput = newPlaceForm.elements.place_name;                            //поле названия карточки
const urlInput = newPlaceForm.elements.link;                                    //поле ссылки на карточку
const popupAdd = document.querySelector('.popup_type_new-card');                //попап добавления новой карточки
const cardContent = document.querySelector('.popup_type_image');
const cardLargeImage = cardContent.querySelector('.popup__image');
const cardCaption = cardContent.querySelector('.popup__caption');

//общее
const popupCloseButton = popupEdit.querySelector('.popup__close');              //кнопка закрытия 


// Функция выведения большой карточки
function showCardContent(item) {
  cardLargeImage.src = item.link;
  cardLargeImage.alt = item.name;
  cardCaption.textContent = item.name;
  openModalCard(cardContent);
  closeModalCard(cardContent);
};

// Функция сабмита модального окна "добавить новую карточку"
function addPlaceSubmit(){
  const item = {};
  item.name = placeInput.value;
  item.link = urlInput.value;
  return item;
}

// Функция сабмита модального окна "редактировать профиль"
function handleEditFormSubmit(){
  profileTitle.textContent = nameInput.value;
  profileDescribtion.textContent = jobInput.value;
  const formToClose = nameInput.closest('.popup');
   onClose (formToClose);
}

profileEditForm.elements.name.value = profileTitle.textContent;
profileEditForm.elements.description.value = profileDescribtion.textContent;

// Обработчик кнопки "редактировать профиль" - открытие модального окна редактирования 
profileEditButton.addEventListener('click', function() {
  openModalCard (popupEdit);
  closeModalCard (popupEdit);
});


// Обработчик сабмита модального окна "редактировать профиль"
formElement.addEventListener('submit', function (evt) {
evt.preventDefault();
handleEditFormSubmit();
});
  
// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', function () {
  openModalCard (popupAdd);
  closeModalCard (popupAdd);
});

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
  const card = createCard(item, deleteCard, showCardContent, handleLike);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
  cardContainer.append(card);
});





