/* ---- Export client : rapport HTML autonome et CSV des constats et actions ----
   Le rapport reprend les pages cochées dans la fenêtre d'export, figées (champs remplacés par leur valeur, boutons retirés),
   avec une feuille de style intégrée : un seul fichier, sans dépendance, à envoyer tel quel. */
(()=>{
const RLAB={seo:'SEO',co:'Contenu',ux:'UX'};
const CSS=`:root{--tx:#1b1b19;--mu:#6b6a64;--bd:#dedcd4;--bg:#faf9f6;--cd:#f2f1ec;--ac:#28A745}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.rp{max-width:980px;margin:0 auto;padding:48px 24px 80px}h1,h2,h3{line-height:1.2;margin:0}
.rp-cover{padding:24px 0 36px;border-bottom:2px solid var(--tx);margin-bottom:12px}.rp-eb,.Eyebrow{display:block;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ac);margin-bottom:8px}
.rp-cover h1{font-size:2.6rem;font-weight:700}.rp-cover p{color:var(--mu);margin:10px 0 0}
.rp-sec{padding:36px 0;border-bottom:1px solid var(--bd);break-inside:auto}.rp-sec:last-child{border:0}
.MainTitle{font-size:1.9rem;font-weight:700;margin:0 0 8px}.MainDesc,.Hint,.mu{color:var(--mu)}.MainDesc{margin:0 0 20px}.Hint{font-size:.88rem;margin:6px 0}
.card{background:var(--cd);border:1px solid var(--bd);border-radius:14px;padding:18px 20px;margin:0 0 16px;break-inside:avoid}.card h3{font-size:1.05rem;margin:0 0 10px}
.v{white-space:pre-wrap}div.v{margin:4px 0 0}label.f{display:block;margin:0 0 10px}label.f>span:first-child{display:block;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--mu);margin-bottom:2px}
.scr{overflow-x:auto}table{width:100%;border-collapse:collapse}.tb th,.tb td,th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--bd);vertical-align:top;font-size:.9rem}th{font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;color:var(--mu)}
.rp-scores,.SaStat{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:12px 0}.rp-scores div,.SaStat div{padding:10px 14px;border:1px solid var(--bd);border-radius:12px;background:var(--cd)}
.rp-scores span,.SaStat span{display:block;font-size:.72rem;font-weight:700;text-transform:uppercase;color:var(--mu)}.rp-scores b,.SaStat b{font-size:1.4rem}
.BpRes{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:28px;align-items:start}.BpGrid,.NlGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.BpTr article{padding:0 0 16px;margin:0 0 16px;border-bottom:1px solid var(--bd)}.BpTr h3{font-size:1.15rem;margin:0 0 8px}.BpTr p{margin:0 0 8px;font-size:.92rem}
.BpQ h3,.NlQ h3{font-size:.95rem}.BpQ small,.NlQ small{color:var(--mu);margin-right:8px}.BpVal{margin:6px 0 0;color:var(--mu);font-size:.85rem}.BpRow{display:flex;justify-content:space-between;color:var(--mu);font-size:.85rem}
.BpLeg{display:flex;flex-wrap:wrap;gap:6px 16px;margin:6px 0 0}.BpKey{font-size:.8rem;color:var(--mu)}.BpKey::before{content:"";display:inline-block;width:18px;border-top:3px solid var(--c,#28A745);vertical-align:middle;margin-right:6px}
.BpKey.rw{--c:#D98E04}.BpKey.rc0{--c:#2F6FEB}.BpKey.rc1{--c:#8B5CF6}.BpKey.rc2{--c:#0E9F9F}.BpKey.rc3{--c:#6B7280}
.Radar{width:100%;max-width:440px;height:auto;display:block}.Radar .rg{fill:none;stroke:#d5d3cc;stroke-width:1}.Radar .rd{fill:rgba(40,167,69,.18);stroke:#28A745;stroke-width:2}.Radar .rp{fill:#28A745}.Radar .rl{font:600 11px system-ui,sans-serif;fill:#1b1b19}.Radar .rv{font-weight:400;fill:#6b6a64;font-size:10px}
.Radar .rx{fill:none;stroke-width:1.8}.Radar .rw{stroke:#D98E04;stroke-dasharray:6 4}.Radar .rc0{stroke:#2F6FEB}.Radar .rc1{stroke:#8B5CF6}.Radar .rc2{stroke:#0E9F9F}.Radar .rc3{stroke:#6B7280}.Radar .rq{stroke:none}.Radar .rq.rw{fill:#D98E04}.Radar .rq.rc0{fill:#2F6FEB}.Radar .rq.rc1{fill:#8B5CF6}.Radar .rq.rc2{fill:#0E9F9F}.Radar .rq.rc3{fill:#6B7280}
.rp-lv{display:inline-block;padding:1px 10px;border-radius:99px;font-size:.78rem;font-weight:700;white-space:nowrap;background:var(--bd);color:var(--mu)}.rp-lv.l0{background:#f8d7d3;color:#8a1c14}.rp-lv.l1{background:#fde9c8;color:#8a5a00}.rp-lv.l2{background:#dbe9fb;color:#1d4e9e}.rp-lv.l3{background:#d6f0dd;color:#1f6b32}.rp-score{font-size:1.1rem;margin:0 0 14px}.rp-note{color:var(--mu);font-size:.85rem}.rp-ct{margin:0 0 12px}.rp-ct h3{font-size:1rem;margin:0 0 4px}.rp-ct p{margin:0;white-space:pre-wrap}
.EvUp b{color:#1f7a34}.EvDown b{color:#b3261e}.Empty{color:var(--mu)}.Pst,.Pill{display:inline-block;padding:1px 8px;border-radius:99px;background:var(--bd);font-size:.75rem}
@media(max-width:760px){.BpRes,.BpGrid,.NlGrid{grid-template-columns:1fr}}@media print{body{background:#fff}.rp-sec{break-inside:auto}}`;

function frozen(k){const keep=CID;let h;try{h=page(k)}finally{CID=keep}
const c=document.createElement('div');c.innerHTML=h;
c.querySelectorAll('script,style,dialog,button,nav,.Pager,.pager,.TplCard,.Acts,.Hidden,[hidden],.SaCard,.CtCard,.SaMini,.BpTabs,.BpMode,.BpGrid,input[type=range],input[type=file],input[type=radio],input[type=hidden]').forEach(e=>e.remove());
const rep=(e,v,tag)=>{if(!String(v==null?'':v).trim()){e.remove();return}const n=document.createElement(tag);n.className='v';n.textContent=v;e.replaceWith(n)};
c.querySelectorAll('textarea').forEach(e=>rep(e,e.value||e.textContent,'div'));
c.querySelectorAll('input').forEach(e=>{const t=(e.getAttribute('type')||'text').toLowerCase();t=='checkbox'?rep(e,e.checked?'☑':'☐','span'):rep(e,e.value,'span')});
c.querySelectorAll('select').forEach(e=>{const o=e.selectedOptions&&e.selectedOptions[0];rep(e,o&&o.value!==''?o.textContent:'','span')});
c.querySelectorAll('label.f').forEach(l=>{if(!l.querySelector('.v'))l.remove()});
c.querySelectorAll('details').forEach(d=>d.setAttribute('open',''));
c.querySelectorAll('[contenteditable]').forEach(e=>e.removeAttribute('contenteditable'));
if(!c.querySelector('.v,polygon.rd,polygon.rx'))return '';return `<section class="rp-sec">${c.innerHTML}</section>`}

const head=k=>`<div class="PageHead"><span class="Eyebrow">${esc(lab(k))}</span><h1 class="MainTitle">${META[k][0]}</h1></div>`;
function gridSec(k){
const rows=(S.au[k]||[]).filter(x=>!x.h&&(x.s!==''||(x.n||'').trim())),cs=(S.nt[k]||[]).filter(z=>(z.x||'').trim());
if(!rows.length&&!cs.length)return '';
const lv=x=>x.s===''?'<span class="rp-lv">Non noté</span>':`<span class="rp-lv l${+x.s}">${esc(SC[+x.s+1])}</span>`;
return `<section class="rp-sec">${head(k)}${rated(k)?`<p class="rp-score">Score : <b>${score(k)} %</b></p>`:''}${rows.length?`<div class="scr"><table class="tb"><thead><tr><th>Critère</th><th>Niveau</th><th>Remarque</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${esc(x.t)}${wt(x)!=1?` <span class="rp-note">(×${wt(x)})</span>`:''}</td><td>${lv(x)}</td><td>${esc(x.n||'')}</td></tr>`).join('')}</tbody></table></div>`:''}${cs.length?`<h3 style="margin:20px 0 10px">Constats</h3>${cs.map(z=>`<div class="rp-ct"><h3>${esc(z.t||'Sans titre')}</h3><p>${esc(z.x)}</p></div>`).join('')}`:''}</section>`}
function prioSec(){const a=S.pr.filter(z=>(z.t||'').trim());if(!a.length)return '';
return `<section class="rp-sec">${head('prio')}<div class="scr"><table class="tb"><thead><tr><th>Action</th><th>Source</th><th>Impact</th><th>Effort</th><th>Statut</th><th>Responsable</th><th>Échéance</th></tr></thead><tbody>${a.map(z=>`<tr><td>${esc(z.t)}</td><td>${esc(SRCN[z.src]||'Manuelle')}</td><td>${z.i?esc(IMP[+z.i-1]||''):'—'}</td><td>${z.e?esc(EFF[+z.e-1]||''):'—'}</td><td>${esc(STN[z.st]||STN.todo)}</td><td>${esc(z.o||'—')}</td><td>${z.d?esc(fd(z.d)):'—'}</td></tr>`).join('')}</tbody></table></div></section>`}
const sectionOf=k=>{const keep=CID;try{return k=='seo'||k=='co'||k=='ux'?(CID=k,gridSec(k)):k=='prio'?(CID=k,prioSec()):frozen(k)}finally{CID=keep}};
function build(keys){
const name=(S.site&&S.site.n)||'Audit',u=(S.site&&S.site.u)||'',d=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
const sc=['seo','co','ux'].filter(k=>rated(k)).map(k=>`<div><span>${RLAB[k]}</span><b>${score(k)} %</b></div>`).join('');
const body=keys.map(sectionOf).join('');
return `<!DOCTYPE html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rapport d’audit · ${esc(name)}</title><style>${CSS}</style></head><body><main class="rp"><header class="rp-cover"><span class="rp-eb">Rapport d’audit</span><h1>${esc(name)}</h1><p>${esc(d)}${u?' · '+esc(u):''}</p>${sc?`<div class="rp-scores">${sc}</div>`:''}</header>${body}</main></body></html>`}

function csv(){
const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""').replace(/\r?\n/g,' ')+'"',rows=[['Section','Type','Titre','Détail','Gravité ou impact','Effort','Statut','Responsable','Échéance']];
['seo','co','ux'].forEach(k=>(S.nt[k]||[]).filter(z=>(z.x||'').trim()).forEach(z=>rows.push([RLAB[k],'Constat',z.t,z.x,'','','','',''])));
if(window.NL)NL.H.forEach((h,i)=>{const v=NL.sv(i);if(v!=null)rows.push(['Nielsen','Heuristique',h[0],NL.nt(i),v+' · '+NL.SL[v],'','','',''])});
S.pr.filter(z=>(z.t||'').trim()).forEach(z=>rows.push([SRCN[z.src]||'Manuelle','Action',z.t,'',z.i?IMP[+z.i-1]||'':'',z.e?EFF[+z.e-1]||'':'',STN[z.st]||STN.todo,z.o||'',z.d||'']));
return '\ufeff'+rows.map(r=>r.map(q).join(';')).join('\r\n')}

const slug=()=>String((S.site&&S.site.n)||'audit').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'audit';
function dl(file,type,text){const a=document.createElement('a'),u=URL.createObjectURL(new Blob([text],{type}));a.href=u;a.download=file;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
document.addEventListener('click',e=>{const b=e.target.closest('button[data-xr]');if(!b)return;const day=new Date().toISOString().slice(0,10);
if(b.dataset.xr=='csv')return dl('audit-'+slug()+'-'+day+'.csv','text/csv;charset=utf-8',csv());
const sel=ex(),keys=EXG.flatMap(([,l])=>l.map(x=>x[0])).filter(k=>sel.includes(k));
if(!keys.length){const n=document.getElementById('exn');if(n)n.textContent='Coche au moins un élément';return}
dl('rapport-audit-'+slug()+'-'+day+'.html','text/html;charset=utf-8',build(keys))});
window.RP={build,csv,frozen};
})();
