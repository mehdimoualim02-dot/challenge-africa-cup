// Exemple de participants et points (max 80)
const participants = [
    { name: "Participant 1", points: 5 },
    { name: "Participant 2", points: 3 },
    { name: "Participant 3", points: 7 },
    { name: "Participant 4", points: 2 },
    // ... jusqu'à 80 participants
];

// Exemple de matchs Phase 1 avec pourcentage des votes
const matches = [
    { teams: "Maroc 🇲🇦 vs Ghana 🇬🇭", percA: 60, percB: 40 },
    { teams: "Nigeria 🇳🇬 vs Égypte 🇪🇬", percA: 50, percB: 50 },
    { teams: "Sénégal 🇸🇳 vs Tunisie 🇹🇳", percA: 70, percB: 30 }
];

// Générer le classement
function renderLeaderboard() {
    const tbody = document.querySelector("#leaderboard tbody");
    participants.sort((a,b) => b.points - a.points); // tri décroissant
    participants.forEach((p, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${i+1}</td><td>${p.name}</td><td>${p.points}</td>`;
        tbody.appendChild(tr);
    });
}

// Générer les statistiques des matchs
function renderMatchStats() {
    const container = document.getElementById("match-stats");
    matches.forEach(match => {
        const div = document.createElement("div");
        div.className = "match";
        div.innerHTML = `
            <h3>${match.teams}</h3>
            <p>${match.percA}% pour ${match.teams.split(" vs ")[0]}</p>
            <p>${match.percB}% pour ${match.teams.split(" vs ")[1]}</p>
        `;
        container.appendChild(div);
    });
}

// Initialisation
renderLeaderboard();
renderMatchStats();
