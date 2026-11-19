/* ---- Heuristiques de Nielsen : 10 critères notés par gravité (0 à 4), envoyés vers la priorisation ----
   Données dans S.nl : s0..s9 = gravité (absente = non évalué), n0..n9 = observations.
   Chargé avant script.js : S, save, sec, SEL, T… ne sont lus qu'à l'appel. */
(()=>{
const H=[
['Visibilité de l’état du système','Le système informe l’utilisateur de ce qui se passe, par un retour approprié et dans un délai raisonnable.'],
['Correspondance entre le système et le monde réel','Le langage, les concepts et les conventions sont ceux de l’utilisateur, pas ceux du système.'],
['Contrôle et liberté de l’utilisateur','L’utilisateur peut annuler, revenir en arrière et quitter facilement une situation non voulue.'],
['Cohérence et standards','Un même mot ou une même action ne veut pas dire deux choses, et les conventions de la plateforme sont respectées.'],
['Prévention des erreurs','Le design évite les erreurs avant qu’elles surviennent : contraintes, valeurs par défaut, confirmations.'],
['Reconnaissance plutôt que rappel','Les options, actions et informations sont visibles : l’utilisateur n’a pas à tout mémoriser.'],
['Flexibilité et efficacité d’utilisation','Raccourcis et personnalisation servent à la fois les novices et les experts.'],
['Design esthétique et minimaliste','Aucune information superflue : chaque élément en plus dilue les éléments utiles.'],
['Aider à reconnaître, diagnostiquer et corriger les erreurs','Les messages d’erreur sont clairs, précis, sans code obscur, et proposent une solution.'],
['Aide et documentation','Une aide est disponible, facile à chercher, centrée sur les tâches et concise.']];
const SL=['Pas un problème','Cosmétique','Mineur','Majeur','Catastrophe d’usage'];
const SV=[['','Non évalué'],...SL.map((l,i)=>[i,i+' · '+l])];
const sv=i=>{const v=S.nl&&S.nl['s'+i];return v===undefined||v===null||v===''||isNaN(+v)?null:Math.max(0,Math.min(4,Math.round(+v)))};
const nt=i=>String((S.nl&&S.nl['n'+i])||'').trim();
const stats=()=>{const v=H.map((_,i)=>sv(i)).filter(x=>x!=null);return{n:v.length,avg:v.length?v.reduce((a,b)=>a+b,0)/v.length:0,cnt:[0,1,2,3,4].map(k=>v.filter(x=>x==k).length),todo:v.filter(x=>x>=2).length}};
const f1=x=>x.toLocaleString('fr-FR',{maximumFractionDigits:1});

function page(){const st=stats();
return sec('Heuristiques de Nielsen','Évalue l’interface avec les dix heuristiques de Jakob Nielsen. Chaque problème reçoit une gravité de 0 à 4 ; les problèmes de gravité 2 ou plus peuvent partir vers la priorisation.',
`<div class="card NlSum"><h3>Synthèse</h3><div class="SaStat"><div><span>Évaluées</span><b>${st.n} / 10</b></div><div><span>Gravité moyenne</span><b>${st.n?f1(st.avg)+' / 4':'—'}</b></div>${SL.map((l,i)=>`<div><span>${i} · ${esc(l)}</span><b>${st.cnt[i]}</b></div>`).join('')}</div><div class="Acts"><button class="Ghost" data-nla="pr"${st.todo?'':' disabled'}>Envoyer vers la priorisation${st.todo?' ('+st.todo+')':''}</button></div></div>
<div class="NlGrid">${H.map((h,i)=>`<div class="card NlQ"><h3><small>${String(i+1).padStart(2,'0')}</small>${esc(h[0])}</h3><p class="Hint">${esc(h[1])}</p>${L('Gravité',SEL('nl.s'+i,sv(i),SV,'Gravité : '+h[0]))}${L('Observations',T('nl.n'+i,'Où et comment le problème apparaît, avec la page concernée…',3))}</div>`).join('')}</div>`)}

document.addEventListener('click',e=>{const b=e.target.closest('button[data-nla]');if(!b||b.dataset.nla!='pr')return;
let add=0,had=0;H.forEach((h,i)=>{const v=sv(i);if(v==null||v<2)return;const pre='Heuristique '+(i+1)+' · ',t=pre+h[0]+(nt(i)?' : '+nt(i).replace(/\s+/g,' ').slice(0,110):'');
if(S.pr.some(z=>z.src=='nl'&&String(z.t).startsWith(pre))){had++;return}S.pr.push({t,i:String(v),e:'',src:'nl',o:'',d:'',st:'todo'});add++});
save();b.textContent=add?add+' action(s) ajoutée(s) ✓':'Déjà présentes dans la priorisation';setTimeout(()=>{if(b.isConnected)b.textContent='Envoyer vers la priorisation'+(stats().todo?' ('+stats().todo+')':'')},2500)});

function pdf(c){const{sect,need,tx,blk,hg,table,empty,M,CW}=c;
sect('nl','Heuristiques de Nielsen');const st=stats();if(!st.n){empty('Aucune heuristique évaluée.');return}
need(30);tx('Gravité moyenne : '+f1(st.avg)+' / 4 · '+st.n+' heuristique(s) évaluée(s) sur 10',M,c.y+10,10,{b:1});c.y+=26;
table(['Heuristique','Gravité'],H.map((h,i)=>[(i+1)+'. '+h[0],sv(i)==null?'Non évalué':sv(i)+' · '+SL[sv(i)]]),{w:[CW-190,190]});
H.forEach((h,i)=>{if(!nt(i))return;const w=CW-20,hh=14+hg(nt(i),w,9.2)+8;need(hh+4);tx((i+1)+'. '+h[0],M+10,c.y+10,9.5,{b:1});c.y+=14;c.y+=blk(nt(i),M+10,c.y,w,9.2,{c:'0.2 0.2 0.2'})+8})}

window.NL={n:()=>stats().n,page,pdf,H,SL,sv,nt,stats};
})();
