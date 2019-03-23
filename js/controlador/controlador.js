/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPreguntaID(id);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  },

  editarPregunta: function(id, txtPregunta) {
    this.modelo.editarPregunta(id, txtPregunta);
  },

  sumarVoto: function(idPregunta, idRespuesta) {
    this.modelo.sumarVoto(idPregunta, idRespuesta);
  },

};
