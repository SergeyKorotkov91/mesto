/*export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];*/

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const avatar = document.querySelector('.profile__avatar');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const avatarEditBtn = document.querySelector('.profile__change-avatar')
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupAvatar = document.querySelector('.popup_type_avatar')
export const popupCloseBtnProfile = document.querySelector('.popup__close-button_type_profile');
export const formElementProfile = document.querySelector('.popup__form-profile');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_name_value');
export const jobInput = document.querySelector('.popup__input_description_value');
export const addCard = document.querySelector('.profile__add-button');
export const formElementNewPlace = document.querySelector('.popup__form-newplace');
export const popupNewPlace = document.querySelector('.popup_type_new-place');
export const closeButtons = document.querySelector('.popup__close-button');
export const popupCloseBtnNewPlace = document.querySelector('.popup__close-button_type_newplace');
export const popupImage = document.querySelector('.popup_type_image');
export const popupCloseBtnImage = document.querySelector('.popup__close-button_type_image');
export const placeInput = document.querySelector('.popup__input_place_value');
export const srcInput = document.querySelector('.popup__input_src_value');
export const elementCards = document.querySelector('.elements__cards');
export const deleteBtn = document.querySelector('.lement__delete-btn');
export const likeBtn = document.querySelector('.element__like-btn');
export const itemTemplate = document.querySelector('.template').content;
export const itemTemplateCard = itemTemplate.querySelector('.element');
export const popupBigImg = document.querySelector('.popup__image');
export const popupBigImgText = document.querySelector('.popup__image-text');