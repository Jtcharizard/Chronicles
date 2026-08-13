(function(g){'use strict';var C=g.COD;
 C.Technology={tree:[
 {id:'agriculture',name:'Agricultura',era:1,cost:70,req:[],effect:'food',description:'+20% alimento'}, {id:'construction',name:'Construção',era:1,cost:80,req:[],effect:'build',description:'Construções 15% mais baratas'},
 {id:'trade',name:'Comércio',era:1,cost:90,req:[],effect:'gold',description:'+25% ouro'}, {id:'science',name:'Ciência',era:2,cost:140,req:['construction'],effect:'science',description:'+30% conhecimento'},
 {id:'metallurgy',name:'Metalurgia',era:2,cost:150,req:['construction'],effect:'attack',description:'Infantaria e +15% ataque'}, {id:'military',name:'Organização Militar',era:2,cost:170,req:['metallurgy'],effect:'army',description:'Arqueiros, exércitos eficientes'},
 {id:'fortification',name:'Fortificação',era:2,cost:160,req:['construction'],effect:'defense',description:'+30% defesa urbana'}, {id:'energy',name:'Energia',era:3,cost:280,req:['science','metallurgy'],effect:'energy',description:'Energia e unidades avançadas'}],
 available:function(c){return this.tree.filter(function(t){return c.technologies.indexOf(t.id)<0&&t.req.every(function(q){return c.technologies.indexOf(q)>=0})})},
 tick:function(sim,c){var avail=this.available(c);if(!c.research&&avail.length){avail.sort(function(a,b){var va=(a.effect==='food' && c.stocks.food<150 ? 80 : 0)+(a.effect==='attack' ? c.leader.aggression*.5 : 0)+(a.effect==='science' ? c.leader.science*.7 : 0)+sim.rng.next()*10;var vb=(b.effect==='food' && c.stocks.food<150 ? 80 : 0)+(b.effect==='attack' ? c.leader.aggression*.5 : 0)+(b.effect==='science' ? c.leader.science*.7 : 0)+sim.rng.next()*10;return vb-va});c.research={id:avail[0].id,progress:0}}
  if(c.research){var t=this.tree.find(function(z){return z.id===c.research.id});c.research.progress+=(c.production.knowledge||1);if(c.research.progress>=t.cost){c.technologies.push(t.id);c.research=null;sim.log('technology',[c.id],c.name+' descobriu '+t.name+'.',2)}}}
 };
})(window);
