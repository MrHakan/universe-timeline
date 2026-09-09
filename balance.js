(()=>{
const E=window.UTEngine;if(!E)return;const baseStep=E.stepMonth;
function rr(w){w.balanceRng=(Math.imul(w.balanceRng||((w.rngState^0x9e3779b9)>>>0),1103515245)+12345)>>>0;return w.balanceRng/4294967296}
function strategicTick(w){const fs=E.aliveFactions(w),t=w.settings.temperament||'balanced',warScale={calm:.55,balanced:1,volatile:1.55,chaos:2.3}[t]||1;
for(let i=0;i<fs.length;i++)for(let j=i+1;j<fs.length;j++){const a=fs[i],b=fs[j];if(E.atWar(w,a.id,b.id))continue;const isBorder=E.ownerSystems(w,a.id).some(s=>s.neighbors.some(n=>w.systems[n]?.owner===b.id));let relation=E.relation(w,a.id,b.id);
if(isBorder){const friction=.35+((a.trait==='Militarist'||b.trait==='Militarist')?.3:0);E.adjustRelation(w,a.id,b.id,-friction);relation=E.relation(w,a.id,b.id);if(!E.allied(w,a.id,b.id)&&relation<-34&&rr(w)<.018*warScale)E.startWar(w,a.id,b.id)}
if(!isBorder&&relation>20)E.adjustRelation(w,a.id,b.id,.08);
if(!E.allied(w,a.id,b.id)&&relation>28&&rr(w)<.012){w.alliances.push({id:w.alliances.length,members:[a.id,b.id],name:`${a.short}–${b.short} Pact`,formed:w.year+w.month/12,active:true});E.adjustRelation(w,a.id,b.id,10);E.pushEvent(w,'diplomacy',`${a.name} and ${b.name} form the ${a.short}–${b.short} Pact`,'Shared interests mature into a formal defensive and economic alliance.',3,[a.id,b.id])}
}}
E.stepMonth=function(w){baseStep(w);if(w.tick%3===0)strategicTick(w);return w};E.advance=function(w,n=1){for(let i=0;i<n;i++)E.stepMonth(w);return w};
})();
