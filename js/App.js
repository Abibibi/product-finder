import Select from './Select/index.js';
import Form from './Form/index.js';

const App = {
    init: () => {
        App.container = document.getElementById('todo');
        App.inputContainer = document.createElement('div');

        App.container.innerHTML = '';
        Select();
        Form();

        App.inputContainer.classList.add('input-container');
        App.container.appendChild(App.inputContainer);
    }
};

export default App;

document.addEventListener('DOMContentLoaded', App.init);