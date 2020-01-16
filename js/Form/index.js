import App from '../App.js'; 
import { selectedCategory } from '../Select/index.js';
import products from '../../data/products.js';

// creating Form input
const input = document.createElement('input');

const Form = () => {
    // creating Form
    const form = document.createElement('form');

    form.addEventListener('submit', handleSubmit);

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

    input.addEventListener('blur', (event) => {
        if (!event.target.value) {
            label.classList.remove('input-container-label-focus');
        }
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

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input.value);
    console.log(selectedCategory);

    products.map((categoryName) => {

        for (const categoryProduct in categoryName) {
            // every array of products per category
            const eachCategoryProducts = categoryName[categoryProduct];

            // if category selected by user matches the category of one of the product arrays
            if (selectedCategory === categoryProduct) {

                // only matched array is kept
                console.log(eachCategoryProducts);

                eachCategoryProducts.map((eachProduct) => {
                    // if, in this array, products prices match price given by user
                    if (eachProduct.price < input.value) {
                        console.log(eachProduct);
                    }
                });
            }
        }
    });
}

export default Form;