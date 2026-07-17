const datiCompleanni = [
    { nome: "Stephen Hawking", giorno: 8, mese: 1, anno: 1942, tipo: "nato nel" },
    { nome: "Facebook", giorno: 4, mese: 2, anno: 2004, tipo: "lanciato nel" },
    { nome: "YouTube", giorno: 14, mese: 2, anno: 2005, tipo: "lanciato nel" },
    { nome: "\"Me at the zoo\" (primo video su YouTube)", giorno: 23, mese: 4, anno: 2005, tipo: "pubblicato nel" }
];

const nomiMesi = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

document.addEventListener("DOMContentLoaded", () => {
    generaStrutturaECompleanni();
});

function generaStrutturaECompleanni() {
    const container = document.getElementById("compleanni-container");
    const oggi = new Date();
    const annoCorrente = oggi.getFullYear();

    const mappaMesi = {};

    datiCompleanni.forEach(item => {
        const meseIndice0 = item.mese - 1;
        if (!mappaMesi[meseIndice0]) mappaMesi[meseIndice0] = {};
        if (!mappaMesi[meseIndice0][item.giorno]) mappaMesi[meseIndice0][item.giorno] = [];
        mappaMesi[meseIndice0][item.giorno].push(item);
    });

    for (let m = 0; m < 12; m++) {
        if (!mappaMesi[m]) continue;

        const sezioneMese = document.createElement("section");
        sezioneMese.id = `mese-${m}`;
        sezioneMese.className = "mese-section";

        const h2 = document.createElement("h2");
        h2.textContent = nomiMesi[m];
        sezioneMese.appendChild(h2);

        const giorniOrdinati = Object.keys(mappaMesi[m]).sort((a, b) => a - b);

        giorniOrdinati.forEach(giorno => {
            const gruppoGiorno = document.createElement("div");
            gruppoGiorno.className = "giorno-gruppo";

            const h3 = document.createElement("h3");
            h3.textContent = `${giorno} ${nomiMesi[m].toLowerCase()}`;
            gruppoGiorno.appendChild(h3);

            const ul = document.createElement("ul");

            mappaMesi[m][giorno].forEach(evento => {
                const meseInidice0 = evento.mese - 1;
                let eta = annoCorrente - evento.anno;
                const haGiaCompiutoGliAnni = (oggi.getMonth() > meseInidice0) ||
                    (oggi.getMonth() === meseInidice0 && oggi.getDate() >= evento.giorno);

                if (!haGiaCompiutoGliAnni) {
                    eta--;
                }

                const li = document.createElement("li");
                li.innerHTML = `${evento.nome} (<span class="eta">${eta}</span> anni, ${evento.tipo} ${evento.anno})`;
                ul.appendChild(li);
            });

            gruppoGiorno.appendChild(ul);
            sezioneMese.appendChild(gruppoGiorno);
        });

        container.appendChild(sezioneMese);
    }
}

function vaiAInizioMeseCorrente() {
    const oggi = new Date();
    const meseCorrente = oggi.getMonth();
    const sezioneMese = document.getElementById(`mese-${meseCorrente}`);

    if (sezioneMese) {
        sezioneMese.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        alert("Ops! Nessun compleanno registrato per questo mese.");
    }
}