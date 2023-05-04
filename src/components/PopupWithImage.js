import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__image-text');
  }

  open(title, image) {
    super.open();
    this._image.src = image;
    this._image.alt = title;
    this._title.textContent = title;
  }
}