// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

// @todo: DOM узлы
const cardPlayList = document.querySelector('.places__list');
let cardImage = cardItem.querySelector('.card__image');
let cardTitle = cardItem.querySelector('.card__title');
console.log(cardTitle.textContent);

// @todo: Функция создания карточки
function addCard(cardImage) {
  
      initialCards.forEach(function(element){
      cardImage.src = element.link;

      // cardTitle.textContent = `${element.name}`;
  });
  
  return cardItem

  
};
cardPlayList.append(addCard(cardImage));


 




// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
