import products from '../data/products.js';
import matchedProducts from '../data/matchedProducts.js';

const app = {   
    init: () => {
        app.container = document.getElementById('todo');
        
        app.container.innerHTML = '';
        
        app.selectAndFormContainer();
        app.productList();
    },

    selectAndFormContainer: () => {
        app.inputContainer = document.createElement('div');
        app.inputContainer.classList.add('input-container');

        app.selectElement();
        app.formElement();

        app.container.appendChild(app.inputContainer);
    },

    selectElement: () => {
        app.select = document.createElement('select');
        app.select.id = 'allCategories';
        app.select.classList.add('input-container-select');
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
        
        app.inputContainer.appendChild(app.select);
    },

    formElement: () => {
        // creating Form
        app.form = document.createElement('form');

        app.form.addEventListener('submit', app.handleSubmit);

        // creating Form input
        app.input = document.createElement('input');
        app.input.classList.add('input-container-input');
        app.input.title = 'Veuillez renseigner un prix maximal en euro';

        // creating Form label
        app.label = document.createElement('label');
        app.label.classList.add('input-container-label');
        app.label.textContent = 'Prix maximal en €';

        // to make label go up on focus, and go back down on blur
        // (label is in position absolute, see css)
        if(app)
        app.input.addEventListener('focus', () => {
            app.label.classList.add('input-container-label-focus');
        });

        app.input.addEventListener('blur', () => {
            if (!app.input.value) {
                app.label.classList.remove('input-container-label-focus');
            }
        });

        // creating Form button
        app.button = document.createElement('button');
        app.button.classList.add('input-container-button');
        app.button.textContent = 'Ok';
    
        app.form.appendChild(app.input);
        app.form.appendChild(app.label);
        app.form.appendChild(app.button);
    
        app.inputContainer.appendChild(app.form);
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
        app.oneProductDiv.classList.add('oneProduct');
    
        // creating each part of the box
        app.productPicture = document.createElement('img');
        app.productPicture.src = hairProduct.picture;
        
        app.productName = document.createElement('p');
        app.productName.textContent = hairProduct.name;
        
        app.productBrand = document.createElement('p');
        app.productBrand.textContent = hairProduct.brand;
        
        app.productCategory = document.createElement('p');
        app.productCategory.textContent = hairProduct.category;
        
        app.productPrice = document.createElement('p');
        app.productPrice.textContent = `${hairProduct.price} €`;
        
        // adding each part in one product box
        app.oneProductDiv.appendChild(app.productPicture);
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