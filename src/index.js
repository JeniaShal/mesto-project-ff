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

import {
cardContainer, 
profileEditButton,
profileTitle, 
profileDescribtion, 
formElement, 
nameInput, 
jobInput, 
popupEdit,
profileEditSubmitButton,
editProfileNameInput,
editProfileDescriptionInput,
popupAvatar,
changeAvatarButton,
newAvatarForm,
avatarInput,
newCardButton,
popupAdd,
cardContent,
cardLargeImage,
cardCaption,
newCardSubmitButton,
newPlaceForm,
placeInput,
urlInput,
popupCloseButtons,
modals,
profileImage,
buttonTextWhileLoading,
buttonTextNormal,
validationConfig,
} from './utils/constants.js'


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
  clearValidation(popupEdit, validationConfig)
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescribtion.textContent
}

// Функция открытия модального окна "добавить карточку" 
function openProfileAddPopup () {
  openModal (popupAdd);
  clearValidation (popupAdd, validationConfig);
}

// Функция открытия модального окна "редактировать аватар"
function openAvatarEdit () {
  openModal (popupAvatar);
  clearValidation(popupAvatar)
}

//Функция сабмита модального окна "добавить карточку"
function handleAddFormSubmit(evt){
  evt.preventDefault();
  handleLoading(true, newCardSubmitButton)
  addCardToServer(placeInput.value, urlInput.value)
  .then ((data) =>{
  const card = createCard(data, data.owner, showCardContent);
  cardContainer.prepend(card)
  newPlaceForm.reset();
})
  .catch ((error) => {
    console.log(error)
  })
  .finally (() => {handleLoading(false, newCardSubmitButton)})
  onClose(popupAdd);
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
}

// Функция сабмита модального окна "редактировать аватар"
function handleAvatarEditSubmit (evt) {
  evt.preventDefault();
  handleLoading(true, changeAvatarButton)
  changeAvatar (avatarInput.value)
  .then ((profile) => {
    profileImage.style.backgroundImage = `url(${profile.avatar})`
  })
  newAvatarForm.reset()
  .catch ((error) => {
    console.log(error)
  })
  .finally (() => {handleLoading(false, changeAvatarButton)})
  onClose(popupAvatar);
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
