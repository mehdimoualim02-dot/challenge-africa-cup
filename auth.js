// auth.js – login page logic: verify password (SHA-256) and redirect to results.html
// Replace EXPECTED_HASH_HEX with SHA-256 of your password

// Replace with the correct hash
const EXPECTED_HASH_HEX = "381fabf51c63fdc85f5fcb47a34fe642c2233411b4f9caf04e498a8f734a637b";
const AUTH_KEY = 'cup-africa-auth-ok';

function toHex(buf){ return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
async function sha256Hex(str){ const data=new TextEncoder().encode(str); const digest=await crypto.subtle.digest('SHA-256', data); return toHex(digest); }

function goResults(){ sessionStorage.setItem(AUTH_KEY,'1'); location.replace('results.html'); }

async function handleSubmit(e){
  e.preventDefault();
  const input=document.getElementById('gate-input');
  const error=document.getElementById('gate-error');
  error.textContent='';
  const hash=await sha256Hex(input.value||'');
  if(hash===EXPECTED_HASH_HEX.toLowerCase()){ goResults(); }
  else{ error.textContent='Incorrect password. Please try again.'; input.select(); input.focus(); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form=document.getElementById('gate-form');
  form.addEventListener('submit', handleSubmit);
  // If already authorized in this tab, go straight to results
  if(sessionStorage.getItem(AUTH_KEY)==='1'){ goResults(); }
});
