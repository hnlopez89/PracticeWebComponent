export default class CounterComponent extends HTMLElement {
    constructor(){
        super()
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
        this.shadow = this.attachShadow({mode: 'open'});
        this.spanCounter = document.createElement('p');
        this.spanStep = document.createElement('p');
        this.spanMax = document.createElement('p');
        this.spanMin = document.createElement('p');
        this.spanCounter.innerText = `La cuenta está en: ${this.counter}.`
        this.spanStep.innerText = `El intervalo es:  ${this.step}`
        this.spanMax.innerText = `El valor máximo es:  ${this.max}`
        this.spanMin.innerText = `El valor mínimo es: ${this.min}`;
        this.summary = document.createElement('div');
        this.summary.appendChild(this.spanCounter)
        this.summary.appendChild(this.spanMax)
        this.summary.appendChild(this.spanMin)
        this.summary.appendChild(this.spanStep)
        
        
        this.customCountButton = document.createElement('button')
        this.customCountButton.innerText = 'Personalizar Cuenta'
        this.resetButton = document.createElement('button')
        this.resetButton.innerText = 'Resetear Cuenta'
        this.increaseButton = document.createElement('button');
        this.decreaseButton = document.createElement('button');
        this.increaseButton.className = 'green'
        this.decreaseButton.className = 'red'
        this.increaseButton.innerText = "+"
        this.decreaseButton.innerText = "-"
        this.increaseStepButton = document.createElement('button');
        this.decreaseStepButton = document.createElement('button');
        this.increaseStepButton.className = 'green'
        this.decreaseStepButton.className = 'red'
        this.increaseStepButton.innerText = '+'
        this.decreaseStepButton.innerText = '-'
        this.increaseMaxButton = document.createElement('button');
        this.decreaseMaxButton = document.createElement('button');
        this.increaseMaxButton.className = 'green'
        this.decreaseMaxButton.className = 'red'
        this.increaseMaxButton.innerText = '+'
        this.decreaseMaxButton.innerText = '-'
        this.increaseMinButton = document.createElement('button');
        this.decreaseMinButton = document.createElement('button');
        this.increaseMinButton.className = 'green'
        this.decreaseMinButton.className = 'red'
        this.increaseMinButton.innerText = '+'
        this.decreaseMinButton.innerText = '-'

        let style = `
        <style>
        button {
            padding: 1rem 2rem;
            margin: 3rem 1rem;
            color: white;
            font-weight: bold;
            font-size: 25px;
            border-radius: 10% / 20%;
            width: 100px;
            border: none;
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
        p{
            text-align: center;
        }
        .divButton{
            display:flex;
            justify-content: center;
            max-width: 400px;
            margin: 1rem auto;
            border-radius: 5% / 20%;
            background-color: black
        }
        .hyde {
            display: none
        }
        .show {
            display: true
        }
        </style>
        `

        this.shadow.innerHTML = style
        let divButton = document.createElement('div');
        this.counters = document.createElement('div');
        this.counters.className = 'divButton'
        divButton.className = 'divButton'
        this.counters.appendChild(this.summary)
        this.counters.appendChild(this.increaseStepButton)
        this.counters.appendChild(this.decreaseStepButton)
        this.counters.appendChild(this.increaseMaxButton)
        this.counters.appendChild(this.decreaseMaxButton)
        this.counters.appendChild(this.increaseMinButton)
        this.counters.appendChild(this.decreaseMinButton)
        this.counters.className = 'hyde'
        divButton.appendChild(this.increaseButton)
        divButton.appendChild(this.decreaseButton)
        this.shadow.appendChild(this.customCountButton)
        this.shadow.appendChild(this.resetButton)
        this.shadow.appendChild(this.counters)
        this.shadow.appendChild(divButton)
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
                this.spanCounter.innerText = `La cuenta está en: ${this.getAttribute('counter')}`
                break;
            case "step":
                this.spanStep.innerText = `El intervalo es: ${this.getAttribute('step')}`
                break;
            case "max":
                this.spanMax.innerText = `El valor máximo es:  ${this.getAttribute('max')}`
                break;
            case "min":
                this.spanMin.innerText = `El valor mínimo es: ${this.getAttribute('min')}`;
                break;
            }
    
    }
}

