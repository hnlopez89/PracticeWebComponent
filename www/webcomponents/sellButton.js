export default class SellButton extends HTMLElement {
    constructor(){
        super();
        this.show = true;
        let shadowRoot = this.attachShadow({mode: 'open'})
        let style = `
        <style>
            button {
                padding: 1rem 2rem;
                margin: 0 auto;
            }
            .btn-green{
                background-color: green;
                border: 0;
                border-radius: 5px;
                color: white;
                text-transform: uppercase;
            }
            .btn-red {
                background-color: red;
                border: 0;
                border-radius: 5px;
                color: white;
                text-transform: uppercase;
            }
            .hidden {
                display: none;
            }
            .visible {
                display: true;
            }
            .form{
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 2rem auto;
            }
        </style>
        `
        let div = document.createElement("div");
        div.className = "form";
        let button = document.createElement("button");
        button.className = 'btn-green';
        div.append(button)
        let p = document.createElement("p");
        p.innerHTML = "esto es visible";
        this.toggle = () => {
            this.show = !this.show
            this.show === false ? button.className ='btn-red' : button.className = 'btn-green'; 
            this.show === false ? p.className = 'visible' : p.className = 'hidden';
            shadowRoot.innerHTML = style
            div.append(button)
            div.append(p)
            shadowRoot.append(div)
        }
        button.addEventListener('click', this.toggle)

        shadowRoot.innerHTML = style
        shadowRoot.append(div)

    }
}
