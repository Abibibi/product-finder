import App from '../App.js';

const Form = () => {
    // creating Form
    const form = document.createElement('form');

    // creating Form input
    const input = document.createElement('input');
    input.classList.add('input-container-input');
    input.title = 'Veuillez renseigner un prix maximal en euro';

    // creating Form label
    const label = document.createElement('label');
    label.classList.add('input-container-label');
    label.textContent = 'Prix maximal en €'

    // to make label go up on focus, and go back down on blur
    // (label is in position absolute, see css)
    input.addEventListener('focus', () => {
        label.classList.add('input-container-label-focus');
    });

    input.addEventListener('blur', () => {
        label.classList.remove('input-container-label-focus');
    });

    // creating Form button
    const button = document.createElement('button');
    button.classList.add('input-container-button');
    button.textContent = 'Ok';

    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(button);

    App.inputContainer.appendChild(form);
}

export default Form;