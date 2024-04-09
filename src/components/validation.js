// Функция блокировки кнопки
function disableButton (button, validationConfig) {
  button.setAttribute('disabled', true);
  button.classList.add(validationConfig.inactiveButtonClass);
}

// Функция активации кнопки
function enableButton (button, validationConfig) {
  button.removeAttribute('disabled');
  button.classList.remove(validationConfig.inactiveButtonClass);
}

// Функция показа сообщения об ошибке при введении текста в форму 
function showInputError(popupForm, popupInput, errorMessage, validationConfig) {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

// Функция удаления сообщения об ошибке при введении текста в форму
function hideInputError (popupForm, popupInput, validationConfig) {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

// Функция проверки поля формы
function checkValidity(popupForm, popupInput, validationConfig) {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.error_message);
  }

  else {
    popupInput.setCustomValidity('')
  }


  if(!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, validationConfig);
  }
  else {
    hideInputError(popupForm, popupInput, validationConfig);
  }
}

// Функция поиска невалидных полей в форме
function hasInvalidInput (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
}

// Функция переключения кнопки в случае невалидности поля 
function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig)
  }
  else {
    enableButton(buttonElement, validationConfig)
  }
}

// Функция навешивающая обработчик ввода на все поля формы
function setEventListeners (popupForm, validationConfig) {
  const inputList = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupForm.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach(function(popupInput) {
    popupInput.addEventListener('input', function() {
    checkValidity(popupForm, popupInput, validationConfig)
    toggleButtonState(inputList, buttonElement, validationConfig);
   });
  })
}

// Функция очищения ошибок валидации и деактивации кнопки
export function clearValidation(popupForm, validationConfig) {
  const popupInput = popupForm.querySelector(validationConfig.inputSelector);
  hideInputError(popupForm, popupInput, validationConfig);
  
  const buttonElement = popupForm.querySelector(validationConfig.submitButtonSelector);
  disableButton(buttonElement, validationConfig);
}

// Функция навешивания обработчика ввода на все формы документа
export function enableValidation (validationConfig) {
  const popupForms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  popupForms.forEach(function(popupForm) {
    setEventListeners (popupForm, validationConfig);
  })
}