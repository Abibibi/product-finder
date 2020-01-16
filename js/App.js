import { Select } from './Select/index.js';
import Form from './Form/index.js';
import { ProductList } from './ProductList/index.js';

const App = {
    container: document.getElementById('todo'),

    inputContainer: document.createElement('div'),

    init: () => {
        App.container.innerHTML = '';
        App.inputContainer.classList.add('input-container');
        App.container.appendChild(App.inputContainer);
        
        Select();
        Form();
        ProductList();
    }
};

export default App;

document.addEventListener('DOMContentLoaded', App.init);