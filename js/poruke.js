export const pokreniPoruke = () => {
    const trenutniKorisnik = localStorage.getItem("prijavljenKorisnik");

    if(!trenutniKorisnik) {
        window.location.replace("index.html");
        return;
    }

    const korisnikTekst = document.querySelector("#prijavljen-korisnik");
    const odjavaBtn = document.querySelector("#odjava-btn");
    const porukaForm = document.querySelector("#poruka-form");
    const primalacSelect = document.querySelector("#primalac");
    const tekstPoruke = document.querySelector("#tekst-poruke");
    const porukaMsg = document.querySelector("#poruka-msg");
    const primljenePoruke = document.querySelector("#primljene-poruke");

    korisnikTekst.textContent = trenutniKorisnik;

    const korisnici = JSON.parse(localStorage.getItem("korisnici")) || [];

    korisnici.forEach((korisnik) => {
        if (korisnik.korisnickoIme === trenutniKorisnik) {
            return;
        }

        const opcija = document.createElement("option");
        opcija.value = korisnik.korisnickoIme;
        opcija.textContent = korisnik.korisnickoIme;
        primalacSelect.appendChild(opcija);
    });

    const prikaziPoruke = () => {
        primljenePoruke.textContent = "";

        const poruke = JSON.parse(localStorage.getItem("poruke")) || [];

        const mojePoruke = poruke.filter((poruka) => {
            return poruka.primalac === trenutniKorisnik;
        })
        if (mojePoruke.length === 0) {
            const stavka = document.createElement("li");
            stavka.textContent = "Nema primljenih poruka";
            primljenePoruke.appendChild(stavka);
        }

        mojePoruke.forEach((poruka) => {
            const stavka = document.createElement("li");
            const zaglavlje = document.createElement("p");
            const sadrzaj = document.createElement("p");

            const vreme = new Date(poruka.vreme).toLocaleString("sr-Latn-RS");

            zaglavlje.textContent = `Od: ${poruka.posiljalac} (${vreme})`;
            sadrzaj.textContent = poruka.tekst;
            sadrzaj.style.width = "pre-wrap";

            stavka.appendChild(zaglavlje);
            stavka.appendChild(sadrzaj);
            primljenePoruke.appendChild(stavka);
        });
    };

    

    
}
