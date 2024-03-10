const arkhyzLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatkaLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalLink = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const initialCards = [
    {
      name: "Архыз",
      link: arkhyzLink,
    },
    {
      name: "Челябинская область",
      link: chelyabLink,
    },
    {
      name: "Иваново",
      link: ivanovoLink,
    },
    {
      name: "Камчатка",
      link: kamchatkaLink,
    },
    {
      name: "Холмогорский район",
      link: kholmogorLink,
    },
    {
      name: "Байкал",
      link: baikalLink,
    }
];