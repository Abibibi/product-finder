import { Select } from './Select/index.js';
import Form from './Form/index.js';
import { ProductList } from './ProductList/index.js';

const App = {
    inputContainer: document.createElement('div'),
    init: () => {
        const container = document.getElementById('todo');

        container.innerHTML = '';
        Select();
        Form();
        ProductList();

        App.inputContainer.classList.add('input-container');
        container.appendChild(App.inputContainer);
    }
};

export default App;

document.addEventListener('DOMContentLoaded', App.init);