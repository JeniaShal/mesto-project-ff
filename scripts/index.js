// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardPlayList = document.querySelector('.places__list');

// @todo: Функция создания карточки
initialCards.forEach(function addCard(item) {
  let cardItem = cardTemplate.querySelector('.card').cloneNode(true); //клонировать шаблон
  cardItem.querySelector('.card__image').src = item.link; //установить значения вложенных элементов
  cardItem.querySelector('.card__image').alt = item.link;
  cardItem.querySelector('.card__title').textContent = item.name;
// @todo: Функция удаления карточки
  const delButton = cardItem.querySelector('.card__delete-button');
  delButton.addEventListener('click', delCard); //добавить обработчик клика для удаления карточки
    function delCard(evt) {
    const delIcon = evt.target.closest('.card');
    delIcon.remove();
  };
// @todo: Вывести карточки на страницу
  cardPlayList.append(cardItem)
});
  
    
    
    
  




 







