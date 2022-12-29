export default class ChangeButton extends HTMLElement {
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode: 'open'})
        this.show = this.getAttribute("show");
        let style = `
        <style>
            button {
                padding: 1rem 2rem;
                margin: 0 auto;
                border-radius: 5px;
                color: white;
                text-transform: uppercase;
                border: 0;
            }
            .btn-green{
                background-color: green;
            }
            .btn-red {
                background-color: red;
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
            .hoover{
                background-color: black;
            }
        </style>
        `
        this.div = document.createElement("div");
        this.div.className = "form";
        this.button = document.createElement("button");
        this.button.className = 'btn-green';
        this.div.append(this.button)
        this.p = document.createElement("p");
        this.p.innerHTML = "esto es visible";
        this.p.className = 'flag'
        this.div.append(this.p)        
        shadowRoot.innerHTML = style
        shadowRoot.append(this.div)
    }
    
    static get observedAttributes(){
        return ['show', 'hoover']
    }
    
    connectedCallback(){
        this.toggle = () => {
            this.show = (this.getAttribute("show") === 'true')
            this.setAttribute('show', !this.show)
        }
        this.hoover = () => {
            this.setAttribute('hoover', true)
        }
        this.unhoover = () => {
            this.show = (this.getAttribute("show") === 'true')
            this.setAttribute('hoover', false)
            this.setAttribute('show', this.show)
        }
        this.button.addEventListener('click', this.toggle)
        this.button.addEventListener('mouseover', this.hoover)
        this.button.addEventListener('mouseleave', this.unhoover)
    }
    
    attributeChangedCallback(att, oldv, newv){
        switch(att){
            case "hoover":
                if(newv === 'true'){
                    this.button.className = 'hoover'
                    this.button.innerText = "efecto hoover"
                }
                break;
            case "show":
                if(newv === 'true') {
                    this.button.className = 'btn-green'
                    this.button.innerText = "click para ocultar"
                    this.p.innerHTML = `aparezco`
                }
                else {
                    this.button.className = 'btn-red'
                    this.button.innerText = "click para mostrar"
                    this.p.innerHTML = ` `
                }
                break;
            }
        }
}
