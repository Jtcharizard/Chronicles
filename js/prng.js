(function(g){'use strict';var C=g.COD=g.COD||{};
  function hash(s){var h=2166136261>>>0; s=String(s);for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function PRNG(seed,state){this.seed=String(seed||'dominion');this.state=state==null?hash(this.seed):state>>>0}
  PRNG.prototype.next=function(){this.state=(this.state+0x6D2B79F5)>>>0;var t=this.state;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};
  PRNG.prototype.int=function(a,b){return a+Math.floor(this.next()*(b-a+1))}; PRNG.prototype.pick=function(a){return a[this.int(0,a.length-1)]};
  PRNG.prototype.chance=function(p){return this.next()<p}; PRNG.prototype.range=function(a,b){return a+(b-a)*this.next()};
  PRNG.prototype.snapshot=function(){return {seed:this.seed,state:this.state>>>0}}; C.hash=hash;C.PRNG=PRNG;
})(window);
