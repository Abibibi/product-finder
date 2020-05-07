import navLinks from './data/navLinks.js';
import products from './data/products.js';
import matchedProducts from './data/matchedProducts.js';
import footerLinks from './data/footerLinks.js';

import './styles/css/reset.css';
import './styles/css/style.css';

const app = {   
    init: () => {
        setTimeout(() => {
            // to make sure height taken into account
            // is always window height, even if 
            // this height is reduced (typically,
            // when the keyboard is displayed on mobile)
            const viewheight = window.innerHeight;
            const viewwidth = window.innerWidth;
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`);
        }, 300);
        
        app.container = document.getElementById('todo');
        
        app.container.innerHTML = '';
        
        app.headerElement();
        app.titleNavElements();
        app.burgerMenu();
        app.formElement();
        // if user has not clicked any navbar links
        // or submitted the form to display specific products,
        // suggested products are displayed
        if (!matchedProducts.length) {
            app.productsTitle('Nos suggestions');
            app.suggestedProducts();
        } else {
            app.productsTitle(app.productsTitleContent);
        }
        
        app.productList();
        app.footerElement();
    },

    headerElement: () => {
        app.header = document.createElement('header');
        app.header.classList.add('header');
        app.container.appendChild(app.header);
    },

    titleNavElements: () => {
        app.title = document.createElement('h1');
        app.title.classList.add('title');
        app.titleLink = document.createElement('a');
        app.titleLink.textContent = 'Natural Haircare';
        app.titleLink.setAttribute('href', '#');

        app.title.addEventListener('click', () => {
            // to clear matchedProducts array
            // and thus display all suggested products
            // (see init method)
            matchedProducts.length = 0;
            app.init();
        });

        app.title.appendChild(app.titleLink);

        app.nav = document.createElement('nav');
        app.nav.classList.add('nav');

        app.ul = document.createElement('ul');
        app.ul.classList.add('nav-links');

        navLinks.map((navLink) => {
            app.li = document.createElement('li');
            app.li.classList.add('nav-link');

            app.a = document.createElement('a');

            if (navLink === 'Contact') {
                // to scroll to the contact information in the footer
                // when navbar link 'Contact' is clicked
                app.a.addEventListener('click', () => {
                    window.scrollTo({
                        top: app.container.querySelector('footer').offsetTop,
                        behavior: 'smooth'
                    })
                })
            };

            // to display navLinks values in the plural ('Shampoings', 'Après-shampoings'...)
            if (navLink !== 'Accueil' && navLink !== 'Contact') {
                let splitNavLink = navLink.split(' ');

                let splitPluralNavLink = splitNavLink.map((splitNavLinkWord) => `${splitNavLinkWord}s`);

                const pluralNavLink = splitPluralNavLink.join(' ');
                
                app.a.id = navLink;

                app.a.textContent = pluralNavLink;

            } else {
                app.a.textContent = navLink;
            }

            app.a.addEventListener('click', (event) => {
                app.selectedCategory = event.target.id;

                if (navLink !== 'Contact') app.handleEvent(event);
            });

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

    burgerMenu: () => {
        app.burger = document.createElement('div');
        app.burger.classList.add('burger');

        for (let i = 0; i<3; i++) {
            app.burgerLine = document.createElement('div');
            app.burgerLine.classList.add('burger-lines', `burger-line${i+1}`);

            app.burger.appendChild(app.burgerLine);
        };

        app.burger.addEventListener('click', () => {
            app.ul.classList.toggle('nav-active');
        })

        app.nav.appendChild(app.burger);
    },

    formElement: () => {
        // creating Form
        app.form = document.createElement('form');
        app.form.classList.add('form');
        app.form.addEventListener('submit', app.handleEvent);

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

    productsTitle: (titleText) => {
        app.productsTitleElement = document.createElement('h2');
        app.productsTitleElement.classList.add('products-title');
        app.productsTitleElement.textContent = titleText;

        app.container.appendChild(app.productsTitleElement);
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
        app.oneProductLink = document.createElement('a');
        app.oneProductLink.setAttribute('href', hairProduct.link);
        app.oneProductLink.setAttribute('target', '_blank');
        app.oneProductLink.setAttribute('rel', 'noopener noreferrer');

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

        app.oneProductLink.appendChild(app.oneProductDiv);
    
        // adding each product box in product list
        app.productListDiv.appendChild(app.oneProductLink);
    },

    suggestedProducts: () => {
        products.map((categoryName) => {
            
            /* categoryProduct.map((product) => {
                matchedProducts.push(product);
            }) */
            const eachCategoryProducts = Object.values(categoryName)[0];

            eachCategoryProducts.map((product) => {
                matchedProducts.push(product);
            });
        })
    },

    handleEvent: (event) => {
        // 2 types of events may happen:
        // a form submission
        // or a click on of the the nav links

        event.preventDefault();

        // matchedProducts array is cleared
        // so no product from a previous search / click
        // is displayed anymore
        // (see productList method)
        matchedProducts.length = 0;

        products.map((categoryName) => {
            for (const categoryProduct in categoryName) {
                // every array of products per category
                const eachCategoryProducts = categoryName[categoryProduct];

                // if category selected by user matches the category of one of the product arrays
                if (app.selectedCategory === categoryProduct) {
                    
                    let titleToDisplay = '';

                    // only matched array is kept
                    eachCategoryProducts.map((eachProduct) => {
                        if (app.input.value) {
                            if (eachProduct.price < app.input.value) {
                                // if, in this array, products match price given by user,
                                // they are put in matchedProducts array,
                                // which is to be displayed
                                // (see productList method)
                                
                                matchedProducts.push(eachProduct);

                                // to display the results title
                                // with the proper number
                                // according to the number of results
                                if (matchedProducts.length > 1) {
                                    const splitCategory = app.selectedCategory.split(' ');
                                    titleToDisplay = splitCategory.map((category) => category + 's').join(' ');
                                } else {
                                    titleToDisplay = app.selectedCategory;
                                }

                                app.productsTitleContent = `${titleToDisplay} en-dessous de ${app.input.value} €`;

                            }
                        // is no price was entered,
                        // or if the event that occured
                        // is a click on one of the navbar links,
                        // matchedProducts is filled with products
                        // whose category matches the link clicked
                        } else {
                            matchedProducts.push(eachProduct);
                            const splitCategory = app.selectedCategory.split(' ');
                            titleToDisplay = splitCategory.map((category) => category + 's').join(' ');
                            app.productsTitleContent = `${titleToDisplay}`;
                        }
                    });
                }
            }
        });
        console.log(matchedProducts);
        app.init();
        app.form.reset();
    },

    footerElement: () => {
        app.footer = document.createElement('footer');
        app.footer.classList.add('footer');

        app.footerDiv = document.createElement('div');
        app.footerDiv.classList.add('footer-container');
        
        app.footerLinks = document.createElement('div');
        app.footerLinks.classList.add('footer-container-links');

        footerLinks.map((footerLink) => {
            app.footerContact = document.createElement('p');
            
            app.footerContactLink = document.createElement('a');
            app.footerContactLink.setAttribute('href', footerLink.link);
            app.footerContactLink.setAttribute('target', '_blank');
            app.footerContactLink.setAttribute('rel', 'noopener noreferrer');
            app.footerContactLink.textContent = footerLink.type;

            app.footerContact.appendChild(app.footerContactLink);
            app.footerLinks.appendChild(app.footerContact);
        });

        app.copyrightDiv = document.createElement('div');
        app.copyrightDiv.classList.add('footer-container-copyright');

        app.copyright = document.createElement('p');
        app.copyright.textContent = 'Natural Haircare - 2020 ©';

        app.pictureCopyright = document.createElement('p');
        app.pictureCopyright.innerHTML = 'Crédit photo : <a href="https://pixabay.com/users/Yousz-1216526/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2310247">Yousz</a> de <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2310247">Pixabay</a>';

        app.copyrightDiv.append(
            app.copyright,
            app.pictureCopyright
        );

        app.footerDiv.append(
            app.footerLinks,
            app.copyrightDiv
        )

        app.footer.appendChild(app.footerDiv);

        app.container.appendChild(app.footer);
    }
}

// Once DOM is loaded, app.init is called
document.addEventListener('DOMContentLoaded', app.init);