import {validationConfig, initialCards, placeInput, srcInput, popupProfile, addCard, popupNewPlace, jobInput, nameInput, profileEditButton, popupBigImg, popupBigImgText} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';


const formProfileValidator = new FormValidator(validationConfig, popupProfile);
formProfileValidator.enableValidation();

const formCardAddValidator = new FormValidator(validationConfig, popupNewPlace);
formCardAddValidator.enableValidation();

function renderCard(item) {
    section.addItem(createCard(item, '#cardTemplate', handleCardClick));
}

const section = new Section({
    items: initialCards,
    renderer: (item) => {
      renderCard(item);
    }
},
    '.elements__cards');
  
section.renderItems();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const formPopupNewPlace = new PopupWithForm({
    popupSelector: '.popup_type_new-place',
    handleFormSubmit: (item = {name : placeInput.value, link : srcInput.value, alt : placeInput.value}) => {
      renderCard(item = {name : placeInput.value, link : srcInput.value, alt : placeInput.value});
    }
  });
formPopupNewPlace.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description'
});

const formPopupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (item) => {
      userInfo.setUserInfo(item.name, item.job);
    }
});
formPopupProfile.setEventListeners();

function openPopupEditProfile() {
    const user = userInfo.getUserInfo();
    const name = user.name;
    const job = user.job;
    formPopupProfile.open();
    nameInput.value = name;
    jobInput.value = job;
    formProfileValidator.clearErrorValidation();
}

function openPopupNewPlace() {
    formPopupNewPlace.open();
    formCardAddValidator.clearErrorValidation();
}

function handleCardClick (title, image) {
    popupBigImg.src = image
    popupBigImg.alt = title
    popupBigImgText.textContent = title
    popupWithImage.open(title, image);
}

function createCard(item) {
    const card = new Card(item, '#cardTemplate', handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}


profileEditButton.addEventListener('click', () => openPopupEditProfile());
addCard.addEventListener('click', () => openPopupNewPlace());
