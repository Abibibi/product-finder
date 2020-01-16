import App from '../App.js';
import products from '../../data/products.js';

export let selectedCategory = '';

// creating Select element
const select = document.createElement('select');

// creating Select 1st option (containing text to inform user about options type)
const firstOption = document.createElement('option');


export const Select = () => {

    select.id = 'allCategories';
    select.classList.add('input-container-select');
    select.title = 'Veuillez sélectionner un type de produit'

    // listening to Select changes to retrieve selection option value
    select.addEventListener('change', () => {
        selectedCategory = select.value;
        console.log(selectedCategory);
    });

    firstOption.textContent = 'Type de produit';

    select.appendChild(firstOption);
    
    // creating following options values, which are read from data
    products.map((category) => {
        const option = document.createElement('option');
        const categoryName = Object.keys(category);

        option.value = categoryName;
        option.textContent = categoryName;
        select.appendChild(option);
    });
    
    App.inputContainer.appendChild(select);
}