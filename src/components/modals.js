
// Функция открытия модального окна
export function openModalCard (modalCard) {
  modalCard.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEscape);
  
} 

// Функция закрытия окна  
export function onClose(modalCard) {
  modalCard.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

// Функция закрытия по эскейпу
export function closeOnEscape (e) {
  if(e.key === 'Escape') {
    const item = document.querySelector('.popup_is-opened');
    onClose(item);
  }
}







