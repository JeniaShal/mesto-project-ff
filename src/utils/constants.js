// @todo: DOM узлы
export const cardContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
export const cardElement = cardTemplate.querySelector('.card');


// редактирование профиля
export const profileEditButton = document.querySelector('.profile__edit-button');      //кнопка редактирования профиля
export const profileTitle = document.querySelector('.profile__title');                 //заголовок с именем профиля, нужен, чтобы отображаться при открытии формы редактирования профиля
export const profileDescribtion = document.querySelector('.profile__description');     //заголовок с работой, нужен, чтобы отображаться при открытии формы редактирования профиля
export const formElement = document.querySelector('.popup__form');                     //форма редактирования (общая)
export const nameInput = formElement.querySelector('.popup__input_type_name');         //поле имени
export const jobInput = formElement.querySelector('.popup__input_type_description');   //поле вида деятельности
export const popupEdit = document.querySelector('.popup_type_edit');                   //попап редактирования профиля 
export const profileEditSubmitButton = popupEdit.querySelector('.popup__button');       //кнопка сабмита попапа редактирования
const editProfileForm = document.forms.edit_profile;                                    // форма редактирования профиля
export const editProfileNameInput = editProfileForm.elements.name                       // инпут имени в форме редактирования профиля
export const editProfileDescriptionInput = editProfileForm.elements.description         // инпут профессии в форме редактирования профиля


// редактирование аватара
export const popupAvatar = document.querySelector('.popup_type_new-avatar')            //попап изменения аватара
export const changeAvatarButton = popupAvatar.querySelector('.popup__button')          //кнопка сабмита попапа изменения аватара
export const newAvatarForm = document.forms.edit_avatar;                                 //поле редактирования аватара
export const avatarInput = newAvatarForm.elements.avatar;                                //инпут ссылки на аватар


//добавление карточки
export const newCardButton = document.querySelector('.profile__add-button');           //кнопка добавления карточки
export const popupAdd = document.querySelector('.popup_type_new-card');                //попап добавления новой карточки
export const cardContent = document.querySelector('.popup_type_image');                //контейнер большой карточки 
export const cardLargeImage = cardContent.querySelector('.popup__image');              //большая карточка
export const cardCaption = cardContent.querySelector('.popup__caption');               //подпись к карточке
export const newCardSubmitButton = popupAdd.querySelector('.popup__button');           //кнопка сабмита попапа добавления кнопки
export const newPlaceForm = document.forms.new_place;                                    //форма добавления новой карточки
export const placeInput = newPlaceForm.elements.place_name;                              //поле названия карточки
export const urlInput = newPlaceForm.elements.link;                                      //поле ссылки на карточку

//общее
export const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));  //массив кнопок закрытия 
export const modals = Array.from(document.querySelectorAll('.popup'));                    //массив модальных окон
export const profileImage = document.querySelector('.profile__image');                    //картинка профиля
export const buttonTextWhileLoading = 'Сохранение...'
export const buttonTextNormal = 'Сохранить'

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

