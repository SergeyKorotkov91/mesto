const cards = {
    container: document.querySelector('.elements__cards'),
    onOpen: null,
    create: (name, link, where) => {
        const template = document.querySelector('.element-template').content;
        const element = template.querySelector('.element').cloneNode(true);

        element.querySelector('.element__title').textContent = name;

        const image = element.querySelector('.element__img');
        image.src = link;
        image.alt = name;

        image.addEventListener('click', () => cards.onOpen({link, name}));

        const deleteBtn = element.querySelector('.element__delete-btn');
        deleteBtn.addEventListener('click', () => element.remove());

        const likeBtn = element.querySelector('.element__like-btn');
        likeBtn.addEventListener('click', () => likeBtn.classList.toggle('element__like-btn_active'));

        if (where === 'begin') {
            cards.container.prepend(element);
        } else {
            cards.container.append(element);
        }
    }
};

const Popup = (selector, {onOpen} = {}) => {
    const element = document.querySelector(selector);

    const open = (arg) => {
        element.style.opacity = 0;

        if (onOpen) onOpen(arg);
        element.classList.add('popup_opened');
        element.focus();

        element.style.opacity = 1;
    };

    const close = () => element.classList.remove('popup_opened');

    element.querySelector('.popup__close-button').addEventListener('click', close);

    element.addEventListener('click', (evt) => {
        if (evt.target === element) close();
    });

    element.addEventListener('keydown', (evt) => {
        if (evt.key == 'Escape') close();
    });

    return {element, open, close};
};

const FormPopup = (selector, {onOpen, onSubmit} = {}) => {
    const popup = Popup(selector, {onOpen});

    const form = popup.element.querySelector('.popup__form');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        popup.close();

        onSubmit();
    });

    const submit = popup.element.querySelector('.popup__save-button');

    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    inputs.forEach(input => inputs[input.name] = input);

    return {...popup, form, submit, inputs};
};

const Profile = (selector, {onAdd, onEdit}) => {
    const element = document.querySelector(selector);
    const title = element.querySelector('.profile__title');
    const description = element.querySelector('.profile__description');

    element.querySelector('.profile__add-button').addEventListener('click', onAdd);
    element.querySelector('.profile__edit-button').addEventListener('click', onEdit);

    return {title, description};
};

const newplacePopup = FormPopup('.popup_type_newplace', {
    onSubmit: () => {
        cards.create(newplacePopup.inputs.name.value, newplacePopup.inputs.link.value, 'begin');
        newplacePopup.form.reset();
    }
});

const profilePopup = FormPopup('.popup_type_profile', {
    onSubmit: () => {
        profile.title.textContent = profilePopup.inputs.name.value;
        profile.description.textContent = profilePopup.inputs.description.value;
    }
});

const imagePreviewPopup = Popup('.popup_type_image', {
    onOpen: ({link, name}) => {
        imagePreviewPopup.element.querySelector('.popup__image').src = link;
        imagePreviewPopup.element.querySelector('.popup__image').alt = name;
        imagePreviewPopup.element.querySelector('.popup__image-text').textContent = name;
    }
});

const profile = Profile('.profile', {
    onAdd: () => newplacePopup.open(),
    onEdit: () => {
        profilePopup.open();
        profilePopup.inputs.name.value = profile.title.textContent;
        profilePopup.inputs.description.value = profile.description.textContent;
    }
});

cards.onOpen = ({link, name}) => imagePreviewPopup.open({link, name});
INITIAL_CARDS.forEach(el => cards.create(el.name, el.link, 'end'));

const validationClasses = {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

enableValidation(newplacePopup, validationClasses);
enableValidation(profilePopup, validationClasses);
