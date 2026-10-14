const KEY='uxaudit.v1',$=s=>document.querySelector(s),uid=()=>Math.random().toString(36).slice(2,8);
const mk=l=>l.map(t=>({t,s:'',n:''}));const N=t=>({t,x:''});
const DEF=()=>({p:{},a:{int:[N('')],soc:[N('')],obj:[N('')],inf:[N('')],ach:[N('')],bes:[N('')],mot:[N('')],fru:[N('')]},site:{n:'',u:''},conc:[{id:uid(),n:'',u:''}],sw:{},pe:{},pt:{},
cx:['ADN','UX','Produits','Client ciblé','Engagement RSE'].map(c=>({c,v:{}})),
cmp:['Nombre d’offres / catalogue','Diversification des services','Atouts stratégiques','Risques / limites','Part de marché'].map(c=>({c,v:{}})),
au:{seo:mk(['Vitesse et Core Web Vitals (LCP)','Architecture et URL','Navigation à facettes / budget de crawl','Balises title et meta descriptions','Structure des titres (un seul H1)','Sitemap.xml et robots.txt','Attributs alt des images','Maillage interne']),
co:mk(['Stratégie Top of Funnel (blog, magazine)','Pages destinations / pages money (titres, mots-clés)','Liens contenu → pages produits','Équilibre identité de marque / mot-clé','Proposition de valeur claire','Preuves sociales (avis, références)']),
ux:mk(['Mobile first (boutons, menu)','Navigation claire et prévisible','Hiérarchie visuelle','Accessibilité (contrastes, clavier)','Retours système (états, erreurs)','Parcours de conversion fluide'])},
nt:{seo:[N('Vitesse et Core Web Vitals'),N('Architecture et URL'),N('Navigation à facettes')],co:[N('Stratégie Top of Funnel (inspiration)'),N('Pages destinations (Middle of Funnel)')],ux:[N('Mobile first')]},
map:[{t:'Accueil',d:0}],q:[],cur:'dash'});
let S;try{S=Object.assign(DEF(),JSON.parse(localStorage.getItem(KEY))||{})}catch(e){S=DEF()}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));$('#st').textContent='Enregistré'}catch(e){$('#st').textContent='Stockage indisponible'}};
const get=k=>k.split('.').reduce((o,x)=>o==null?o:o[x],S);
const set=(k,v)=>{const a=k.split('.'),l=a.pop();a.reduce((o,x)=>o[x]??={},S)[l]=v};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I=(k,ph='')=>`<input data-k="${k}" placeholder="${esc(ph)}" value="${esc(get(k))}">`;
const T=(k,ph='',r=3)=>`<textarea data-k="${k}" rows="${r}" placeholder="${esc(ph)}">${esc(get(k))}</textarea>`;
const L=(t,h)=>`<label class="f"><span>${t}</span>${h}</label>`;
const sec=(t,d,b)=>`<div class="SectionTitle"><span class="Eyebrow">${GN[GRP[CID]]}</span><h2 class="Title">${t}</h2><p class="Subtitle">${d}</p></div>${b}`;
const add=(p,l)=>`<button class="BtnSolid sm" data-a="add:${p}">+ ${l}</button>`;
const score=k=>{const n=S.au[k].filter(x=>x.s!=='');return n.length?Math.round(n.reduce((s,x)=>s+ +x.s,0)/n.length/3*100):0};
const AK=[['int','Intérêts','#ffb0a0','Ex. Voyageur perpétuel'],['soc','Réseaux sociaux','#ffa8d8','Ex. Instagram'],['obj','Objectifs','#76d7f2','Ex. Optimisation budget / expérience'],['inf','Influences','#86e0a3','Ex. Le bouche-à-oreille'],['ach','Comportement d’achat','#ffe099','Ex. Réfléchi et comparatif'],['bes','Besoins','#ffc470','Ex. Besoin de réassurance'],['mot','Motivations','#d8b8ff','Ex. Immersion culturelle'],['fru','Frustrations','#ffd966','Ex. La gestion de l’imprévu']];
AK.forEach(([k])=>{if(!Array.isArray(S.a[k]))S.a[k]=S.a[k]?[{t:'',x:S.a[k]}]:[N('')]});
const SL=[['Introverti','Extraverti'],['Analytique','Créatif'],['Occupé','Libre'],['Désordonné','Organisé'],['Indépendant','Collaboratif'],['Passif','Actif'],['Sûr','Risqué']];
const COLS=()=>[{id:'me',n:S.site.n||'Site audité'},...S.conc.map((x,i)=>({id:x.id,n:x.n||'Concurrent '+(i+1)}))];
const NC={seo:'#86e0a3',co:'#a6e8bd',ux:'#c6f0d2'};
const FP=[['ne','Menace des nouveaux entrants','Barrières à l’entrée, capital, notoriété, réglementation…','var(--Primary)'],['fo','Pouvoir de négociation des fournisseurs','Concentration, coût de changement, exclusivités…','var(--DarkPrimary)'],['rv','Rivalité entre concurrents','Nombre d’acteurs, croissance, différenciation, guerre des prix…','var(--Danger)'],['cl','Pouvoir de négociation des clients','Sensibilité au prix, alternatives, coût de changement…','var(--Success)'],['su','Menace des produits de substitution','Solutions alternatives, rapport qualité/prix, évolution des usages…','var(--MinMuted)']];
const Q=(p,k,t,c,r=5)=>`<label class="q" style="--c:${c}"><span>${t}</span>${T(p+'.'+k,'Une idée par ligne',r)}</label>`;
const QT=[['text','Texte libre'],['one','Choix unique'],['multi','Choix multiple'],['scale','Échelle 1–5'],['yn','Oui / Non']];
const SC=['—','Absent','Faible','Correct','Excellent'];
const NOTE=(p,i,ph,c,tg)=>`<div class="nt" style="--n:${c}"><button class="x" data-a="del:${p}:${i}" aria-label="Supprimer la note">×</button>${I(`${p}.${i}.t`,ph)}${T(`${p}.${i}.x`,tg?'Observation : …\nRisque : …\nRecommandation : …':'Description…',3)}${tg?`<div class="tg">${['Observation','Point fort','Risque','Opportunité','Recommandation','À vérifier'].map(l=>`<button data-a="tag:${p}:${i}:${l}">${l}</button>`).join('')}</div>`:''}</div>`;
const tbl=(k,l)=>{const cs=COLS();return `<div class="scr"><table class="tb"><thead><tr><th>Critère</th>${cs.map(c=>`<th>${esc(c.n)}</th>`).join('')}<th></th></tr></thead><tbody>${S[k].map((r,i)=>`<tr><td>${I(`${k}.${i}.c`,'Critère')}</td>${cs.map(c=>`<td${c.id=='me'?' class="me"':''}>${T(`${k}.${i}.v.${c.id}`,'',3)}</td>`).join('')}<td><button data-a="del:${k}:${i}" aria-label="Supprimer">×</button></td></tr>`).join('')}</tbody></table></div>`+add(k,l)};
const aud=(k,t,d)=>{const sc=score(k);
const rows=S.au[k].map((x,i)=>`<div class="row">${I(`au.${k}.${i}.t`,'Critère')}<select data-k="au.${k}.${i}.s">${SC.map((l,v)=>{const o=v?v-1:'';return `<option value="${o}"${String(x.s)===String(o)?' selected':''}>${l}</option>`}).join('')}</select>${I(`au.${k}.${i}.n`,'Notes')}<button data-a="del:au.${k}:${i}" aria-label="Supprimer">×</button></div>`).join('');
return sec(t,d,`<div class="card"><h3>Grille d’évaluation</h3><div class="sc"><span>Score <b>${sc} %</b></span><div class="bar"><i style="width:${sc}%"></i></div></div>${rows}${add('au.'+k,'Ajouter un critère')}</div><div class="card"><h3>Constats</h3><div class="nts">${S.nt[k].map((_,i)=>NOTE('nt.'+k,i,'Titre du constat',NC[k],1)).join('')}</div>${add('nt.'+k,'Ajouter un constat')}</div>`)};
const R={
dash(){const nn=a=>a.filter(z=>(z.t+z.x).trim()).length,has=o=>Object.values(o||{}).some(v=>String(v).trim()),c=(o,ks)=>ks.filter(k=>(o[k]||'').trim()).length,K=['seo','co','ux'];
const nA=AK.reduce((n,x)=>n+nn(S.a[x[0]]),0),nC=K.reduce((n,k)=>n+nn(S.nt[k]),0);
const done=[has(S.p),nA>0,S.conc.some(x=>(x.n||'').trim())||!!(S.site.n||'').trim(),has(S.sw),has(S.pe),Object.values(S.pt).some(f=>f.s||(f.x||'').trim()),S.cmp.some(r=>has(r.v)),...K.map(k=>S.au[k].some(x=>x.s!=='')),S.map.length>1,S.q.length>0];
const pct=Math.round(done.filter(Boolean).length/done.length*100),avg=Math.round(K.reduce((s,k)=>s+score(k),0)/3);
const cards=[['persona','Persona',c(S.p,['nom','age','job','bio','pers'])+'/5','champs remplis'],['about','À propos',nA,'notes'],['conc','Concurrents',S.conc.length,'acteur(s)'],['swot','SWOT',c(S.sw,['s','w','o','t'])+'/4','cadrans'],['pestel','PESTEL',c(S.pe,['po','ec','so','te','en','le'])+'/6','facteurs'],['porter','Porter',Object.values(S.pt).filter(f=>f.s).length+'/5','forces notées'],['cmp','Comparatif',S.cmp.length,'indicateur(s)'],['seo','Audit SEO',score('seo')+' %',nn(S.nt.seo)+' constat(s)'],['co','Audit Contenu',score('co')+' %',nn(S.nt.co)+' constat(s)'],['ux','Audit UX',score('ux')+' %',nn(S.nt.ux)+' constat(s)'],['map','Sitemap',S.map.length,'page(s)'],['q','Questionnaire',S.q.length,'question(s)']];
const st=[['Comprendre','Cadre le persona : qui il est, ce qu’il veut, ce qui le frustre.','persona'],['Benchmarker','Repère les concurrents et compare-les au site audité.','conc'],['Diagnostiquer','Pose le SWOT et le PESTEL pour situer le projet.','swot'],['Auditer','Note le SEO, le contenu et l’UX, puis consigne tes constats.','seo'],['Restituer','Structure le sitemap, prépare le questionnaire et exporte en PDF.','map']];
const fq=[['Où sont enregistrées mes données ?','Dans le LocalStorage de ton navigateur : rien n’est envoyé sur un serveur. Vider les données du site ou changer de navigateur efface l’audit, pense donc à exporter en PDF.'],['Comment exporter en PDF ?','Clique sur « Exporter en PDF » : la fenêtre d’impression s’ouvre avec toutes les sections. Choisis « Enregistrer au format PDF » comme imprimante.'],['Comment tout effacer ?','Le bouton « Réinitialiser », en bas de page, supprime toutes les données après une confirmation.']];
return `<div class="SectionTitle"><span class="Eyebrow">Tableau de bord</span><h2 class="Title">Structure ton audit UX</h2><p class="Subtitle">${META.dash[1]}</p></div><div class="StatsGrid">${[[pct+' %','Modules entamés','Sur 12 modules, ceux qui contiennent déjà des données.'],[avg+' %','Score moyen','Moyenne des grilles SEO, contenu et UX.'],[nA+nC,'Notes et constats','Post-it du persona et constats d’audit.']].map(([n,l,p])=>`<div class="Card Stat"><div class="Deco" aria-hidden="true"></div><div class="Number">${n}</div><div class="StatLabel">${l}</div><p>${p}</p></div>`).join('')}</div>
<div class="SectionTitle"><span class="Eyebrow">Les modules</span><h2 class="Title">Tout ton audit en un coup d’œil</h2></div><div class="OfferGrid">${cards.map(([id,t,v,x])=>`<article class="Card Offer"><span class="Badge">${v} · ${x}</span><h3>${t}</h3><p>${META[id][1]}</p><button class="Link" data-s="${id}">Ouvrir <span class="Arrow" aria-hidden="true">→</span></button></article>`).join('')}</div>
<section class="Steps"><div class="SectionTitle"><span class="Eyebrow">Méthode</span><h2 class="Title">Comment mener ton audit</h2><p class="Subtitle">Cinq étapes, du cadrage à la restitution.</p></div><ol class="StepList">${st.map(([t,p,id])=>`<li><h3>${t}</h3><p>${p}</p><button class="Link" data-s="${id}">Ouvrir <span class="Arrow" aria-hidden="true">→</span></button></li>`).join('')}</ol></section>
<section class="CityFAQ"><div class="SectionTitle"><span class="Eyebrow">Questions fréquentes</span><h2 class="Title">Utiliser l’outil</h2></div><div class="FAQList">${fq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>`},
persona(){return sec('Persona','Identité, bio et personnalité de l’utilisateur type.',`<div class="g2"><div class="card"><h3>Identité</h3><div class="g3">${L('Prénom',I('p.nom'))}${L('Âge',I('p.age'))}${L('Métier / statut',I('p.job'))}</div>${L('Bio',T('p.bio','Contexte, parcours, quotidien…',6))}</div><div class="card"><h3>Personnalité</h3>${SL.map((s,i)=>`<label class="sl"><span><b>${s[0]}</b><b>${s[1]}</b></span><input type="range" min="0" max="100" data-k="p.s${i}" value="${get('p.s'+i)??50}"></label>`).join('')}${L('Précisions',T('p.pers','Valeurs, façon de décider…',3))}</div></div>`)},
about(){return sec('À propos du persona','Une note par idée : un titre et une description.',`<div class="g2">${AK.map(([k,t,c,ph])=>`<div class="card"><h3>${t}</h3><div class="nts">${S.a[k].map((_,i)=>NOTE('a.'+k,i,ph,c)).join('')}</div>${add('a.'+k,'Ajouter une note')}</div>`).join('')}</div>`)},
conc(){return sec('Analyse des concurrents','Comparez le site audité à ses concurrents, critère par critère.',`<div class="card"><h3>Acteurs</h3><div class="g2">${L('Site audité',I('site.n','Nom du site'))}${L('URL',I('site.u','https://'))}</div>${S.conc.map((x,i)=>`<div class="row">${I(`conc.${i}.n`,'Concurrent '+(i+1))}${I(`conc.${i}.u`,'https://')}<button data-a="del:conc:${i}" aria-label="Supprimer">×</button></div>`).join('')}${add('conc','Ajouter un concurrent')}</div>`+tbl('cx','Ajouter un critère'))},
swot(){return sec('Matrice SWOT','Diagnostic interne (forces, faiblesses) et externe (opportunités, menaces).',`<div class="g2 mx">${Q('sw','s','Forces','var(--Success)')}${Q('sw','w','Faiblesses','var(--Danger)')}${Q('sw','o','Opportunités','var(--Primary)')}${Q('sw','t','Menaces','var(--DarkPrimary)')}</div>`)},
pestel(){return sec('Matrice PESTEL','Analyse de l’environnement macro.',`<div class="g3 mx">${[['po','Politique','var(--Primary)'],['ec','Économique','var(--DarkPrimary)'],['so','Social','var(--Success)'],['te','Technologique','var(--Tx)'],['en','Environnemental','var(--MinMuted)'],['le','Légal','var(--Danger)']].map(([k,t,c])=>Q('pe',k,t,c,6)).join('')}</div>`)},
porter(){const v=FP.map(f=>+(S.pt[f[0]]||{}).s).filter(n=>n>0),avg=v.length?v.reduce((a,b)=>a+b,0)/v.length:0,pct=Math.round(avg/3*100),lab=!v.length?'Pas encore noté':avg<1.67?'Pression faible':avg<2.34?'Pression modérée':'Pression forte';
return sec('Les 5 forces de Porter','Évalue l’intensité de chaque force (faible, modérée, forte) et consigne ton analyse.',`<div class="card"><h3>Intensité concurrentielle globale</h3><div class="sc"><span>${lab} <b>${pct} %</b></span><div class="bar"><i style="width:${pct}%"></i></div></div></div><div class="pfg">${FP.map(([k,t,h,c])=>`<div class="pf" style="--c:${c};grid-area:${k}"><span>${t}</span><small>${h}</small><select data-k="pt.${k}.s">${['—','Faible','Modérée','Forte'].map((l,i)=>`<option value="${i||''}"${String((S.pt[k]||{}).s||'')==String(i||'')?' selected':''}>${l}</option>`).join('')}</select>${T(`pt.${k}.x`,'Analyse : facteurs, exemples, preuves…',4)}</div>`).join('')}</div>`)},
cmp(){return sec('Tableau comparatif','Indicateurs stratégiques : offre, services, atouts, risques, part de marché.',tbl('cmp','Ajouter un indicateur'))},
seo(){return aud('seo','Audit SEO','Notez chaque critère de Absent à Excellent.')},
co(){return aud('co','Audit Contenu','Évaluez la qualité éditoriale.')},
ux(){return aud('ux','Audit UX','Évaluez l’expérience et l’interface.')},
map(){return sec('Éditeur de sitemap','Listez les pages. Les flèches ← → changent le niveau dans l’arborescence.',S.map.map((x,i)=>`<div class="row" style="margin-left:${x.d*24}px">${I(`map.${i}.t`,'Nom de la page')}<button data-a="ind:map:${i}:-1" aria-label="Remonter d’un niveau">←</button><button data-a="ind:map:${i}:1" aria-label="Descendre d’un niveau">→</button><button data-a="mv:map:${i}:-1" aria-label="Monter">↑</button><button data-a="mv:map:${i}:1" aria-label="Descendre">↓</button><button data-a="del:map:${i}" aria-label="Supprimer">×</button></div>`).join('')+add('map','Ajouter une page'))},
q(){return sec('Constructeur de questionnaires','Structurez votre recherche utilisateur.',S.q.map((x,i)=>`<div class="card"><div class="hd"><b>Question ${i+1}</b><span><button data-a="mv:q:${i}:-1" aria-label="Monter">↑</button> <button data-a="mv:q:${i}:1" aria-label="Descendre">↓</button> <button data-a="del:q:${i}">Supprimer</button></span></div>${L('Question',I(`q.${i}.t`,'Votre question…'))}${L('Type',`<select data-k="q.${i}.y">${QT.map(([v,l])=>`<option value="${v}"${(x.y||'text')==v?' selected':''}>${l}</option>`).join('')}</select>`)}${['one','multi'].includes(x.y)?L('Options (une par ligne)',T(`q.${i}.o`)):''}</div>`).join('')+add('q','Ajouter une question'))}
};
const GRP={dash:'dash',persona:'persona',about:'about',conc:'conc',swot:'conc',pestel:'conc',porter:'conc',cmp:'conc',seo:'conc',co:'conc',ux:'conc',map:'map',q:'map'};
const GN={dash:'Accueil',persona:'Analyse UX',about:'À propos',conc:'Benchmarking',map:'Outils annexes'};
const LBL={dash:'Tableau de bord',persona:'Persona',about:'À propos du persona',conc:'Concurrents',swot:'SWOT',pestel:'PESTEL',porter:'Les 5 forces de Porter',cmp:'Comparatif',seo:'Audit SEO',co:'Audit Contenu',ux:'Audit UX',map:'Sitemap',q:'Questionnaire'};
const META={dash:['Structure ton audit <em>UX</em>','Un tableau de bord pour piloter ton audit, du persona à la restitution.',['Audit','UX'],['persona','Commencer par le persona']],
persona:['Qui est ton <em>utilisateur</em> ?','Donne un visage, une bio et une personnalité à ton persona.',['Persona','UX']],
about:['Comprendre ses <em>motivations</em>','Intérêts, besoins, frustrations : tout ce qui guide ses décisions.',['Profil','Persona']],
conc:['Qui joue sur ton <em>terrain</em> ?','Compare ton site à ses concurrents, critère par critère.',['Bench','Rivaux']],
swot:['Où te situes-tu <em>vraiment</em> ?','Forces, faiblesses, opportunités et menaces en un coup d’œil.',['SWOT','Audit']],
pestel:['Le <em>contexte</em> qui t’entoure','Facteurs politiques, économiques, sociaux, technologiques, environnementaux et légaux.',['PESTEL','Macro']],
porter:['Analyse la <em>pression</em> du marché','Rivalité, nouveaux entrants, clients, fournisseurs et substituts : mesure l’intensité de chaque force.',['Porter','5 forces']],
cmp:['Mesure-toi à la <em>concurrence</em>','Offre, services, atouts, risques et part de marché dans un seul tableau.',['Compare','Marché']],
seo:['Ton audit <em>SEO</em>','Technique, performance et visibilité : note chaque critère et consigne tes constats.',['SEO','Audit']],
co:['Ton audit <em>contenu</em>','Stratégie éditoriale, pages clés et cohérence de marque.',['Contenu','Audit']],
ux:['Ton audit <em>UX</em>','Navigation, hiérarchie, mobile et accessibilité : évalue l’expérience.',['UX','Audit']],
map:['Dessine l’<em>arborescence</em>','Liste les pages du site et organise leurs niveaux.',['Sitemap','Map']],
q:['Pose les bonnes <em>questions</em>','Structure ton questionnaire de recherche utilisateur.',['Survey','UX']]};
let CID='dash';
const page=id=>{CID=id;return `<div class="Body">${R[id]()}</div>`};
const main=$('#main');let cur;
const fit=()=>document.querySelectorAll('textarea').forEach(t=>{t.style.height='auto';t.style.height=t.scrollHeight+'px'});
const show=(id,keep)=>{const y=scrollY;cur=S.cur=id;main.innerHTML=page(id);fit();document.querySelectorAll('.Tab').forEach(b=>b.classList.toggle('on',b.dataset.s==id));save();scrollTo(0,keep?y:0)};
const ADD=p=>p=='conc'?{id:uid(),n:'',u:''}:p=='cx'||p=='cmp'?{c:'',v:{}}:p=='map'?{t:'',d:0}:p=='q'?{t:'',y:'text',o:''}:/^(a|nt)\./.test(p)?{t:'',x:''}:{t:'',s:'',n:''};
async function exportPDF(){
const st=$('#st');st.textContent='Génération du PDF…';
try{
const M=50,PW=595,PH=842,BL='0.12 0.49 0.87',GR='0.24 0.24 0.24',pgs=[[]],cv=document.createElement('canvas').getContext('2d');let y=M;
const CP={'€':128,'‚':130,'ƒ':131,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159};
const enc=t=>{let o='';for(const ch of String(t)){const c=ch.codePointAt(0);o+=String.fromCharCode(CP[ch]||(c==9?32:(c>=32&&c<256&&!(c>126&&c<160)?c:63)))}return o.replace(/[\\()]/g,'\\$&')};
const wd=(t,sz,b)=>{cv.font=(b?'bold ':'')+sz+'px Helvetica,Arial,sans-serif';return cv.measureText(t).width};
const room=n=>{if(y+n>PH-M){pgs.push([]);y=M}};
const raw=s=>pgs[pgs.length-1].push(s);
const wrap=(t,sz,b,mw)=>{const out=[];String(t).split('\n').forEach(par=>{let l='';par.split(' ').forEach(w=>{const c=l?l+' '+w:w;if(wd(c,sz,b)<=mw||!l)l=c;else{out.push(l);l=w}while(wd(l,sz,b)>mw&&l.length>1){let i=l.length-1;while(i>1&&wd(l.slice(0,i),sz,b)>mw)i--;out.push(l.slice(0,i));l=l.slice(i)}});out.push(l)});return out};
const p=(t,o={})=>{t=String(t==null?'':t).trim();if(!t)return;const sz=o.sz||10,x=o.x||M,b=o.b?1:0;wrap(t,sz,b,PW-M-x).forEach(l=>{room(sz*1.6);y+=sz*1.25;raw(`BT /F${b?2:1} ${sz} Tf ${o.col||GR} rg 1 0 0 1 ${x} ${PH-y} Tm (${enc(l)}) Tj ET`);y+=sz*.25});y+=o.gap??4};
const h1=t=>{room(70);y+=14;p(t,{sz:17,b:1,col:BL,gap:0});raw(`${BL} RG 1 w ${M} ${PH-y-3} m ${PW-M} ${PH-y-3} l S`);y+=10};
const h2=t=>{y+=2;p(t,{sz:11.5,b:1,col:'0.11 0.11 0.12',gap:2})};
const tb=(head,rows)=>{if(!rows.length)return p('Aucune donnée saisie.');rows.forEach(r=>{p(r[0],{b:1,gap:1});r.slice(1).forEach((v,i)=>{if(String(v||'').trim())p(head[i+1]+' : '+v,{x:M+14,gap:1})});y+=6})};
const cs=COLS(),hd=['Critère',...cs.map(c=>c.n)],tab=k=>S[k].filter(r=>r.c||Object.values(r.v||{}).some(v=>String(v).trim())).map(r=>[r.c,...cs.map(c=>(r.v||{})[c.id]||'')]);
p('Audit UX',{sz:28,b:1,col:'0.11 0.11 0.12',gap:6});p('Édité le '+new Date().toLocaleDateString('fr-FR')+(S.site.n?' · '+S.site.n:''));
h1('Persona');p([S.p.nom,S.p.age,S.p.job].filter(Boolean).join(' · '),{b:1});p(S.p.bio);p(S.p.pers);y+=4;
SL.forEach((s,i)=>p(s[0]+' - '+s[1]+' : '+(S.p['s'+i]??50)+' % vers '+s[1],{gap:1}));
h1('À propos du persona');AK.forEach(([k,t])=>{const n=S.a[k].filter(z=>(z.t+z.x).trim());if(n.length){h2(t);n.forEach(z=>{p(z.t,{b:1,gap:0,x:M+10});p(z.x,{x:M+10})})}});
h1('Analyse des concurrents');tb(hd,tab('cx'));
h1('Tableau comparatif');tb(hd,tab('cmp'));
h1('Matrice SWOT');[['s','Forces'],['w','Faiblesses'],['o','Opportunités'],['t','Menaces']].forEach(([k,t])=>{if((S.sw[k]||'').trim()){h2(t);p(S.sw[k],{x:M+10})}});
h1('Matrice PESTEL');[['po','Politique'],['ec','Économique'],['so','Social'],['te','Technologique'],['en','Environnemental'],['le','Légal']].forEach(([k,t])=>{if((S.pe[k]||'').trim()){h2(t);p(S.pe[k],{x:M+10})}});
h1('Les 5 forces de Porter');FP.forEach(([k,t])=>{const f=S.pt[k]||{};if(f.s||(f.x||'').trim()){h2(t+(f.s?' - intensité '+['','faible','modérée','forte'][+f.s]:''));p(f.x,{x:M+10})}});
[['seo','Audit SEO'],['co','Audit Contenu'],['ux','Audit UX']].forEach(([k,t])=>{h1(t+' - score '+score(k)+' %');tb(['Critère','Note','Remarques'],S.au[k].map(x=>[x.t,x.s===''?'':SC[+x.s+1],x.n]));S.nt[k].filter(z=>(z.t+z.x).trim()).forEach(z=>{h2(z.t||'Constat');p(z.x,{x:M+10})})});
h1('Sitemap');S.map.forEach(x=>p((x.d?'- ':'')+x.t,{x:M+x.d*18,gap:1}));
h1('Questionnaire');if(!S.q.length)p('Aucune question.');
S.q.forEach((x,i)=>{p((i+1)+'. '+x.t,{b:1,gap:1});p('Type : '+(QT.find(t=>t[0]==(x.y||'text'))||['',''])[1]+(x.o?' · Options : '+x.o.split('\n').filter(Boolean).join(' / '):''),{x:M+14})});
let out='%PDF-1.4\n';const off=[],put=s=>{off.push(out.length);out+=off.length+' 0 obj\n'+s+'\nendobj\n'};
put('<</Type/Catalog/Pages 2 0 R>>');put('<</Type/Pages/Kids['+pgs.map((_,i)=>(6+2*i)+' 0 R').join(' ')+']/Count '+pgs.length+'>>');
put('<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>');put('<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>');
pgs.forEach((c,i)=>{const s=c.join('\n');put('<</Length '+s.length+'>>\nstream\n'+s+'\nendstream');put('<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+PW+' '+PH+']/Resources<</Font<</F1 3 0 R/F2 4 0 R>>>>/Contents '+(5+2*i)+' 0 R>>')});
const xr=out.length;out+='xref\n0 '+(off.length+1)+'\n0000000000 65535 f \n'+off.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<</Size '+(off.length+1)+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF';
const bytes=new Uint8Array(out.length);for(let i=0;i<out.length;i++)bytes[i]=out.charCodeAt(i);
const blob=new Blob([bytes],{type:'application/pdf'}),name='audit-ux-'+new Date().toISOString().slice(0,10)+'.pdf',dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
if(dl)await dl.save({filename:name,data:blob});
else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
st.textContent='PDF prêt'
}catch(e){if(e&&e.code=='declined'){st.textContent='Export annulé';return}console.error(e);st.textContent='Échec du PDF, impression…';print()}
}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if('p' in b.dataset)return exportPDF();if(b.dataset.s)return show(b.dataset.s);
if(!b.dataset.a)return;const[op,p,i,d]=b.dataset.a.split(':'),arr=get(p);
if(op=='add')arr.push(ADD(p));
else if(op=='del')arr.splice(+i,1);
else if(op=='mv'){const j=+i+ +d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]]}
else if(op=='tag')arr[i].x=(arr[i].x?arr[i].x+'\n':'')+d+' : ';
else if(op=='ind')arr[i].d=Math.max(0,Math.min(5,arr[i].d+ +d));
show(cur,1)});
document.addEventListener('input',e=>{const t=e.target,k=t.dataset.k;if(!k)return;set(k,t.value);save();
if(t.tagName=='TEXTAREA'){t.style.height='auto';t.style.height=t.scrollHeight+'px'}else if(t.tagName=='SELECT')show(cur,1)});

addEventListener('scroll',()=>{const h=document.documentElement;$('#rp').style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+'%'},{passive:true});
addEventListener('beforeprint',()=>{main.innerHTML=Object.keys(R).map(k=>`<section class="ps">${page(k)}</section>`).join('');main.querySelectorAll('details').forEach(d=>d.open=true);fit()});
addEventListener('afterprint',()=>show(cur,1));
$('#rst').onclick=e=>{const b=e.target;if(b.dataset.c){try{localStorage.removeItem(KEY)}catch(x){}S=DEF();delete b.dataset.c;b.textContent='Réinitialiser';show('dash')}else{b.dataset.c=1;b.textContent='Confirmer ?';setTimeout(()=>{delete b.dataset.c;b.textContent='Réinitialiser'},3000)}};
show(S.cur&&R[S.cur]?S.cur:'dash');