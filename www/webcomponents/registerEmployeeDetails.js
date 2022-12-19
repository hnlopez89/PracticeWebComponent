export default class RegisterEmployeeDetails extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'})
        let employeeDetails = document.createElement('div')
        
        let nameInput = document.createElement('input');
        let lastNameInput = document.createElement('input');
        
        let nameLabel = document.createElement('label');
        nameLabel.innerText = 'First Name: ';

        let result = document.createElement('p')
        
        let lastNameLabel = document.createElement('label');
        lastNameLabel.innerText = 'Last Name: ';
        employeeDetails.appendChild(nameLabel)
        employeeDetails.appendChild(nameInput)
        employeeDetails.appendChild(lastNameLabel)
        employeeDetails.appendChild(lastNameInput)

        this.onChangeValue = () => {
            result.innerHTML = `Hello ${nameInput.value} ${lastNameInput.value}`
            console.log(result);
        }

        nameInput.addEventListener('change', this.onChangeValue)
        lastNameInput.addEventListener('change', this.onChangeValue)
        this.shadow.appendChild(employeeDetails)
    }
}

