const cardContent = document.querySelector('.popup_type_image');
const cardLargeImage = cardContent.querySelector('.popup__image');
const cardCaption = cardContent.querySelector('.popup__caption');

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

// Функция сабмита модального окна "редактировать профиль"
export function handleEditFormSubmit(title, nameField, description, jobField, closeCard){
  title.textContent = nameField.value;
  description.textContent = jobField.value;
  const formToClose = nameField.closest('.popup');
  closeCard (formToClose);
}

// Функция сабмита модального окна "добавить новую карточку"
export function addPlaceSubmit(place, url){
  const item = {};
  item.name = place.value;
  item.link = url.value;
  return item;
}

// Функция выведения большой карточки
export function showCardContent(item) {
  cardLargeImage.src = item.link;
  cardLargeImage.alt = item.name;
  cardCaption.textContent = item.name;
  openModalCard(cardContent);
  closeModalCard(cardContent);
};

