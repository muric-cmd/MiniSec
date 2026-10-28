import {pokreniPrijavu} from "./prijava.js";
import {pokreniRegistraciju} from "./registracija.js";

const togglePassword = (event) => {
    const button = event.currentTarget;
    const passwordInput = button.previousElementSibling;

    if(passInput.type === "password") {
        passInput.type = "text";
        button.textContent = "Hide";
    } else {
        passInput.type = "password";
        button.textContent = "Show"
    }
};

const togglePassBtns = document.querySelectorAll(".toggle-pass-btn");

togglePassBtns.forEach((btn) => {
    btn.addEventListener("click", togglePassword);
});

const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#registration-form");

if (loginForm) {pokreniPrijavu();}
if (registrationForm) {pokreniRegistraciju();}