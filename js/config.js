(function (g) {
  'use strict';
  var C = g.COD = g.COD || {};
  C.VERSION = '1.0.0';
  C.CONFIG = {
    sizes: { small: [42, 28], medium: [60, 40], large: [78, 52] },
    terrains: {
      ocean: { name: 'Oceano', color: '#17394a', move: 99, food: 0 },
      coast: { name: 'Costa', color: '#2e7180', move: 2, food: 2 },
      plains: { name: 'Planície', color: '#78865a', move: 1, food: 3 },
      forest: { name: 'Floresta', color: '#365d48', move: 2, food: 2 },
      hill: { name: 'Colina', color: '#776c52', move: 2, food: 1 },
      mountain: { name: 'Montanha', color: '#656a6e', move: 4, food: 0 },
      desert: { name: 'Deserto', color: '#a78b59', move: 2, food: .4 },
      swamp: { name: 'Pântano', color: '#466052', move: 3, food: 1.5 },
      tundra: { name: 'Tundra', color: '#879393', move: 2, food: .7 }
    },
    colors: ['#d65b5b','#4d91d7','#d6ad45','#55ad79','#a774d1','#d77e42','#4db6b0','#cf6e9c','#8ba84e','#6879d0','#c79a6b','#55a1c2'],
    resources: ['food','wood','stone','iron','gold','knowledge','energy'],
    buildings: {
      farm: { name:'Fazenda', cost:{wood:18,stone:6}, bonus:'food' },
      lumbermill:{name:'Serraria',cost:{wood:8,stone:10},bonus:'wood'}, quarry:{name:'Pedreira',cost:{wood:12},bonus:'stone'},
      mine:{name:'Mina',cost:{wood:16,stone:12},bonus:'iron'}, market:{name:'Mercado',cost:{wood:15,stone:15},bonus:'gold'},
      library:{name:'Biblioteca',cost:{wood:12,stone:22},bonus:'knowledge'}, barracks:{name:'Quartel',cost:{wood:20,stone:20},bonus:'military'},
      wall:{name:'Muralha',cost:{stone:42},bonus:'defense'}, road:{name:'Estrada',cost:{stone:12,gold:6},bonus:'movement'}
    },
    units:{ militia:{attack:1,defense:1,cost:5}, infantry:{attack:2,defense:2,cost:10}, archers:{attack:2.5,defense:1.5,cost:14}, cavalry:{attack:4,defense:2,cost:22}, advanced:{attack:6,defense:5,cost:35} }
  };
})(window);
