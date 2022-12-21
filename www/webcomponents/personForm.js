import {style} from './styles.js'
import { getDepartments, getRoles, getOffices, getEmployees, getEmailAdmin } from './helpers.js';

export default class PersonForm extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:'open'});
        this.liName = document.createElement('li')
        this.liSurname = document.createElement('li')
        this.liRole = document.createElement('li')
        this.liOffice = document.createElement('li')
        this.liDepartment = document.createElement('li')
        this.liEmailAddress = document.createElement('li')
        this.result = document.createElement('ul')
    }


    attributeChangedCallback(att, oldValue, newValue){
        console.log("atributo a modificar: " + att);
        switch(att){
            case 'role':
                if(this.liRole)this.liRoleinnerText = `Rol: ${newValue}`;
                if(this.divTableEmployees)this.divTableEmployees.className = 'hyde'
                if(this.liOffice)this.liOffice.innerText = `Sede: `;
                if(this.liDepartment)this.liDepartment.innerText = `Departamento: `;
                if(this.liName)this.liName.innerText = `Nombre: `
                if(this.liSurname)this.liSurname.innerText = `Apellido: `
                if(this.liEmailAddress)this.liEmailAddress.innerText = `Dirección de email: `;
                (newValue === 'employee')  ? (this.divOffice.className) = 'show' 
                : (this.divOffice.className = 'hyde') && (this.divDepartment.className = 'hyde');
                newValue === 'admin' ? this.divEmployees.className = 'show' : this.divEmployees.className = 'hyde'
                if(newValue === 'user') 
                {
                    (this.divRegister.className = 'show') &&
                    (this.inputName.value = '') &&
                    (this.inputLastName.value = '') &&
                    (this.inputEmail.value = '') &&
                    (this.liDepartment.innerText = '')
                } else this.divRegister.className = 'hyde'
                break;
            case 'office':
                if(this.liOffice)this.liOffice.innerText = `Sede: ${newValue}`;
                if(newValue !== '') {
                    this.divDepartment.className = 'show'
                }
                break;
            case 'dept':
                if(this.liDepartment)this.liDepartment.innerText = `Departamento: ${newValue}`;
                if(newValue !== '') {
                    this.divRegister.className = 'show';
                    this.inputName.value = '';
                    this.inputLastName.value = '';
                    this.inputEmail.value = '';
                }
            case 'name':
                if(this.liName)this.liName.innerText = `Nombre: ${newValue}`
                break;
            case 'surname':
                if(this.liSurname)this.liSurname.innerText = `Apellido: ${newValue}`
                break;
            case 'email':
                if(this.liEmailAddress)this.liEmailAddress.innerText = `Dirección de email: ${newValue}`;
                break;
        }
    }

    connectedCallback(){
                //CREATE ROOT AND MAIN CONTAINERS
                this.elementRoot = document.createElement('div');
                this.divRole = document.createElement('div');
                this.divRole.id = "divRole"
                this.divOffice = document.createElement('div');
                this.divOffice.id = "divOffice"
                this.divDepartment = document.createElement('div')
                this.divDepartment.id = "divDepartment"
                this.divDepartment.className = 'hyde'
                this.divEmployees = document.createElement('div');
                this.divEmployees.id = 'divEmployees'
                this.divEmployees.className = 'hyde'
                this.divTableEmployees = document.createElement('div');
                this.divTableEmployees.id = 'divTableEmployees'
                this.divTableEmployees.className = 'hyde'
                this.divRegister = document.createElement('div');
                this.divRegister.id = 'divRegister'
                this.divRegister.className = 'hyde'
                this.result.className = 'hyde'
                this.EmailAdmin;
                this.buttonConfirm = document.createElement('button')
                this.buttonConfirm.innerText = "confirmar"
                this.buttonConfirm.addEventListener('click', async() => {
                    let addressJson;
                    this.getAttribute('role') === 'user' ? addressJson = '../jsonFiles/users.json' : addressJson = '../jsonFiles/employees.json';
                    const data = await (await fetch(addressJson)).json();
                    data.push(this.newRecord)
                    const dataToSave = JSON.stringify(data);
                    console.log(dataToSave);
                    this.result.className = 'hyde'
                   } )
                this.buttonCancel = document.createElement('button')
                this.buttonCancel.innerText = "cancelar"
                this.buttonCancel.addEventListener('click', () => {
                    this.result.className = 'hyde'
                   })

            
                this.result.appendChild(this.liName)
                this.result.appendChild(this.liSurname)
                this.result.appendChild(this.liEmailAddress)
                this.result.appendChild(this.liOffice)
                this.result.appendChild(this.liDepartment)
                this.result.appendChild(this.liRole)
                this.result.appendChild(this.buttonConfirm)
                this.result.appendChild(this.buttonCancel)
        
        
        
                //CREATE SELECT ROLE, EVENTS & APPEND IT
                this.labelRole = document.createElement('label');
                this.selectRole = document.createElement('select')
                this.labelRole.innerText = 'Role: ';
                getRoles(this.selectRole)
                this.divRole.appendChild(this.labelRole)
                this.divRole.appendChild(this.selectRole)
                //METHOD TO CHOOSE ROLE
                this.onChangeRole = () => {
                    this.setAttribute("role", this.selectRole.value)
                    this.role = this.selectRole.value
                }
                this.selectRole.addEventListener('change', this.onChangeRole)
                this.elementRoot.append(this.divRole)
                
                //CREATE SELECT OFFICE, EVENTS & APPEND IT
                this.labelOffice = document.createElement('label');
                this.selectOffice = document.createElement('select')
                this.labelOffice.innerText = "Indica tu oficina: ";
                getOffices(this.selectOffice );
                this.divOffice.appendChild(this.labelOffice)
                this.divOffice.appendChild(this.selectOffice )
                this.divOffice.className = 'hyde'
                //CREATE METHOD TO CHOOSE ROLE
                this.onChangeOffice = () => {  
                    this.setAttribute("office", this.selectOffice.value)
                    this.divOffice.className = this.selectOffice.value
                }
                this.selectOffice.addEventListener('change',this.onChangeOffice)
                this.elementRoot.append(this.divOffice)
                
                //CREATE SELECT DEPARTMENT, EVENTS & APPEND IT
                this.labelDepartment = document.createElement('label');
                this.selectDepartment = document.createElement('select')
                this.labelDepartment.innerText = "Indica tu Departamento";
                getDepartments(this.selectDepartment)
                this.divDepartment.append(this.labelDepartment)
                this.divDepartment.append(this.selectDepartment)
                //CREATE METHOD TO CHOOSE DEPARTMENT
                this.onChangeDepartment = () => {  
                    this.setAttribute("dept", this.selectDepartment.value)
                    this.dept = this.selectDepartment.value
                }
                this.selectDepartment.addEventListener('change',this.onChangeDepartment)
                this.divOffice.append(this.divDepartment)
        
                //CREATE FORM TO REGISTER, EVENTS & APPEND IT
                this.inputName = document.createElement('input');
                this.inputLastName = document.createElement('input');
                this.inputEmail = document.createElement('input');
                this.labelName = document.createElement('label');
                this.labelLastName = document.createElement('label');
                this.labelEmail = document.createElement('label');
                this.labelName.innerText = 'Nombre: ';
                this.labelLastName.innerText = 'Apellido: ';
                this.labelEmail.innerText = 'Dirección de email: ';
                this.buttonRegistration = document.createElement('button');
                this.buttonRegistration.innerText = "Registrar";
                this.registrate = () => {
                    this.newRecord = {
                        'name': this.getAttribute('name'),
                        'surname': this.getAttribute('surname'),
                        'email': this.getAttribute('email')
                    };
                    
                    switch (this.role) {
                        case 'user':
                            this.liOffice.className = 'hyde'
                            this.liDepartment.className = 'hyde'
                            this.liRole.className = 'hyde'                
                            break;
                        default:
                            this.newRecord.office = this.getAttribute('office'),
                            this.newRecord.department = this.getAttribute('dept'),
                            this.newRecord.role = this.getAttribute('role'),
                            this.liOffice.className = 'show'
                            this.liDepartment.className = 'show'
                            this.liRole.className = 'show'
                            break;
                    }
                    this.result.className = 'show'
                }
                this.buttonRegistration.addEventListener('click', this.registrate)
        
        
                //APPEND REGISTRATION FORM AND EVENTS
                this.divRegister.appendChild(this.labelName)
                this.divRegister.appendChild(this.inputName)
                this.divRegister.appendChild(this.labelLastName)
                this.divRegister.appendChild(this.inputLastName)
                this.divRegister.appendChild(this.labelEmail)
                this.divRegister.appendChild(this.inputEmail)
                this.divRegister.appendChild(this.buttonRegistration)
                this.inputName.addEventListener('change', (event)=>{
                    this.setAttribute("name", event.target.value)
                })
                this.inputLastName.addEventListener('change', (event)=>{
                    this.setAttribute("surname", event.target.value)
                })
                this.inputEmail.addEventListener('change', (event)=>{
                    this.setAttribute("email", event.target.value)
                })
                this.elementRoot.appendChild(this.divRegister)    
                
                this.inputEmailAdmin = document.createElement('input')
                this.labelEmailAdmin = document.createElement('label')
                this.labelEmailAdmin.innerText = "Indica la dirección de email del administrador para acceder a los datos de empleados"
                this.onChangeInputEmailAdmin = (event) => {
                    this.EmailAdmin = event.target.value
                }
                this.inputEmailAdmin.addEventListener('change', this.onChangeInputEmailAdmin)
        
                this.buttonCheckEmailAdmin = document.createElement('button');
                this.buttonCheckEmailAdmin.innerText = "Comprobar"
                this.buttonCheckEmailAdmin.addEventListener('click', ()=> {
                    getEmailAdmin(this.EmailAdmin).then((x)=> {
                        if(x)this.divTableEmployees.className = 'show';
                    })
                })
        
                this.divEmployees.appendChild(this.labelEmailAdmin)
                this.divEmployees.appendChild(this.inputEmailAdmin)
                this.divEmployees.appendChild(this.buttonCheckEmailAdmin)
                this.divEmployees.appendChild(this.divTableEmployees)
                
                
                
                //GET EMPLOYEES DATA AND APPEND IT
                getEmployees().then((x)=> {
                    this.divTableEmployees.append(x)
                });    
                
                //APPEND STYLES AND ROOT ELEMENT
                this.elementRoot.append(this.divEmployees)
                this.elementRoot.appendChild(this.result)
                this.shadow.innerHTML = style;
                this.shadow.append(this.elementRoot)
    }
    static get observedAttributes(){
        return ['role', 'office', 'dept', 'name', 'surname', 'email', 'result']
    }
}
