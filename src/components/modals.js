
// Функция открытия модального окна
export function openModal (modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEscape);
  
} 

// Функция закрытия окна  
export function onClose(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

// Функция закрытия по эскейпу
export function closeOnEscape (e) {
  if(e.key === 'Escape') {
    const item = document.querySelector('.popup_is-opened');
    onClose(item);
  }
}







