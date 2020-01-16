import App from '../App.js';
import products from '../../data/products.js';

const Select = () => {
    // creating Select element
    App.select = document.createElement('select');
    App.select.classList.add('input-container-select');
    App.select.title = 'Veuillez sélectionner un type de produit'

    // creating Select 1st option (containing text to inform user about options type)
    App.firstOption = document.createElement('option');
    App.firstOption.textContent = 'Type de produit';

    App.select.appendChild(App.firstOption);
    
    // creating following options values, which are read from data
    products.map((category) => {
        App.option = document.createElement('option');

        const categoryName = Object.keys(category);
        const lowerCategoryName = categoryName.toString().toLowerCase();

        App.option.value = lowerCategoryName;
        App.option.textContent = categoryName;
        App.select.appendChild(App.option);
    });
    
    App.inputContainer.appendChild(App.select);
}

export default Select;