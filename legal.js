// Shows the policies in one language: the reader's earlier choice, otherwise Chinese for a Chinese browser and
// English for everyone else. Loaded in <head> so the page never flashes the other language first.
(function () {
  var root = document.documentElement;
  var show = function (lang) {
    root.dataset.lang = lang;
    root.lang = lang === "zh" ? "zh-Hans" : "en";
    var title = document.querySelector("title");
    if (title && title.dataset[lang]) document.title = title.dataset[lang];
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });
  };
  var saved = null;
  try { saved = localStorage.getItem("uptitle-lang"); } catch (e) {}
  show(saved === "zh" || saved === "en" ? saved : /^zh/i.test(navigator.language || "") ? "zh" : "en");
  document.addEventListener("DOMContentLoaded", function () {
    show(root.dataset.lang);
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        show(button.dataset.setLang);
        try { localStorage.setItem("uptitle-lang", button.dataset.setLang); } catch (e) {}
      });
    });
  });
})();
