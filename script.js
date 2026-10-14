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
async function exportPDF(keys){
keys=keys||ex();const on=k=>keys.includes(k),st=$('#st');st.textContent='Génération du PDF…';
try{
const PW=595,PH=842,M=44,CW=PW-2*M,TOP=64,BOT=PH-58,pgs=[[],[]],toc=[],anns=[],cv=document.createElement('canvas').getContext('2d');let cur=0,y=TOP;
const hx=h=>[0,2,4].map(i=>(parseInt(h.replace('#','').substr(i,2),16)/255).toFixed(3)).join(' ');
const C={bl:hx('207EDE'),db:hx('134C85'),ch:hx('1c1c1e'),mu:hx('555555'),lt:hx('8a8a90'),bd:hx('d9d3ca'),bg:hx('f8f6f2'),soft:hx('e3f0fc'),wh:'1 1 1',gr:hx('22c55e'),am:hx('f59e0b'),rd:hx('e53e3e')};
const G={bl:{t:hx('e6f1fc'),a:C.bl},am:{t:hx('fdf2dd'),a:hx('f59e0b')},vi:{t:hx('efe9fb'),a:hx('7c5cdb')},gr:{t:hx('e4f5ea'),a:C.gr},ne:{t:hx('f3f3f1'),a:hx('a8a8ad')}},AG={int:G.bl,soc:G.bl,obj:G.bl,inf:G.bl,ach:G.am,bes:G.am,mot:G.am,fru:G.am};
const CP={'€':128,'‚':130,'ƒ':131,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159};
const enc=t=>{let o='';for(const ch of String(t)){const c=ch.codePointAt(0);o+=String.fromCharCode(CP[ch]||(c==9?32:(c>=32&&c<256&&!(c>126&&c<160)?c:63)))}return o.replace(/[\\()]/g,'\\$&')};
const wd=(t,sz,b)=>{cv.font=(b?'bold ':'')+sz+'px Helvetica,Arial,sans-serif';return cv.measureText(t).width};
const wrap=(t,sz,b,mw)=>{const out=[];String(t==null?'':t).trim().split('\n').forEach(par=>{let l='';par.split(' ').forEach(w=>{const c=l?l+' '+w:w;if(wd(c,sz,b)<=mw||!l)l=c;else{out.push(l);l=w}while(wd(l,sz,b)>mw&&l.length>1){let i=l.length-1;while(i>1&&wd(l.slice(0,i),sz,b)>mw)i--;out.push(l.slice(0,i));l=l.slice(i)}});out.push(l)});return out.filter((l,i,a)=>l||a.length>1)};
const f=n=>(+n).toFixed(1),raw=s=>pgs[cur].push(s),np=()=>{pgs.push([]);cur=pgs.length-1;y=TOP},need=h=>{if(y+h>BOT)np()};
const rr=(x,t,w,h,r)=>{const X=x,Y=PH-t-h;if(!r)return`${f(X)} ${f(Y)} ${f(w)} ${f(h)} re`;const k=.5523*r,P=(...a)=>a.map(f).join(' ');return`${P(X+r,Y)} m ${P(X+w-r,Y)} l ${P(X+w-r+k,Y,X+w,Y+r-k,X+w,Y+r)} c ${P(X+w,Y+h-r)} l ${P(X+w,Y+h-r+k,X+w-r+k,Y+h,X+w-r,Y+h)} c ${P(X+r,Y+h)} l ${P(X+r-k,Y+h,X,Y+h-r+k,X,Y+h-r)} c ${P(X,Y+r)} l ${P(X,Y+r-k,X+r-k,Y,X+r,Y)} c h`};
const box=(x,t,w,h,o={})=>raw(`q ${o.a?'/G'+o.a+' gs ':''}${o.f?o.f+' rg ':''}${o.s?o.s+' RG '+(o.lw||.8)+' w ':''}${rr(x,t,w,h,o.r||0)} ${o.f&&o.s?'B':o.f?'f':'S'} Q`);
const circ=(cx,cy,r,o={})=>box(cx-r,cy-r,2*r,2*r,{...o,r});
const poly=(pts,c)=>raw(`q ${c} rg ${pts.map((q,i)=>f(q[0])+' '+f(PH-q[1])+(i?' l':' m')).join(' ')} h f Q`);
const ln=(x1,y1,x2,y2,c,lw)=>raw(`q ${c} RG ${lw||.8} w ${f(x1)} ${f(PH-y1)} m ${f(x2)} ${f(PH-y2)} l S Q`);
const tx=(t,x,yb,sz,o={})=>{const s=`BT /F${o.b?2:1} ${sz} Tf ${o.c||C.ch} rg 1 0 0 1 ${f(x)} ${f(PH-yb)} Tm (${enc(t)}) Tj ET`;raw(o.a?`q /G${o.a} gs ${s} Q`:s)};
const txr=(t,xr,yb,sz,o)=>tx(t,xr-wd(t,sz,(o||{}).b),yb,sz,o),txc=(t,xc,yb,sz,o)=>tx(t,xc-wd(t,sz,(o||{}).b)/2,yb,sz,o);
const hg=(t,w,sz,o={})=>String(t||'').trim()?wrap(t,sz,o.b,w).length*(o.lh||sz*1.4):0;
const blk=(t,x,t0,w,sz,o={})=>{const lh=o.lh||sz*1.4,L=String(t||'').trim()?wrap(t,sz,o.b,w):[];L.forEach((l,i)=>tx(l,x,t0+sz+i*lh,sz,o));return L.length*lh};
const pill=(t,xr,t0,col,sz=7.5)=>{const w=wd(t,sz,1)+14;box(xr-w,t0,w,15,{f:col,r:7.5});tx(t,xr-w+7,t0+10.5,sz,{b:1,c:C.wh});return w};
const sect=(k,t)=>{np();toc.push({t,pg:cur});const m=META[k];tx((GN[GRP[k]]||'').toUpperCase(),M,y+8,8,{b:1,c:C.bl});tx(t,M,y+34,23,{b:1});box(M,y+43,34,3,{f:C.bl,r:1.5});y+=60;if(m&&m[1])y+=blk(m[1],M,y,CW,9.5,{c:C.mu})+4;y+=16};
const empty=m=>{need(24);tx(m,M,y+12,9.5,{c:C.lt});y+=26};
const table=(head,rows,o={})=>{const n=head.length,fw=o.fw||Math.min(112,CW*.27),ws=o.w||[fw,...Array(n-1).fill((CW-fw)/(n-1))],xs=[M];ws.forEach((w,i)=>xs.push(xs[i]+w));
const hdr=()=>{box(M,y,CW,22,{f:C.bl,r:4});head.forEach((h,i)=>tx(h,xs[i]+8,y+14.5,8.5,{b:1,c:C.wh}));y+=22};need(70);hdr();
rows.forEach(r=>{const L=r.map((v,i)=>typeof v=='object'?[]:wrap(v,8.5,i==0,ws[i]-16)),h=Math.max(24,Math.max(...L.map(l=>l.length))*11.7+12);if(y+h>BOT){np();hdr()}
r.forEach((v,i)=>{if(i==0)box(xs[i],y,ws[i],h,{f:C.bg});else if(i==o.hl)box(xs[i],y,ws[i],h,{f:C.soft});
if(typeof v=='object'){for(let d=0;d<3;d++)circ(xs[i]+13+d*10,y+h/2,3.4,d<v.d?{f:v.c}:{s:C.bd,lw:1});tx(v.l,xs[i]+46,y+h/2+3,8,{b:1,c:v.d<0?C.lt:v.c})}
else if(!L[i].length)tx('—',xs[i]+8,y+14.5,8.5,{c:C.lt});else L[i].forEach((l,j)=>tx(l,xs[i]+8,y+14.5+j*11.7,8.5,{b:i==0}))});
ln(M,y+h,M+CW,y+h,C.bd,.6);y+=h});ln(M,y,M+CW,y,C.bd,.6);y+=18};
const notes=(items,g,cols=2)=>{const gap=12,w=(CW-gap*(cols-1))/cols;for(let i=0;i<items.length;i+=cols){const row=items.slice(i,i+cols),hs=row.map(z=>12+hg(z.t,w-28,10,{b:1})+(z.t&&z.x?4:0)+hg(z.x,w-28,8.8)+14),h=Math.max(...hs,52);need(h+gap);
row.forEach((z,j)=>{const x=M+j*(w+gap),q=z.g||g;if(q.s)box(x,y,w,h,{f:q.t,r:6});else gc(x,y,w,h,q,6);let yy=y+11;if(z.t)yy+=blk(z.t,x+14,yy,w-28,10,{b:1,c:q.s?C.wh:C.ch})+4;blk(z.x,x+14,yy,w-28,8.8,{c:q.s?'0.93 0.96 1':'0.17 0.17 0.17'})});y+=h+gap}};
const quad=(items,cols)=>{const gap=12,w=(CW-gap*(cols-1))/cols,bl=z=>String(z.x||'').split('\n').map(s=>s.trim()).filter(Boolean);for(let i=0;i<items.length;i+=cols){const row=items.slice(i,i+cols),hs=row.map(z=>38+(bl(z).reduce((a,l)=>a+hg(l,w-62,9)+4,0)||14)+8),h=Math.max(...hs,76);need(h+gap);
row.forEach((z,j)=>{const x=M+j*(w+gap);gc(x,y,w,h,z.g,8);txr(z.l,x+w-12,y+h-8,46,{b:1,c:z.g.a,a:2});tx(z.t,x+18,y+20,10.5,{b:1});if(z.tag)pill(z.tag,x+w-12,y+9,z.g.a,6.5);let yy=y+32;const b=bl(z);if(!b.length)tx('—',x+18,yy+9,9,{c:C.lt});b.forEach(l=>{circ(x+21,yy+6,1.8,{f:z.g.a});yy+=blk(l,x+30,yy,w-62,9)+4})});y+=h+gap}};
const gc=(x,t,w,h,g,r=10)=>{box(x,t,w,h,{f:g.a,r});box(x+4,t,w-4,h,{f:g.t,r})};
const bar=(pct,col,x,t0,w)=>{box(x,t0,w,7,{f:C.bd,r:3.5});if(pct>0)box(x,t0,Math.max(7,w*pct/100),7,{f:col,r:3.5})};
const nm=S.site.n||'',dt=new Date().toLocaleDateString('fr-FR');
cur=0;raw(`${C.ch} rg 0 0 ${PW} ${PH} re f`);circ(PW-60,170,260,{f:C.bl,a:2});circ(30,PH-80,220,{f:C.db,a:2});
let dp='';for(let gx=26;gx<PW;gx+=26)for(let gy=26;gy<PH;gy+=26)dp+=`${gx} ${gy} 1.3 1.3 re `;raw(`q /G3 gs 1 1 1 rg ${dp}f Q`);
raw(`q /G4 gs BT /F2 200 Tf 1 Tr ${C.bl} RG 1.3 w 1 0 0 1 ${PW-310} 48 Tm (UX) Tj ET Q`);
circ(M+16,64,16,{f:C.bl});txc('L',M+16,70,15,{b:1,c:C.wh});tx('Lennouille',M+42,69,13,{b:1,c:C.wh});
tx('RAPPORT D’AUDIT',M,300,9.5,{b:1,c:C.bl});tx('Audit',M,372,60,{b:1,c:C.wh});tx('UX',M+wd('Audit ',60,1),372,60,{b:1,c:C.bl});box(M,396,64,4,{f:C.bl,r:2});
let cy=438;if(nm){cy+=blk(nm,M,cy-16,380,22,{b:1,c:C.wh,lh:28})+4}if(S.site.u)tx(S.site.u,M,cy+4,11,{c:C.lt});
tx('Édité le '+dt,M,PH-70,10,{c:C.lt});tx(keys.length+' section'+(keys.length>1?'s':'')+' · Document de synthèse',M,PH-54,10,{c:C.lt});
y=TOP;
if(on('persona')){sect('persona','Persona');const pn=S.p.nom||'Persona',sb=[S.p.age,S.p.job].filter(Boolean).join(' · '),bio=hg(S.p.bio,CW-40,9.5),h=76+(bio?bio+16:4);need(h+12);
gc(M,y,CW,h,G.vi);circ(M+38,y+38,22,{f:G.vi.a});txc((pn[0]||'P').toUpperCase(),M+38,y+46,22,{b:1,c:C.wh});tx(pn,M+72,y+34,16,{b:1});if(sb)tx(sb,M+72,y+52,10,{c:C.mu});if(bio)blk(S.p.bio,M+20,y+78,CW-40,9.5,{c:'0.2 0.2 0.2'});y+=h+14;
const cw=(CW-40-28)/2,ph=hg(S.p.pers,CW-40,9.5),h2=48+4*40+(ph?ph+22:6);need(h2+12);gc(M,y,CW,h2,G.vi);tx('Personnalité',M+20,y+26,12,{b:1});
SL.forEach((s,i)=>{const x0=M+20+(i%2)*(cw+28),t0=y+44+Math.floor(i/2)*40,v=+(S.p['s'+i]??50);tx(s[0],x0,t0+8,8,{b:1});txr(s[1],x0+cw,t0+8,8,{b:1});ln(x0,t0+22,x0+cw,t0+22,C.ch,.8);box(x0+(cw-28)*v/100,t0+16,28,12,{f:G.vi.a,r:6})});
if(ph){tx('Précisions',M+20,y+h2-ph-14,8.5,{b:1,c:C.lt});blk(S.p.pers,M+20,y+h2-ph-8,CW-40,9.5,{c:'0.2 0.2 0.2'})}y+=h2+10}
if(on('about')){sect('about','À propos du persona');let any=0;AK.forEach(([k,t,c])=>{const it=S.a[k].filter(z=>(z.t+z.x).trim());if(!it.length)return;any=1;need(90);circ(M+5,y+8,4.5,{f:AG[k].a});tx(t,M+16,y+12,12,{b:1});y+=26;notes(it,AG[k]);y+=6});if(!any)empty('Aucune note saisie.')}
const cs=COLS(),hd=['Critère',...cs.map(c=>c.n)],tab=k=>S[k].filter(r=>r.c||Object.values(r.v||{}).some(v=>String(v).trim())).map(r=>[r.c,...cs.map(c=>(r.v||{})[c.id]||'')]);
if(on('conc')){sect('conc','Analyse des concurrents');notes([{t:(nm||'Site audité'),x:S.site.u||'Site audité',g:G.bl},...S.conc.filter(x=>x.n||x.u).map(x=>({t:x.n||'Concurrent',x:x.u||''}))],G.ne,2);y+=4;tab('cx').length?table(hd,tab('cx'),{hl:1}):empty('Aucun critère renseigné.')}
if(on('cmp')){sect('cmp','Tableau comparatif');tab('cmp').length?table(hd,tab('cmp'),{hl:1}):empty('Aucun indicateur renseigné.')}
if(on('swot')){sect('swot','Matrice SWOT');quad([{t:'Forces',x:S.sw.s,g:G.bl,l:'S',tag:'Interne'},{t:'Faiblesses',x:S.sw.w,g:G.bl,l:'W',tag:'Interne'},{t:'Opportunités',x:S.sw.o,g:G.am,l:'O',tag:'Externe'},{t:'Menaces',x:S.sw.t,g:G.am,l:'T',tag:'Externe'}],2)}
if(on('pestel')){sect('pestel','Matrice PESTEL');quad([['po','Politique',G.bl,'P'],['ec','Économique',G.bl,'E'],['so','Social',G.am,'S'],['te','Technologique',G.am,'T'],['en','Environnemental',G.gr,'E'],['le','Légal',G.gr,'L']].map(([k,t,g,l])=>({t,x:S.pe[k],g,l})),2)}
const PC={ne:C.bl,fo:C.db,rv:C.rd,cl:C.gr,su:C.lt},IV=[['',''],['Faible',C.gr],['Modérée',C.am],['Forte',C.rd]],pv=FP.map(q=>+(S.pt[q[0]]||{}).s).filter(n=>n>0),pav=pv.length?pv.reduce((a,b)=>a+b,0)/pv.length:0,ppc=Math.round(pav/3*100),pcol=pav<1.67?C.gr:pav<2.34?C.am:C.rd;
if(on('porter')){sect('porter','Les 5 forces de Porter');
need(60);box(M,y,CW,50,{f:C.bg,r:10});tx('Intensité concurrentielle globale',M+18,y+22,10,{b:1});txr(pv.length?ppc+' %':'Non noté',M+CW-18,y+23,13,{b:1,c:pv.length?pcol:C.lt});bar(ppc,pcol,M+18,y+32,CW-36);y+=70;
const gx=30,gy=32,bw=(CW-2*gx)/3,F=Object.fromEntries(FP.map(q=>[q[0],q])),lv=k=>+(S.pt[k]||{}).s||0,ic=k=>[C.lt,C.gr,C.am,C.rd][lv(k)],SN={ne:'Nouveaux entrants',fo:'Fournisseurs',rv:'Rivalité',cl:'Clients',su:'Substituts'};
const prep=k=>{const d=S.pt[k]||{},cen=k=='rv',w=bw-26,tl=wrap(F[k][1],cen?10.5:9.5,1,w),mx=cen?9:6,xl=String(d.x||'').trim()?wrap(d.x,8.5,0,w):[],ls=xl.length>mx?[...xl.slice(0,mx-1),xl[mx-1].slice(0,-3)+'…']:xl;return{k,tl,ls,cen,h:Math.max(cen?100:80,30+tl.length*(cen?14:13)+22+ls.length*11.9+12)}};
const card=(b,x,t0,h)=>{const k=b.k;gc(x,t0,bw,h,G.bl,8);if(b.cen)box(x,t0,bw,h,{s:C.bl,lw:1.4,r:8});let yy=t0+12;b.tl.forEach(l=>{tx(l,x+14,yy+(b.cen?10:9),b.cen?10.5:9.5,{b:1});yy+=b.cen?14:13});yy+=5;
for(let i=0;i<3;i++)box(x+14+i*21,yy,18,5,{f:i<lv(k)?ic(k):C.bd,r:2.5});tx(lv(k)?IV[lv(k)][0]:'Non noté',x+82,yy+5.5,7.5,{b:1,c:lv(k)?ic(k):C.lt});yy+=14;b.ls.forEach((l,i)=>tx(l,x+14,yy+9+i*11.9,8.5,{c:'0.2 0.2 0.2'}))};
const B=Object.fromEntries(['ne','fo','rv','cl','su'].map(k=>[k,prep(k)])),h1=B.ne.h,h2=Math.max(B.fo.h,B.rv.h,B.cl.h),h3=B.su.h;
const xc=M+bw+gx,xr=M+2*(bw+gx),y1=y,y2=y1+h1+gy,y3=y2+h2+gy,cx=xc+bw/2,ym=y2+h2/2;
card(B.ne,xc,y1,h1);card(B.fo,M,y2,h2);card(B.rv,xc,y2,h2);card(B.cl,xr,y2,h2);card(B.su,xc,y3,h3);
const ar=(x1,t1,x2,t2,k)=>{const L=lv(k),c=ic(k),lw=1.6+L*1.3,hl=11,hw=5+L*1.6,d=Math.hypot(x2-x1,t2-t1),ux=(x2-x1)/d,uy=(t2-t1)/d,bx=x2-ux*hl,by=t2-uy*hl;ln(x1,t1,bx,by,c,lw);poly([[x2,t2],[bx-uy*hw,by+ux*hw],[bx+uy*hw,by-ux*hw]],c)};
ar(cx,y1+h1+4,cx,y2-4,'ne');ar(M+bw+4,ym,xc-4,ym,'fo');ar(xr-4,ym,xc+bw+4,ym,'cl');ar(cx,y3-4,cx,y2+h2+4,'su');
y=y3+h3+24;need(70);
[1,2,3].forEach((l,i)=>{const lx=M+i*92;circ(lx+4,y+6,4,{f:IV[l][1]});tx(IV[l][0],lx+13,y+9.5,8.5,{b:1})});tx('La couleur et l’épaisseur des flèches indiquent l’intensité de la pression exercée sur la rivalité.',M,y+27,7.5,{c:C.lt});y+=46;
const rt=['ne','fo','rv','cl','su'].filter(lv);if(rt.length){const mx=Math.max(...rt.map(lv)),mn=Math.min(...rt.map(lv)),nm2=v=>rt.filter(k=>lv(k)==v).map(k=>SN[k]).join(', '),L=['Pression la plus forte : '+nm2(mx)+' ('+IV[mx][0].toLowerCase()+').'];if(mx!=mn)L.push('Pression la plus faible : '+nm2(mn)+' ('+IV[mn][0].toLowerCase()+').');const hh=36+L.length*14;need(hh+6);gc(M,y,CW,hh,G.bl);tx('À retenir',M+18,y+22,10,{b:1});L.forEach((l,i)=>tx(l,M+18,y+40+i*14,9,{c:'0.2 0.2 0.2'}));y+=hh+6}}
['seo','co','ux'].forEach(k=>{if(!on(k))return;sect(k,LBL[k]);const rt=S.au[k].some(x=>x.s!==''),sc=score(k),col=!rt?C.lt:sc>=67?C.gr:sc>=34?C.am:C.rd;need(66);box(M,y,CW,54,{f:C.bg,r:10});tx(rt?sc+' %':'—',M+18,y+37,26,{b:1,c:col});tx(rt?'Score global de l’audit':'Audit non évalué',M+110,y+24,10,{b:1});bar(sc,col,M+110,y+32,CW-130);y+=70;
table(['Critère','Note','Remarques'],S.au[k].map(x=>[x.t,x.s===''?{d:-1,l:'Non noté',c:C.lt}:{d:+x.s,l:SC[+x.s+1],c:[C.rd,C.am,C.bl,C.gr][+x.s]},x.n]),{w:[210,100,CW-310]});
const it=S.nt[k].filter(z=>(z.x||'').trim());if(it.length){need(60);tx('Constats',M,y+12,12,{b:1});y+=26;notes(it,{t:C.bl,a:C.bl,s:1})}});
if(on('map')){sect('map','Sitemap');S.map.forEach(x=>{need(22);const d=x.d,x0=M+d*24;if(d){ln(x0-14,y-1,x0-14,y+9,C.bd,1);ln(x0-14,y+9,x0-3,y+9,C.bd,1)}circ(x0+4,y+9,d?3.3:4.8,d>1?{s:C.bl,lw:1.2}:{f:d?C.db:C.bl});tx(x.t||'Page sans titre',x0+16,y+13,d?9.5:11,{b:!d});y+=21})}
if(on('q')){sect('q','Questionnaire');if(!S.q.length)empty('Aucune question.');S.q.forEach((x,i)=>{const ty=x.y||'text',ops=String(x.o||'').split('\n').map(s=>s.trim()).filter(Boolean),lbl=(QT.find(t=>t[0]==ty)||['',''])[1],tw=wd(lbl,7.5,1)+14,hq=hg(x.t||'Question',CW-60-tw-20,10.5,{b:1}),ext=ty=='one'||ty=='multi'?ops.length*16+4:ty=='scale'?34:ty=='yn'?28:34,h=22+Math.max(hq,15)+ext+12;need(h+10);
box(M,y,CW,h,{f:C.bg,r:10});circ(M+22,y+24,11,{f:C.bl});txc(String(i+1),M+22,y+28,10,{b:1,c:C.wh});const q0=blk(x.t||'Question',M+42,y+13,CW-60-tw-20,10.5,{b:1});pill(lbl,M+CW-14,y+14,C.db);let yy=y+22+Math.max(q0,15)+4;
if(ty=='one'||ty=='multi')ops.forEach(o=>{ty=='one'?circ(M+50,yy+6,4,{s:C.lt,lw:1}):box(M+46,yy+2,8,8,{s:C.lt,lw:1,r:1.5});tx(o,M+62,yy+9,9);yy+=16});
else if(ty=='scale'){for(let n=1;n<=5;n++){circ(M+56+(n-1)*44,yy+12,10,{f:C.wh,s:C.bd,lw:1});txc(String(n),M+56+(n-1)*44,yy+15.5,9,{b:1,c:C.mu})}}
else if(ty=='yn'){['Oui','Non'].forEach((l,j)=>{box(M+46+j*70,yy+2,58,20,{f:C.wh,s:C.bd,lw:1,r:10});txc(l,M+75+j*70,yy+15.5,9,{b:1,c:C.mu})})}
else{box(M+46,yy+2,CW-70,24,{f:C.wh,s:C.bd,lw:1,r:6});tx('Réponse libre',M+56,yy+18,8.5,{c:C.lt})}y+=h+10})}
cur=1;y=TOP;tx('SOMMAIRE',M,y+8,8,{b:1,c:C.bl});tx('Au programme',M,y+34,23,{b:1});box(M,y+43,34,3,{f:C.bl,r:1.5});tx('Clique sur un titre pour accéder directement à la section.',M,y+66,9,{c:C.lt});y+=96;
toc.forEach((e,i)=>{anns.push({p:1,r:[M,PH-y-20,M+CW,PH-y+2],d:e.pg});tx(String(i+1).padStart(2,'0'),M,y+13,10,{b:1,c:C.bl});tx(e.t,M+30,y+13,10.5,{b:1});const tw=wd(e.t,10.5,1);raw(`q [1 3] 0 d ${C.bd} RG .8 w ${f(M+30+tw+8)} ${f(PH-y-10)} m ${f(M+CW-26)} ${f(PH-y-10)} l S Q`);txr(String(e.pg+1),M+CW,y+13,10,{c:C.mu});y+=26});
const mt=[];['seo','co','ux'].forEach(k=>on(k)&&S.au[k].some(x=>x.s!=='')&&mt.push([LBL[k],score(k),score(k)>=67?C.gr:score(k)>=34?C.am:C.rd]));if(on('porter')&&pv.length)mt.push(['Pression concurrentielle',ppc,pcol]);
if(mt.length){y+=22;tx('EN BREF',M,y+8,8,{b:1,c:C.bl});y+=22;const g=12,w=(CW-g*(mt.length-1))/mt.length;mt.forEach(([l,v,c],i)=>{const x=M+i*(w+g);box(x,y,w,78,{f:C.bg,r:10});tx(v+' %',x+14,y+34,22,{b:1,c});tx(l,x+14,y+52,8.5,{c:C.mu});bar(v,c,x+14,y+62,w-28)});y+=92}
const cnt=[on('conc')&&S.conc.filter(x=>x.n).length&&S.conc.filter(x=>x.n).length+' concurrent(s) analysé(s)',on('about')&&AK.reduce((n,x)=>n+S.a[x[0]].filter(z=>(z.t+z.x).trim()).length,0)+' note(s) sur le persona',on('map')&&S.map.length+' page(s) au sitemap',on('q')&&S.q.length&&S.q.length+' question(s)'].filter(Boolean);if(cnt.length){y+=(mt.length?0:20);blk(cnt.join('   ·   '),M,y,CW,9,{c:C.mu})}
const N=pgs.length;for(let i=1;i<N;i++){cur=i;tx('LENNOUILLE',M,32,7.5,{b:1,c:C.bl});txr('Audit UX'+(nm?' · '+nm:''),PW-M,32,7.5,{c:C.lt});ln(M,40,PW-M,40,C.bd,.6);ln(M,PH-42,PW-M,PH-42,C.bd,.6);tx('Rapport d’audit UX · '+dt,M,PH-28,7.5,{c:C.lt});txr('Page '+(i+1)+' / '+N,PW-M,PH-28,7.5,{b:1,c:C.mu});if(i>1){const sw=wd('Sommaire',7.5,1);txc('Sommaire',PW/2,PH-28,7.5,{b:1,c:C.bl});anns.push({p:i,r:[PW/2-sw/2-4,22,PW/2+sw/2+4,36],d:1})}}
let out='%PDF-1.4\n';const off=[],put=s=>{off.push(out.length);out+=off.length+' 0 obj\n'+s+'\nendobj\n'};
put('<</Type/Catalog/Pages 2 0 R>>');put('<</Type/Pages/Kids['+pgs.map((_,i)=>(6+2*i)+' 0 R').join(' ')+']/Count '+N+'>>');
put('<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>');put('<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>');
const AI=pgs.map(()=>[]);anns.forEach((a,j)=>AI[a.p].push(j));
pgs.forEach((c,i)=>{const s=c.join('\n');put('<</Length '+s.length+'>>\nstream\n'+s+'\nendstream');put('<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+PW+' '+PH+']/Resources<</Font<</F1 3 0 R/F2 4 0 R>>/ExtGState<</G1<</ca .09>>/G2<</ca .13>>/G3<</ca .07/CA .07>>/G4<</CA .28>>>>>>/Contents '+(5+2*i)+' 0 R'+(AI[i].length?'/Annots['+AI[i].map(j=>(2*N+5+j)+' 0 R').join(' ')+']':'')+'>>')});anns.forEach(a=>put('<</Type/Annot/Subtype/Link/Rect['+a.r.map(f).join(' ')+']/Border[0 0 0]/Dest['+(6+2*a.d)+' 0 R/XYZ 0 '+PH+' 0]>>'));
const xr=out.length;out+='xref\n0 '+(off.length+1)+'\n0000000000 65535 f \n'+off.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<</Size '+(off.length+1)+'/Root 1 0 R/Info<</Title(Audit UX)/Producer(Lennouille)>>>>\nstartxref\n'+xr+'\n%%EOF';
const bytes=new Uint8Array(out.length);for(let i=0;i<out.length;i++)bytes[i]=out.charCodeAt(i);
const blob=new Blob([bytes],{type:'application/pdf'}),name='audit-ux-'+new Date().toISOString().slice(0,10)+'.pdf',dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
if(dl)await dl.save({filename:name,data:blob});
else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
st.textContent='PDF prêt'
}catch(e){if(e&&e.code=='declined'){st.textContent='Export annulé';return}console.error(e);st.textContent='Échec du PDF, impression…';print()}
}
const EXG=[['Analyse UX',[['persona','Persona']]],['À propos',[['about','À propos du persona']]],['Benchmarking',[['conc','Concurrents'],['cmp','Tableau comparatif'],['swot','Matrice SWOT'],['pestel','Matrice PESTEL'],['porter','Les 5 forces de Porter'],['seo','Audit SEO'],['co','Audit Contenu'],['ux','Audit UX']]],['Outils annexes',[['map','Sitemap'],['q','Questionnaire']]]];
const EXK=EXG.flatMap(g=>g[1].map(x=>x[0])),ex=()=>S.ex||(S.ex=EXK.slice());
function exSync(){const n=ex().length;$('#exn').textContent=n+' / '+EXK.length+' sélectionné(s)';$('#exall').textContent=n==EXK.length?'Tout désélectionner':'Tout sélectionner';$('#exgo').disabled=!n}
function exRender(){const e=ex();$('#exb').innerHTML=EXG.map(([g,l])=>`<fieldset><legend>${g}</legend>${l.map(([k,t])=>`<label class="ck"><input type="checkbox" data-e="${k}"${e.includes(k)?' checked':''}><span>${t}</span></label>`).join('')}</fieldset>`).join('');exSync()}
function openEx(){exRender();$('#ex').showModal()}
function exAct(a){const d=$('#ex');if(a=='cancel')return d.close();if(a=='all'){S.ex=ex().length==EXK.length?[]:EXK.slice();save();return exRender()}if(a=='go'){const k=ex().slice();d.close();exportPDF(k)}}
document.addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.e;if(!k)return;const a=ex();S.ex=e.target.checked?(a.includes(k)?a:[...a,k]):a.filter(x=>x!=k);save();exSync()});
$('#ex').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if('p' in b.dataset)return openEx();if(b.dataset.x)return exAct(b.dataset.x);if(b.dataset.s)return show(b.dataset.s);
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