const params = new URLSearchParams(window.location.search);
const ticketID = params.get("ticket");

const dateConcert = "17/06/2025";
const heureConcert = "20:00";
const lieuConcert = "Forest National";
const prixTicket = "39,99€";

gsap.registerPlugin(ScrambleTextPlugin);

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
}

function calculerDifferenceJours(dateAchat, dateConcert) {
  const dateAchatObj = parseDate(dateAchat);
  const dateConcertObj = parseDate(dateConcert);
  const differenceMs = dateConcertObj - dateAchatObj;
  const differenceJours = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  return differenceJours;
}

function compteARebours(dateConcert, heureConcert) {
  const [day, month, year] = dateConcert.split("/");
  const [hour, minute] = heureConcert.split(":");
  const dateConcertComplete = new Date(year, month - 1, day, hour, minute);

  function mettreAJourCompte() {
    const maintenant = new Date();
    const difference = dateConcertComplete - maintenant;

    if (difference > 0) {
      const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
      const heures = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((difference % (1000 * 60)) / 1000);

      return `${jours.toString().padStart(2, "0")} : ${heures
        .toString()
        .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${secondes
        .toString()
        .padStart(2, "0")}`;
    } else {
      return "00 : 00 : 00 : 00";
    }
  }

  return mettreAJourCompte;
}

const tickets = {
  "TICKET-0000": {
    nom: "INRACI",
    type: "BACKSTAGE",
    place: "N/A",
  },
  "TICKET-0001": {
    nom: "Victor G.",
    type: "VIP",
    place: "1080 RPZ",
  },
  "TICKET-0002": {
    nom: "M. Debroux",
    type: "VIP",
    place: "B9 - B10",
  },
  "TICKET-0003": {
    nom: "M. Mirza",
    type: "VIP",
    place: "B9 - B10",
  },
  "TICKET-0004": {
    nom: "M. Compere",
    type: "VIP",
    place: "B9",
  },
  "TICKET-0005": {
    nom: "M. Müller",
    type: "VIP",
    place: "J23",
  },
  "TICKET-0006": {
    nom: "Mme. Chantrain",
    type: "VIP",
    place: "B9",
  },
  "TICKET-0007": {
    nom: "Nina K.",
    type: "LY",
    place: "N/A",
  },
  "TICKET-0008": {
    nom: "Raph",
    type: "N/A",
    place: "N/A",
  },
  "TICKET-0009": {
    nom: "N/A",
    type: "N/A",
    place: "N/A",
  },
  "TICKET-0010": {
    nom: "N/A",
    type: "N/A",
    place: "N/A",
  },
  "TICKET-0011": {
    nom: "N/A",
    type: "N/A",
    place: "N/A",
  },
};

const nomTicketP = document.getElementById("nom-ticket");
const typeTicketP = document.getElementById("type-ticket");
const placeTicketP = document.getElementById("place-ticket");
const dateConcertTicketP = document.getElementById("date-concert-ticket");
const heureTicketP = document.getElementById("heure-ticket");
const lieuTicketP = document.getElementById("lieu-ticket");
const prixTicketP = document.getElementById("prix-ticket");
const nomTicketSpan = document.getElementById("nom-ticket-span");
const typeTicketSpan = document.getElementById("type-ticket-span");
const placeTicketSpan = document.getElementById("place-ticket-span");
const tiltleTicketP = document.getElementById("ticket-title");
const dateConcertTicketSpan = document.getElementById(
  "date-concert-ticket-span"
);
const heureTicketSpan = document.getElementById("heure-ticket-span");
const lieuTicketSpan = document.getElementById("lieu-ticket-span");
const prixTicketSpan = document.getElementById("prix-ticket-span");
const compteReboursSpan = document.getElementById("compte-rebours-span");

if (tickets[ticketID]) {
  gsap.from(".ticket-container", {
    duration: 0.8,
    scale: 0,
    ease: "power3.out",
  });
  gsap.to(".ticket-title", {
    delay: 0.2,
    duration: 2,
    scrambleText: {
      text: ticketID,
      chars: "01",
    },
  });
  gsap.from(".ticket-p", {
    delay: 0.2,
    y: "100%",
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.15,
  });
  gsap.from(".ticket-span", {
    delay: 0.2,
    y: "100%",
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.15,
  });
  gsap.fromTo(
    ".ticket-content-grid-el",
    {
      maskImage: "linear-gradient(to bottom, black 10%, transparent 100%)",
    },
    {
      delay: 0.2,
      maskImage: "linear-gradient(to bottom, black 100%, transparent 100%)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
    }
  );
  const ticket = tickets[ticketID];

  nomTicketSpan.textContent = ticket.nom;
  typeTicketSpan.textContent = ticket.type;
  placeTicketSpan.textContent = ticket.place;

  dateConcertTicketSpan.textContent = dateConcert;
  heureTicketSpan.textContent = heureConcert;
  lieuTicketSpan.textContent = lieuConcert;
  prixTicketSpan.textContent = prixTicket;

  const mettreAJourCompte = compteARebours(dateConcert, heureConcert);
  compteReboursSpan.textContent = mettreAJourCompte();

  setInterval(() => {
    compteReboursSpan.textContent = mettreAJourCompte();
  }, 1000);
} else {
  const ticketPs = document.querySelectorAll(".ticket-p");
  const ticketContainerTopBar = document.querySelector(".ticket-top-bar");
  const ticketContainer = document.querySelector(".ticket-container");
  ticketPs.forEach((ticketP) => {
    ticketP.textContent = "ERREUR";
  });
  ticketPs.forEach((ticketP) => {
    ticketP.style.color = "red";
  });
  tiltleTicketP.textContent = "TICKET INVALIDE";
  tiltleTicketP.style.color = "red";
  ticketContainer.style.boxShadow = "0 0 50px 0 rgba(255, 0, 0, 0.2)";
  ticketContainer.style.border = "1px solid red";
  ticketContainerTopBar.style.backgroundColor = "red";
  gsap.from(ticketContainer, {
    duration: 0.8,
    boxShadow: "0 0 50px 0 rgba(255, 0, 0, 0)",
    scale: 0,
    ease: "power3.out",
  });
  gsap.from(ticketContainer, {
    rotate: 12,
    duration: 2.5,
    ease: "elastic.out(1, 0.3)",
  });
}

