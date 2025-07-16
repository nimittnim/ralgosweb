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
      G: "\\mathbb{G}",
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
  const envTypes = ["section", "theorem", "lemma", "definition", "remark", "code"];
  const unnumberedTypes = ["proof"];  // don't number proofs

  const counters = {};
  const labelMap = {};

  envTypes.forEach(type => counters[type] = 0);

  [...envTypes, ...unnumberedTypes].forEach(type => {
    document.querySelectorAll("." + type).forEach(el => {
      const label = document.createElement("span");
      const title = el.dataset.title ? ` (${el.dataset.title})` : "";
      let labelText = "";

      if (envTypes.includes(type)) {
        counters[type]++;
        labelText = `${capitalize(type)} ${counters[type]}${title}`;
      } else {
        labelText = `${capitalize(type)}${title}`;
      }

      label.className = `${type}-label`;
      label.innerHTML = el.id ? `<a href="#${el.id}">${labelText}</a>` : labelText;
      label.insertAdjacentText("beforeend", ". ");
      el.prepend(label);

      if (el.id) {
        labelMap[el.id] = labelText;
      }
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
