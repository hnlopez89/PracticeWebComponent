import CounterComponent from './counter.js';
import ElementWrapper from './elementWrapper.js';
import NotificationElement from './notificationElement.js';
import PersonForm from './personForm.js';
import RegisterEmployeeDetails from './registerEmployeeDetails.js';
import RegisterEmployeeOffice from './registerEmployeeOffice.js';
import RegisterUser from './registerUser.js';
import ChangeButton from './changeButton.js';
import HooverComponent from './hooverComponent.js';
import NavMenu from '../navMenu.js';
/*
import CounterComponent from './counter.js';
import CounterComponent from './counter.js';
import CounterComponent from './counter.js';
import CounterComponent from './counter.js';
*/
window.customElements.define("register-employee-office", RegisterEmployeeOffice)
window.customElements.define("register-user", RegisterUser)
window.customElements.define('counter-component', CounterComponent)
window.customElements.define('element-wrapper', ElementWrapper)
window.customElements.define('my-example', NotificationElement)
window.customElements.define("register-employee-details", RegisterEmployeeDetails)
window.customElements.define("person-form", PersonForm)
window.customElements.define("change-button", ChangeButton);
window.customElements.define("hoover-component", HooverComponent)
window.customElements.define("nav-menu", NavMenu)

export {HooverComponent, ChangeButton, PersonForm, CounterComponent}
