import { Select } from './Select/index.js';

export const App = {
    init: () => {
        App.container = document.getElementById('todo');
        App.inputContainer = document.createElement('div');

        App.container.innerHTML = '';
        Select();
        App.createForm();

        App.inputContainer.classList.add('input-container');
        App.container.appendChild(App.inputContainer);
    },

    createForm: () => {
        App.form = document.createElement('form');
        App.input = document.createElement('input');
        App.input.classList.add('input-container-input');
        App.input.title = 'Veuillez renseigner un prix maximal en euro';

        App.input.addEventListener('focus', (event) => {
            App.label.classList.add('input-container-label-focus');
        });

        App.input.addEventListener('blur', (event) => {
            App.label.classList.remove('input-container-label-focus');
        });

        App.label = document.createElement('label');
        App.label.classList.add('input-container-label');
        App.label.textContent = 'Prix maximal en €'

        App.button = document.createElement('button');
        App.button.classList.add('input-container-button');
        App.button.textContent = 'Ok';

        App.form.appendChild(App.input);
        App.form.appendChild(App.label);
        App.form.appendChild(App.button);

        App.inputContainer.appendChild(App.form);
    },

    


};

document.addEventListener('DOMContentLoaded', App.init);