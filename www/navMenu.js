import {PersonForm, HooverComponent, ChangeButton,CounterComponent} from "./webcomponents/index.js";
export default class NavMenu extends HTMLElement {
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode: 'open'})
        this.choice = this.getAttribute("show");
        let style = `
        <style>
            .menu{
                margin: 0;
                padding: 1rem;
                display:flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
                background-color: black;
                color: white;
                list-style: none;
            }
            .menu > li {
                padding: 0.5rem;
                margin: 0.5rem;
                border-radius: 5% / 10%;
                width: 80px;
                text-align: center;
                font-family: Arial;
                font-size: 20px;
            }
        </style>
        `
        this.divMenu = document.createElement("div");
        this.ulMenu = document.createElement("ul");
        this.ulMenu.className = "menu";
        this.liCounter = document.createElement("li")
        this.liButtons = document.createElement("li")
        this.liForm = document.createElement("li")
        this.liCounter.innerText = "Counter"
        this.liButtons.innerText = "Buttons"
        this.liForm.innerText = "Form"
        this.liCounter.param ="counter-component"
        this.liButtons.param ="change-button"
        this.liForm.param ="person-form"
        this.ulMenu.append(this.liCounter)
        this.ulMenu.append(this.liButtons)
        this.ulMenu.append(this.liForm)
        this.divMenu.append(this.ulMenu)
        shadowRoot.innerHTML = style
        shadowRoot.append(this.divMenu)
    }
    
    static get observedAttributes(){
        return ['option']
    }
    
    connectedCallback(){
        this.onSetParam = (event) => {
            this.setAttribute('option', event.currentTarget.param)
        }
        this.onHoover = (event) => {
            event.target.style =  "background-color:gold;color:green;cursor: pointer; text-decoration: underline"
        }
        this.onLeave = (event) => {
            console.log(event.currentTarget.param);
            console.log(this.getAttribute('option'));
            if(event.currentTarget.param === this.getAttribute('option')){
                event.target.style = "backgorund-color: black; color: gold; text-decoration: underline; font-weight: bold"
            } else {
                event.target.style = "backgorund-color: black"
            }
        }
        this.liCounter.addEventListener('click', this.onSetParam)
        this.liButtons.addEventListener('click', this.onSetParam)
        this.liForm.addEventListener('click', this.onSetParam)
        this.liCounter.addEventListener('mouseover', this.onHoover)
        this.liCounter.addEventListener('mouseleave', this.onLeave)
        this.liButtons.addEventListener('mouseover', this.onHoover)
        this.liButtons.addEventListener('mouseleave', this.onLeave)
        this.liForm.addEventListener('mouseover', this.onHoover)
        this.liForm.addEventListener('mouseleave', this.onLeave)
        const x = document.querySelector("change-button")
    }
    
    attributeChangedCallback(att, oldv, newv){
        //console.log(`att a modificar ${att}, antes valía  ${oldv} y ahora vale  ${newv}`);
        let webComponent;
        switch(newv){
            case "person-form":
                webComponent = new PersonForm()
                break;
            case "change-button":
                webComponent = new ChangeButton()
                break;
            case "counter-component":
                webComponent = new CounterComponent()
                webComponent.setAttribute('counter', 0)
                webComponent.setAttribute('step', 1)
                webComponent.setAttribute('min', 0)
                webComponent.setAttribute('max', 10)
                break;
            }
        switch(att){
            case "option":
                if (newv != oldv && newv != '') {
                    if(oldv != null && oldv != ''){
                        document.querySelector(oldv).remove()
                    }
                    if(newv != ''){
                        document.body.append(webComponent)
                    }
                }
            break;
        }
        switch(oldv){
            case "person-form":
                this.liForm.style = ""
                break;
            case "change-button":
                this.liButtons.style = ""
                break;
            case "counter-component":
                this.liCounter.style = ""
                break;
        }
    }
}