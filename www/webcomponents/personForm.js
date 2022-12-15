class PersonForm extends HTMLElement{
    constructor(){
        super();
        let shadow = this.attachShadow({mode:'open'});
        this.elementRoot = document.createElement('div');

        let nameLabel = document.createElement('label');
        nameLabel.innerText = 'First Name: ';

        let lastNameLabel = document.createElement('label');
        lastNameLabel.innerText = 'Last Name: ';

        let nameInput = document.createElement('input');
        let lastNameInput = document.createElement('input');

        this.div = document.createElement('div');
        this.div.className="form";

        this.div.appendChild(nameLabel)
        this.div.appendChild(nameInput)
        this.div.appendChild(lastNameLabel)
        this.div.appendChild(lastNameInput)


        let style = `
        <style>
        .form{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 2rem auto;
        }
        .OfficeNotification{
            margin: 2rem auto;
        }
        .FullNameNotification{
            color: red;
            margin: 2rem auto; 
        }
        </style>`

        let result = document.createElement('span');
        result.className = "FullNameNotification";
        this.div.append(result);

        this.onChangeValue = () => {
            result.innerHTML = `Hello ${nameInput.value} ${lastNameInput.value}`
        }

        nameInput.addEventListener('change', this.onChangeValue)
        lastNameInput.addEventListener('change', this.onChangeValue)

        this.role = this.getAttribute("role");
        this.elementRoot.append(this.div)
        shadow.innerHTML = style;
        shadow.append(this.elementRoot)
    }
    static get observedAttributes(){
        return ['role', 'office']
    }

    attributeChangedCallback(att, oldValue, newValue){
        console.log("atributo: " + att);
        
        if(att === 'office'){
            console.log('att :'+ att + '\n oldvalue: ' + oldValue + '\n newValue: ' + newValue);
        }
    }

    connectedCallback(){
        if(this.role = "admin"){
            const span = document.createElement('span');
            span.className = "OfficeNotification"
            const inputOffice = document.createElement('select');
            const barcelonaOption = document.createElement('option');
            const madridOption = document.createElement('option');
            const buenosAiresOption = document.createElement('option');
            const galiciaOption = document.createElement('option');
            barcelonaOption.innerText = "Barcelona";
            barcelonaOption.value="Barcelona"
            madridOption.innerText = "Madrid";
            madridOption.value="Madrid"
            buenosAiresOption.innerText = "Buenos Aires";
            buenosAiresOption.value="Buenos Aires"
            galiciaOption.innerText = "Galicia";
            galiciaOption.value="Galicia"
            inputOffice.append(barcelonaOption)
            inputOffice.append(madridOption)
            inputOffice.append(buenosAiresOption)
            inputOffice.append(galiciaOption)
            const labelOffice = document.createElement('label');
            labelOffice.innerText = "Indica tu oficina";
            this.onChangeOffice = () => {
                console.log("tu ofi es: "+ inputOffice.value);
                    if(inputOffice.value === "Barcelona") {
                        console.log("Barcelona");
                        span.innerText = inputOffice.value    
                        this.div.append(span)
                        let oldOffice = this.getAttribute("office")
                        console.log(oldOffice);                        
                        this.setAttribute("office", "Barcelona")
                        oldOffice = this.getAttribute("office")
                        console.log(oldOffice);                                                 
                    }
            }
            inputOffice.addEventListener('change',this.onChangeOffice)
            this.div.append(labelOffice)
            this.div.append(inputOffice)

            
        }
    }

}
window.customElements.define("person-form", PersonForm)