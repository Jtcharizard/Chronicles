(function (g) {
  'use strict';

  var C = g.COD;

  function storageError(error) {
    if (error && (error.name === 'QuotaExceededError' || error.code === 22)) {
      return new Error('Não há espaço local suficiente. Exclua saves antigos ou exporte a crônica.');
    }
    return new Error('Não foi possível salvar a crônica neste navegador.');
  }

  C.SaveSystem = {
    prefix: 'cod-save-',

    validate: function (data) {
      if (!data || data.version !== C.VERSION || !data.world || !Array.isArray(data.civs) || !data.prng) {
        throw new Error('Formato de save inválido ou incompatível.');
      }
      return true;
    },

    pack: function (sim) {
      return sim.serialize();
    },

    encode: function (sim, name) {
      var data = this.pack(sim);
      if (name) data.saveName = name;
      return JSON.stringify(data);
    },

    load: function (data) {
      this.validate(data);
      // Importadores normalmente já fornecem um objeto recém-criado por JSON.parse.
      // A cópia também protege chamadas programáticas contra referências partilhadas.
      return new C.Simulation(null, JSON.parse(JSON.stringify(data)));
    },

    save: function (sim, name, key) {
      var saveKey = key || this.prefix + Date.now();
      var json = this.encode(sim, name || ('Crônica ' + sim.year));
      try {
        localStorage.setItem(saveKey, json);
      } catch (error) {
        throw storageError(error);
      }
      return { key: saveKey, bytes: json.length * 2 };
    },

    saveAsync: function (sim, name, key) {
      var self = this;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            resolve(self.save(sim, name, key));
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    },

    list: function () {
      var saves = [];
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf(this.prefix) !== 0) continue;
        try {
          var data = JSON.parse(localStorage.getItem(key));
          saves.push({ key: key, name: data.saveName || 'Crônica', seed: data.seed, year: data.year });
        } catch (error) {
          // Uma entrada corrompida não deve impedir a abertura da lista.
        }
      }
      return saves.sort(function (a, b) { return b.year - a.year; });
    },

    remove: function (key) {
      localStorage.removeItem(key);
    },

    export: function (sim) {
      var json = this.encode(sim);
      var blob = new Blob([json], { type: 'application/json' });
      var anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = 'chronicles-' + sim.seed + '-' + sim.year + '.json';
      anchor.click();
      setTimeout(function () { URL.revokeObjectURL(anchor.href); }, 500);
      return json.length * 2;
    }
  };
})(window);
