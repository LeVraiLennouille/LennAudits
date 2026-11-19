/* ---- Vérificateur de contraste WCAG (carte ajoutée à l'Audit UX) ----
   Rapport de contraste entre deux couleurs : AA texte normal 4,5, texte large 3, AAA 7 et 4,5, composants d'interface 3. */
(()=>{
let FG='#1F2937',BG='#FFFFFF';
const hex=v=>{v=String(v||'').trim().replace(/^#/,'');if(/^[0-9a-f]{3}$/i.test(v))v=v.replace(/./g,'$&$&');return/^[0-9a-f]{6}$/i.test(v)?'#'+v.toUpperCase():null};
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4));return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const T2=[['Texte normal · AA',4.5],['Texte large · AA',3],['Texte normal · AAA',7],['Texte large · AAA',4.5],['Composants d’interface · AA',3]];
function res(){const f=hex(FG),b=hex(BG);if(!f||!b)return'<p class="AudErr" role="alert">Saisis des couleurs hexadécimales valides (ex. #1F2937).</p>';
const r=ratio(f,b);return `<div class="CtPrev" style="color:${f};background:${b}"><b>Aa</b> Exemple de texte sur ce fond</div><p class="CtRatio"><b>${r.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})} : 1</b></p><ul class="CtList">${T2.map(([l,m])=>`<li class="${r>=m?'ok':'ko'}"><b aria-hidden="true">${r>=m?'✓':'✕'}</b><span>${l}<small>${m} : 1 requis</small></span></li>`).join('')}</ul>`}
const card=()=>`<div class="card CtCard"><h3>Vérificateur de contraste (WCAG)</h3><p class="Hint">Teste une paire de couleurs relevée sur le site : le contraste est le seul contrôle d’accessibilité que l’analyse automatique de la page ne peut pas faire.</p><div class="SaRow"><label class="f"><span>Texte</span><input id="ctF" data-ct="f" value="${FG}" spellcheck="false" autocomplete="off"></label><label class="f"><span>Fond</span><input id="ctB" data-ct="b" value="${BG}" spellcheck="false" autocomplete="off"></label><button class="Ghost" data-ct="swap">Inverser</button></div><div id="ctOut">${res()}</div></div>`;
const f0=R.ux;R.ux=()=>{const h=f0(),i=h.indexOf('</div>')+6;return h.slice(0,i)+card()+h.slice(i)};
document.addEventListener('input',e=>{const t=e.target;if(!t.dataset||(t.dataset.ct!='f'&&t.dataset.ct!='b'))return;if(t.dataset.ct=='f')FG=t.value;else BG=t.value;const o=document.getElementById('ctOut');if(o)o.innerHTML=res()});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-ct=swap]');if(!b)return;[FG,BG]=[BG,FG];show(cur,1)});
})();
