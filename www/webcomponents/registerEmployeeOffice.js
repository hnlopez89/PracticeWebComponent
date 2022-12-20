export default class RegisterEmployeeOffice extends HTMLElement {
    constructor(){
        super();
        this.div = document.createElement('div');

        const inputOffice = document.createElement('select');
        const barcelonaOption = document.createElement('option');
        const madridOption = document.createElement('option');
        const buenosAiresOption = document.createElement('option');
        const galiciaOption = document.createElement('option');
        barcelonaOption.innerText = "Barcelona";
        barcelonaOption.value="barcelona"
        madridOption.innerText = "Madrid";
        madridOption.value="madrid"
        buenosAiresOption.innerText = "Buenos Aires";
        buenosAiresOption.value="buenosAires"
        galiciaOption.innerText = "Galicia";
        galiciaOption.value="galicia"
        inputOffice.append(barcelonaOption)
        inputOffice.append(madridOption)
        inputOffice.append(buenosAiresOption)
        inputOffice.append(galiciaOption)
        const labelOffice = document.createElement('label');
        labelOffice.innerText = "Indica tu oficina";
        this.onChangeOffice = () => {
            console.log("tu ofi es: "+ inputOffice.value);
  
            this.setAttribute("office", inputOffice.value)
            this.div.className = inputOffice.value
        }
        inputOffice.addEventListener('change',this.onChangeOffice)
        this.div.append(labelOffice)
        this.div.append(inputOffice)
        this.appendChild(this.div)
    }
}

