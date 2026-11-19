/* ---- Analyse SEO automatique, 100 % locale (aucune clé API) ----
   Le code HTML de la page est lu puis analysé dans le navigateur (DOMParser, rien n'est exécuté) :
   title, meta, titres Hn, canonical, lang, Open Graph, données structurées, images, liens, mots-clés.
   Source de la page : lecture directe, sinon relais public (allorigins), sinon code source collé ou fichier .html.
   Vitesse (LCP/CLS) : mesure Lighthouse de Google via PageSpeed Insights, sans clé (facultatif).
   Chaque analyse produit des « findings » {k,s,n} (k = type de critère, s = note 0 à 3) et des constats {t,x}. */
(()=>{
const SK='lennaudits.seo',DEFP={psi:1,proxy:1,over:0,open:0};
const P=()=>{try{return{...DEFP,...JSON.parse(localStorage.getItem(SK)||'{}')}}catch(e){return{...DEFP}}};
const PW=o=>{try{localStorage.setItem(SK,JSON.stringify(o))}catch(e){}};
let ST={busy:0,log:[],sum:'',err:''};
const fr=(n,d=1)=>Number(n).toLocaleString('fr-FR',{maximumFractionDigits:d});
const norm=u=>{u=String(u||'').trim();if(!u)return'';if(!/^https?:\/\//i.test(u))u='https://'+u;try{return new URL(u).href}catch(e){return''}};
const msg=e=>e&&e.name=='AbortError'?'délai dépassé':e&&e.name=='TypeError'?'appel bloqué par le navigateur (CORS)':(e&&e.message)||'échec';
const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
/* Type de critère -> lignes de la grille SEO concernées (d'après leur intitulé, quel que soit le modèle choisi) */
const CM={speed:/vitesse|core web|lcp/i,title:/title|meta/i,h1:/titres|h1/i,robots:/sitemap|robots/i,alt:/\balt\b/i,links:/maillage/i,canonical:/canonical|dupliqu/i,schema:/donn.es structur/i,url:/architecture|\burl\b/i};
async function fj(u,o,ms){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms||60000);try{const r=await fetch(u,{...o,signal:c.signal});let tx='';try{tx=await r.text()}catch(e){}return{r,tx}}finally{clearTimeout(t)}}
const isHTML=t=>/<\s*(html|head|body|title)\b/i.test(t);
async function getHTML(url,proxy){
let why='lecture directe bloquée (CORS)';
try{const{r,tx}=await fj(url,{},30000);if(r.ok&&isHTML(tx))return tx;if(!r.ok)throw new Error('la page répond '+r.status)}catch(e){if(/répond/.test(e.message))throw e}
if(!proxy)throw new Error(why+' : active le relais ou colle le code source de la page');
try{const{r,tx}=await fj('https://api.allorigins.win/raw?url='+encodeURIComponent(url),{},40000);if(r.ok&&isHTML(tx))return tx;why='relais sans réponse exploitable'}catch(e){why='relais injoignable'}
throw new Error(why+' : colle le code source de la page (Ctrl+U) dans « Page non accessible ? »')}

/* ---- Analyse on-page (équivalent de l'audit Alyze) ---- */
const STOP=new Set('le la les un une des de du d l au aux et ou à a en dans sur pour par avec sans sous vers chez ce cet cette ces se sa son ses leur leurs nos vos notre votre mon ma mes ton ta tes qui que quoi dont où est sont être avoir ont été plus moins très aussi mais donc or ni car si ne pas non oui nous vous ils elles il elle je tu on y en the a an and or of to in on for with without by from at as is are was were be been it its this that these those you your we our they their not but if so do does can will'.split(' '));
const syl=w=>{const g=(w.match(/[aeiouyàâäéèêëîïôöùûüœæ]+/g)||[]).length;return Math.max(1,g-(g>1&&/[^aeiouyàâäéèêëîïôöùûüœæ](e|es|ent)$/.test(w)?1:0))};
function a11y(qa,m){
const named=e=>{const id=e.getAttribute('id');return e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')||e.getAttribute('title')||(id&&qa('label').some(l=>l.getAttribute('for')==id))||e.closest('label')};
const ctl=qa('input,select,textarea').filter(e=>!/^(hidden|submit|button|reset|image)$/i.test(e.getAttribute('type')||''));m.ctl=ctl.length;m.noLabel=ctl.filter(e=>!named(e)).length;
const bt=qa('button,[role=button],input[type=submit],input[type=button]');m.btn=bt.length;m.noBtn=bt.filter(e=>!(e.textContent.trim()||(e.querySelector('img[alt]')||{alt:''}).alt.trim()||e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')||e.getAttribute('title')||e.getAttribute('value'))).length;
m.main=qa('main,[role=main]').length;m.noIfr=qa('iframe').filter(f=>!f.getAttribute('title')).length;m.tabpos=qa('[tabindex]').filter(e=>+e.getAttribute('tabindex')>0).length}
function prose(d,m){
m.pr=null;const root=d.querySelector('main')||d.querySelector('article')||d.body;if(!root)return;
const c=root.cloneNode(true);c.querySelectorAll('script,style,noscript,template,svg,nav,header,footer,aside,form').forEach(e=>e.remove());
const els=[...c.querySelectorAll('p,li,blockquote,dd')].filter(e=>!e.querySelector('p,li,blockquote,dd')),SS=[];
els.forEach(e=>{(e.textContent.replace(/\s+/g,' ').trim().match(/[^.!?…]+[.!?…]*/g)||[]).forEach(t=>{t=t.trim();if((t.match(/[\p{L}\p{N}]+/gu)||[]).length>=3)SS.push(t)})});
const W=SS.flatMap(t=>t.toLowerCase().match(/[\p{L}][\p{L}'’-]*/gu)||[]);if(W.length<60||!SS.length)return;
const asl=W.length/SS.length,asw=W.reduce((a,w)=>a+syl(w),0)/W.length,long=SS.filter(t=>(t.match(/[\p{L}\p{N}]+/gu)||[]).length>25).length/SS.length;
const pas=SS.filter(t=>/\b(est|sont|était|étaient|sera|seront|serait|ont été|a été|été)\s+[\p{L}]+(é|ée|és|ées|i|ie|is|ies|u|ue|us|ues|it|ite|its|ites)\b/iu.test(t)).length/SS.length;
const tu=W.filter(w=>/^(tu|toi|ton|ta|tes)$/.test(w)).length,vous=W.filter(w=>/^(vous|votre|vos)$/.test(w)).length;
m.pr={words:W.length,sents:SS.length,asl,flesch:207-1.015*asl-73.6*asw,long,pas,tu,vous,reg:tu+vous<3?'':tu>vous*2?'tu':vous>tu*2?'vous':'mixte'}}
function analyze(html,pu){
const d=new DOMParser().parseFromString(html,'text/html'),qa=s=>[...d.querySelectorAll(s)],q=s=>d.querySelector(s);
const mt=(a,v)=>{const e=qa('meta').find(m=>(m.getAttribute(a)||'').toLowerCase()==v);return e?(e.getAttribute('content')||'').trim():null};
const base=pu||norm(S.site.u),m={url:pu||'',title:((q('title')||{}).textContent||'').replace(/\s+/g,' ').trim(),desc:mt('name','description'),robots:mt('name','robots'),viewport:mt('name','viewport'),lang:d.documentElement.getAttribute('lang')||'',ogt:mt('property','og:title'),ogi:mt('property','og:image'),tw:mt('name','twitter:card')};
const cl=qa('link').find(l=>/\bcanonical\b/i.test(l.getAttribute('rel')||''));m.canon=cl?(cl.getAttribute('href')||'').trim():'';
m.hn=qa('h1,h2,h3,h4,h5,h6').map(e=>({l:+e.tagName[1],t:e.textContent.replace(/\s+/g,' ').trim()}));
m.h1=m.hn.filter(h=>h.l==1);m.skip=m.hn.some((h,i)=>i&&h.l-m.hn[i-1].l>1);
m.ld=[];m.ldBad=0;qa('script[type="application/ld+json"]').forEach(s=>{try{const j=JSON.parse(s.textContent),a=Array.isArray(j)?j:j['@graph']?j['@graph']:[j];a.forEach(o=>o&&o['@type']&&m.ld.push([].concat(o['@type']).join('/')))}catch(e){m.ldBad++}});
m.micro=qa('[itemscope]').length;
const im=qa('img').filter(i=>!(+i.getAttribute('width')==1&&+i.getAttribute('height')==1));m.imgs=im.length;m.noAlt=im.filter(i=>!i.hasAttribute('alt')).length;
let host='';try{host=new URL(base).hostname.replace(/^www\./,'')}catch(e){}
m.int=0;m.ext=0;m.empty=0;m.nofollow=0;
qa('a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').trim();if(!h||/^(#|javascript:|mailto:|tel:)/i.test(h))return;let u;try{u=new URL(h,base||undefined)}catch(e){return}
if(!/^https?:$/.test(u.protocol))return;const inner=host&&u.hostname.replace(/^www\./,'')==host;inner?m.int++:m.ext++;
if(!(a.textContent.trim()||(a.querySelector('img[alt]')||{alt:''}).alt.trim()||a.getAttribute('aria-label')||a.getAttribute('title')))m.empty++;if(/nofollow/i.test(a.getAttribute('rel')||''))m.nofollow++});
const b=d.body?d.body.cloneNode(true):null;if(b)b.querySelectorAll('script,style,noscript,template,svg').forEach(e=>e.remove());
const tx=b?(()=>{const t=[],tw=d.createTreeWalker(b,4);while(tw.nextNode())t.push(tw.currentNode.nodeValue);return t.join(' ')})():'',ws=(tx.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]);m.words=ws.length;
const one={},two={};ws.forEach((w,i)=>{const ok=w.length>2&&!STOP.has(w)&&!/^\d+$/.test(w);if(ok){one[w]=(one[w]||0)+1;const n=ws[i+1];if(n&&n.length>2&&!STOP.has(n)&&!/^\d+$/.test(n)){const k=w+' '+n;two[k]=(two[k]||0)+1}}});
const top=(o,min)=>Object.entries(o).filter(e=>e[1]>=min).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,8);
const lw=s=>String(s||'').toLowerCase();
m.kw=top(one,2).map(([w,c])=>[w,c,+(c/Math.max(1,m.words)*100).toFixed(1),lw(m.title).includes(w),m.h1.some(h=>lw(h.t).includes(w)),lw(m.desc).includes(w)]);
m.bi=top(two,2).slice(0,5);a11y(qa,m);prose(d,m);return m}

function judge(m){
const F=[],B=[],ob=(t,x)=>B.push({t,x:'Observation : '+x+' (analyse automatique).'});
/* title + meta */
const tl=m.title.length,dl=(m.desc||'').length,tOK=tl>=30&&tl<=65,dOK=dl>=70&&dl<=160,tn=[];
tn.push(tl?'title '+tl+' car. '+(tOK?'✓':'✗'):'title absent');tn.push(m.desc==null||!dl?'meta description absente':'meta '+dl+' car. '+(dOK?'✓':'✗'));
F.push({k:'title',s:tOK&&dOK?3:(tl&&dl&&(tOK||dOK))?2:(tl||dl)?1:0,n:tn.join(' · ')});
if(!tl)ob('Balise title absente','aucune balise title');else if(tl>65)ob('Title trop long','title de '+tl+' caractères (65 conseillés)');else if(tl<30)ob('Title trop court','title de '+tl+' caractères (30 à 65 conseillés)');
if(m.desc==null||!dl)ob('Meta description absente','aucune meta description');else if(dl>160)ob('Meta description trop longue','meta description de '+dl+' caractères (160 conseillés)');else if(dl<70)ob('Meta description trop courte','meta description de '+dl+' caractères (70 à 160 conseillés)');
/* h1 */
const n1=m.h1.length;F.push({k:'h1',s:n1==1?(m.skip?2:3):n1>1?1:0,n:n1+' H1'+(m.skip?' · niveaux de titres sautés':'')+' · '+m.hn.length+' titre(s) au total'});
if(!n1)ob('Aucun H1','aucune balise H1 sur la page');else if(n1>1)ob('Plusieurs H1',n1+' balises H1 sur la page');if(m.skip)ob('Hiérarchie des titres incohérente','des niveaux de titres sont sautés (ex. H2 puis H4)');
/* images */
if(m.imgs){const r=m.noAlt/m.imgs;F.push({k:'alt',s:!m.noAlt?3:r<=.1?2:r<=.5?1:0,n:m.noAlt+' image(s) sans alt sur '+m.imgs});if(m.noAlt)ob('Images sans attribut alt',m.noAlt+' image(s) sur '+m.imgs+' sans attribut alt')}
/* liens */
const tot=m.int+m.ext;if(tot){const e=m.empty/tot;F.push({k:'links',s:!m.int?0:e>.2?1:m.int>=3&&!m.empty?3:2,n:m.int+' lien(s) interne(s), '+m.ext+' externe(s), '+m.empty+' sans texte'});if(m.empty)ob('Liens sans texte',m.empty+' lien(s) sans texte d’ancre');if(!m.int)ob('Aucun lien interne','la page ne contient aucun lien interne')}
/* canonical */
F.push({k:'canonical',s:m.canon?3:1,n:m.canon?'canonical : '+m.canon:'pas de balise canonical'});if(!m.canon)ob('Balise canonical absente','aucune balise link rel="canonical"');
/* données structurées */
F.push({k:'schema',s:m.ld.length?3:m.micro?2:0,n:m.ld.length?'JSON-LD : '+[...new Set(m.ld)].join(', '):m.micro?'microdonnées uniquement':'aucune donnée structurée'+(m.ldBad?' (JSON-LD invalide)':'')});
if(!m.ld.length&&!m.micro)ob('Aucune donnée structurée',m.ldBad?m.ldBad+' bloc(s) JSON-LD invalide(s)':'ni JSON-LD ni microdonnées');
/* url */
if(m.url){let u;try{u=new URL(m.url)}catch(e){}if(u){const seg=u.pathname.split('/').filter(Boolean),is=[];if(u.pathname.length>75)is.push('longue');if(/[A-Z]/.test(u.pathname))is.push('majuscules');if(u.search)is.push('paramètres');if(seg.length>4)is.push('profonde');if(/_/.test(u.pathname))is.push('underscores');
F.push({k:'url',s:is.length==0?3:is.length==1?2:is.length==2?1:0,n:'URL '+(is.length?is.join(', '):'courte et propre')})}}
/* autres constats */
if(m.robots&&/noindex/i.test(m.robots))ob('Page en noindex','meta robots : '+m.robots);
if(!m.ogt||!m.ogi)ob('Open Graph incomplet','og:title ou og:image manquant (partage sur les réseaux)');
return{F,B}}

/* ---- Accessibilité et mobile (grille UX) ---- */
function judgeUX(m){
const F=[],B=[],ob=(t,x)=>B.push({t,x:'Observation : '+x+' (analyse automatique).'});
const vp=m.viewport!=null&&/width\s*=\s*device-width/i.test(m.viewport);
/* [échec, titre, détail, constat déjà fait dans l'audit SEO (alors pas répété ici)] */
const crit=[[!m.lang,'Attribut lang absent','la balise html n’a pas d’attribut lang'],[m.noLabel>0,'Champs de formulaire sans libellé',m.noLabel+' champ(s) sans label ni aria-label'],[m.noBtn>0,'Boutons sans nom accessible',m.noBtn+' bouton(s) sans texte ni aria-label'],[m.empty>0,'Liens sans nom accessible',m.empty+' lien(s) sans texte d’ancre',1],[m.noAlt>0,'Images sans attribut alt',m.noAlt+' image(s) sans attribut alt',1]];
const minor=[[!m.main,'Aucun repère main','aucun élément main ni role="main"'],[m.noIfr>0,'iframe sans titre',m.noIfr+' iframe(s) sans attribut title'],[m.tabpos>0,'tabindex positif',m.tabpos+' élément(s) avec un tabindex positif (l’ordre de tabulation est modifié)'],[m.skip,'Hiérarchie des titres incohérente','des niveaux de titres sont sautés',1]];
const cf=crit.filter(c=>c[0]),mf=minor.filter(c=>c[0]);cf.concat(mf).forEach(c=>{if(!c[3])ob(c[1],c[2])});
const pts=cf.length*2+mf.length;
F.push({k:'a11y',s:pts<=1?2:pts<=4?1:0,n:(cf.length+mf.length)+' point(s) non conforme(s) sur '+(crit.length+minor.length)+' contrôles automatiques · contraste et clavier à vérifier à la main'});
if(m.ctl){const r=(m.ctl-m.noLabel)/m.ctl;F.push({k:'forms',s:r==1?2:r>=.7?1:0,n:(m.ctl-m.noLabel)+' champ(s) étiqueté(s) sur '+m.ctl})}
F.push({k:'mobile',s:vp?2:0,n:vp?'meta viewport adaptée (affichage réel à tester)':'meta viewport absente ou non adaptative'});
if(!vp)ob('Meta viewport absente','pas de meta viewport adaptée à l’affichage mobile');
return{F,B}}

/* ---- Lisibilité et ton (grille Contenu) ; reg = registre attendu d'après la personnalité de marque ('tu', 'vous' ou vide) ---- */
function judgeCO(m,reg){
const F=[],B=[],p=m.pr,ob=(t,x)=>B.push({t,x:'Observation : '+x+' (analyse automatique).'}),RL={tu:'tutoiement',vous:'vouvoiement',mixte:'mixte (tu et vous)'};
if(p){const a=p.flesch;F.push({k:'read',s:Math.max(0,(a>=60?3:a>=50?2:a>=30?1:0)-(p.long>.25?1:0)),n:'Flesch FR '+fr(a,0)+' · '+fr(p.asl)+' mots par phrase · '+fr(p.long*100,0)+' % de phrases de plus de 25 mots · voix passive ≈ '+fr(p.pas*100,0)+' %'});
if(a<50)ob('Texte difficile à lire','indice de lisibilité Flesch (français) de '+fr(a,0)+' (50 ou plus conseillé pour le web)');
if(p.long>.25)ob('Phrases trop longues',fr(p.long*100,0)+' % des phrases dépassent 25 mots');
if(p.reg){const ok=reg&&p.reg==reg,note='registre observé : '+RL[p.reg]+' ('+p.tu+' tu, '+p.vous+' vous)'+(reg?' · attendu d’après la personnalité de marque : '+RL[reg]:'');
F.push({k:'tone',s:reg?(ok?3:p.reg=='mixte'?2:1):null,n:note});
if(p.reg=='mixte')ob('Registre mixte','tutoiement et vouvoiement se mélangent ('+p.tu+' tu, '+p.vous+' vous)');
else if(reg&&!ok)ob('Registre en décalage avec la personnalité de marque','le texte utilise le '+RL[p.reg]+' alors que le profil de marque appelle le '+RL[reg])}}
const w=m.words;F.push({k:'depth',s:w>=1200?3:w>=600?2:w>=300?1:0,n:w+' mots sur la page analysée'});
if(m.kw&&m.kw[0]){const dn=m.kw[0][2];F.push({k:'kwbal',s:dn>4?0:dn>3?1:2,n:'mot le plus fréquent : « '+m.kw[0][0]+' » ('+fr(dn)+' %)'});if(dn>3.5)ob('Répétition excessive d’un mot-clé','« '+m.kw[0][0]+' » représente '+fr(dn)+' % des mots de la page')}
return{F,B}}

/* ---- Vitesse : Lighthouse via PageSpeed Insights (facultatif, sans clé) ---- */
async function psi(url){
const q=new URLSearchParams({url,strategy:'mobile',locale:'fr'});q.append('category','PERFORMANCE');
const{r,tx}=await fj('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?'+q,{},100000);let j=null;try{j=JSON.parse(tx)}catch(e){}
if(!r.ok||!j||!j.lighthouseResult)throw new Error((j&&j.error&&j.error.message)||'PageSpeed a répondu '+r.status+(r.status==429?' (quota partagé atteint, réessaie plus tard)':''));
const A=j.lighthouseResult.audits||{},C=j.lighthouseResult.categories||{},fm=(j.loadingExperience||{}).metrics||{},lf=fm.LARGEST_CONTENTFUL_PAINT_MS,cf=fm.CUMULATIVE_LAYOUT_SHIFT_SCORE;
const lcp=lf?lf.percentile:(A['largest-contentful-paint']||{}).numericValue,cls=cf?cf.percentile/100:(A['cumulative-layout-shift']||{}).numericValue,F=[];
if(typeof lcp=='number'){const a=lcp<=2500?3:lcp<=4000?2:1,b=typeof cls!='number'||cls<=.1?3:cls<=.25?2:1;F.push({k:'speed',s:Math.min(a,b),n:'LCP '+fr(lcp/1000)+' s'+(typeof cls=='number'?' · CLS '+fr(cls,2):'')+' ('+(lf?'données terrain':'mesure Lighthouse')+', mobile)'})}
return{F,stats:{lcp:typeof lcp=='number'?lcp:null,cls:typeof cls=='number'?cls:null,perf:C.performance&&typeof C.performance.score=='number'?Math.round(C.performance.score*100):null}}}

/* ---- robots.txt et sitemap.xml (lecture directe, possible si le site autorise le CORS, ex. GitHub Pages) ---- */
async function probe(u){try{const r=await fetch(u,{cache:'no-store'});return{st:r.status,tx:r.ok?(await r.text()).slice(0,20000):''}}catch(e){return{st:null,tx:''}}}
async function files(url){
const o=new URL(url).origin,rb=await probe(o+'/robots.txt'),sm=await probe(o+'/sitemap.xml'),F=[],B=[];
if(rb.st==null||sm.st==null)return{F,B,note:'inaccessibles depuis le navigateur (le site bloque le CORS)'};
const rOK=rb.st==200&&!/^\s*</.test(rb.tx),sOK=(sm.st==200&&/<(urlset|sitemapindex)/i.test(sm.tx))||(rOK&&/^\s*sitemap:/im.test(rb.tx));
F.push({k:'robots',s:rOK&&sOK?3:rOK||sOK?2:0,n:'robots.txt '+(rOK?'présent':'absent')+' · sitemap '+(sOK?'présent':'absent')});
if(!rOK)B.push({t:'robots.txt introuvable',x:'Observation : '+o+'/robots.txt ne renvoie pas de fichier valide (analyse automatique).'});
if(!sOK)B.push({t:'Sitemap introuvable',x:'Observation : aucun sitemap détecté (/sitemap.xml ou ligne Sitemap du robots.txt) (analyse automatique).'});
return{F,B,note:'robots.txt '+(rOK?'✓':'✗')+', sitemap '+(sOK?'✓':'✗')}}

/* ---- Application dans l'audit (une grille à la fois : SEO, UX, Contenu) ---- */
const CMG={seo:CM,ux:{a11y:/accessibilit/i,forms:/formulaire/i,mobile:/mobile|responsive/i},co:{read:/langage clair|jargon|lisibilit/i,tone:/\bton\b/i,depth:/profondeur/i,kwbal:/quilibre/i}};
function apply(g,F,B,over){
const rows=S.au[g],nt=S.nt[g],cm=CMG[g],G={};let filled=0,kept=0,add=0,dup=0;
F.forEach(f=>{if(!cm[f.k])return;const o=G[f.k]||(G[f.k]={s:null,n:[]});if(f.s!=null)o.s=o.s==null?f.s:Math.min(o.s,f.s);if(f.n)o.n.push(f.n)});
Object.keys(G).forEach(k=>{const o=G[k];if(o.s==null)return;rows.filter(x=>!x.h&&cm[k].test(String(x.t))).forEach(x=>{const man=x.s!=='',had=(x.n||'').trim(),au='Auto · '+o.n.join(' · ');
if(man&&!over){kept++;return}x.s=o.s;x.n=(man&&over)||!had?au:had+' — '+au;filled++})});
B.forEach(b=>{if(!nz(b.t))return;if(nt.some(z=>nz(z.t)==nz(b.t))){dup++;return}const e=nt.find(z=>!nz(z.t)&&!nz(z.x));if(e){e.t=b.t;e.x=b.x}else nt.push({t:b.t,x:b.x});add++});
return{filled,kept,add,dup}}
const sumTxt=r=>r.filled+' critère(s) rempli(s) dans les grilles SEO, UX et Contenu'+(r.kept?', '+r.kept+' conservé(s) car déjà noté(s)':'')+', '+r.add+' constat(s) ajouté(s)'+(r.dup?' ('+r.dup+' déjà présent(s))':'')+'.';
const keep=m=>({url:m.url,at:Date.now(),title:m.title,desc:m.desc||'',h1:m.h1.length,words:m.words,imgs:m.imgs,noAlt:m.noAlt,int:m.int,ext:m.ext,kw:m.kw,bi:m.bi,ld:[...new Set(m.ld)],pr:m.pr?{fl:Math.round(m.pr.flesch),long:Math.round(m.pr.long*100),reg:m.pr.reg}:null,nLab:m.noLabel,nBtn:m.noBtn});
const newG=()=>({seo:{F:[],B:[]},ux:{F:[],B:[]},co:{F:[],B:[]}});
const reg=()=>{try{return(window.BP&&BP.register&&BP.register())||''}catch(e){return''}};
function judgeAll(m,G){const r=judge(m),u=judgeUX(m),c=judgeCO(m,reg());G.seo.F.push(...r.F);G.seo.B.push(...r.B);G.ux.F.push(...u.F);G.ux.B.push(...u.B);G.co.F.push(...c.F);G.co.B.push(...c.B)}

/* ---- Exécution ---- */
const paint=()=>{const el=document.getElementById('saOut');if(el)el.innerHTML=outHTML();document.querySelectorAll('[data-sa=run],[data-sa=paste],[data-sa=cmp]').forEach(b=>b.disabled=!!ST.busy)};
async function step(name,fn){const e={n:name,st:'run',m:''};ST.log.push(e);paint();try{e.m=(await fn())||'';e.st='ok'}catch(x){e.st='ko';e.m=msg(x)}paint();return e.st=='ok'}
function finish(G,over){const t={filled:0,kept:0,add:0,dup:0};['seo','ux','co'].forEach(g=>{const r=apply(g,G[g].F,G[g].B,over);for(const k in t)t[k]+=r[k]});ST.sum=sumTxt(t);ST.busy=0;S.sa.at=Date.now();save();show(cur,1)}
const fresh=()=>{ST={busy:0,log:[],sum:'',err:''};S.sa=S.sa&&typeof S.sa=='object'?S.sa:{}};
async function run(){
if(ST.busy)return;const p=P(),url=norm(S.site.u);fresh();
if(!url){ST.err='Renseigne d’abord l’URL du site audité.';return paint()}
ST.busy=1;const G=newG();let html='';
const ok=await step('Lecture de la page',async()=>{html=await getHTML(url,p.proxy);return Math.round(html.length/1024)+' Ko'});
if(ok)await step('Analyse SEO, accessibilité et contenu',async()=>{const m=analyze(html,url);judgeAll(m,G);S.sa.page=keep(m);return m.words+' mots, '+m.hn.length+' titre(s), '+m.imgs+' image(s)'});
if(p.psi)await step('Vitesse (Lighthouse)',async()=>{const r=await psi(url);G.seo.F.push(...r.F);S.sa.psi={...r.stats,at:Date.now()};return r.stats.lcp!=null?'LCP '+fr(r.stats.lcp/1000)+' s':'mesure reçue'});
await step('robots.txt et sitemap.xml',async()=>{const r=await files(url);G.seo.F.push(...r.F);G.seo.B.push(...r.B);return r.note});
S.sa.url=url;finish(G,!!p.over)}
function runPaste(src){
if(ST.busy)return;const html=src!=null?src:(document.getElementById('saPaste')||{}).value||'';fresh();
if(!isHTML(html)){ST.err='Colle le code source complet de la page (Ctrl+U dans le navigateur).';return paint()}
const url=norm(S.site.u),m=analyze(html,url),G=newG();judgeAll(m,G);S.sa.page=keep(m);S.sa.url=url;
ST.log.push({n:'Analyse du code source fourni',st:'ok',m:m.words+' mots, '+m.hn.length+' titre(s), '+m.imgs+' image(s)'});finish(G,!!P().over)}
/* Comparaison : même analyse sur le site audité et chaque concurrent, écrite dans le tableau des concurrents */
async function compare(){
if(ST.busy)return;const p=P();fresh();
const cols=[{id:'me',n:S.site.n||'Site audité',u:norm(S.site.u)},...S.conc.map((x,i)=>({id:x.id,n:x.n||'Concurrent '+(i+1),u:norm(x.u)}))].filter(c=>c.u);
if(cols.length<2){ST.err='Ajoute au moins un concurrent avec son URL (section Concurrents).';return paint()}
ST.busy=1;const R2={};
for(const c of cols)await step(c.n,async()=>{const m=analyze(await getHTML(c.u,p.proxy),c.u);R2[c.id]=m;return m.words+' mots'});
const L2=[['Longueur du title (car.)',m=>m.title.length],['Longueur de la meta description (car.)',m=>(m.desc||'').length],['Nombre de H1',m=>m.h1.length],['Nombre de mots',m=>m.words],['Images sans alt',m=>m.noAlt+' / '+m.imgs],['Liens internes / externes',m=>m.int+' / '+m.ext],['Données structurées',m=>m.ld.length?[...new Set(m.ld)].join(', '):'aucune'],['Mot-clé principal',m=>m.kw[0]?m.kw[0][0]+' ('+m.kw[0][1]+')':'—']];
const ids=Object.keys(R2);let n=0;
if(ids.length){L2.forEach(([c,f])=>{let x=S.cx.find(z=>z.c==c);if(!x){x={c,v:{}};S.cx.push(x)}ids.forEach(id=>x.v[id]=String(f(R2[id])));n++});
ST.sum=n+' ligne(s) écrite(s) dans le tableau de l’analyse des concurrents ('+ids.length+' site(s) lu(s) sur '+cols.length+').'}else ST.err='Aucun site n’a pu être lu.';
ST.busy=0;save();show(cur,1)}

/* ---- Affichage ---- */
const tr=(t,n)=>{t=String(t||'');return t.length>n?t.slice(0,n-1).trimEnd()+'…':t};
function outHTML(){const s=S.sa||{},pg=s.page;let h='';
if(ST.err)h+=`<p class="AudErr" role="alert">${esc(ST.err)}</p>`;
if(ST.log.length)h+=`<ul class="SaLog" role="status">${ST.log.map(l=>`<li class="${l.st}"><b aria-hidden="true">${l.st=='run'?'…':l.st=='ok'?'✓':'✕'}</b><span>${esc(l.n)}${l.m?' — '+esc(l.m):''}</span></li>`).join('')}</ul>`;
if(ST.sum)h+=`<p class="AudInfo" role="status">${esc(ST.sum)}</p>`;
if(pg){const c=[['Title',(pg.title||'').length+' car.'],['Meta',pg.desc.length+' car.'],['H1',pg.h1],['Mots',pg.words],['Images sans alt',pg.noAlt+' / '+pg.imgs],['Liens int. / ext.',pg.int+' / '+pg.ext]];if(pg.pr){c.push(['Lisibilité (Flesch)',pg.pr.fl],['Phrases > 25 mots',pg.pr.long+' %']);if(pg.pr.reg)c.push(['Registre',{tu:'Tutoiement',vous:'Vouvoiement',mixte:'Mixte'}[pg.pr.reg]])}if(s.psi&&s.psi.lcp!=null)c.push(['LCP',fr(s.psi.lcp/1000)+' s']);if(s.psi&&s.psi.perf!=null)c.push(['Perf. Lighthouse',s.psi.perf+' / 100']);
h+=`<div class="SaStat">${c.map(([l,v])=>`<div><span>${l}</span><b>${esc(v)}</b></div>`).join('')}</div>`;
let host='';try{host=new URL(pg.url).hostname+new URL(pg.url).pathname.replace(/\/$/,'').split('/').filter(Boolean).map(x=>' › '+x).join('')}catch(e){}
h+=`<div class="SaSerp" aria-label="Aperçu dans les résultats Google"><small>${esc(host)}</small><b>${esc(tr(pg.title,60)||'(sans title)')}</b><p>${esc(tr(pg.desc,160)||'(sans meta description)')}</p></div>`;
if(pg.kw&&pg.kw.length)h+=`<div class="scr"><table class="tb"><thead><tr><th>Mot-clé</th><th>Occ.</th><th>Densité</th><th>Title</th><th>H1</th><th>Meta</th></tr></thead><tbody>${pg.kw.map(k=>`<tr><td>${esc(k[0])}</td><td>${k[1]}</td><td>${fr(k[2])} %</td><td>${k[3]?'✓':'—'}</td><td>${k[4]?'✓':'—'}</td><td>${k[5]?'✓':'—'}</td></tr>`).join('')}</tbody></table></div>`+(pg.bi&&pg.bi.length?`<p class="Hint">Expressions : ${pg.bi.map(b=>esc(b[0])+' ('+b[1]+')').join(' · ')}</p>`:'')}
return h}
function card(){const p=P();
const ck=(k,t,sm)=>`<label class="ck"><input type="checkbox" data-sa="opt:${k}"${p[k]?' checked':''}><span>${t}<small>${sm}</small></span></label>`;
return `<div class="card SaCard"><h3>Analyse automatique</h3><p class="Hint">La page est lue puis analysée directement dans ton navigateur, sans clé ni compte. Les critères pas encore notés des grilles SEO, UX (accessibilité, mobile) et Contenu (lisibilité, ton) sont remplis et les points à corriger ajoutés aux constats. Tes notes déjà saisies ne sont pas écrasées.</p>
<div class="SaRow">${L('URL du site audité',I('site.u','https://'))}<button class="BtnSolid" data-sa="run"${ST.busy?' disabled':''}>Analyser et remplir</button><button class="Ghost" data-sa="cmp"${ST.busy?' disabled':''}>Comparer aux concurrents</button></div>
<div class="SaSrc">${ck('psi','Mesurer la vitesse','LCP et CLS par Lighthouse (Google), sans clé')}${ck('proxy','Relais public si la lecture directe est bloquée','allorigins.win reçoit l’URL de la page analysée')}${ck('over','Remplacer aussi les notes déjà saisies','La note et la remarque du critère sont écrasées')}</div>
<details class="SaKeys"${p.open?' open':''}><summary>Page non accessible ? Colle son code source</summary><p class="Hint">Ouvre la page, Ctrl+U, tout sélectionner, copier. Utile pour une page en préproduction ou un site qui bloque la lecture.</p>
<label class="f"><span>Code source HTML</span><textarea id="saPaste" rows="4" placeholder="&lt;!DOCTYPE html&gt;…"></textarea></label><div class="Acts"><button class="Ghost" data-sa="paste">Analyser ce code</button><label class="Ghost SaFile">Ou choisir un fichier .html<input type="file" accept=".html,.htm,text/html" data-sa="file" hidden></label></div></details>
<div id="saOut">${outHTML()}</div>
<p class="Hint">Non reproduits : les volumes de recherche et la base de positions d’Haloscan, et le suivi de classement de SEO Hero, qui reposent sur des données collectées sur Google côté serveur.</p></div>`}

const seo0=R.seo;R.seo=()=>{const h=seo0(),i=h.indexOf('</div>')+6;return h.slice(0,i)+card()+h.slice(i)};
const mini=()=>`<div class="card SaCard SaMini"><h3>Remplir depuis l’analyse automatique</h3><p class="Hint">Lit la page du site audité et remplit les critères non notés des grilles SEO, UX et Contenu.</p><div class="SaRow">${L('URL du site audité',I('site.u','https://'))}<button class="BtnSolid" data-sa="run"${ST.busy?' disabled':''}>Analyser et remplir</button></div><div id="saOut">${outHTML()}</div></div>`;
['ux','co'].forEach(k=>{const f=R[k];R[k]=()=>{const h=f(),i=h.indexOf('</div>')+6;return h.slice(0,i)+mini()+h.slice(i)}});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-sa]');if(!b)return;const a=b.dataset.sa;if(a=='run')run();else if(a=='paste')runPaste();else if(a=='cmp')compare()});
document.addEventListener('change',e=>{const t=e.target,a=t.dataset&&t.dataset.sa;if(!a)return;
if(a=='file'){const f=t.files&&t.files[0];t.value='';if(f)f.text().then(x=>runPaste(x));return}
if(t.type=='checkbox'&&a.startsWith('opt:')){const p=P();p[a.slice(4)]=t.checked?1:0;PW(p)}});
document.addEventListener('toggle',e=>{if(e.target.classList&&e.target.classList.contains('SaKeys')){const p=P();p.open=e.target.open?1:0;PW(p)}},true);
if(['seo','ux','co'].includes(CID))show(CID,1);
})();
