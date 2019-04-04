/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntasCargadas = new Evento(this)
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.borrarTodasPreguntas = new Evento(this);
  this.votoSumado = new Evento(this);
  this.preguntaEditada = new Evento(this)
};

Modelo.prototype = {

  cargarPreguntas: function(preguntasGuardadas) {
    this.preguntas = preguntasGuardadas
    this.preguntasCargadas.notificar();
  },

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
  agregarPregunta: function(pregunta, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': pregunta, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPreguntaID: function(idPregunta) {
    var index = this.obtenerPosicionArr(idPregunta)
    this.preguntas.splice(index, 1)
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borrarTodo: function() {
    this.preguntas.splice(0, this.preguntas.length)
    this.guardar();
    this.borrarTodasPreguntas.notificar();
  },

  editarPregunta: function(keyPregunta, txtPregunta, respuestas) {
    //console.log(keyPregunta, txtPregunta, respuestas)
    this.preguntas[keyPregunta].textoPregunta = txtPregunta
    this.preguntas[keyPregunta].cantidadPorRespuesta = respuestas
    this.guardar();
    this.preguntaEditada.notificar();
  },

  sumarVoto: function(idPregunta,respuestaSeleccionada) {
    var keyPregunta = this.preguntas.findIndex(x => x.id == idPregunta)
    var keyRespuesta = this.preguntas[keyPregunta].cantidadPorRespuesta.findIndex(x => x.textoRespuesta === respuestaSeleccionada)
    
    this.preguntas[keyPregunta].cantidadPorRespuesta[keyRespuesta].cantidad+=1
    this.guardar();
    this.votoSumado.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('Listado Preguntas', JSON.stringify(this.preguntas));
  },

};
