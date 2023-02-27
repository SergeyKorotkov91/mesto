const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_description');
const likeBtn = document.querySelector('.element__like-btn');

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popup);
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

likeBtn.addEventListener('click', function () {
    likeBtn.classList.toggle('element__like-btn_active');
});
  
profileEditButton.addEventListener('click', function () {
    openPopup(popup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

popupCloseButton.addEventListener('click', function () {
    closePopup(popup);
});

formElement.addEventListener('submit', handleFormSubmit);