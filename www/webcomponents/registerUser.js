export default class RegisterUser extends HTMLElement {
    constructor(){
        super();
        this.name = "Hugo"
    }
    connectedCallback(){
        console.log(this.name);
    }
}