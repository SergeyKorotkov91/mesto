import {validationConfig, popupAvatar,
  popupProfile, addCard, popupNewPlace, avatarEditBtn,
  jobInput, nameInput, profileEditButton, avatar,
  popupBigImg, popupBigImgText} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '57f855b2-3dbd-4c01-9fcc-5cfa2e14a7d4',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const formProfileValidator = new FormValidator(validationConfig, popupProfile);
formProfileValidator.enableValidation();

const formCardAddValidator = new FormValidator(validationConfig, popupNewPlace);
formCardAddValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, popupAvatar);
formAvatarValidator.enableValidation();


const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
},  '.elements__cards');

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

avatarEditBtn.addEventListener('click', () => {
  editAvatarPopup.open();
  formAvatarValidator.clearErrorValidation();
});

const formPopupNewPlace = new PopupWithForm({
  popupSelector: '.popup_type_new-place',
  handleFormSubmit: (formData) => {
    formPopupNewPlace.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        formPopupNewPlace.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        formPopupNewPlace.loading(false);
      });
  }
});
formPopupNewPlace.setEventListeners();

addCard.addEventListener('click', () => {
  formPopupNewPlace.open();
  formCardAddValidator.clearErrorValidation();
})

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const formPopupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (dataForm) => {
      formPopupProfile.loading(true);
      api.editUserInfo(dataForm)
        .then((dataForm) => {
          userInfo.setUserInfo(dataForm);
          formPopupProfile.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          formPopupProfile.loading(false);
        });
    }
  });
  formPopupProfile.setEventListeners();
  

  function fillInEditProfileFormInputs({ username, job }) {
    nameInput.value = username;
    jobInput.value = job;
  }

  profileEditButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    fillInEditProfileFormInputs({
      username: info.name,
      job: info.job
    });
    formPopupProfile.open();
    formProfileValidator.clearErrorValidation();
  });

const deleteCardPopup = new PopupWithConfirm('.popup_type_delete-card');
deleteCardPopup.setEventListeners();

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardTemplateSelector: '#cardTemplate',
    userId: userId,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
};
