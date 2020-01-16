import { productListDiv } from './index.js';

export const Product = (hairProduct) => {
    // creating one box containing one product
    const oneProductDiv = document.createElement('div');
    oneProductDiv.classList.add('oneProduct');
    
    // creating each part of the box
    const productPicture = document.createElement('img');
    productPicture.src = hairProduct.picture;

    const productName = document.createElement('p');
    productName.textContent = hairProduct.name;

    const productBrand = document.createElement('p');
    productBrand.textContent = hairProduct.brand;

    const productCategory = document.createElement('p');
    productCategory.textContent = hairProduct.category;

    const productPrice = document.createElement('p');
    productPrice.textContent = hairProduct.price;

    // adding each part in one product box
    oneProductDiv.append(productPicture, productName, productBrand, productCategory, productPrice);

    // adding each product box in product list
    productListDiv.appendChild(oneProductDiv);
}