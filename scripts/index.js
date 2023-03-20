function cardCreate(where, name, link) {
    const template = document.querySelector('.element-template').content;
    const element = template.querySelector('.element').cloneNode(true);

    element.querySelector('.element__title').textContent = name;

    const image = element.querySelector('.element__img');
    image.src = link;
    image.alt = name;

    image.addEventListener('click', () => {
        popupOpen('.popup_type_image');
        document.querySelector('.popup__image').src = link;
        document.querySelector('.popup__image').alt = name;
        document.querySelector('.popup__image-text').textContent = name;
    });

    const deleteBtn = element.querySelector('.element__delete-btn');
    deleteBtn.addEventListener('click', () => element.remove());

    const likeBtn = element.querySelector('.element__like-btn');
    likeBtn.addEventListener('click', () => likeBtn.classList.toggle('element__like-btn_active'));

    const container = document.querySelector('.elements__cards');
    if (where === 'begin') {
        container.prepend(element);
    } else {
        container.append(element);
    }
}

INITIAL_CARDS.forEach(x => cardCreate('end', x.name, x.link));

function popupOpen(selector) {
    const element = document.querySelector(selector);
    element.style.opacity = 0;

    element.classList.add('popup_opened');
    element.focus();

    element.style.opacity = 1;
}

function popupClose(selector) {
    const element = document.querySelector(selector);
    element.classList.remove('popup_opened');
}

function popupEnableCloseBehavior(selector) {
    const element = document.querySelector(selector);
    element.querySelector('.popup__close-button').addEventListener('click', () => popupClose(selector));

    element.addEventListener('click', (evt) => {
        if (evt.target === element) popupClose(selector);
    });

    element.addEventListener('keydown', (evt) => {
        if (evt.key == 'Escape') popupClose(selector);
    });
}

popupEnableCloseBehavior('.popup__type_profile');
popupEnableCloseBehavior('.popup__type_newplace');
popupEnableCloseBehavior('.popup__type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePopupName = document.querySelector('.popup__type_profile_input_name');
const profilePopupDescription = document.querySelector('.popup__type_profile_input_description');
document.querySelector('.popup__type_profile .popup__form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    popupClose('.popup__type_profile');

    profileTitle.textContent = profilePopupName.value;
    profileDescription.textContent = profilePopupDescription.value;
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    profilePopupName.value = profileTitle.textContent;
    profilePopupDescription.value = profileDescription.textContent;

    popupOpen('.popup__type_profile');
});

const newplacePopupName = document.querySelector('.popup__type_newplace_input_name');
const newplacePopupLink = document.querySelector('.popup__type_newplace_input_link');
document.querySelector('.popup__type_newplace .popup__form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    popupClose('.popup__type_newplace');

    cardCreate('begin', newplacePopupName.value, newplacePopupLink.value);

    document.querySelector('.popup__type_newplace .popup__form').reset();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    popupOpen('.popup__type_newplace');
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: '.popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
});
