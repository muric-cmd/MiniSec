export const pokreniPrijavu = () => {
    const loginForm = document.querySelector("#login-form");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#login-password");

    const loginMsg = document.querySelector("#login-msg");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        loginMsg.textContent = "";
        loginMsg.className = "message";

        usernameInput.classList.remove("neispravno");
        passwordInput.classList.remove("neispravno");

        const korisnickoIme = usernameInput.value.trim();
        const lozinka = passwordInput.value;

        if (korisnickoIme === "" || lozinka === "") {
            loginMsg.textContent = "Sva polja su obavezna.";

            if(korisnickoIme === "") {
                usernameInput.classList.add("neispravno");
            }
            if(lozinka === "") {
                passwordInput.classList.add("neispravno");
            }

            return;
        }

        const korisnici = JSON.parse(localStorage.getItem("korisnici")) || [];

        const pronadjenKorisnik = korisnici.find((korisnik) => {
            const istoIme = korisnik.korisnickoIme === korisnickoIme;
            const istaLozinka = korisnik.lozinka === lozinka;

            return istoIme && istaLozinka;
        })

        localStorage.setItem("prijavljenKorisnik", pronadjenKorisnik.korisnickoIme);

        window.location.href = "poruke.html";
    })
}