(() => {
  const MATIERES = [
    { slug: "histoire-geographie", nom: "Histoire-géo" },
    { slug: "francais", nom: "Français" },
    { slug: "mathematiques", nom: "Maths" },
    { slug: "physique-chimie", nom: "Physique-chimie" },
    { slug: "svt", nom: "SVT" },
    { slug: "anglais", nom: "Anglais" },
  ];
  window.MATIERES = MATIERES;

  const body = document.body;
  const page = body.dataset.page || "matiere";
  const slug = body.dataset.matiere || "";
  const base = page === "accueil" ? "" : "../";

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (text) node.textContent = text;
    return node;
  }

  const barre = el("nav", { class: "barre", "aria-label": "Navigation du cahier" });
  const ligne = el("div", { class: "barre-ligne" });
  const accueil = el("a", { class: "barre-accueil", href: base || "./" }, "Cahier");
  if (page === "accueil") accueil.setAttribute("aria-current", "page");
  const puces = el("div", { class: "barre-puces" });
  MATIERES.forEach((m) => {
    const lien = el("a", { class: "puce", href: base + m.slug + "/" }, m.nom);
    if (m.slug === slug) lien.setAttribute("aria-current", "page");
    puces.appendChild(lien);
  });
  const quizHref = base + "quiz/" + (slug ? "?m=" + slug : "");
  const lienQuiz = el("a", { class: "puce puce-quiz", href: quizHref }, "Quiz");
  if (page === "quiz") lienQuiz.setAttribute("aria-current", "page");
  puces.appendChild(lienQuiz);
  ligne.append(accueil, puces);
  barre.appendChild(ligne);
  body.prepend(barre);

  const courante = puces.querySelector('[aria-current="page"]');
  if (courante) puces.scrollLeft = courante.offsetLeft - puces.offsetWidth / 2 + courante.offsetWidth / 2;

  const toolbar = document.querySelector(".toolbar");
  const VUES = ["complet", "synthese", "extra"];
  const buttons = toolbar ? toolbar.querySelectorAll("[data-vue]") : [];
  const debut = document.querySelector("header.top + *");

  function setVue(vue, defiler) {
    if (!VUES.includes(vue)) vue = "complet";
    body.dataset.vue = vue;
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.vue === vue ? "true" : "false");
    });
    if (defiler && debut && debut.getBoundingClientRect().top < 0) debut.scrollIntoView();
  }

  if (toolbar) {
    const outils = el("div", { class: "barre-ligne barre-outils" });
    toolbar.classList.add("barre-vues");
    outils.appendChild(toolbar);

    const bouton = el("button", { type: "button", class: "barre-sommaire", "aria-expanded": "false" }, "Sommaire");
    const panneau = el("div", { class: "sommaire" });
    panneau.hidden = true;
    outils.appendChild(bouton);
    barre.append(outils, panneau);

    function fermer() {
      panneau.hidden = true;
      bouton.setAttribute("aria-expanded", "false");
    }

    function remplir() {
      panneau.innerHTML = "";
      const liste = el("ol");
      const haut = el("li");
      const lienHaut = el("a", { href: "#" }, "Haut de page");
      lienHaut.addEventListener("click", (event) => {
        event.preventDefault();
        fermer();
        window.scrollTo({ top: 0 });
      });
      haut.appendChild(lienHaut);
      liste.appendChild(haut);
      let n = 0;
      document.querySelectorAll(".wrap .card h2").forEach((titre) => {
        if (!titre.offsetParent) return;
        n += 1;
        if (!titre.id) titre.id = "titre-" + n;
        const item = el("li");
        const lien = el("a", { href: "#" + titre.id }, titre.textContent);
        lien.addEventListener("click", fermer);
        item.appendChild(lien);
        liste.appendChild(item);
      });
      panneau.appendChild(liste);
    }

    bouton.addEventListener("click", () => {
      if (panneau.hidden) {
        remplir();
        panneau.hidden = false;
        bouton.setAttribute("aria-expanded", "true");
      } else {
        fermer();
      }
    });
    document.addEventListener("click", (event) => {
      if (!panneau.hidden && !barre.contains(event.target)) fermer();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") fermer();
    });

    setVue("complet", false);
    buttons.forEach((button) => button.addEventListener("click", () => {
      fermer();
      setVue(button.dataset.vue, true);
    }));
  }

  function mesurer() {
    document.documentElement.style.setProperty("--barre-h", barre.offsetHeight + "px");
  }
  mesurer();
  if (window.ResizeObserver) new ResizeObserver(mesurer).observe(barre);

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // bank : { cahier: [...], extra: [...] } ; chaque question peut porter « matiere » (affiché en mode mélangé).
  function lancerQuiz(bank) {
    const root = document.getElementById("quiz");
    if (!bank || !root) return;
    const size = bank.taille || 10;
    const scoreEl = document.getElementById("score");
    const nouveau = document.getElementById("quizNouveau");
    const avecExtra = document.getElementById("quizExtra");

    function tirage() {
      const pool = bank.cahier.map((item) => ({ ...item, extra: false }));
      if (avecExtra && avecExtra.checked && bank.extra) {
        bank.extra.forEach((item) => pool.push({ ...item, extra: true }));
      }
      const questions = shuffle(pool).slice(0, Math.min(size, pool.length));
      let score = 0;
      let faites = 0;
      root.innerHTML = "";
      scoreEl.textContent = "0 / " + questions.length;

      questions.forEach((item, index) => {
        const block = el("div", { class: "q" });
        const title = el("h3", {}, (index + 1) + ". " + item.q);
        if (item.matiere) title.append(" ", el("span", { class: "badge-matiere" }, item.matiere));
        if (item.extra) title.append(" ", el("span", { class: "badge-extra" }, "Extra"));
        const choices = el("div", { class: "choices" });
        const why = el("p", { class: "why" });
        why.hidden = true;

        const order = shuffle(item.choices.map((label, i) => ({ label, good: i === item.answer })));
        order.forEach((choice) => {
          const button = el("button", { type: "button" }, choice.label);
          if (choice.good) button.dataset.good = "1";
          button.addEventListener("click", () => {
            if (block.dataset.done) return;
            block.dataset.done = "1";
            faites += 1;
            choices.querySelectorAll("button").forEach((candidate) => {
              candidate.disabled = true;
              if (candidate.dataset.good) candidate.classList.add("good");
            });
            if (choice.good) score += 1;
            else button.classList.add("bad");
            why.hidden = false;
            why.textContent = item.why;
            scoreEl.textContent = score + " / " + questions.length;
            if (faites === questions.length && nouveau) nouveau.focus({ preventScroll: true });
          });
          choices.appendChild(button);
        });
        block.append(title, choices, why);
        root.appendChild(block);
      });

      const total = document.getElementById("quizTotal");
      if (total) total.textContent = pool.length;
    }

    if (nouveau) nouveau.onclick = tirage;
    if (avecExtra) avecExtra.onchange = tirage;
    tirage();
  }

  window.Cahier = { lancerQuiz, shuffle };
  if (window.QUIZ && page === "matiere") lancerQuiz(window.QUIZ);
})();
