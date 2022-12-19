export default class NotificationElement extends HTMLElement {
    constructor(){
      super()
      console.log("hola");
      this.template = document.getElementById("notificacion");
      console.log(this.template.content);
      
    }
    connectedCallback(){
      let clonedDDOM = document.importNode(this.template.contentEditable, true);
      this.appendChild(clonedDDOM)
    }

    static get observedAttributes(){
      return ['']
    }
  }
  
  
  const template = document.createElement('template');
  template.innerHTML = `<style> h2 { color : blue ; } </style> <h2>Hello</h2>`;
  
  function changeExample(){
    document.querySelector('my-example').setAttribute('name', 'Jorge')
  }
  
  class ExampleElement extends HTMLElement {
    constructor(){    
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name');
    }
  }
  
  

  