// Hydrate en cascade l'ensemble des objets

var hydrater = {

  // Parcours les propriété de l'objet et lui assigne les attributes
  hydrate: function(datass){
    var datas = JSON.parse(JSON.stringify(datass))
    for(var key in datas) {
      if(!Array.isArray(datas[key])) {
        this[key] = datas[key]
      }
    }

    //Gère l'hydratation des constructeur enfants
    if( this.createChilds ){
      this.createChilds(datas);
    }
  },

  // Instancie des constructeur enfants et appelle leurs méthode hydrate
  hydrateChilds: function(datas, key, constructor) {
    var childs = []; 
    var child;
    if(datas){
      for(var i = 0; i<datas.length; i++){
        child = new constructor();
        if(child.hydrate) {
          child.hydrate(datas[i]);
          childs.push(child)
        }
      }
      this[key] = childs
    }
  }

}

export default hydrater;