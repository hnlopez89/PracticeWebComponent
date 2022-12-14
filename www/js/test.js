console.log("hola mundo");

class SellButton extends HTMLElement {
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode: 'open'})
        let style = `
        <style>
            :host {
                --space: 1.5em;
            }
            .btn-green{
                background-color: green;
                border: 0;
                border-radius: 5px;
                color: white;
                padding: var(--space);
                text-transform: uppercase;
            }
            .btn-red {
                background-color: red;
                border: 0;
                border-radius: 5px;
                color: white;
                padding: var(--space);
                text-transform: uppercase;
            }
            .hidden {
                display: none;
            }
            .visible {
                display: true;
            }
        </style>
        `
        this.show = false;
        let button = document.createElement("button");
        button.className = 'btn-green';
        this.activate = () => {
            let p = document.createElement("p");
            p.innerHTML = "esto es visible"
            this.show = !this.show
            this.show === false ? button.className ='btn-red' : button.className = 'btn-green'; 
            this.show === false ? p.className = 'hidden' : p.className = 'visible';
            shadowRoot.innerHTML = style
            shadowRoot.append(button)
            shadowRoot.append(p)
        }
        button.addEventListener('click', this.activate)

        shadowRoot.innerHTML = style
        shadowRoot.append(button)

    }
}
window.customElements.define("sell-button", SellButton);

class PersonForm extends HTMLElement{
    constructor(){
        super();
        let shadow = this.attachShadow({mode:'open'});
        let elementRoot = document.createElement('div');

        let nameLabel = document.createElement('label');
        nameLabel.innerText = 'First Name: ';

        let lastNameLabel = document.createElement('label');
        lastNameLabel.innerText = 'Last Name: ';

        let nameInput = document.createElement('input');
        let lastNameInput = document.createElement('input');

        elementRoot.appendChild(nameLabel)
        elementRoot.appendChild(nameInput)
        elementRoot.appendChild(lastNameLabel)
        elementRoot.appendChild(lastNameInput)

        let result = document.createElement('span');
        elementRoot.append(result);

        this.onChangeValue = () => {
            result.innerHTML = `Hello ${nameInput.value} ${lastNameInput.value}`
        }

        nameInput.addEventListener('change', this.onChangeValue)
        lastNameInput.addEventListener('change', this.onChangeValue)

        shadow.append(elementRoot)
    }
}
window.customElements.define("person-form", PersonForm)