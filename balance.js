(()=>{
const E=window.UTEngine;if(!E)return;const baseStep=E.stepMonth;
function strategicTick(w){const fs=E.aliveFactions(w);const temperament=w.settings.temperament||'balanced',warScale={calm:.55,balanced:1,volatile:1.55,chaos:2.3}[temperament]||1;
for(let i=0;i<fs.length;i++)for(let j=i+1;j<fs.length;j++){const a=fs[i],b=fs[j];if(E.atWar(w,a.id,b.id))continue;const border=E.ownerSystems(w,a.id).some(s=>s.neighbors.some(n=>w.systems[n]?.owner===b.id));let r=E.relation(w,a.id,b.id);
if(border){const friction=.35+(a.trait==='Militarist'||b.trait==='Militarist'?.3:0);E.adjustRelation(w,a.id,b.id,-friction);r=E.relation(w,a.id,b.id);if(!E.allied(w,a.id,b.id)&&r<-34&&Math.random()<.018*warScale)E.startWar(w,a.id,b.id)}
if(!border&&r>20)E.adjustRelation(w,a.id,b.id,.08);
if(!E.allied(w,a.id,b.id)&&r>52&&Math.random()<.008){w.alliances.push({id:w.alliances.length,members:[a.id,b.id],name:`${a.short}–${b.short} Pact`,formed:w.year+w.month/12,active:true});E.adjustRelation(w,a.id,b.id,10);E.pushEvent(w,'diplomacy',`${a.name} and ${b.name} form the ${a.short}–${b.short} Pact`,'Shared interests mature into a formal defensive and economic alliance.',3,[a.id,b.id])}
}}
E.stepMonth=function(w){baseStep(w);if(w.tick%3===0)strategicTick(w);return w};E.advance=function(w,n=1){for(let i=0;i<n;i++)E.stepMonth(w);return w};
})();
