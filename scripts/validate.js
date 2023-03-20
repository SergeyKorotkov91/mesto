function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
    document.querySelectorAll(formSelector).forEach(form => {
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        const submit = form.querySelector(submitButtonSelector);

        const updateSubmit = () => {
            const valid = inputs.every(x => x.validity.valid);
            submit.disabled = !valid;
            submit.classList.toggle(inactiveButtonClass, !valid);
        };

        const updateInput = (input) => {
            input.classList.toggle(inputErrorClass, !input.validity.valid);

            const error = form.querySelector(`.${input.name}-error`);
            error.classList.toggle(errorClass, !input.validity.valid);
            error.textContent = input.validationMessage;
        };

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                updateInput(input);
                updateSubmit();
            });
        });

        const reset = () => {
            inputs.forEach(input => updateInput(input));
            updateSubmit();
        };

        form.addEventListener('submit', reset);
        // reset();
    });
}
