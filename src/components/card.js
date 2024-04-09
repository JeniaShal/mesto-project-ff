import {
  deleteCardOnServer, sendLikeCardOnServer, deleteLikeFromServer
} from './api'

import {
  cardElement
} from '../utils/constants'

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
    sendLikeCardOnServer(data._id)
    .then((response) => {
      switchOnLike(icon)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
  else {
    deleteLikeFromServer(data._id)
    .then((response) => {
      switchOffLike(icon)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
}
// 
// Фeнкция поиска "лайкнутых" карточеу
function hasLike (likes, profile) {
  return likes.some(function(like) {
    return like['_id'] === profile['_id']
  })
}


// @todo: Функция удаления карточки
export function deleteCard(button) {
  const delIcon = button.closest('.card');
  delIcon.remove();
};

// @todo: Функция создания карточки
export function createCard(data, profile, handleImageClick) {
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
      .then (() => {
        deleteCard(delButton)
      })
      .catch ((error) => {
        console.log(error)
      })
    });
  }                 
    cardImage.addEventListener('click', ()=>{
    handleImageClick(data);
  });
  if (hasLike(data.likes, profile)) {                  
  switchOnLike(likeButton)
  }
  
  likeButton.addEventListener('click', ()=> {
    toggleLike(likeButton, data, likeCounter)
  });
  return cardItem;
}

