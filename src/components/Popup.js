export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__close-button')
    }
  
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('mousedown', this._handleClickOverlayClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('mousedown', this._handleClickOverlayClose);
    }
  
    _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    _handleClickOverlayClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }
  
    setEventListeners() {
      this._closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
    }
}
  
