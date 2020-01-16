import products from '../data/products.js';
import matchedProducts from '../data/matchedProducts.js';

const app = {   
    init: () => {
        app.container = document.getElementById('todo');
        
        app.container.innerHTML = '';
        
        app.formElement();
        app.productList();
    },

    formElement: () => {
        // creating Form
        app.form = document.createElement('form');
        app.form.classList.add('form');
        app.form.addEventListener('submit', app.handleSubmit);

        app.selectElement();
        app.inputLabelButtonElements();

        app.container.appendChild(app.form);
    },

    selectElement: () => {
        app.select = document.createElement('select');
        app.select.id = 'allCategories';
        app.select.classList.add('form-select');
        app.select.title = 'Veuillez sélectionner un type de produit'

        // listening to Select changes to retrieve selection option value
        app.select.addEventListener('change', () => {
            app.selectedCategory = app.select.value;
        });

        app.firstOption = document.createElement('option');
        app.firstOption.textContent = 'Type de produit';
        app.select.appendChild(app.firstOption);

        // creating following options values, which are read from data
        products.map((category) => {
            app.option = document.createElement('option');
            const categoryName = Object.keys(category);

            app.option.value = categoryName;
            app.option.textContent = categoryName;
            app.select.appendChild(app.option);
        });
        
        app.form.appendChild(app.select);
    },

    inputLabelButtonElements: () => {
        // creating Form input
        app.input = document.createElement('input');
        app.input.classList.add('form-input');
        app.input.title = 'Veuillez renseigner un prix maximal en euro';

        // creating Form label
        app.label = document.createElement('label');
        app.label.classList.add('form-label');
        app.label.textContent = 'Prix maximal en €';

        // to make label go up on focus, and go back down on blur
        // (label is in position absolute, see css)
        if(app)
        app.input.addEventListener('focus', () => {
            app.label.classList.add('form-label-focus');
        });

        app.input.addEventListener('blur', () => {
            if (!app.input.value) {
                app.label.classList.remove('form-label-focus');
            }
        });

        // creating Form button
        app.buttonDiv = document.createElement('div');
        app.button = document.createElement('button');
        app.button.classList.add('form-button');
        app.button.textContent = 'Ok';
        app.buttonDiv.appendChild(app.button);
    
        app.form.appendChild(app.input);
        app.form.appendChild(app.label);
        app.form.appendChild(app.buttonDiv);
    },

    productList: () => {
        app.productListDiv = document.createElement('div');
        app.productListDiv.classList.add('products');
        matchedProducts.map((matchedProduct) => {
            app.product(matchedProduct);
        });
        app.container.appendChild(app.productListDiv);
    },

    product: (hairProduct) => {
        // creating one box containing one product
        app.oneProductDiv = document.createElement('div');
        app.oneProductDiv.classList.add('products-product');
    
        // creating each part of the box
        app.productPictureDiv = document.createElement('div');
        app.productPictureDiv.classList.add('products-product-imgdiv');
        
        app.productPicture = document.createElement('img');
        app.productPicture.classList.add('products-product-imgdiv-img');

        app.productPicture.src = hairProduct.picture;
        app.productPictureDiv.appendChild(app.productPicture);
        
        app.productName = document.createElement('div');
        app.productName.textContent = hairProduct.name;
        
        app.productBrand = document.createElement('div');
        app.productBrand.textContent = hairProduct.brand;
        
        app.productCategory = document.createElement('div');
        app.productCategory.textContent = hairProduct.category;
        
        app.productPrice = document.createElement('div');
        app.productPrice.classList.add('products-product-price')
        app.productPrice.textContent = `${hairProduct.price} €`;
        
        // adding each part in one product box
        app.oneProductDiv.appendChild(app.productPictureDiv);
        app.oneProductDiv.appendChild(app.productName);
        app.oneProductDiv.appendChild(app.productBrand);
        app.oneProductDiv.appendChild(app.productCategory);
        app.oneProductDiv.appendChild(app.productPrice);
    
        // adding each product box in product list
        app.productListDiv.appendChild(app.oneProductDiv);
    },

    handleSubmit: (event) => {
        event.preventDefault();

        // matchedProducts array is cleared
        // so no product from a previous search
        // is displayed anymore
        // (see productList method)
        matchedProducts.length = 0;

        products.map((categoryName) => {
            for (const categoryProduct in categoryName) {
                // every array of products per category
                const eachCategoryProducts = categoryName[categoryProduct];
                
                // if category selected by user matches the category of one of the product arrays
                if (app.selectedCategory === categoryProduct) {

                    // only matched array is kept
                    eachCategoryProducts.map((eachProduct) => {

                        if (eachProduct.price < app.input.value) {
                            // if, in this array, products match price given by user,
                            // they are put in matchedProducts array,
                            // which is to be displayed
                            // (see productList method)
                            matchedProducts.push(eachProduct);

                        }
                    });
                }
            }
        });
        app.init();
        app.form.reset();
    },
}

// When DOM is loaded, app.init is called
document.addEventListener('DOMContentLoaded', app.init);