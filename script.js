window.MathJax = {
  tex: {
    macros: {
      Pr: "\\mathbb{P}",
      E: "\\mathbb{E}",
      Var: "\\mathrm{Var}",
      Cov: "\\mathrm{Cov}",
      Ber: "\\mathrm{Bernoulli}",
      Bin: "\\mathrm{Binomial}",
      Geo: "\\mathrm{Geometric}",
      Poisson: "\\mathrm{Poisson}",
      Unif: "\\mathrm{Uniform}",
      Norm: "\\mathcal{N}",
      Exp: "\\mathrm{Exp}",
      indep: "\\perp\\!\\!\\!\\perp",
      given: "\\mid",
      R: "\\mathbb{R}",
      N: "\\mathbb{N}",
      Z: "\\mathbb{Z}",
      G:"\\mathbb{G}",
      Q: "\\mathbb{Q}",
      S: "\\mathbb{S}",
      "1": "\\mathbf{1}",
      argmax: "\\operatorname*{arg\\,max}",
      argmin: "\\operatorname*{arg\\,min}"
    },
    displayAlign: "left"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const envTypes = ["section", "theorem", "lemma", "proof", "definition", "remark", "code"];
  const counters = {};
  const labelMap = {};

  envTypes.forEach(type => counters[type] = 0);

  envTypes.forEach(type => {
    document.querySelectorAll("." + type).forEach(el => {
      counters[type]++;
      const label = document.createElement("span");
      const labelClass = `${type}-label`;
      const number = counters[type];
      const title = el.dataset.title ? ` (${el.dataset.title})` : "";
      const labelText = type === "section"
      ? `${number}${title.slice(2)}` // skip section
      : `${capitalize(type)} ${number}${title}`;
      label.className = labelClass;
      label.innerHTML = el.id ? `<a href="#${el.id}">${labelText}</a>` : labelText;
      labelMap[el.id] = labelText;
      el.prepend(label);
      label.insertAdjacentText("beforeend", ". ");
    });
  });

  document.querySelectorAll(".ref").forEach(span => {
    const targetId = span.dataset.target;
    span.textContent = labelMap[targetId] || "[unknown reference]";
  });

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});


