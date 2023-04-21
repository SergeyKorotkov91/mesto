export class FormValidator {
    constructor(validationConfig, form) {
      this._validationConfig = validationConfig;
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;
      
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

    _showInputError (input, validationMessage) {
      const error = this._form.querySelector(`.${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      error.classList.add(this._errorClass);
      error.textContent = validationMessage;
    };

    _hideInputError (input) {
      const error = this._form.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      error.classList.remove(this._errorClass);
      error.textContent = '';
    };

    _checkInputValidity (input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
    };

    _hasInvalidInput = () => {
      return this._inputList.some((input) => !input.validity.valid);
    };

    _toggleButtonState () {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
      } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
      }
    };

    _setEventListeners () {
        this._inputList.forEach((input) => {
          input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
          });
        });
    };

    enableValidation(){
      this._setEventListeners();
    };

    clearErrorValidation () {
      this._inputList.forEach((input) => {
        this._hideInputError(input);
      });
      this._toggleButtonState();
    };

}