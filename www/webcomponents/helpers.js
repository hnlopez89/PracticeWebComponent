const addressOfficesJson = '../jsonFiles/offices.json'
const addressRolesJson = '../jsonFiles/roles.json'
const addressDepartmentsJson = '../jsonFiles/departments.json'
const addressEmployeesJson = '../jsonFiles/employees.json'

//CREATE SELECT OFFICES ACCORDING TO JSON FILE
const getOffices = async(select) => {
    let data = await (await fetch(addressOfficesJson)).json();

    data.map((x=>{
        let optionOffice = document.createElement('option');
        optionOffice.innerText = x.city
        optionOffice.value =x.code
        select.append(optionOffice)
    }));
    return select
}

//CREATE SELECT ROLES ACCORDING TO JSON FILE
const getRoles = async(select) => {
    let data = await (await fetch(addressRolesJson)).json();
    let optionBlank = document.createElement('option')
    select.append(optionBlank)

    data.map((x=>{
        let optionRole = document.createElement('option');
        optionRole.innerText = x.role
        optionRole.value =x.code
        select.append(optionRole)
    }));
    return select;
}
const getEmailAdmin = async(emailAdmin) => {
    let data = await (await fetch(addressEmployeesJson)).json();
    const arrayAdmin = data.filter(u=>u.role === 'admin' && u.email === emailAdmin)
    return arrayAdmin.length;
}

//CREATE SELECT DEPARTMENTS ACCORDING TO JSON FILE
const getDepartments = async(select, city) => {
    let data = await (await fetch(addressDepartmentsJson)).json();
    
    data.map((x=>{
        let optionDepartment = document.createElement('option');
        optionDepartment.innerText = x.name
        optionDepartment.value =x.code
        select.append(optionDepartment)
    }));
    return select;
}

//GET EMPLOYEES INFO AND PRINT IT ON TABLE
const getEmployees = async() => {
    const table = document.createElement('table')
    let data = await (await fetch(addressEmployeesJson)).json();
    
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const title = Object.keys(data[0]);
    title.map((t=>{
        let th = document.createElement('th')
        th.innerText = t
        tr.append(th)
    }))
    thead.append(tr)
    
    
    const tbody = document.createElement('tbody');
    data.map((d=>{
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdSurname = document.createElement('td');
        let tdOffice = document.createElement('td');
        let tdDepartment = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdRole = document.createElement('td');
        tdName.innerText = d.name
        tdSurname.innerText = d.surname
        tdOffice.innerText = d.office
        tdDepartment.innerText = d.department
        tdEmail.innerText = d.email
        tdRole.innerText = d.role
        tr.append(tdName)
        tr.append(tdSurname)
        tr.append(tdEmail)
        tr.append(tdOffice)
        tr.append(tdRole)
        tr.append(tdDepartment)
        tbody.append(tr)
    }));
    table.append(thead)
    table.append(tbody)
    return table
}



export {getOffices,  getRoles, getDepartments, getEmployees, getEmailAdmin};