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

const initialCards = [
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
];

initialCards.forEach(function (el) {
    const card = createCardEl(el.name, el.link);
    elementCards.append(card);
});

function createCardEl(name, link) {
    const itemTemplateCardNew = itemTemplate.querySelector('.element').cloneNode(true);
    const elementImage = itemTemplateCardNew.querySelector('.element__img');
    const deleteBtn = itemTemplateCardNew.querySelector('.element__delete-btn');
    const buttonHeart = itemTemplateCardNew.querySelector('.element__like-btn');
    const popupImage = document.querySelector('.popup_type_image');
    const elementText = itemTemplateCardNew.querySelector('.element__title');
    buttonHeart.addEventListener('click', function () {
        buttonHeart.classList.toggle('element__like-btn_active');
    });
    elementImage.addEventListener('click', function () {
        popupImage.classList.add('popup_opened');
        document.querySelector('.popup__image').src = link;
        document.querySelector('.popup__image').alt = name;
        document.querySelector('.popup__image-text').textContent = name;
    });
    deleteBtn.addEventListener('click', function (evt) {
        itemTemplateCardNew.remove();
    });
    elementImage.src = link;
    elementImage.alt = name;
    elementText.textContent = name;
    return itemTemplateCardNew;
}

function addPlace(evt) {
    evt.preventDefault();
    const name = placeInput.value;
    const link = srcInput.value;
    const card = createCardEl(name, link);
    createCardEl(name, link);
    closePopup(popupNewPlace);
    formElementNewPlace.reset();
    elementCards.prepend(card);
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addCard.addEventListener('click', function() {
    openPopup(popupNewPlace);
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