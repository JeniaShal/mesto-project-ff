import { onClose } from "./card";
// Функция сабмита модального окна "добавить новую карточку"
export function addPlaceSubmit(place, url, onCreate, onDelete, onPopup, container, element, nameField, closeCard){
  const item = {};
  item.name = place.value;
  item.link = url.value;
  onCreate(item, onDelete, onPopup);                                           
  container.prepend(element);
  const formToClose = nameField.closest('.popup');
  closeCard (formToClose);
}

// Функция сабмита модального окна "редактировать профиль"
export function handleFormSubmit(title, nameField, description, jobField, closeCard){
  title.textContent = nameField.value;
  description.textContent = jobField.value;
  const formToClose = nameField.closest('.popup');
  closeCard (formToClose);
}

export function openModal(form, title, description) {
  const elmName = form.elements.name;
  const elmDescription = form.elements.description; 
  elmName.value = title.textContent;
  elmDescription.value = description.textContent;
}

// Функция открытия и закрытия модального окна 
export function handleModalCard (modalCard, button) {
  modalCard.classList.add('popup_is-opened');

  button.addEventListener('click', function() {
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
