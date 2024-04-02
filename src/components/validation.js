// Функция показа сообщения об ошибке при введении текста в форму 
function showInputError(popupForm, popupInput, errorMessage) {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

// Функция удаления сообщения об ошибке при введении текста в форму
function hideInputError (popupForm, popupInput) {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

// Функция проверки поля формы
function checkValidity(popupForm, popupInput) {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.error_message);
  }

  else {
    popupInput.setCustomValidity('')
  }


  if(!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage);
  }
  else {
    hideInputError(popupForm, popupInput);
  }
}

// Функция поиска невалидных полей в форме
function hasInvalidInput (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
}

// Функция переключения кнопки в случае невалидности поля 
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList, buttonElement)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_inactive');
  }
  else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_inactive');
  }
}

// Функция навешивающая обработчик ввода на все поля формы
function setEventListeners (popupForm) {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
  const buttonElement = popupForm.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach(function(popupInput) {
    popupInput.addEventListener('input', function() {
    checkValidity(popupForm, popupInput)
    toggleButtonState(inputList, buttonElement);
   });
  })
}

export function clearValidation(popupForm) {
  const buttonElement = popupForm.querySelector('.popup__button');
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__button_inactive');
}

// Функция навешивания обработчика ввода на все формы документа
export function enableValidation () {
  const popupForms = Array.from(document.querySelectorAll('.popup__form'));
  popupForms.forEach(function(popupForm) {
    setEventListeners (popupForm);
  })
}

