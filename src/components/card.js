// Функция закрытия окна  
export function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}

// Функция лайка
export function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}