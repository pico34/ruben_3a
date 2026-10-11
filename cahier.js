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

  // bank : { cahier: [...], extra: [...], expliquer: [...], slug? } ; chaque question peut porter
  // « matiere » et « slug » (mode mélangé). Trois modes, choisis par les radios name="quizMode" :
  // « qcm » (4 choix), « cartes » (question seule, réponse cachée, auto-évaluation) et « expliquer »
  // (réponse orale, puis explication de quelques lignes { q, reponse, cles } avec mots-clés surlignés).
  function lancerQuiz(bank) {
    const root = document.getElementById("quiz");
    if (!bank || !root) return;
    const size = bank.taille || 10;
    const nouveau = document.getElementById("quizNouveau");
    const avecExtra = document.getElementById("quizExtra");
    const total = document.getElementById("quizTotal");
    const modes = Array.from(document.querySelectorAll('input[name="quizMode"]'));

    function modeActif() {
      const coche = modes.find((input) => input.checked);
      return coche ? coche.value : "qcm";
    }

    // Jauge de progression : une barre qui se remplit en vert (réussites) et en rouge clair
    // (à revoir), avec un mot d'encouragement. Remplace le compteur chiffré.
    let jaugeEl = null;
    function jauge(ok, mauvais, total, unite) {
      if (!jaugeEl) return;
      const faits = ok + mauvais;
      const base = total || faits || 1;
      jaugeEl.querySelector(".jauge-ok").style.width = Math.round((100 * ok) / base) + "%";
      jaugeEl.querySelector(".jauge-mauvais").style.width = Math.round((100 * mauvais) / base) + "%";
      const texte = jaugeEl.querySelector(".jauge-texte");
      texte.innerHTML = "";
      let mot;
      if (!faits) mot = "C’est parti !";
      else if (ok === faits && faits >= 3) mot = "Sans faute, impressionnant.";
      else if (ok / faits >= 0.8) mot = "Excellent, tu maîtrises.";
      else if (ok / faits >= 0.6) mot = "Bien, continue.";
      else if (faits < 3) mot = "Ça démarre.";
      else mot = "Ce qui est à revoir reviendra : c’est comme ça qu’on progresse.";
      texte.append(el("strong", {}, ok + (ok > 1 ? " réussies" : " réussie")), " sur " + faits + " " + unite + (faits > 1 ? "s" : "") + (total ? " (" + total + " au total)" : "") + " · " + mot);
    }
    // Série de bonnes réponses d'affilée : des flammes qui s'accumulent et une mascotte qui évolue.
    // Un nouvel animal à chaque bonne réponse d'affilée, de plus en plus fort, 25 paliers.
    const PALIERS = [
      "🐛 chenille", "🐜 fourmi", "🐌 escargot", "🐸 grenouille", "🐭 souris", "🐢 tortue", "🐇 lapin",
      "🐈 chat", "🦊 renard", "🐕 chien", "🐺 loup", "🐗 sanglier", "🦌 cerf", "🐆 léopard", "🐅 tigre",
      "🦁 lion", "🐻 ours", "🦍 gorille", "🐊 crocodile", "🦈 requin", "🐘 éléphant", "🦏 rhinocéros",
      "🦣 mammouth", "🦖 T. rex", "🐉 dragon", "👑 légende vivante",
    ].map((s, i) => [i, s.slice(0, s.indexOf(" ")), s.slice(s.indexOf(" ") + 1)]);
    const cleRecord = "serie-record-" + (bank.slug || "tout");
    let serieCourante = 0;
    let record = Number(localStorage.getItem(cleRecord) || 0);
    function serie(bonne) {
      const avant = serieCourante;
      serieCourante = bonne ? serieCourante + 1 : 0;
      if (serieCourante > record) {
        record = serieCourante;
        localStorage.setItem(cleRecord, String(record));
      }
      if (!jaugeEl) return;
      const zone = jaugeEl.querySelector(".serie");
      zone.innerHTML = "";
      const palier = PALIERS.filter((p) => serieCourante >= p[0]).pop();
      const suivant = PALIERS.find((p) => p[0] > serieCourante);
      const flammes = serieCourante <= 10 ? "🔥".repeat(serieCourante) : "🔥".repeat(10) + " ×" + serieCourante;
      zone.append(el("span", { class: "serie-mascotte", title: palier[2] }, palier[1]));
      let texte;
      if (!bonne && avant >= 3) texte = "Série de " + avant + " terminée (" + PALIERS.filter((p) => avant >= p[0]).pop()[2] + "). On repart !";
      else if (serieCourante === 0) texte = "Chaque bonne réponse d’affilée te fait grandir. Prochain : " + suivant[1] + " " + suivant[2];
      else if (!suivant) texte = "Série de " + serieCourante + " : " + palier[2] + ", le sommet !";
      else texte = "Série de " + serieCourante + " : tu es " + palier[2] + " ! Prochain : " + suivant[1] + " " + suivant[2];
      zone.append(el("span", { class: "serie-flammes" }, flammes), el("span", { class: "serie-texte" }, texte));
      if (record >= 3) {
        const meilleur = PALIERS.filter((p) => record >= p[0]).pop();
        zone.append(el("span", { class: "serie-record", title: "Meilleure série" }, "Record : " + record + " " + meilleur[1]));
      }
      if (bonne && serieCourante === palier[0] && palier[0] > 0) {
        zone.classList.add("palier");
        setTimeout(() => zone.classList.remove("palier"), 900);
      }
    }
    // La jauge est une barre fixe en bas de l'écran, créée une fois et réutilisée à chaque tirage.
    function poserJauge() {
      if (!jaugeEl) {
        jaugeEl = el("div", { class: "jauge", "aria-live": "polite" });
        const inner = el("div", { class: "jauge-inner" });
        const barreJauge = el("div", { class: "jauge-barre" });
        barreJauge.append(el("div", { class: "jauge-ok" }), el("div", { class: "jauge-mauvais" }));
        inner.append(barreJauge, el("p", { class: "jauge-texte" }), el("p", { class: "serie" }));
        jaugeEl.appendChild(inner);
        document.body.appendChild(jaugeEl);
        const mesurerJauge = () => document.documentElement.style.setProperty("--jauge-h", jaugeEl.offsetHeight + "px");
        mesurerJauge();
        if (window.ResizeObserver) new ResizeObserver(mesurerJauge).observe(jaugeEl);
      }
      serieCourante = 0;
      serie(false);
    }

    function reserve() {
      const pool = bank.cahier.map((item) => ({ ...item, extra: false }));
      if (avecExtra && avecExtra.checked && bank.extra) {
        bank.extra.forEach((item) => pool.push({ ...item, extra: true }));
      }
      return pool;
    }

    // Met en évidence les mots-clés attendus dans une explication.
    function surligner(texte, cles) {
      const frag = document.createDocumentFragment();
      if (!cles || !cles.length) {
        frag.append(texte);
        return frag;
      }
      const motif = new RegExp("(" + cles.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
      texte.split(motif).forEach((part, i) => {
        if (!part) return;
        if (i % 2) frag.appendChild(el("mark", {}, part));
        else frag.append(part);
      });
      return frag;
    }

    // La « bonne réponse » d'une question : le choix juste d'un QCM, ou l'explication complète.
    function blocReponse(item) {
      const bonne = el("p", { class: "bonne" });
      if (item.reponse) {
        bonne.classList.add("explication");
        bonne.appendChild(surligner(item.reponse, item.cles));
      } else {
        bonne.textContent = item.choices[item.answer];
      }
      return bonne;
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
        bloc.appendChild(el("p", {}, "Tout juste. Tu peux changer de mode, ajouter les questions Extra ou changer de matière."));
      } else {
        bloc.appendChild(el("p", {}, libelle + " Relis la carte du cours correspondante avant de recommencer."));
        const liste = el("ul");
        ratees.forEach((item) => {
          const li = el("li");
          li.appendChild(el("strong", {}, item.q));
          li.appendChild(blocReponse(item));
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
      poserJauge();
      jauge(0, 0, questions.length, "question");

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
            jauge(score, faites - score, questions.length, "question");
            serie(choice.good);
            if (faites === questions.length) bilan(questions, ratees, "Les questions ratées :");
          });
          choices.appendChild(button);
        });
        block.append(titreDe(item, index + 1), choices, why);
        root.appendChild(block);
      });
    }

    // Flux de cartes sans fin : on parcourt la réserve mélangée, puis on recommence en
    // présentant d'abord les cartes marquées « À revoir ». Compteur « justes / vues » en direct.
    function cartes(pool, mode) {
      let file = shuffle(pool);
      let vues = 0;
      let sues = 0;
      const aRevoir = [];
      const oral = mode === "expliquer";
      poserJauge();
      jauge(0, 0, 0, "carte");
      root.appendChild(el("p", { class: "consigne-cartes" }, oral
        ? "Explique à voix haute, en quelques phrases, comme si tu répondais au professeur. Retourne ensuite la carte : les mots surlignés sont ceux qu’il attend. Tu t’arrêtes quand tu veux."
        : "Lis la question, réponds dans ta tête ou à l’écrit, puis retourne la carte. Sois honnête : « À revoir » est une bonne réponse. Tu t’arrêtes quand tu veux."));
      const scene = el("div");
      const revoirBloc = el("details", { class: "a-revoir" });
      const revoirTitre = el("summary", {}, "À revoir (0)");
      const revoirListe = el("ul");
      revoirBloc.append(revoirTitre, revoirListe);
      revoirBloc.hidden = true;
      root.append(scene, revoirBloc);

      function ajouterARevoir(item) {
        if (aRevoir.includes(item)) return;
        aRevoir.push(item);
        const li = el("li");
        li.appendChild(el("strong", {}, item.q));
        li.appendChild(blocReponse(item));
        const lien = lienCours(item);
        if (lien) li.appendChild(lien);
        revoirListe.appendChild(li);
        revoirBloc.hidden = false;
        revoirTitre.textContent = "À revoir (" + aRevoir.length + ")";
      }

      function prochaine() {
        if (!file.length) {
          // Nouveau tour : d'abord ce qui reste à revoir, puis le reste mélangé.
          const reste = shuffle(pool.filter((item) => !aRevoir.includes(item)));
          file = shuffle(aRevoir.slice()).concat(reste);
        }
        return file.shift();
      }

      function montrer() {
        scene.innerHTML = "";
        const item = prochaine();
        const carte = el("div", { class: "carte" });
        carte.appendChild(el("p", { class: "carte-progression" },
          "Carte " + (vues + 1) + (aRevoir.includes(item) ? " · déjà marquée à revoir" : "")));
        carte.appendChild(titreDe(item));
        const reponse = el("div", { class: "carte-reponse" });
        reponse.hidden = true;
        reponse.appendChild(blocReponse(item));
        if (item.why) reponse.appendChild(el("p", { class: "why" }, item.why));
        const actions = el("div", { class: "quiz-actions carte-actions" });
        const voir = el("button", { type: "button" }, "Retourner la carte");
        voir.addEventListener("click", () => {
          reponse.hidden = false;
          actions.innerHTML = "";
          const su = el("button", { type: "button", class: "ok" }, oral ? "Je l’ai expliqué" : "Je savais");
          const revoir = el("button", { type: "button", class: "revoir" }, "À revoir");
          su.addEventListener("click", () => {
            sues += 1;
            serie(true);
            const i = aRevoir.indexOf(item);
            if (i >= 0) {
              aRevoir.splice(i, 1);
              revoirListe.children[i].remove();
              revoirTitre.textContent = "À revoir (" + aRevoir.length + ")";
              revoirBloc.hidden = !aRevoir.length;
            }
            suivant();
          });
          revoir.addEventListener("click", () => { serie(false); ajouterARevoir(item); suivant(); });
          actions.append(su, revoir);
          su.focus({ preventScroll: true });
        });
        actions.appendChild(voir);
        carte.append(reponse, actions);
        scene.appendChild(carte);
        // Si on avait défilé pour lire la réponse précédente, remonter à la question.
        if (vues && carte.getBoundingClientRect().top < barre.offsetHeight + 10) carte.scrollIntoView();
      }

      function suivant() {
        vues += 1;
        jauge(sues, vues - sues, 0, "carte");
        montrer();
      }

      montrer();
    }

    function tirage(forcees) {
      const mode = modeActif();
      const pool = mode === "expliquer" ? (bank.expliquer || []) : reserve();
      if (total) total.textContent = pool.length;
      root.innerHTML = "";
      root.dataset.mode = mode;
      if (nouveau) nouveau.textContent = mode === "qcm" ? "Nouveau tirage" : "Recommencer à zéro";
      if (!pool.length) {
        root.appendChild(el("p", { class: "note" }, "Pas encore de questions « Expliquer » pour cette matière."));
        return;
      }
      if (mode === "qcm") qcm(forcees || shuffle(pool).slice(0, Math.min(size, pool.length)));
      else cartes(pool, mode);
    }

    if (nouveau) nouveau.onclick = () => tirage();
    if (avecExtra) avecExtra.onchange = () => tirage();
    modes.forEach((input) => { input.onchange = () => tirage(); });
    tirage();
  }

  window.Cahier = { lancerQuiz, shuffle };
  if (window.QUIZ && page === "matiere") lancerQuiz(window.QUIZ);
})();
