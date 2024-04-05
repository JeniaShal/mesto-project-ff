  const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
    }
  }

   
  const editProfileForm = document.forms.edit_profile;                      // форма редактирования профиля
  const editProfileNameInput = editProfileForm.elements.name                // инпут имени в форме редактирования профиля
  const editProfileDescriptionInput = editProfileForm.elements.description  // инпут профессии в форме редактирования профиля


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
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
        // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then ((data) => { // удалить перед отправкой на ревью
    console.log(data)
  })
 }