import {
  deleteCardOnServer, SendLikeCardOnServer, DeleteLikeFromServer
} from './api'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

// Функция лайка
function switchOnLike(icon) {
  icon.classList.add('card__like-button_is-active');
}

// Функция снятия лайка
function switchOffLike(icon) {
  icon.classList.remove('card__like-button_is-active');
}

// Функция переключения лайка с отправкой данных на сервер
function toggleLike(icon, data, counter) {
  if (!icon.classList.contains('card__like-button_is-active')) {
    switchOnLike(icon)
    SendLikeCardOnServer(data._id)
    .then((response) => {
      console.log(response.likes.length)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
  else {
    switchOffLike(icon)
    DeleteLikeFromServer(data._id)
    .then((response) => {
      console.log(response.likes.length)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
}


// @todo: Функция удаления карточки
export function deleteCard(button) {
  const delIcon = button.closest('.card');
  delIcon.remove();
};

// @todo: Функция создания карточки
export function createCard(data, profile, onPopup) {
  const cardItem = cardElement.cloneNode(true);                                
  const cardImage = cardItem.querySelector('.card__image');             
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const likeCounter = cardItem.querySelector('.card__like-counter');
  const dataId = data._id;
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
    delButton.addEventListener('click', ()=>{
      deleteCardOnServer(dataId)
      .catch ((error) => {
        console.log(error)
      })
      deleteCard(delButton)
    });
  }                 
    cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  likeButton.addEventListener('click', ()=> {
    toggleLike(likeButton, data, likeCounter)
  
  });
  return cardItem;
}

