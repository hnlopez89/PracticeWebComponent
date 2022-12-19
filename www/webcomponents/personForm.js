export default class PersonForm extends HTMLElement{
    constructor(){
        super();
        let shadow = this.attachShadow({mode:'open'});
        this.elementRoot = document.createElement('div');

        
        let roleLabel = document.createElement('label');
        roleLabel.innerText = 'Role: ';
        
        let roleSelect = document.createElement('select');
        let adminOption = document.createElement('option');
        let employeeOption = document.createElement('option');
        let userOption = document.createElement('option');
        adminOption.innerText = "Administrador";
        adminOption.value = "admin";
        employeeOption.innerText = "Empleado";
        employeeOption.value = "employee";
        userOption.innerText = "Usuario";
        userOption.value = "user";
        
        roleSelect.appendChild(userOption)
        roleSelect.appendChild(employeeOption)
        roleSelect.appendChild(adminOption)

        
        this.div = document.createElement('div');
        this.div.id = "form"

        this.div.appendChild(roleLabel)
        this.div.appendChild(roleSelect)


        let style = `
        <style>
        #form{
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
        .bcn{
            background-image: url('img/barcelona.jpg')
        }
        .madrid{
            background-image: url('img/madrid.jpg')
        }
        .galicia{
            background-image: url('img/galicia.jpg')
        }
        .buenosAires{
            background-image: url('img/buenosAires.jpg')
        }
        </style>`

        let result = document.createElement('span');
        result.className = "FullNameNotification";
        this.div.append(result);

        this.onChangeRole = () => {
            this.role = roleSelect.value
            console.log(this.role);
        }
        roleSelect.addEventListener('change', this.onChangeRole)




        this.role = this.getAttribute("role");
        this.elementRoot.append(this.div)
        shadow.innerHTML = style;
        shadow.append(this.elementRoot)
    }
    static get observedAttributes(){
        return ['role', 'office', 'dept', 'name', 'surname', 'emailAddress']
    }

    attributeChangedCallback(att, oldValue, newValue){
        console.log("atributo: " + att);
        
        if(att === 'office'){
            console.log('att :'+ att + '\n oldvalue: ' + oldValue + '\n newValue: ' + newValue);
        }

    }

    connectedCallback(){
        if(this.role === "admin"){
        }
    }

}
