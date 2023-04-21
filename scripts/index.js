import {validationConfig, initialCards} from './constants.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseBtnProfile = document.querySelector('.popup__close-button_type_profile');
const formElementProfile = document.querySelector('.popup__form-profile');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name_value');
const jobInput = document.querySelector('.popup__input_description_value');
const addCard = document.querySelector('.profile__add-button');
const formElementNewPlace = document.querySelector('.popup__form-newplace');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const popupCloseBtnNewPlace = document.querySelector('.popup__close-button_type_newplace');
const popupImage = document.querySelector('.popup_type_image');
const popupCloseBtnImage = document.querySelector('.popup__close-button_type_image');
const placeInput = document.querySelector('.popup__input_place_value');
const srcInput = document.querySelector('.popup__input_src_value');
const elementCards = document.querySelector('.elements__cards');
const deleteBtn = document.querySelector('.lement__delete-btn');
const likeBtn = document.querySelector('.element__like-btn');
const itemTemplate = document.querySelector('.template').content;
const itemTemplateCard = itemTemplate.querySelector('.element');
const popupBigImg = document.querySelector('.popup__image');
const popupBigImgText = document.querySelector('.popup__image-text');

const formProfileValidator = new FormValidator(validationConfig, popupProfile);
formProfileValidator.enableValidation();

const formCardAddValidator = new FormValidator(validationConfig, popupNewPlace);
formCardAddValidator.enableValidation();

initialCards.forEach(function (el) {
    const card = new Card(el, '#cardTemplate', openCard);
    const cardElement = card.createCard();
    elementCards.append(cardElement);
});

function addPlace(evt) {
    evt.preventDefault();
    const card = new Card({name : placeInput.value, link : srcInput.value, alt : placeInput.value}, '#cardTemplate', openCard);
    const cardElement = card.createCard();
    closePopup(popupNewPlace);
    formElementNewPlace.reset();
    elementCards.prepend(cardElement);
}

function openCard(name, link) {
    popupBigImg.src = link;
    popupBigImgText.textContent = name;
    popupBigImg.alt = name;
    openPopup(popupImage);
};

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

function closePressEsc(evt) {
  if (evt.key === 'Escape') {
    evt.target.blur();
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

function closeClickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', closePressEsc);
    document.addEventListener('mousedown', closeClickOverlay);
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePressEsc);
    document.removeEventListener('mousedown', closeClickOverlay);
}

profileEditButton.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    formProfileValidator.clearErrorValidation();
});

addCard.addEventListener('click', function() {
    openPopup(popupNewPlace);
    formCardAddValidator.clearErrorValidation();
})

popupCloseBtnProfile.addEventListener('click', function () {
    closePopup(popupProfile);
});

popupCloseBtnNewPlace.addEventListener('click', function () {
    closePopup(popupNewPlace);
});

popupCloseBtnImage.addEventListener('click', function () {
    closePopup(popupImage);
})

formElementProfile.addEventListener('submit', handleFormProfileSubmit);
formElementNewPlace.addEventListener('submit', addPlace);
