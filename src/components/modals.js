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