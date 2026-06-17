const copy = {
  en: {
    "hero.eyebrow": "FrontierHQ",
    "hero.title":   "The signal is almost up",
    "hero.lede":    "Zoner, hold your position!",
    "hero.status":  "Coming soon",
    "footer.brandline": "frontierhq.xyz",
    "footer.copyrightPrefix": "© 2026",
    "footer.stalzone": "Stalzone",
    "footer.frontier": "FrontierHQ (Axulogic)",
  },
  "pt-BR": {
    "hero.eyebrow": "FrontierHQ",
    "hero.title":   "O sinal esta quase no ar",
    "hero.lede":    "Zoner, mantenha sua posicao!",
    "hero.status":  "Em breve",
    "footer.brandline": "frontierhq.xyz",
    "footer.copyrightPrefix": "© 2026",
    "footer.stalzone": "Stalzone",
    "footer.frontier": "FrontierHQ (Axulogic)",
  },
  ru: {
    "hero.eyebrow": "FrontierHQ",
    "hero.title":   "Сигнал почти поднят",
    "hero.lede":    "Зонер, держи позицию!",
    "hero.status":  "Скоро",
    "footer.brandline": "frontierhq.xyz",
    "footer.copyrightPrefix": "© 2026",
    "footer.stalzone": "Stalzone",
    "footer.frontier": "FrontierHQ (Axulogic)",
  },
};

const root     = document.body;
const switcher = document.querySelector(".language-switcher");
const buttons  = Array.from(document.querySelectorAll("[data-lang-switch]"));
const targets  = Array.from(document.querySelectorAll("[data-i18n]"));

function updateThumb(lang) {
  if (!switcher) return;
  const btn = buttons.find(b => b.getAttribute("data-lang-switch") === lang);
  if (btn) switcher.style.setProperty("--switch-thumb-x", `${btn.offsetLeft - 3}px`);
}

function applyLanguage(lang) {
  const dict = copy[lang] || copy.en;
  root.setAttribute("data-lang", lang);
  document.documentElement.lang = lang;

  targets.forEach(node => {
    const key = node.getAttribute("data-i18n");
    if (key && key in dict) {
      const value = dict[key];
      node.textContent = value;

      if (node.hasAttribute("data-text")) {
        node.setAttribute("data-text", value);
      }
    }
  });

  buttons.forEach(b => {
    b.classList.toggle("is-active", b.getAttribute("data-lang-switch") === lang);
  });

  updateThumb(lang);
}

buttons.forEach(b => {
  b.addEventListener("click", () => applyLanguage(b.getAttribute("data-lang-switch") || "en"));
});

window.addEventListener("resize", () => {
  const lang = buttons.find(b => b.classList.contains("is-active"))
    ?.getAttribute("data-lang-switch") || "en";
  updateThumb(lang);
});

applyLanguage(root.getAttribute("data-lang") || "en");
