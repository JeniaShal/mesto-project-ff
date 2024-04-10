import { checkResponse } from "../utils/utils"

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'a880a708-a06a-465b-b123-b5ee4da8a512',
      'Content-Type': 'application/json'
    }
  }

  // Функция выгрузки данных для профиля
export function getProfileData () {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then (checkResponse) 
  }

  // Функция выгрузки карточек
export function getInitialCards () {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then (checkResponse)
  }

// Функция редактирования профиля на сервере
export function editProfile (name, description) {
  return fetch (`${config.baseUrl}/users/me`,  {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      name: `${name}`,
      about: `${description}`,
    }),
  })
  .then (checkResponse)
 }

// Функция отправки карточки на сервер
export function addCardToServer (place, url) {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify ({
      name: `${place}`,
      link: `${url}`,
    })
  })
  .then (checkResponse)
}

// Функция удаления карточки с сервера
export function deleteCardOnServer (id) {
  return fetch (`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
  })
    .then (checkResponse)
}

// Функция отправки лайка карточки на сервер
export function sendLikeCardOnServer (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers: config.headers,
  })
    .then (checkResponse)
}

export function deleteLikeFromServer (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
})
    .then (checkResponse)
}    

// Функция отправки на сервер ссылки на новый аватар
export function changeAvatar (avatar) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      avatar: `${avatar}`
    })
  })
    .then (checkResponse)
}