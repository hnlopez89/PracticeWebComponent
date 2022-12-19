export default class ElementWrapper extends HTMLElement{
  constructor(){
    super();
    this.show="false"
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

        // Create spans
        const wrapper = document.createElement("span");
        wrapper.setAttribute("class", "wrapper");
        const icon = document.createElement("span");
        icon.setAttribute("class", "icon");
        icon.setAttribute("tabindex", 0);
        const info = document.createElement("span");
        info.setAttribute("class", "info");

        // Take attribute content and put it inside the info span
        const text = this.getAttribute("data-text");
        info.textContent = text;

        // Insert icon
        const img = document.createElement("img");
        img.src = this.hasAttribute("img")
        ? this.getAttribute("img")
        : "../www/img/example.jpg";
        img.alt = this.hasAttribute("alt")
        ? this.getAttribute("alt")
        : "";
        icon.appendChild(img);

        // Create some CSS to apply to the shadow DOM
        let style = document.createElement("style");
        style.textContent = `
        .wrapper {
          position: relative;
        }

        .info {
            font-size: 0.8rem;
            width: 200px;
            display: inline-block;
            border: 1px solid black;
            padding: 10px;
            background: white;
            border-radius: 10px;
            opacity: 0;
            transition: 0.6s all;
            position: absolute;
            bottom: 20px;
            left: 10px;
            z-index: 3;
          }
          
          img {
            width: 1.2rem;
          }
          
          .icon:hover + .info, .icon:focus + .info {
            opacity: 1;
          }`;

        // attach the created elements to the shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }

}
