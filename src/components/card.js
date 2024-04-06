
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

// Функция лайка
export function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const delIcon = event.target.closest('.card');
  delIcon.remove();
};

// Функция отображения или скрытия кнопки удаления
export function toggleDelButton (ButtonElement, data, profile) {
  // if (data.owner['_id'] !== profile['_id']) {
  //   ButtonElement.classList.add('card__delete-button_disabled')
  //   ButtonElement.setAttribute('disabled', true)
  // }
  // else {
  //   ButtonElement.classList.remove('card__delete-button_disabled')
  //   ButtonElement.removeAttribute('disabled')
  // }
}

// @todo: Функция создания карточки
export function createCard(data, profile, onDelete, onPopup, onLike) {
  const cardItem = cardElement.cloneNode(true);                                
  const cardImage = cardItem.querySelector('.card__image');             
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const likeCounter = cardItem.querySelector('.card__like-counter');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length;
  if (data.owner['_id'] !== profile['_id']) {
    delButton.classList.add('card__delete-button_disabled')
    delButton.setAttribute('disabled', true)
  }
  else {
    delButton.classList.remove('card__delete-button_disabled')
    delButton.removeAttribute('disabled')
  }
  delButton.addEventListener('click', onDelete);                    
  cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  likeButton.addEventListener('click', ()=> {
    onLike(likeButton)
  });
  return cardItem;
}

