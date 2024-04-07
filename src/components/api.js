  const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
    }
  }

   
  const editProfileForm = document.forms.edit_profile;                              // форма редактирования профиля
  const editProfileNameInput = editProfileForm.elements.name                        // инпут имени в форме редактирования профиля
  const editProfileDescriptionInput = editProfileForm.elements.description          // инпут профессии в форме редактирования профиля
  export const newPlaceForm = document.forms.new_place;                                    //форма добавления новой карточки
  const placeInput = newPlaceForm.elements.place_name;                              //поле названия карточки
  const urlInput = newPlaceForm.elements.link;                                      //поле ссылки на карточку
  export const newAvatarForm = document.forms.edit_avatar;                                 //поле редактирования аватара
  const avatarInput = newAvatarForm.elements.avatar;                                //инпут ссылки на аватар

  // Функция выгрузки данных для профиля
export function getProfileData () {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
  }
  })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Функция выгрузки карточек
export function getInitialCards () {
  return fetch (`${config.baseUrl}/cards`, {
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      }
    })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
          // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Функция редактирования профиля на сервере
export function editProfile () {
  return fetch (`${config.baseUrl}/users/me`,  {
    method: 'PATCH',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      name: `${editProfileNameInput.value}`,
      about: `${editProfileDescriptionInput.value}`,
    }),
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
        // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
 }

// Функция отправки карточки на сервер
export function addCardToServer () {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      name: `${placeInput.value}`,
      link: `${urlInput.value}`,
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
  // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// Функция удаления карточки с сервера
export function deleteCardOnServer (id) {
  return fetch (`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
    },
})
.then ((res) => {
  if (res.ok) {
    return res.json();
  }
// если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
})
}

// Функция отправки лайка карточки на сервер
export function SendLikeCardOnServer (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers: {
    authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
    },
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
  // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function DeleteLikeFromServer (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      },
})
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
    // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}    

// Функция отправки на сервер ссылки на новый аватар
export function ChangeAvatar () {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify ({
      avatar: `${avatarInput.value}`
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
  // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}