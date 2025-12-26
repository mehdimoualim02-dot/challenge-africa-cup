// auth.js – simple front-end password gate (not strong security)
// Replace EXPECTED_HASH_HEX with the SHA-256 hex of your chosen password.

const EXPECTED_HASH_HEX = "PUT_YOUR_SHA256_HEX_HERE";

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}
async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

const AUTH_KEY = "cup-africa-auth-ok";

async function unlockIfAuthorized() {
  if (sessionStorage.getItem(AUTH_KEY) === "1") {
    hideGateAndRender();
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("gate-input");
  const error = document.getElementById("gate-error");
  error.textContent = "";

  const candidate = input.value || "";
  const candidateHash = await sha256Hex(candidate);

  if (candidateHash === EXPECTED_HASH_HEX.toLowerCase()) {
    sessionStorage.setItem(AUTH_KEY, "1");
    hideGateAndRender();
  } else {
    error.textContent = "Incorrect password. Please try again.";
    input.select();
    input.focus();
  }
}

function hideGateAndRender() {
  const gate = document.getElementById("gate");
  if (gate) gate.hidden = true;
  if (window.CupOfAfricaRanking && typeof window.CupOfAfricaRanking.render === "function") {
    window.CupOfAfricaRanking.render();
  }
}

// init
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gate-form");
  if (form) form.addEventListener("submit", handleSubmit);
  unlockIfAuthorized();
});
