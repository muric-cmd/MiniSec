import { pokreniPoruke } from "./poruke.js";
import { pokreniPrijavu } from "./prijava.js";
import { pokreniRegistraciju } from "./registracija.js";

const togglePassword = (event) => {
    const button = event.currentTarget;
    const passwordInput = button.previousElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        button.textContent = "Show";
    }
};

const togglePassBtns = document.querySelectorAll(".toggle-pass-btn");

togglePassBtns.forEach((btn) => {
    btn.addEventListener("click", togglePassword);
});

if (document.querySelector("#login-form")) {
    pokreniPrijavu();
}

if (document.querySelector("#registration-form")) {
    pokreniRegistraciju();
}

if (document.querySelector("#poruka-form")) {pokreniPoruke();}