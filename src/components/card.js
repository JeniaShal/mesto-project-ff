
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

// @todo: Функция создания карточки
export function createCard(data, onDelete, onPopup, onLike) {
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
  delButton.addEventListener('click', onDelete);                    
  cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  likeButton.addEventListener('click', ()=> {
    onLike(likeButton)
  });
  return cardItem;
}

