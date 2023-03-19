function enableValidation(popup, {inputErrorClass, errorClass}) {
    const updateSubmit = () => {
        const valid = popup.inputs.every(x => x.validity.valid);
        popup.submit.disabled = !valid;
    };

    const updateInput = (input) => {
        input.classList.toggle(inputErrorClass, !input.validity.valid);

        const error = popup.form.querySelector(`.${input.name}-error`);
        error.classList.toggle(errorClass, !input.validity.valid);
        error.textContent = input.validationMessage;
    };

    popup.inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateInput(input);
            updateSubmit();
        });
    });

    const reset = () => {
        popup.inputs.forEach(input => updateInput(input));
        updateSubmit();
    };

    popup.form.addEventListener('submit', reset);
    reset();
}
