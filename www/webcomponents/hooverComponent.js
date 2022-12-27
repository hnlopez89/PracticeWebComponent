export default class HooverComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.hooverButton = document.createElement('button')
        this.hooverButton.innerText = "click"
        this.hooverButton.className = 'appears'
        console.log("hello");
        this.content = this.getAttribute("att")
        this.appears = () => {
            this.setAttribute('att', 'filled')
        }
        this.disappears = () => {
            this.setAttribute('att', '')
        }
        this.p = document.createElement('p')
        this.p.innerText = this.content
        this.hooverButton.addEventListener('mouseover', this.appears)
        this.hooverButton.addEventListener('mouseleave', this.disappears)
        let style = `
            <style>
            button{
                padding: 3rem;
                background-color: red;
            }
            </style>
        `
        this.shadow.innerHTML = style
        this.shadow.append(this.hooverButton)
        this.shadow.append(this.p)
    }
    static get observedAttributes(){
        return ['att']
    }

    attributeChangedCallback(att, oldV,newV){
        switch(att){
            case 'att':
                if (newV != '') this.hooverButton.innerHTML = `Click<style>button {background-color:green}</style>`              
                else this.hooverButton.innerHTML = `Click <style> button {background-color:red}`
                break;
        }
    }
    connectedCallback() {
        
    }

}

