import { productListDiv } from './index.js';


export const Product = (hairProduct) => {
    // creating one box containing one product
    const oneProductDiv = document.createElement('div');
    oneProductDiv.classList.add('oneProduct');

    // creating each part of the box
const productPicture = document.createElement('img');

const productName = document.createElement('p');

const productBrand = document.createElement('p');

const productCategory = document.createElement('p');

const productPrice = document.createElement('p');
      
    productPicture.src = hairProduct.picture;

    productName.textContent = hairProduct.name;

    productBrand.textContent = hairProduct.brand;

    productCategory.textContent = hairProduct.category;

    productPrice.textContent = `${hairProduct.price} €`;

    // adding each part in one product box
    oneProductDiv.append(productPicture, productName, productBrand, productCategory, productPrice);

    // adding each product box in product list
    productListDiv.appendChild(oneProductDiv);
}