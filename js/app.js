import navlinks from '../data/navlinks.js';
import products from '../data/products.js';
import matchedProducts from '../data/matchedProducts.js';

const app = {   
    init: () => {
        app.container = document.getElementById('todo');
        
        app.container.innerHTML = '';
        
        app.headerElement();
        app.titleNavElements();
        app.formElement();
        app.productList();
    },

    headerElement: () => {
        app.header = document.createElement('header');
        app.header.classList.add('header');
        app.container.appendChild(app.header);
    },

    titleNavElements: () => {
        app.title = document.createElement('h1');
        app.title.classList.add('title');
        app.title.textContent = 'Mes produits capillaires';

        app.nav = document.createElement('nav');
        app.ul = document.createElement('ul');
        app.ul.classList.add('nav-links');

        navlinks.map((navlink) => {
            app.li = document.createElement('li');
            app.a = document.createElement('a');
            app.a.setAttribute('href', navlink === 'Accueil' ? '#' : 'mailto:abeba.ngwe@gmail.com?Subject=Prise de contact');
            if (navlink === 'Contact') {
                app.a.setAttribute('target', '_blank');
                app.a.setAttribute('rel', 'noopener noreferrer');
            }
            app.a.textContent = navlink;
            
            app.li.appendChild(app.a);
            app.ul.appendChild(app.li);
        });

        app.nav.appendChild(app.ul);

        app.titleNavContainer = document.createElement('div');
        app.titleNavContainer.classList.add('title-nav-container');

        app.titleNavContainer.append(
            app.title,
            app.nav
        );

        app.header.append(
            app.titleNavContainer
        );
    },

    formElement: () => {
        // creating Form
        app.form = document.createElement('form');
        app.form.classList.add('form');
        app.form.addEventListener('submit', app.handleSubmit);

        app.selectElement();
        app.inputLabelButtonElements();

        app.header.appendChild(app.form);
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

        /* app.selectLabel = document.createElement('label');
        app.selectLabel.classList.add('form-label', 'form-select-label');
        app.selectLabel.textContent = 'Type de produit'; */

        // to make label go up on focus, and go back down on blur
        // (label is in position absolute, see css)
        /* app.select.addEventListener('focus', () => {
            app.selectLabel.classList.add('form-label-focus');
            app.select.classList.add('form-select-black');
        });

        app.select.addEventListener('blur', () => {
            if (!app.select.value) {
                app.selectLabel.classList.remove('form-label-focus', 'form-select-black');
                app.select.classList.remove('form-select-black');
            }
        }); */

        app.firstOption = document.createElement('option');
        app.firstOption.textContent = 'Type de produit';
        app.firstOption.classList.add('form-firstoption');
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
        /* app.form.appendChild(app.selectLabel); */
    },

    inputLabelButtonElements: () => {
        // creating Form input
        app.input = document.createElement('input');
        app.input.classList.add('form-input');
        app.input.title = 'Veuillez renseigner un prix maximal en euro';

        // creating Form label
        app.inputLabel = document.createElement('label');
        app.inputLabel.classList.add('form-label', 'form-input-label');
        app.inputLabel.textContent = 'Prix maximal en €';

        // to make label go up on focus, and go back down on blur
        // (label is in position absolute, see css)
   
        app.input.addEventListener('focus', () => {
            app.inputLabel.classList.add('form-label-focus');
        });

        app.input.addEventListener('blur', () => {
            if (!app.input.value) {
                app.inputLabel.classList.remove('form-label-focus');
            }
        });

        app.inputLabelContainer = document.createElement('div');
        app.inputLabelContainer.classList.add('form-input-label-container');
        app.inputLabelContainer.append(
            app.input,
            app.inputLabel
        );

        // creating Form button
        app.button = document.createElement('button');
        app.button.classList.add('form-button');
        app.button.textContent = 'Ok';
    
        app.form.appendChild(app.inputLabelContainer);
        app.form.appendChild(app.button);
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
        app.productName.classList.add('products-product-name');
        app.productName.textContent = hairProduct.name;
        
        app.productBrand = document.createElement('div');
        app.productBrand.classList.add('products-product-brand');
        app.productBrand.textContent = hairProduct.brand;

        app.productNameBrand = document.createElement('div');
        app.productNameBrand.classList.add('products-product-name-brand');
        app.productNameBrand.append(app.productName, app.productBrand);
        
        app.productCategory = document.createElement('div');
        app.productCategory.classList.add('products-product-category');
        app.productCategory.textContent = hairProduct.category;
        
        app.productPrice = document.createElement('div');
        app.productPrice.classList.add('products-product-price')
        app.productPrice.textContent = `${hairProduct.price.toFixed(2)} €`;
        
        // adding each part in one product box
        app.oneProductDiv.append(
            app.productPictureDiv,
            app.productNameBrand,
            app.productCategory,
            app.productPrice
        );
    
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
                            console.log(eachProduct);
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