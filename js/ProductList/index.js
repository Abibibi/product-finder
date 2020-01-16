import App from '../App.js';

export const productListDiv = document.createElement('div');

export const ProductList = () => {
    productListDiv.classList.add('products');
    App.inputContainer.appendChild(productListDiv);
};