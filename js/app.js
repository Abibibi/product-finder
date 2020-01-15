import products from '../data/products.js';

const app = {
    init: () => {
        app.container = document.getElementById('todo');
        app.inputContainer = document.createElement('div');
        app.inputContainer.className = 'input-container';

        app.container.innerHTML = '';
        app.createSelect();
        app.createForm();

        app.container.appendChild(app.inputContainer);
    },

    createSelect: () => {
        app.select = document.createElement('select');
        app.firstOption = document.createElement('option');
        app.firstOption.textContent = 'Type de produit';
        app.select.appendChild(app.firstOption);
        
        products.map((category) => {
            app.option = document.createElement('option');

            const categoryName = Object.keys(category);
            const lowerCategoryName = categoryName.toString().toLowerCase();

            app.option.value = lowerCategoryName;
            app.option.textContent = categoryName;
            app.select.appendChild(app.option);
        });
        
        app.inputContainer.appendChild(app.select);
    },

    createForm: () => {
        app.form = document.createElement('form');
        app.input = document.createElement('input');
        app.label = document.createElement('label');
        app.button = document.createElement('button');

        app.button.textContent = 'Ok';

        app.form.appendChild(app.input);
        app.form.appendChild(app.label);
        app.form.appendChild(app.button);

        app.inputContainer.appendChild(app.form);
    },

    


};

document.addEventListener('DOMContentLoaded', app.init);