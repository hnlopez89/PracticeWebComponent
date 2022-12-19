export default class CounterComponent extends HTMLElement {
    constructor(){
        super()
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
        this.shadow = this.attachShadow({mode: 'open'});
        this.p = document.createElement('p');
        this.p.innerText = this.counter
        
        this.increaseButton = document.createElement('button');
        this.decreaseButton = document.createElement('button');
        this.increaseButton.className = 'green'
        this.decreaseButton.className = 'red'
        this.increaseButton.innerText = "+"
        this.decreaseButton.innerText = "-"

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
        </style>
        `


        this.shadow.innerHTML = style
        let divButton = document.createElement('div');
        divButton.className = 'divButton'
        divButton.appendChild(this.increaseButton)
        divButton.appendChild(this.decreaseButton)
        this.shadow.appendChild(divButton)
        this.shadow.appendChild(this.p)
    }
    increase(){
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
    }
    attributeChangedCallback(att, oldV, newV){
        const span = document.createElement('span');
        switch(att){
            case "counter":
                this.p.innerText = this.getAttribute('counter')
        }
    }   
}

