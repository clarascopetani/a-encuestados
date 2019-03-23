/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.borrarTodasPreguntas = new Evento(this);
  this.votoSumado = new Evento(this);
  this.preguntaEditada = new Evento(this)
  
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var data = this.preguntas.length;
    if (data === 0){
      return -1
    } else {
      for (var i = 0 ; i < this.preguntas.length; ++i){
        data = this.preguntas[i].id;
       }
      return data
    }
  },

  obtenerPosicionArr: function(id) {
    var index = this.preguntas.findIndex(x => x.id === id);
    return index
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPreguntaID: function(idPregunta) {
    var index = this.obtenerPosicionArr(idPregunta)
    this.preguntas.splice(index, 1)
    this.preguntaBorrada.notificar();
  },

  borrarTodo: function() {
    this.preguntas.splice(0, this.preguntas.length)
    this.borrarTodasPreguntas.notificar();
  },

  editarPregunta: function(idPregunta, txtPregunta) {
    var index = this.obtenerPosicionArr(idPregunta)
    this.preguntas[index].textoPregunta = txtPregunta
    this.preguntaEditada.notificar();
  },

  sumarVoto: function(idPregunta, idRespuesta) {
    var index = this.obtenerPosicionArr(idPregunta)
    this.preguntas[index].cantidadPorRespuesta[idRespuesta].cantidad +=1
    this.votoSumado.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },

};





// SI QUIERO BUSCAR EL VALOR MAXIMO

// obtenerUltimoId: function() {
//   var ids = []
//   for(i = 0; i < this.preguntas.length ; i++){
//     ids.push(this.preguntas[i].id)
//   }
//   var ultimo = getMaxOfArray(ids)
//   return ultimo
// },
// --------
// function getMaxOfArray(arr) {
//   var mayor = Math.max.apply(null, arr);
//   if(mayor == -Infinity || mayor == NaN){
//     return 0
//   } else {
//     return mayor
//   }
// }

