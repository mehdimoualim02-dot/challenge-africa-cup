// auth.js – login page logic: verify password (SHA-256) and redirect to results.html
// Using password: 123456 (SHA-256)
const EXPECTED_HASH_HEX = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
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
  if(hash.toLowerCase()===EXPECTED_HASH_HEX.toLowerCase()){ goResults(); }
  else{ error.textContent='Incorrect password. Please try again.'; input.select(); input.focus(); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form=document.getElementById('gate-form');
  form.addEventListener('submit', handleSubmit);
  if(sessionStorage.getItem(AUTH_KEY)==='1'){ goResults(); }
});
