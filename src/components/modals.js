// Функция закрытия окна  
export function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

// Функция закрытия по эскейпу
export function closeOnEscape (e) {
  if(e.key === 'Escape') {
    const item = document.querySelector('.popup_is-opened');
    onClose(item);
  }
}







