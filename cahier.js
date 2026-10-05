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

  const barre = el("nav", { class: "barre", "aria-label": "Navigation du site" });
  const ligne = el("div", { class: "barre-ligne" });
  const accueil = el("a", { class: "barre-accueil", href: base || "./" }, "Révisions 3e A");
  if (page === "accueil") accueil.setAttribute("aria-current", "page");
  const puces = el("div", { class: "barre-puces" });
  MATIERES.forEach((m) => {
    const lien = el("a", { class: "puce", href: base + m.slug + "/" }, m.nom);
    if (m.slug === slug) lien.setAttribute("aria-current", "page");
    puces.appendChild(lien);
  });
  const lienReussir = el("a", { class: "puce puce-reussir", href: base + "comment-reussir/" }, "Comment réussir");
  if (page === "methodes") lienReussir.setAttribute("aria-current", "page");
  puces.appendChild(lienReussir);
  const quizHref = base + "quiz/" + (slug ? "?m=" + slug : "");
  const lienQuiz = el("a", { class: "puce puce-quiz", href: quizHref }, "Quiz");
  if (page === "quiz") lienQuiz.setAttribute("aria-current", "page");
  puces.appendChild(lienQuiz);
  const actuel = (MATIERES.find((m) => m.slug === slug) || {}).nom
    || (page === "quiz" ? "Quiz" : page === "methodes" ? "Réussir" : "Matières");
  const menu = el("button", { type: "button", class: "barre-menu", "aria-expanded": "false" }, actuel + " ▾");
  menu.addEventListener("click", () => {
    const ouvert = barre.classList.toggle("menu-ouvert");
    menu.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });
  puces.addEventListener("click", () => barre.classList.remove("menu-ouvert"));
  document.addEventListener("click", (event) => {
    if (!barre.contains(event.target)) {
      barre.classList.remove("menu-ouvert");
      menu.setAttribute("aria-expanded", "false");
    }
  });
  ligne.append(accueil, menu, puces);
  barre.appendChild(ligne);
  body.prepend(barre);

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

  // bank : { cahier: [...], extra: [...], slug? } ; chaque question peut porter « matiere » et « slug »
  // (mode mélangé). Deux modes : « qcm » (4 choix) et « cartes » (question seule, réponse cachée,
  // auto-évaluation), choisis par les boutons radio name="quizMode" s'ils existent.
  function lancerQuiz(bank) {
    const root = document.getElementById("quiz");
    if (!bank || !root) return;
    const size = bank.taille || 10;
    const scoreEl = document.getElementById("score");
    const nouveau = document.getElementById("quizNouveau");
    const avecExtra = document.getElementById("quizExtra");
    const total = document.getElementById("quizTotal");
    const modes = Array.from(document.querySelectorAll('input[name="quizMode"]'));

    function modeActif() {
      const coche = modes.find((input) => input.checked);
      return coche ? coche.value : "qcm";
    }

    function reserve() {
      const pool = bank.cahier.map((item) => ({ ...item, extra: false }));
      if (avecExtra && avecExtra.checked && bank.extra) {
        bank.extra.forEach((item) => pool.push({ ...item, extra: true }));
      }
      return pool;
    }

    function titreDe(item, numero) {
      const title = el("h3", {}, (numero ? numero + ". " : "") + item.q);
      if (item.matiere) title.append(" ", el("span", { class: "badge-matiere" }, item.matiere));
      if (item.extra) title.append(" ", el("span", { class: "badge-extra" }, "Extra"));
      return title;
    }

    function lienCours(item) {
      const cible = item.slug || bank.slug;
      if (!cible) return null;
      const nom = item.matiere || (MATIERES.find((m) => m.slug === cible) || {}).nom || "";
      return el("a", { class: "lien-cours", href: base + cible + "/" }, "Relire le cours" + (nom ? " de " + nom : ""));
    }

    // Bilan de fin : les questions ratées, leur bonne réponse, et le lien vers le cours.
    function bilan(questions, ratees, libelle) {
      const bloc = el("div", { class: "bilan" });
      const reussies = questions.length - ratees.length;
      bloc.appendChild(el("h3", {}, "Bilan : " + reussies + " / " + questions.length));
      if (!ratees.length) {
        bloc.appendChild(el("p", {}, "Tout juste. Tu peux ajouter les questions Extra, changer de matière ou passer aux cartes."));
      } else {
        bloc.appendChild(el("p", {}, libelle + " Relis la carte du cours correspondante avant de recommencer."));
        const liste = el("ul");
        ratees.forEach((item) => {
          const li = el("li");
          li.appendChild(el("strong", {}, item.q));
          li.appendChild(el("p", { class: "bonne" }, item.choices[item.answer]));
          if (item.why) li.appendChild(el("p", { class: "why" }, item.why));
          const lien = lienCours(item);
          if (lien) li.appendChild(lien);
          liste.appendChild(li);
        });
        bloc.appendChild(liste);
      }
      const actions = el("div", { class: "quiz-actions" });
      if (ratees.length) {
        const refaire = el("button", { type: "button" }, ratees.length > 1 ? "Refaire ces " + ratees.length + " questions" : "Refaire cette question");
        refaire.addEventListener("click", () => tirage(shuffle(ratees)));
        actions.appendChild(refaire);
      }
      const autre = el("button", { type: "button", class: "secondaire" }, "Nouveau tirage");
      autre.addEventListener("click", () => tirage());
      actions.appendChild(autre);
      bloc.appendChild(actions);
      root.appendChild(bloc);
      bloc.scrollIntoView({ block: "nearest" });
    }

    function qcm(questions) {
      let score = 0;
      let faites = 0;
      const ratees = [];
      scoreEl.textContent = "0 / " + questions.length;

      questions.forEach((item, index) => {
        const block = el("div", { class: "q" });
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
            else {
              button.classList.add("bad");
              ratees.push(item);
            }
            why.hidden = false;
            why.textContent = item.why;
            scoreEl.textContent = score + " / " + questions.length;
            if (faites === questions.length) bilan(questions, ratees, "Les questions ratées :");
          });
          choices.appendChild(button);
        });
        block.append(titreDe(item, index + 1), choices, why);
        root.appendChild(block);
      });
    }

    function cartes(questions) {
      let position = 0;
      let sues = 0;
      const aRevoir = [];
      scoreEl.textContent = "0 / " + questions.length;
      root.appendChild(el("p", { class: "consigne-cartes" },
        "Lis la question, réponds dans ta tête ou à l’écrit, puis retourne la carte. Sois honnête : « À revoir » est une bonne réponse."));
      const scene = el("div");
      root.appendChild(scene);

      function montrer() {
        scene.innerHTML = "";
        if (position >= questions.length) {
          bilan(questions, aRevoir, "Les cartes à revoir :");
          return;
        }
        const item = questions[position];
        const carte = el("div", { class: "carte" });
        carte.appendChild(el("p", { class: "carte-progression" }, "Carte " + (position + 1) + " / " + questions.length));
        carte.appendChild(titreDe(item));
        const reponse = el("div", { class: "carte-reponse" });
        reponse.hidden = true;
        reponse.appendChild(el("p", { class: "bonne" }, item.choices[item.answer]));
        if (item.why) reponse.appendChild(el("p", { class: "why" }, item.why));
        const actions = el("div", { class: "quiz-actions carte-actions" });
        const voir = el("button", { type: "button" }, "Retourner la carte");
        voir.addEventListener("click", () => {
          reponse.hidden = false;
          actions.innerHTML = "";
          const su = el("button", { type: "button", class: "ok" }, "Je savais");
          const revoir = el("button", { type: "button", class: "revoir" }, "À revoir");
          su.addEventListener("click", () => { sues += 1; suivant(); });
          revoir.addEventListener("click", () => { aRevoir.push(item); suivant(); });
          actions.append(su, revoir);
          su.focus({ preventScroll: true });
        });
        actions.appendChild(voir);
        carte.append(reponse, actions);
        scene.appendChild(carte);
      }

      function suivant() {
        position += 1;
        scoreEl.textContent = sues + " / " + questions.length;
        montrer();
      }

      montrer();
    }

    function tirage(forcees) {
      const pool = reserve();
      if (total) total.textContent = pool.length;
      const questions = forcees || shuffle(pool).slice(0, Math.min(size, pool.length));
      root.innerHTML = "";
      root.dataset.mode = modeActif();
      if (modeActif() === "cartes") cartes(questions);
      else qcm(questions);
    }

    if (nouveau) nouveau.onclick = () => tirage();
    if (avecExtra) avecExtra.onchange = () => tirage();
    modes.forEach((input) => { input.onchange = () => tirage(); });
    tirage();
  }

  window.Cahier = { lancerQuiz, shuffle };
  if (window.QUIZ && page === "matiere") lancerQuiz(window.QUIZ);
})();
