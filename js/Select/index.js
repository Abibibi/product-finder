import App from '../App.js';
import products from '../../data/products.js';

const Select = () => {
    // creating Select element
    const select = document.createElement('select');
    select.classList.add('input-container-select');
    select.title = 'Veuillez sélectionner un type de produit'

    // creating Select 1st option (containing text to inform user about options type)
    const firstOption = document.createElement('option');
    firstOption.textContent = 'Type de produit';

    select.appendChild(firstOption);
    
    // creating following options values, which are read from data
    products.map((category) => {
        const option = document.createElement('option');

        const categoryName = Object.keys(category);
        const lowerCategoryName = categoryName.toString().toLowerCase();

        option.value = lowerCategoryName;
        option.textContent = categoryName;
        select.appendChild(option);
    });
    
    App.inputContainer.appendChild(select);
}

export default Select;