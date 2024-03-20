
// Функция открытия модального окна
export function openModalCard (modalCard) {
  modalCard.classList.add('popup_is-opened');
} 

// Функция закрытия окна  
export function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}

// Функция закрытия модального окна всеми тремя способами
export function closeModalCard (modalCard) {
  const button = modalCard.querySelector('.popup__close');

  button.addEventListener('click', function(){
    onClose(button);
  });
  window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
      onClose(modalCard);
      };
    });
  modalCard.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup')) {
      onClose(modalCard)
    };
  });
}







