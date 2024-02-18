// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
let card = cardTemplate.querySelector('.card');

// @todo: Функция создания карточки
function createCard(data, cardFunction) {
  const cardItem = card.cloneNode(true);                                //клонировать шаблон
  const cardImage = cardItem.querySelector('.card__image');             //установить значения вложенных элементов
  const cardTitle = cardItem.querySelector('.card__title');
  const delButton = cardItem.querySelector('.card__delete-button');
  cardImage.src = data.link
  cardImage.alt = data.link;
  cardTitle.textContent = data.name;
  delButton.addEventListener('click', cardFunction);                    //добавить обработчик клика для любой обработки  карточки
  card = cardItem
  return card;
}
  
  
// @todo: Функция удаления карточки
  function delCard(event) {
    const delIcon = event.target.closest('.card');
    delIcon.remove();
  };
  
    
// @todo: Вывести карточки на страницу    
initialCards.forEach(function (item) {                              
 createCard(item, delCard);                                             //присвоить функции переменную из массива initialCards и функцию удаления карточки в качестве колбэка
 cardContainer.append(card);
});


   

 








