import { handleModalCard } from "./modals";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

// Функция закрытия окна  
export function onClose(evt) {
  const popupToClose = evt.closest('.popup'); 
  popupToClose.classList.remove('popup_is-opened');
}

// Функция лайка
export function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}

// Функция выведения большой карточки
export function showCardContent(evt) {
  const cardContent = document.querySelector('.popup_type_image');
  const cardLargeImage = cardContent.querySelector('.popup__image');
  const cardCaption = cardContent.querySelector('.popup__caption');
  const popupCloseButton = cardContent.querySelector('.popup__close');
    
  cardLargeImage.src = evt.link;
  cardLargeImage.alt = evt.name;
  cardCaption.textContent = evt.name;

  handleModalCard(cardContent, popupCloseButton);
};

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const delIcon = event.target.closest('.card');
  delIcon.remove();
};

// @todo: Функция создания карточки
export function createCard(data, onDelete, onPopup, onLike) {
  const cardItem = cardElement.cloneNode(true);                                //клонировать шаблон
  const cardImage = cardItem.querySelector('.card__image');             //установить значения вложенных элементов
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  delButton.addEventListener('click', onDelete);                    //добавить обработчик клика для любой обработки  карточки
  cardImage.addEventListener('click', ()=>{
    onPopup(data);
  });
  likeButton.addEventListener('click', ()=> {
    onLike(likeButton)
  });
  return cardItem;
}