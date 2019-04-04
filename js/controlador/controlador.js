/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {

  cargarPreguntas:function(preguntasGuardadas){
    this.modelo.cargarPreguntas(preguntasGuardadas)
  },

  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPreguntaID(id);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  },

  editarPregunta: function(keyPregunta, txtPregunta, respuestas) {
    this.modelo.editarPregunta(keyPregunta, txtPregunta,respuestas);
  },

  sumarVoto: function(idPregunta, respuestaSeleccionada) {
    console.log('en Controlador: idPregunta', idPregunta ,'respuestaSeleccionada',respuestaSeleccionada)
    this.modelo.sumarVoto(idPregunta, respuestaSeleccionada);
  },


};
