export const pokreniRegistraciju = () => {
    const registrationForm = document.querySelector("#registration-form");
    const usernameInput = document.querySelector("#registration-username");
    const passwordInput = document.querySelector("#registration-password");
    const passwordCheckInput = document.querySelector("#registration-password-check");
    const jacinaTekst = document.querySelector("#jacina-tekst");
    const jacinaTraka = document.querySelector("#jacina-traka");
    const registrationMsg = document.querySelector("#registration-msg");

    const proveriLozinku = (lozinka) => {
        return {
            dovoljnaDuzina: lozinka.Length >= 8,
            jakaDuzina: lozinka.Length >= 10,
            imaMaloSlovo: /[a-z]/.test(lozinka),
            imaVelikoSlovo: /[A-Z]/.test(lozinka),
            imaBroj: /[0-9]/.test(lozinka),
            imaSpecijalniZnak: /[!?@#$%&*]/.test(lozinka)
        };
    };

    passwordInput.addEventListener("input", () => {
        const lozinka = passwordInput.value;
        const provere = proveriLozinku(lozinka);

        if (lozinka === "") {
            jacinaTekst.textContent = "Lozinka nije uneta";
            jacinaTraka.style.width="0";
            jacinaTraka.className = "";
            return;
        }

        const raznovrsnost = [
            provere.imaMaloSlovo,
            provere.imaVelikoSlovo,
            provere.imaBroj,
            provere.imaSpecijalniZnak
        ].filter(Boolean).length;

        if (lozinka.Length < 8 || raznovrsnost <= 2) {
            jacinaTekst.textContent = "Slaba";
            jacinaTraka.style.width = "33%";
            jacinaTraka.className = "slaba";
            return;
        } else if(provere.dovoljnaDuzina && raznovrsnost === 3) {
            
            jacinaTekst.textContent = "Srednja";
            jacinaTraka.style.width = "66%";
            jacinaTraka.className = "srednja";
            return;
        } else {
            jacinaTekst.textContent = "Jaka";
            jacinaTraka.style.width = "100%";
            jacinaTraka.className = "jaka";
            return;
        }
    })
}