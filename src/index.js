import './pages/index.css';

import { 
  createCard,
} from './components/card';

import { 
  openModal,
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
  addCardToServer,
  changeAvatar,
  
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
const profileEditSubmitButton = popupEdit.querySelector('.popup__button');      //кнопка сабмита попапа редактирования
const editProfileForm = document.forms.edit_profile;                            // форма редактирования профиля
const editProfileNameInput = editProfileForm.elements.name                        // инпут имени в форме редактирования профиля
  const editProfileDescriptionInput = editProfileForm.elements.description          // инпут профессии в форме редактирования профиля
const profileConfigName = editProfileNameInput.value
console.log(profileConfigName)

// редактирование аватара
const popupAvatar = document.querySelector('.popup_type_new-avatar')            //попап изменения аватара
const changeAvatarButton = popupAvatar.querySelector('.popup__button')          //кнопка сабмита попапа изменения аватара
const newAvatarForm = document.forms.edit_avatar;                                 //поле редактирования аватара
const avatarInput = newAvatarForm.elements.avatar;                                //инпут ссылки на аватар

//добавление карточки
const newCardButton = document.querySelector('.profile__add-button');           //кнопка добавления карточки
const popupAdd = document.querySelector('.popup_type_new-card');                //попап добавления новой карточки
const cardContent = document.querySelector('.popup_type_image');                //контейнер большой карточки 
const cardLargeImage = cardContent.querySelector('.popup__image');              //большая карточка
const cardCaption = cardContent.querySelector('.popup__caption');               //подпись к карточке
const newCardSubmitButton = popupAdd.querySelector('.popup__button');           //кнопка сабмита попапа добавления кнопки
const newPlaceForm = document.forms.new_place;                                    //форма добавления новой карточки
const placeInput = newPlaceForm.elements.place_name;                              //поле названия карточки
const urlInput = newPlaceForm.elements.link;                                      //поле ссылки на карточку

//общее
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));  //массив кнопок закрытия 
const modals = Array.from(document.querySelectorAll('.popup'));             //массив модальных окон
const profileImage = document.querySelector('.profile__image');                 //картинка профиля
const buttonTextWhileLoading = 'Сохранение...'
const buttonTextNormal = 'Сохранить'

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
  openModal (cardContent);
};

// Функция обработки загрузки
function handleLoading (isFetching, button) {
  if (isFetching) {
    button.textContent = buttonTextWhileLoading;
    button.setAttribute('disabled', true);
  }
  else {
    button.textContent = buttonTextNormal
    button.removeAttribute('disabled');
  }
}

// Функция открытия модального окна "редактировать профиль" 
function openProfileEditPopup () {
  openModal (popupEdit);
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescribtion.textContent
}

// Функция открытия модального окна "добавить карточку" 
function openProfileAddPopup () {
  openModal (popupAdd);
}

// Функция открытия модального окна "редактировать аватар"
function openAvatarEdit () {
  openModal (popupAvatar);
}

//Функция сабмита модального окна "добавить карточку"
function handleAddFormSubmit(evt){
  evt.preventDefault();
  handleLoading(true, newCardSubmitButton)
  Promise.all([getProfileData(), addCardToServer(placeInput.value, urlInput.value)])
  .then (([profile, data]) =>{
  const card = createCard(data, profile, showCardContent);
  cardContainer.prepend(card)
})
  .catch ((error) => {
    console.log(error)
  })
  .finally (() => {handleLoading(false, newCardSubmitButton)})
  newPlaceForm.reset();
  onClose(popupAdd);
  clearValidation (popupAdd, validationConfig);
}

// Функция сабмита модального окна "редактировать профиль"
function handleEditFormSubmit(evt){
  evt.preventDefault();
  handleLoading(true, profileEditSubmitButton)
  editProfile(editProfileNameInput.value, editProfileDescriptionInput.value)
  .then ((profile) => {
    profileTitle.textContent = profile.name
    profileDescribtion.textContent = profile.about
  })
  .catch((error) => {
    console.log(error)
  })
  .finally (() => {handleLoading(false, profileEditSubmitButton)})
  onClose (popupEdit);
  clearValidation (popupEdit, validationConfig);
}

// Функция сабмита модального окна "редактировать аватар"
function handleAvatarEditSubmit (evt) {
  evt.preventDefault();
  handleLoading(true, changeAvatarButton)
  changeAvatar (avatarInput.value)
  .then ((profile) => {
    profileImage.style.backgroundImage = `url(${profile.avatar})`
  })
  .catch ((error) => {
    console.log(error)
  })
  .finally (() => {handleLoading(false, changeAvatarButton)})
  newAvatarForm.reset();
  onClose(popupAvatar);
  clearValidation (popupAvatar, validationConfig);
}

Promise.all([getProfileData(), getInitialCards()])
  .then (([profile, cards]) => {
    profileTitle.textContent = profile.name
    profileDescribtion.textContent = profile.about
    profileImage.style.backgroundImage = `url(${profile.avatar})`
    cards.forEach (function(item) {
      const card = createCard(item, profile, showCardContent);                                    
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

// Обработчик изображения аватара - открытие модального окна редактирования аватара
profileImage.addEventListener('click', openAvatarEdit); 

// Обработчик сабмита модального окна "обновить аватар"
newAvatarForm.addEventListener('submit', handleAvatarEditSubmit);

// Обработчик кнопки "добавить место" - открытие модального окна "новая карточка" 
newCardButton.addEventListener('click', openProfileAddPopup);

// Обработчк сабмита модального окна "добавить новую карточку"
newPlaceForm.addEventListener('submit', handleAddFormSubmit);

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
popupCloseButtons.forEach (function (button) {
  button.addEventListener('click', function () {
    const modal = button.closest('.popup');
    onClose(modal);
  });
})

// Обработчик слушателя закрытия по оверлею на все модальные окна
modals.forEach (function (modal) {
  modal.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose(modal);
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

