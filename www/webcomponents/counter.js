export default class CounterComponent extends HTMLElement {
    constructor(){
        super()
        
        //CREATE ACTIONS TO EDIT COUNT AND BIND IT
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
        this.increaseStep = this.increaseStep.bind(this)
        this.decreaseStep = this.decreaseStep.bind(this)
        this.increaseMax = this.increaseMax.bind(this)
        this.decreaseMax = this.decreaseMax.bind(this)
        this.increaseMin = this.increaseMin.bind(this)
        this.decreaseMin = this.decreaseMin.bind(this)
        this.reset = this.reset.bind(this)
        this.customizeCount = this.customizeCount.bind(this)

        //CREATE SHADOWROOT
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.className = "counter"

        //CREATE SUMMARY TO COLLECT DATA
        this.spanCounter = document.createElement('span');
        this.spanStep = document.createElement('span');
        this.spanMax = document.createElement('span');
        this.spanMin = document.createElement('span');
        this.liCounter = document.createElement('li');
        this.liStep = document.createElement('li');
        this.liMax = document.createElement('li');
        this.liMin = document.createElement('li');
        this.liCounter.innerText = `La cuenta está en: ${this.counter}.`
        this.liStep.innerText = `El intervalo es:  ${this.step}.`
        this.liMax.innerText = `El valor máximo es:  ${this.max}.`
        this.liMin.innerText = `El valor mínimo es: ${this.min}.`;
        this.spanCounter.innerText = this.counter
        this.spanStep.innerText = this.step
        this.spanMax.innerText = this.max
        this.spanMin.innerText = this.min
        this.summary = document.createElement('ul');
        this.summary.id = "summary"
        this.summary.appendChild(this.liCounter)
        this.summary.appendChild(this.liMin)
        this.summary.appendChild(this.liStep)
        this.summary.appendChild(this.liMax)
        
        //CREATE HEADER BUTTONS TO ALLOW CUSTOM COUNT
        this.customCountButton = document.createElement('button')
        this.customCountButton.innerText = 'Personalizar Cuenta'
        this.resetButton = document.createElement('button')
        this.resetButton.innerText = 'Resetear Cuenta'
        
        //CREATE BUTTONS TO CUSTOMIZE COUNT
        this.counters = document.createElement('div');
        this.counters.id = 'divButton'
        let divStepButtons = document.createElement('div')
        this.increaseStepButton = document.createElement('button');
        this.decreaseStepButton = document.createElement('button');
        this.increaseStepButton.className = 'green'
        this.decreaseStepButton.className = 'red'
        this.increaseStepButton.innerText = '+'
        this.decreaseStepButton.innerText = '-'
        divStepButtons.append(this.decreaseStepButton)
        divStepButtons.append(this.spanStep)
        divStepButtons.append(this.increaseStepButton)
        let pStep = document.createElement('p');
        pStep.innerText = "Intervalo";
        let divStep = document.createElement('div');
        divStep.append(pStep)
        divStep.append(divStepButtons)
        this.increaseMaxButton = document.createElement('button');
        this.decreaseMaxButton = document.createElement('button');
        this.increaseMaxButton.className = 'green'
        this.decreaseMaxButton.className = 'red'
        this.increaseMaxButton.innerText = '+'
        this.decreaseMaxButton.innerText = '-'
        let divMaxButtons = document.createElement('div')
        divMaxButtons.append(this.decreaseMaxButton)
        divMaxButtons.append(this.spanMax)
        divMaxButtons.append(this.increaseMaxButton)
        let pMax = document.createElement('p');
        pMax.innerText = "Máximo";
        let divMax = document.createElement('div');
        divMax.append(pMax)
        divMax.append(divMaxButtons)

        this.increaseMinButton = document.createElement('button');
        this.decreaseMinButton = document.createElement('button');
        this.increaseMinButton.className = 'green'
        this.decreaseMinButton.className = 'red'
        this.increaseMinButton.innerText = '+'
        this.decreaseMinButton.innerText = '-'
        let divMinButtons = document.createElement('div')
        divMinButtons.append(this.decreaseMinButton)
        divMinButtons.append(this.spanMin)
        divMinButtons.append(this.increaseMinButton)
        let pMin = document.createElement('p');
        pMin.innerText = "Mínimo";
        let divMin = document.createElement('div');
        divMin.append(pMin)
        divMin.append(divMinButtons)
        
        let divCustomCounters = document.createElement('div');
        divCustomCounters.appendChild(divMin)
        divCustomCounters.appendChild(divStep)
        divCustomCounters.appendChild(divMax)
        this.counters.appendChild(divCustomCounters)
        this.counters.appendChild(this.summary)
        this.counters.className = 'hyde'

        //CREATE BASIC BUTTONS TO COUNT
        let divButton = document.createElement('div');
        divButton.className = 'divButton'        
        this.increaseButton = document.createElement('button');
        this.decreaseButton = document.createElement('button');
        this.increaseButton.className = 'green'
        this.decreaseButton.className = 'red'
        this.increaseButton.innerText = "+"
        this.decreaseButton.innerText = "-"
        divButton.appendChild(this.decreaseButton)
        divButton.appendChild(this.spanCounter)
        divButton.appendChild(this.increaseButton)


        //CREATE CONTAINERS TO DISPLAY
        const divHeader = document.createElement('div')
        divHeader.className = 'header'
        divHeader.appendChild(this.customCountButton)
        divHeader.appendChild(this.resetButton)


        //CREATE STYLES
        let style = `
        <style>
        .counter{
            width: 80vw;
        }
        button {
            color: white;
            background-color: black;
            font-weight: bold;
            font-size: 15px;
            border-radius: 10% / 20%;
            border: none;
            padding: 10px;
            width: 40px
        }
        button:hover {
            color: black;
            background-color: gold;
            cursor: pointer;
        }
        .green {
            background-color: green
        }
        .red {
            background-color: red
        }
        
        .header{
            background-color: red;
            display:flex;
            flex-direction: row;
            justify-content:space-evenly;
            padding: 20px;
        }
        .header > button {
            width: 150px;
        }
        p{
            text-align: center;
            margin:2px;
        }
        .divButton{
            display:flex;
            justify-content: space-evenly;
            align-items: center;
            max-width: 400px;
            margin: 1rem auto;
            border-radius: 5% / 20%;
            background-color: black
        }
        .divButton > button {
            padding: 1rem 2rem;
            margin: 3rem 1rem;
            padding:10px;
            width: 80px;
        }
        .divButton > span {
            color: white;
            margin: 10px;
            width: 20px;
            text-align:center;
        }
        .show {
            display:flex;
            flex-direction:row;
            justify-content: space-evenly;
        }

        .show > div {
            display:flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            margin: 20px;
        }
        .show > div > div{
            display:flex;
            flex-direction: column;
            margin: 0.5rem;
            width:150px;
        }
        .show> div > div > div{
            display:flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }
        .show > div > div > div > span {
            width:25px;
            text-align: center;
        }

        #summary{
            padding: 0;
            display:flex;
            flex-direction: column;
            justify-content: space-evenly;
        }
        .hyde {
            display: none
        }

        </style>
        `

        this.shadow.innerHTML = style
        this.shadow.appendChild(divHeader)
        this.shadow.appendChild(divButton)
        this.shadow.appendChild(this.counters)
    }
    increase(){
        console.log("holi");
        let step = +this.step;
        let max = +this.max;
        let counter = +this.counter;
        if(counter + step > max) {
            return
        } else{
            counter +=step
            this.setAttribute('counter', counter)
        }
    }

    decrease(){
        let step = +this.step;
        let min = +this.min;
        let counter = +this.counter;
        if(counter - step < min) {
            return
        } else{
            counter -=step
            this.setAttribute('counter', counter)
        }
    }

    customizeCount(){
        if(this.counters.className === 'hyde') {
            this.counters.className = 'show'
        } else {
            console.log("hola");
            this.counters.className = 'hyde'
        }
    }

    increaseStep(){
            let step = parseInt(this.step);
            this.setAttribute('step', step+1)
    }
    decreaseStep(){
            let step = parseInt(this.step);
            this.setAttribute('step', step-1)
    }
    increaseMax(){
            let max = parseInt(this.max);
            this.setAttribute('max', max+1)
    }
    decreaseMax(){
            let max = parseInt(this.max);
            this.setAttribute('max', max-1)
    }
    increaseMin(){
            let min = parseInt(this.min);
            this.setAttribute('min', min+1)
    }
    decreaseMin(){
            let min = parseInt(this.min);
            this.setAttribute('min', min-1)
    }
    reset(){
        this.setAttribute('step', 1)
        this.setAttribute('counter', 0)
        this.setAttribute('max', 10)
        this.setAttribute('min', 0)
    }

    //Getters & Setters
    get counter(){
        return this.getAttribute('counter');
    }
    get step(){
        return this.getAttribute('step');
    }
    get min(){
        return this.getAttribute('min');
    }
    get max(){
        return this.getAttribute('max');
    }

    set counter(value){
        this.setAttribute('counter', value);
    }
    set step(value){
        this.setAttribute('step', value);
    }
    set min(value){
        this.setAttribute('min', value);
    }
    set max(value){
        this.setAttribute('max', value);
    }

    static get observedAttributes(){
        return ['counter', 'step', 'min', 'max']
    }
    
    connectedCallback(){
        this.increaseButton.addEventListener('click', this.increase)
        this.decreaseButton.addEventListener('click', this.decrease)
        this.increaseStepButton.addEventListener('click', this.increaseStep)
        this.decreaseStepButton.addEventListener('click', this.decreaseStep)
        this.increaseMaxButton.addEventListener('click', this.increaseMax)
        this.decreaseMaxButton.addEventListener('click', this.decreaseMax)
        this.increaseMinButton.addEventListener('click', this.increaseMin)
        this.decreaseMinButton.addEventListener('click', this.decreaseMin)
        this.resetButton.addEventListener('click', this.reset)
        this.customCountButton.addEventListener('click', this.customizeCount)
    }
    attributeChangedCallback(att, oldV, newV){
        const span = document.createElement('span');
        switch(att){
            case "counter":
                this.spanCounter.innerText = this.getAttribute('counter')
                this.liCounter.innerText = `La cuenta está en: ${this.getAttribute('counter')}`
                break;
            case "step":
                this.spanStep.innerText = this.getAttribute('step')
                this.liStep.innerText = `El intervalo es : ${this.getAttribute('step')}`
                break;
            case "max":
                this.spanMax.innerText = this.getAttribute('max')
                this.liMax.innerText = `El valor máximo de la cuenta será: ${this.getAttribute('max')}`
                break;
            case "min":
                this.spanMin.innerText = this.getAttribute('min')
                this.liMin.innerText = `El valor mínimo de la cuenta será: ${this.getAttribute('min')}`
                break;
        }
    }
}

