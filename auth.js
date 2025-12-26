
// auth.js – simple front-end gate
// Paste ONLY a 64-character hex string (0-9, a-f) between straight quotes.
const EXPECTED_HASH_HEX = "381fabf51c63fdc85f5fcb47a34fe642c2233411b4f9caf04e498a8f734a637b"; // MyStrongPass2025
const AUTH_KEY = "cup-africa-auth-ok";

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}
async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

function goResults() { sessionStorage.setItem(AUTH_KEY, "1"); location.replace("results.html"); }

async function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("gate-input");
  const error = document.getElementById("gate-error");
  error.textContent = "";
  const hash = await sha256Hex(input.value || "");
  if (hash.toLowerCase() === EXPECTED_HASH_HEX.toLowerCase()) {
    goResults();
  } else {
    error.textContent = "Incorrect password. Please try again.";
    input.select(); input.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gate-form");
  form.addEventListener("submit", handleSubmit);
  if (sessionStorage.getItem(AUTH_KEY) === "1") { goResults(); }
});
