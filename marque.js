/* ---- Personnalité de marque : 6 curseurs, radar, traits dominants, ton de voix ----
   Les réponses sont dans S.bp {s0..s5 : 0 à 5, x : observations}. Une valeur absente = curseur non évalué.
   0, 1, 2 penchent vers le pôle de gauche (l), 3, 4, 5 vers celui de droite (r) : pas de position neutre.
   Textes des profils : PR[axe][0 = pôle gauche, 1 = pôle droit] -> {h titre, a archétype, d description, p positionnement, t ton de voix}.
   Ce fichier est chargé avant script.js : tout ce qui vient de script.js (S, save, sec, L, T, esc…) n'est lu qu'à l'appel. */
(()=>{
const AX=[
{q:'La marque parle-t-elle avec le cœur ou avec la raison ?',l:'Chaleureux',r:'Rationnel'},
{q:'Prend-elle des risques ou joue-t-elle la carte de la confiance ?',l:'Audacieux',r:'Sûr'},
{q:'Casse-t-elle les codes ou suit-elle une structure maîtrisée ?',l:'Créatif',r:'Structuré'},
{q:'Est-elle plutôt détendue ou inspire-t-elle le sérieux ?',l:'Décontracté',r:'Sérieux'},
{q:'Est-elle tournée vers l’avenir ou ancrée dans les traditions ?',l:'Moderne',r:'Traditionnel'},
{q:'S’adresse-t-elle à tous ou à une audience privilégiée ?',l:'Populaire',r:'Exclusif'}];
const PR=[
[{h:'Ce lien humain que la marque crée naturellement',a:'Le Gardien',d:'La marque exprime une forte proximité humaine. Elle crée du lien, rassure, accompagne. Elle agit avec empathie et cherche à établir une relation de confiance sincère.',p:'Proximité, relationnel, fidélité. La marque occupe un espace où l’émotion et l’attention à l’autre sont centrales.',t:'Bienveillant, rassurant, engageant. Le ton est chaleureux, accessible, humain. On tutoie volontiers, on écoute, on répond avec attention. On évite les tournures froides ou impersonnelles.'},
 {h:'Une expertise qui éclaire les décisions',a:'Le Sage',d:'La marque s’appuie sur les faits, l’analyse et la pédagogie. Elle explique, démontre et aide à comprendre avant de convaincre.',p:'Expertise, clarté, fiabilité. La marque s’adresse à ceux qui veulent comprendre et décider en connaissance de cause.',t:'Précis, posé, pédagogique. On argumente, on cite des preuves, on structure les idées. On évite les effets d’annonce et le superflu.'}],
[{h:'Une prise de risque assumée',a:'Le Rebelle',d:'La marque bouscule les habitudes et prend position. Elle ose se démarquer, quitte à diviser, pour rester fidèle à ses convictions.',p:'Rupture, caractère, engagement. La marque séduit ceux qui veulent faire autrement et se reconnaissent dans une prise de parole forte.',t:'Direct, tranché, parfois provocateur. On affirme, on prend parti, on utilise des formules qui marquent. Le ton reste cohérent avec les convictions défendues.'},
 {h:'Une promesse simple et rassurante',a:'L’Innocent',d:'La marque mise sur la simplicité, l’honnêteté et la constance. Elle évite les paris risqués et rassure par des promesses claires et tenues.',p:'Confiance, simplicité, sécurité. La marque séduit ceux qui veulent un choix évident, sans mauvaise surprise.',t:'Clair, positif, sincère. On va droit au but, on rassure, on utilise des mots simples. On évite l’ironie, le jargon et les promesses excessives.'}],
[{h:'Une imagination qui marque les esprits',a:'Le Créateur',d:'La marque imagine, invente, joue avec les codes. Elle surprend, émerveille, et raconte des histoires uniques.',p:'Différenciation, imagination, originalité. La marque attire ceux qui cherchent du sens et de la singularité.',t:'Expressif, inspiré, narratif. On raconte, on met en scène, on embarque. Le ton varie selon l’univers exprimé.'},
 {h:'Une rigueur qui inspire l’ordre',a:'Le Souverain',d:'La marque suit un cadre précis : règles claires, cohérence visuelle et éditoriale, processus maîtrisés. Elle montre qu’elle garde le contrôle.',p:'Maîtrise, cohérence, leadership. La marque s’adresse à ceux qui recherchent la stabilité et une référence établie.',t:'Posé, assuré, ordonné. On s’exprime avec autorité, des phrases construites et un vocabulaire soigné. On évite les écarts de ton et l’improvisation.'}],
[{h:'Une légèreté qui désamorce',a:'Le Bouffon',d:'La marque ne se prend pas au sérieux. Elle utilise l’humour et l’autodérision pour créer de la complicité et rendre l’échange agréable.',p:'Convivialité, plaisir, spontanéité. La marque attire ceux qui veulent une relation légère, sans formalisme.',t:'Familier, joueur, spontané. On plaisante, on tutoie, on s’autorise des clins d’œil. L’humour reste au service du message, jamais contre le public.'},
 {h:'Un sérieux qui impose le respect',a:'Le Héros',d:'La marque affiche exigence et professionnalisme. Elle met en avant la performance, la discipline et la capacité à relever des défis importants.',p:'Exigence, performance, crédibilité. La marque s’adresse à ceux qui attendent des résultats et un haut niveau de professionnalisme.',t:'Net, déterminé, factuel. On parle avec assurance, on valorise les résultats et l’effort. On évite la familiarité et l’humour appuyé.'}],
[{h:'Un regard tourné vers demain',a:'L’Explorateur',d:'La marque cherche la nouveauté, explore de nouveaux usages et ouvre des voies. Elle se positionne en avance sur son marché.',p:'Innovation, découverte, liberté. La marque attire ceux qui veulent essayer, évoluer et ne pas rester en place.',t:'Dynamique, curieux, actuel. On invite à découvrir, on emploie un vocabulaire contemporain et on privilégie le mouvement. On évite les références trop datées.'},
 {h:'Un savoir-faire transmis, une aura qui dure',a:'Le Magicien',d:'La marque s’appuie sur son histoire, ses rituels et un savoir-faire transmis. Elle cultive une aura où le temps long devient un gage de valeur.',p:'Héritage, authenticité, transmission. La marque attire ceux qui recherchent des repères et des valeurs qui durent.',t:'Posé, soigné, évocateur. On raconte l’histoire, on valorise le geste et le temps. On évite les modes passagères et le vocabulaire trop tendance.'}],
[{h:'Une marque ouverte à tous',a:'Le Citoyen',d:'La marque parle à tout le monde, sans barrière d’entrée. Elle mise sur l’accessibilité, la simplicité d’usage et le sentiment d’appartenance.',p:'Accessibilité, proximité, appartenance. La marque occupe un espace où chacun peut se sentir à sa place, sans avoir à prouver quoi que ce soit.',t:'Simple, direct, inclusif. On emploie le « on » et le « nous », des mots du quotidien et des exemples concrets. On évite le jargon et tout ce qui crée de la distance.'},
 {h:'Un accès qui se mérite',a:'L’Amoureux',d:'La marque cultive la rareté, le raffinement et le désir. Elle s’adresse à un cercle choisi et soigne chaque détail de l’expérience.',p:'Rareté, raffinement, désir. La marque attire ceux qui veulent se distinguer et accordent de la valeur à l’intimité et au sur-mesure.',t:'Soigné, sensuel, mesuré. On suggère plutôt qu’on explique, on choisit chaque mot et on laisse de la place au silence. On évite les promotions criardes et la familiarité.'}]];
const LV=['Très ','Assez ','Plutôt ','Plutôt ','Assez ','Très '];
const val=i=>{const v=S.bp&&S.bp['s'+i];return v===undefined||v===null||v===''||isNaN(+v)?null:Math.max(0,Math.min(5,Math.round(+v)))};
const lvl=(i,v)=>v==null?'Non évalué':LV[v]+AX[i][v<3?'l':'r'].toLowerCase();
const n=()=>AX.filter((_,i)=>val(i)!=null).length;
/* Traits dominants : les deux curseurs les plus éloignés du centre (égalité : ordre des questions) */
const dom=()=>AX.map((_,i)=>({i,v:val(i)})).filter(x=>x.v!=null).map(x=>({...x,e:Math.abs(x.v-2.5)})).sort((a,b)=>b.e-a.e||a.i-b.i).slice(0,2).map(x=>({...PR[x.i][x.v<3?0:1],i:x.i,v:x.v,pole:AX[x.i][x.v<3?'l':'r']}));
/* Axe du radar : 1 = pôle de gauche au maximum, 0,1 = pôle de droite au maximum, 0,5 si non évalué */
const fr=i=>{const v=val(i);return v==null?.5:.1+.9*(5-v)/5};

function rad(){
const cx=160,cy=150,R0=92,A=AX.map((_,i)=>(-90+i*60)*Math.PI/180),P=(i,r)=>[cx+Math.cos(A[i])*r,cy+Math.sin(A[i])*r],n1=p=>p.map(x=>x.toFixed(1)).join(','),pts=r=>AX.map((_,i)=>n1(P(i,r))).join(' ');
const dp=AX.map((_,i)=>P(i,R0*fr(i))),top=cy-R0-40,bot=cy+R0*Math.max(...A.map(Math.sin))+54;
return `<svg class="Radar" viewBox="-50 ${top} 430 ${bot-top}" role="img" aria-label="Radar de personnalité de marque : ${AX.map((a,i)=>a.l+'/'+a.r+' '+lvl(i,val(i))).join(', ')}">${[25,50,75,100].map(g=>`<polygon class="rg" points="${pts(R0*g/100)}"/>`).join('')}${AX.map((_,i)=>{const p=P(i,R0);return `<line class="rg" x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}"/>`}).join('')}${n()?`<polygon class="rd" points="${dp.map(n1).join(' ')}"/>${dp.map(p=>`<circle class="rp" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4"/>`).join('')}`:''}${AX.map((a,i)=>{const p=P(i,R0+22),co=Math.cos(A[i]),si=Math.sin(A[i]),an=Math.abs(co)<.25?'middle':co>0?'start':'end';return `<text class="rl" x="${p[0].toFixed(1)}" y="${(p[1]+(si>.25?6:si<-.25?-14:4)).toFixed(1)}" text-anchor="${an}">${esc(a.l)}<tspan class="rv" x="${p[0].toFixed(1)}" dy="14">↔ ${esc(a.r)}</tspan></text>`}).join('')}</svg>`}

const res=()=>{const d=dom(),k=n();
return `<div class="BpRes"><section class="card BpProfile"><h3>Profil de marque</h3><p class="Hint">${d.length?'Traits dominants : '+d.map(x=>esc(x.pole)).join(' et '):'Place au moins un curseur pour faire apparaître le profil.'}</p>${rad()}<div class="Acts"><button class="Ghost" data-bpa="cst"${d.length?'':' disabled'}>Ajouter aux constats du contenu</button><button class="Ghost" data-bpa="reset"${k?'':' disabled'}>Réinitialiser les curseurs</button></div><p class="Hint">Bouge un curseur : le profil se met à jour.</p></section>
<div class="BpTr"><span class="Eyebrow">Traits dominants</span>${d.length?d.map(x=>`<article><h3>${esc(x.h)}</h3><p><b>Archétype :</b> ${esc(x.a)}</p><p class="mu">${esc(x.d)}</p><p><b>Positionnement :</b> <span class="mu">${esc(x.p)}</span></p><p><b>Ton de voix :</b> <span class="mu">${esc(x.t)}</span></p></article>`).join(''):'<p class="Empty">Les archétypes, le positionnement et le ton de voix s’affichent dès qu’un curseur est placé.</p>'}</div></div>`};

const card=(a,i)=>{const v=val(i),na=v==null,t=lvl(i,v);
return `<div class="card BpQ"><h3><small>${String(i+1).padStart(2,'0')}</small>${esc(a.q)}</h3><div class="BpRow"><span>${esc(a.l)}</span><div class="BpTrack"><i aria-hidden="true"></i><input type="range" min="0" max="5" step="1" value="${na?2:v}"${na?' class="na"':''} data-bp="${i}" aria-label="${esc(a.q)}" aria-valuetext="${esc(t)}"></div><span>${esc(a.r)}</span></div><p class="BpVal" id="bpv${i}">${esc(t)}</p></div>`};

function page(){return sec('Personnalité de marque','Situe la marque sur six curseurs : le radar, l’archétype et le ton de voix s’en déduisent.',`<div class="BpGrid">${AX.map(card).join('')}</div><div id="bpOut">${res()}</div><div class="card"><h3>Observations</h3>${L('Cohérence entre la personnalité perçue et celle que la marque vise',T('bp.x','Éléments du site qui confirment ou contredisent ce profil…',4))}</div>`)}

const setv=(i,v,t)=>{if(!S.bp||typeof S.bp!='object'||Array.isArray(S.bp))S.bp={};S.bp['s'+i]=v;save();if(t){t.classList.remove('na');t.setAttribute('aria-valuetext',lvl(i,v))}const l=document.getElementById('bpv'+i);if(l)l.textContent=lvl(i,v);const o=document.getElementById('bpOut');if(o)o.innerHTML=res()};
document.addEventListener('input',e=>{const t=e.target;if(t.type!='range'||!t.dataset||t.dataset.bp===undefined)return;setv(+t.dataset.bp,+t.value,t)});
/* Un clic sur le curseur sans le déplacer ne déclenche pas « input » : on valide la position affichée */
document.addEventListener('pointerup',e=>{const t=e.target;if(!t||t.type!='range'||!t.dataset||t.dataset.bp===undefined)return;const i=+t.dataset.bp;if(val(i)==null)setv(i,+t.value,t)});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-bpa]');if(!b)return;const a=b.dataset.bpa;
if(a=='reset'){AX.forEach((_,i)=>delete S.bp['s'+i]);save();return show(cur,1)}
if(a=='cst'){const d=dom();if(!d.length)return;const t='Personnalité de marque : '+d.map(x=>x.pole.toLowerCase()).join(' et '),
x='Observation : profil de marque évalué sur six curseurs. Traits dominants : '+d.map(z=>z.pole.toLowerCase()+' ('+z.a+')').join(' et ')+'. Ton de voix attendu : '+d[0].t.split('. ')[0].toLowerCase()+'.',nt=S.nt.co;
const had=nt.find(z=>nz(z.t)==nz(t));if(had)had.x=x;else{const e=nt.find(z=>!nz(z.t)&&!nz(z.x));if(e){e.t=t;e.x=x}else nt.push({t,x})}
save();b.textContent=had?'Constat mis à jour ✓':'Constat ajouté ✓';setTimeout(()=>{if(b.isConnected)b.textContent='Ajouter aux constats du contenu'},2500)}});

/* Section du PDF : c = helpers de exportPDF (y est lu et écrit via c.y) */
function pdf(c){const{sect,need,tx,txc,txr,blk,hg,box,circ,ln,poly,table,empty,gc,C,G,M,CW}=c;
sect('bp','Personnalité de marque');if(!n()){empty('Aucun curseur évalué.');return}
need(250);const R0=78,cx0=M+CW/2,cy0=c.y+R0+28,A=AX.map((_,i)=>(-90+i*60)*Math.PI/180),pt=(i,r)=>[cx0+Math.cos(A[i])*r,cy0+Math.sin(A[i])*r];
[.25,.5,.75,1].forEach(g=>{for(let i=0;i<6;i++){const a=pt(i,R0*g),b=pt((i+1)%6,R0*g);ln(a[0],a[1],b[0],b[1],C.bd,.7)}});
AX.forEach((_,i)=>{const p=pt(i,R0);ln(cx0,cy0,p[0],p[1],C.bd,.7)});
const dp=AX.map((_,i)=>pt(i,R0*fr(i)));poly(dp,C.soft);dp.forEach((p,i)=>{const q=dp[(i+1)%6];ln(p[0],p[1],q[0],q[1],C.bl,1.6)});dp.forEach((p,i)=>circ(p[0],p[1],3,{f:val(i)==null?C.lt:C.bl}));
AX.forEach((a,i)=>{const p=pt(i,R0+16),co=Math.cos(A[i]),si=Math.sin(A[i]),yy=p[1]+(si>.25?8:si<-.25?-12:3),put=(t,yb,sz,o)=>Math.abs(co)<.25?txc(t,p[0],yb,sz,o):co>0?tx(t,p[0]-4,yb,sz,o):txr(t,p[0]+4,yb,sz,o);put(a.l,yy,8.5,{b:1});put('/ '+a.r,yy+10,7.5,{c:C.lt})});
c.y+=R0*(1+Math.max(...A.map(Math.sin)))+72;
table(['Axe','Position'],AX.map((a,i)=>[a.l+' / '+a.r,lvl(i,val(i))]),{w:[230,CW-230]});
const d=dom();
if(d.length){const w=CW-40,B=d.map(x=>{const ps=[['Positionnement',x.p],['Ton de voix',x.t]],hh=hg(x.h,w,12,{b:1});return{x,ps,hh,H:16+hh+6+14+hg(x.d,w,9.2)+10+ps.reduce((s,q)=>s+14+hg(q[1],w,9.2)+8,0)+6}});
need(22+B[0].H+12);tx('TRAITS DOMINANTS',M,c.y+8,8,{b:1,c:C.bl});c.y+=22;
B.forEach(({x,ps,hh,H})=>{need(H+12);const t0=c.y;gc(M,t0,CW,H,G.vi,8);let yy=t0+16;yy+=blk(x.h,M+20,yy,w,12,{b:1})+6;tx('Archétype : '+x.a,M+20,yy+9,9,{b:1,c:C.db});yy+=14;yy+=blk(x.d,M+20,yy,w,9.2,{c:'0.2 0.2 0.2'})+10;
ps.forEach(q=>{tx(q[0],M+20,yy+8,8.5,{b:1,c:C.lt});yy+=14;yy+=blk(q[1],M+20,yy,w,9.2,{c:'0.2 0.2 0.2'})+8});c.y=t0+H+12})}
const ob=String((S.bp||{}).x||'').trim();
if(ob){const w=CW-40,h=34+hg(ob,w,9.2);need(h+12);gc(M,c.y,CW,h,G.ne,8);tx('Observations',M+20,c.y+20,10,{b:1});blk(ob,M+20,c.y+26,w,9.2,{c:'0.2 0.2 0.2'});c.y+=h+12}}

window.BP={n,page,pdf,dom,AX,PR};
})();
