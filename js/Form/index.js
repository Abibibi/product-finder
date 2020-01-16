import App from '../App.js';

const Form = () => {
    // creating Form
    App.form = document.createElement('form');

    // creating Form input
    App.input = document.createElement('input');
    App.input.classList.add('input-container-input');
    App.input.title = 'Veuillez renseigner un prix maximal en euro';

    // to make label go up on focus, and go back down on blur
    // (label is in position absolute, see css)
    App.input.addEventListener('focus', () => {
        App.label.classList.add('input-container-label-focus');
    });

    App.input.addEventListener('blur', () => {
        App.label.classList.remove('input-container-label-focus');
    });

    // creating Form label
    App.label = document.createElement('label');
    App.label.classList.add('input-container-label');
    App.label.textContent = 'Prix maximal en €'

    // creating Form button
    App.button = document.createElement('button');
    App.button.classList.add('input-container-button');
    App.button.textContent = 'Ok';

    App.form.appendChild(App.input);
    App.form.appendChild(App.label);
    App.form.appendChild(App.button);

    App.inputContainer.appendChild(App.form);
}

export default Form;