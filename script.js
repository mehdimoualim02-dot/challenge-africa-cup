
/**
 * Cup of Africa Pronostics - Phase 1 Ranking Renderer
 * Vanilla JS – no dependencies.
 * 
 * Usage:
 * 1) Add <div id="ranking"></div> to your HTML.
 * 2) Include this script.js at the end of <body> or with defer in <head>.
 */

(function () {
  // ---------------------------
  // CONFIGURABLE DATA SOURCE
  // ---------------------------
  const rankingData = [
    {
      tierLabel: "🏆 1st Place (11 points)",
      points: 11,
      participants: [
        "Meriem Ihdouka",
        "Myriame El Idrissi Raghni",
        "Abdelilah Benlhaoud",
        "Hanaa Rharib"
      ]
    },
    {
      tierLabel: "🥈 2nd Place (10 points)",
      points: 10,
      participants: [
        "Hajar Belkhbizi",
        "Zakaria Racaf"
      ]
    },
    {
      tierLabel: "🥉 3rd Place (9 points)",
      points: 9,
      participants: [
        "Moulay Thami El Bouaanani",
        "Mohammed El Ghrabli",
        "Anas Farid",
        "Manal Aboudihaj",
        "Abdelghani Fimoud"
      ]
    },
    {
      tierLabel: "4th Place (8 points)",
      points: 8,
      participants: [
        "Yassine El Mouttaki"
      ]
    },
    {
      tierLabel: "5th Place (7 points)",
      points: 7,
      participants: [
        "El Mehdi Moualim",
        "Youssef Bassa",
        "Youssef Aboussoufian",
        "Marwane Jnibi"
      ]
    },
    {
      tierLabel: "6th Place (6 points)",
      points: 6,
      participants: [
        "Taoufiq El Ouassifi",
        "Salaheddine Bennissi",
        "Amine Sekhri",
        "Karima Saidi"
      ]
    }
  ];

  const calloutText = "🔥 Great job everyone! Stay tuned for the next phase!";

  // ---------------------------
  // OPTIONAL HIGHLIGHT CONFIG
  // ---------------------------
  // If you want to highlight specific names (e.g., your name), add them here:
  const highlightNames = [
    "El Mehdi Moualim" // 👋 feel free to add more names
  ];

  // Style tokens – tweak as needed
  const styles = {
    containerClass: "africa-cup-ranking",
    titleClass: "ranking-title",
    tierClass: "ranking-tier",
    nameListClass: "participant-list",
    nameItemClass: "participant-item",
    highlightItemClass: "participant-item--highlight",
    calloutClass: "ranking-callout"
  };

  // ---------------------------
  // DOM UTILITIES
  // ---------------------------
  function createEl(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent !== undefined) el.textContent = textContent;
    return el;
  }

  function normalize(str) {
    return String(str).trim().toLowerCase();
  }

  function isHighlighted(name) {
    return highlightNames
      .map(normalize)
      .includes(normalize(name));
  }

  // ---------------------------
  // RENDERING
  // ---------------------------
  function renderRanking(mount) {
    if (!mount) {
      console.warn("Ranking mount element not found. Add <div id=\"ranking\"></div> to your HTML.");
      return;
    }

    const container = createEl("section", styles.containerClass);

    // Title
    const title = createEl("h2", styles.titleClass, "Cup of Africa Pronostics – Phase 1 Ranking");
    container.appendChild(title);

    // Tiers
    rankingData.forEach(tier => {
      const tierBlock = createEl("div", styles.tierClass);

      const tierHeader = createEl("h3", null, tier.tierLabel);
      tierBlock.appendChild(tierHeader);

      const list = createEl("ul", styles.nameListClass);

      tier.participants.forEach(name => {
        const li = createEl("li", styles.nameItemClass, name);
        if (isHighlighted(name)) {
          li.classList.add(styles.highlightItemClass);
          li.setAttribute("title", "Highlighted");
        }
        list.appendChild(li);
      });

      tierBlock.appendChild(list);
      container.appendChild(tierBlock);
    });

    // Callout
    const callout = createEl("p", styles.calloutClass, calloutText);
    container.appendChild(callout);

    mount.innerHTML = ""; // clear previous content
    mount.appendChild(container);
  }

  // ---------------------------
  // AUTO-INIT
  // ---------------------------
  document.addEventListener("DOMContentLoaded", function () {
    const mount = document.getElementById("ranking");
    renderRanking(mount);
  });

  // ---------------------------
  // OPTIONAL: Expose API
  // ---------------------------
  // You can update data dynamically if needed:
  window.CupOfAfricaRanking = {
    setData(newData) {
      if (!Array.isArray(newData)) {
        console.error("setData expects an array of tiers.");
        return;
      }
      // Basic validation: must have tierLabel, points, participants
      const valid = newData.every(t =>
        t && typeof t.tierLabel === "string" &&
        typeof t.points === "number" &&
        Array.isArray(t.participants)
      );
      if (!valid) {
        console.error("Invalid data shape for ranking.");
        return;
      }
      // Update and re-render
      while (rankingData.length) rankingData.pop();
      newData.forEach(t => rankingData.push(t));
      const mount = document.getElementById("ranking");
      renderRanking(mount);
    },
    setHighlightNames(names) {
      if (!Array.isArray(names)) {
        console.error("setHighlightNames expects an array of strings.");
        return;
      }
      while (highlightNames.length) highlightNames.pop();
      names.forEach(n => highlightNames.push(n));
      const mount = document.getElementById("ranking");
      renderRanking(mount);
    }
  };
})();
