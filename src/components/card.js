import { handleModalCard } from "./modals";

// Функция закрытия окна  
export function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}

// Функция лайка
export function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}

// Функция выведения большой карточки
export function showCardContent(evt) {
  const cardContent = document.querySelector('.popup_type_image');
  const cardLargeImage = cardContent.querySelector('.popup__image');
  const cardCaption = cardContent.querySelector('.popup__caption');
  const popupCloseButton = cardContent.querySelector('.popup__close');
    
  cardLargeImage.src = evt.link;
  cardLargeImage.alt = evt.name;
  cardCaption.textContent = evt.name;

  handleModalCard(cardContent, popupCloseButton);
};

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const delIcon = event.target.closest('.card');
  delIcon.remove();
};
