(() => {
  const body = document.body;
  const buttons = document.querySelectorAll(".toolbar [data-vue]");
  const VUES = ["complet", "synthese", "extra"];

  function setVue(vue) {
    if (!VUES.includes(vue)) vue = "complet";
    body.dataset.vue = vue;
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.vue === vue ? "true" : "false");
    });
  }

  if (buttons.length) {
    setVue("complet");
    buttons.forEach((button) => button.addEventListener("click", () => setVue(button.dataset.vue)));
  }

  const bank = window.QUIZ;
  const root = document.getElementById("quiz");
  if (!bank || !root) return;

  const size = bank.taille || 10;
  const scoreEl = document.getElementById("score");
  const nouveau = document.getElementById("quizNouveau");
  const avecExtra = document.getElementById("quizExtra");

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

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
      const block = document.createElement("div");
      block.className = "q";
      const title = document.createElement("h3");
      title.textContent = (index + 1) + ". " + item.q;
      if (item.extra) {
        const badge = document.createElement("span");
        badge.className = "badge-extra";
        badge.textContent = "Extra";
        title.append(" ", badge);
      }
      const choices = document.createElement("div");
      choices.className = "choices";
      const why = document.createElement("p");
      why.className = "why";
      why.hidden = true;

      const order = shuffle(item.choices.map((label, i) => ({ label, good: i === item.answer })));
      order.forEach((choice) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = choice.label;
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

  if (nouveau) nouveau.addEventListener("click", tirage);
  if (avecExtra) avecExtra.addEventListener("change", tirage);
  tirage();
})();
