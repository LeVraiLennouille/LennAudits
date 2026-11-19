/* ---- Évolution : compare l'audit ouvert (« maintenant ») à un autre audit enregistré (« avant ») ---- */
(()=>{
const f0=x=>x==null?'—':typeof x=='number'?x.toLocaleString('fr-FR'):String(x);
const sc=(D,k)=>{const r=((D.au||{})[k]||[]).filter(x=>!x.h&&x.s!==''),sw=r.reduce((s,x)=>s+wt(x),0);return sw?Math.round(r.reduce((s,x)=>s+ +x.s*wt(x),0)/sw/3*100):null};
const num=v=>v===undefined||v===null||v===''||isNaN(+v)?null:+v;
const coh=D=>{const b=D.bp||{};let a=0,n=0;for(let i=0;i<6;i++){const p=num(b['s'+i]),w=num(b['w'+i]);if(p!=null&&w!=null){a+=Math.abs(p-w);n++}}return n?Math.round(100-a/n/5*100):null};
const sev=D=>{const v=[];for(let i=0;i<10;i++){const x=num((D.nl||{})['s'+i]);if(x!=null)v.push(x)}return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length*10)/10:null};
const cst=D=>['seo','co','ux'].reduce((s,k)=>s+((D.nt||{})[k]||[]).filter(z=>(z.x||'').trim()).length,0);
const act=D=>{const p=(D.pr||[]).filter(z=>(z.t||'').trim());return p.length?Math.round(p.filter(z=>z.st=='done').length/p.length*100):null};
/* dir : 1 = plus haut c'est mieux, -1 = plus bas c'est mieux, 0 = neutre */
const IND=[['Score SEO',D=>sc(D,'seo'),1,' pts'],['Score Contenu',D=>sc(D,'co'),1,' pts'],['Score UX',D=>sc(D,'ux'),1,' pts'],['Cohérence de la personnalité de marque (voulue / perçue)',coh,1,' pts'],['Gravité moyenne des problèmes (Nielsen, sur 4)',sev,-1,''],['Constats ouverts (SEO, Contenu, UX)',cst,0,''],['Actions terminées (% de la priorisation)',act,1,' pts']];
const ref=()=>{const id=S.evr;if(!id||id==IX.cur||!IX.list.some(a=>a.id==id))return null;return{id,name:(IX.list.find(a=>a.id==id)||{}).name||'Audit de référence',D:load(id)}};
function rows(){const r=ref();if(!r)return null;return IND.map(([l,f,dir,u])=>{const a=f(r.D),b=f(S),d=a!=null&&b!=null?Math.round((b-a)*10)/10:null;return{l,a,b,d,dir,u}})}
const dTxt=x=>x.d==null?'—':x.d==0?'Stable':(x.d>0?'+':'-')+Math.abs(x.d).toLocaleString('fr-FR')+x.u;
const dCls=x=>x.d==null||x.d==0||!x.dir?'':(x.d*x.dir>0?'EvUp':'EvDown');
function rad(a,b){const cx=160,cy=140,R0=88,A=[-90,30,150].map(x=>x*Math.PI/180),P=(i,r)=>[cx+Math.cos(A[i])*r,cy+Math.sin(A[i])*r],n1=p=>p.map(x=>x.toFixed(1)).join(','),pts=r=>A.map((_,i)=>n1(P(i,r))).join(' '),LB=['SEO','Contenu','UX'];
const poly=(v,cls)=>{const dp=v.map((x,i)=>P(i,R0*Math.max(.04,(x||0)/100)));return `<polygon class="${cls}" points="${dp.map(n1).join(' ')}"/>`};
return `<svg class="Radar" viewBox="-30 20 380 ${cy+R0*.5+62-20}" role="img" aria-label="Scores avant et maintenant : ${LB.map((l,i)=>l+' '+f0(a[i])+' puis '+f0(b[i])).join(', ')}">${[25,50,75,100].map(g=>`<polygon class="rg" points="${pts(R0*g/100)}"/>`).join('')}${A.map((_,i)=>{const p=P(i,R0);return `<line class="rg" x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}"/>`}).join('')}${poly(a,'rx rw sel')}${poly(b,'rd')}${LB.map((l,i)=>{const p=P(i,R0+22),co=Math.cos(A[i]);return `<text class="rl" x="${p[0].toFixed(1)}" y="${(p[1]+(i==0?-8:12)).toFixed(1)}" text-anchor="${Math.abs(co)<.25?'middle':co>0?'start':'end'}">${l}<tspan class="rv" x="${p[0].toFixed(1)}" dy="14">${f0(a[i])} → ${f0(b[i])}</tspan></text>`}).join('')}</svg>`}
function table(R2,r){return `<div class="scr"><table class="tb"><thead><tr><th>Indicateur</th><th>Avant · ${esc(r.name)}</th><th>Maintenant</th><th>Évolution</th></tr></thead><tbody>${R2.map(x=>`<tr><td>${esc(x.l)}</td><td>${f0(x.a)}</td><td>${f0(x.b)}</td><td class="${dCls(x)}"><b>${dTxt(x)}</b></td></tr>`).join('')}</tbody></table></div>`}
function page(){const others=IX.list.filter(a=>a.id!=IX.cur),r=ref(),R2=rows();
const head=`<div class="card"><h3>Audit de référence</h3>${others.length?L('Comparer à l’audit « avant »',`<select data-evs aria-label="Audit de référence"><option value="">— Choisir un audit —</option>${others.map(a=>`<option value="${esc(a.id)}"${a.id==S.evr?' selected':''}>${esc(a.name)}${a.u?' · modifié le '+new Date(a.u).toLocaleDateString('fr-FR'):''}</option>`).join('')}</select>`):'<p class="Empty">Il faut deux audits pour comparer : crée un nouvel audit ou importe une ancienne version .json depuis « Mes audits ».</p>'}</div>`;
if(!r)return sec('Évolution','Compare deux versions d’un même audit, par exemple avant et après une refonte.',head);
const a=['seo','co','ux'].map(k=>sc(r.D,k)),b=['seo','co','ux'].map(k=>sc(S,k));
return sec('Évolution','Compare deux versions d’un même audit, par exemple avant et après une refonte.',`${head}<div class="BpRes"><section class="card BpProfile"><h3>Scores d’audit</h3>${rad(a,b)}<p class="BpLeg"><span class="BpKey rw">Avant · ${esc(r.name)}</span><span class="BpKey rd">Maintenant</span></p></section><div>${table(R2,r)}</div></div>`)}
document.addEventListener('change',e=>{const t=e.target;if(!t.dataset||t.dataset.evs===undefined)return;S.evr=t.value;save();show(cur,1)});
function pdf(c){const{sect,empty,table,CW,tx,M,need}=c;sect('ev','Évolution');const r=ref(),R2=rows();if(!r){empty('Aucun audit de référence choisi.');return}
need(30);tx('Avant : '+r.name+' · Maintenant : '+(S.site&&S.site.n||'audit ouvert'),M,c.y+10,9.5,{b:1});c.y+=24;
table(['Indicateur','Avant','Maintenant','Évolution'],R2.map(x=>[x.l,f0(x.a),f0(x.b),dTxt(x)]),{w:[CW-290,80,80,130]})}
window.EVO={page,pdf,rows,ref,dTxt};
})();
