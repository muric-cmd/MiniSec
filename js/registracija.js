export const pokreniRegistraciju = () => {
    const registrationForm = document.querySelector("#registration-form");
    const usernameInput = document.querySelector("#registration-username");
    const passwordInput = document.querySelector("#registration-password");
    const passwordCheckInput =
        document.querySelector("#registration-password-check");

    const jacinaTekst = document.querySelector("#jacina-tekst");
    const jacinaTraka = document.querySelector("#jacina-traka");
    const registrationMsg = document.querySelector("#registration-msg");

    const proveriLozinku = (lozinka) => {
        return {
            dovoljnaDuzina: lozinka.length >= 8,
            jakaDuzina: lozinka.length >= 10,
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
            jacinaTraka.style.width = "0";
            jacinaTraka.className = "";
            return;
        }

        const raznovrsnost = [
            provere.imaMaloSlovo,
            provere.imaVelikoSlovo,
            provere.imaBroj,
            provere.imaSpecijalniZnak
        ].filter(Boolean).length;

        if (!provere.dovoljnaDuzina || raznovrsnost <= 2) {
            jacinaTekst.textContent = "Slaba";
            jacinaTraka.style.width = "33%";
            jacinaTraka.className = "slaba";
        } else if (provere.jakaDuzina && raznovrsnost === 4) {
            jacinaTekst.textContent = "Jaka";
            jacinaTraka.style.width = "100%";
            jacinaTraka.className = "jaka";
        } else {
            jacinaTekst.textContent = "Srednja";
            jacinaTraka.style.width = "66%";
            jacinaTraka.className = "srednja";
        }
    });

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        registrationMsg.textContent = "";
        registrationMsg.className = "message";

        const polja = [
            usernameInput,
            passwordInput,
            passwordCheckInput
        ];

        polja.forEach((polje) => {
            polje.classList.remove("neispravno");
        });

        const korisnickoIme = usernameInput.value.trim();
        const lozinka = passwordInput.value;
        const potvrdaLozinke = passwordCheckInput.value;

        const prikaziGresku = (tekst, polje) => {
            registrationMsg.textContent = tekst;
            registrationMsg.classList.add("greska");

            if (polje) {
                polje.classList.add("neispravno");
            }
        };

        if (
            korisnickoIme === ""
            || lozinka === ""
            || potvrdaLozinke === ""
        ) {
            if (korisnickoIme === "") {
                usernameInput.classList.add("neispravno");
            }

            if (lozinka === "") {
                passwordInput.classList.add("neispravno");
            }

            if (potvrdaLozinke === "") {
                passwordCheckInput.classList.add("neispravno");
            }

            prikaziGresku("Sva polja su obavezna.");
            return;
        }

        const provere = proveriLozinku(lozinka);
        const nedostaje = [];

        if (!provere.dovoljnaDuzina) {
            nedostaje.push("najmanje 8 znakova");
        }

        if (!provere.imaMaloSlovo) {
            nedostaje.push("malo slovo");
        }

        if (!provere.imaVelikoSlovo) {
            nedostaje.push("veliko slovo");
        }

        if (!provere.imaBroj) {
            nedostaje.push("broj");
        }

        if (!provere.imaSpecijalniZnak) {
            nedostaje.push("specijalan znak (! ? @ # $ % & *)");
        }

        if (nedostaje.length > 0) {
            prikaziGresku(
                `Lozinka mora imati: ${nedostaje.join(", ")}.`,
                passwordInput
            );
            return;
        }

        if (lozinka !== potvrdaLozinke) {
            prikaziGresku(
                "Lozinke se ne poklapaju.",
                passwordCheckInput
            );
            return;
        }

        const korisnici =
            JSON.parse(localStorage.getItem("korisnici")) || [];

        const korisnikPostoji = korisnici.some((korisnik) => {
            return korisnik.korisnickoIme === korisnickoIme;
        });

        if (korisnikPostoji) {
            prikaziGresku(
                "Korisnik sa tim imenom već postoji.",
                usernameInput
            );
            return;
        }

        korisnici.push({
            korisnickoIme: korisnickoIme,
            lozinka: lozinka
        });

        localStorage.setItem("korisnici", JSON.stringify(korisnici));

        registrationMsg.textContent =
            "Registracija je uspešna! Prelazak na prijavu...";
        registrationMsg.classList.add("uspeh");

        registrationForm.querySelector(
            'button[type="submit"]'
        ).disabled = true;

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    });
};