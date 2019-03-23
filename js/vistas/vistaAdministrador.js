/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

  this.modelo.borrarTodasPreguntas.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

  this.modelo.preguntaEditada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

  this.modelo.votoSumado.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem = $('<li></li>').addClass("list-group-item").attr('id', pregunta.id);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem; 
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //Boton Agregar Pregunta
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function(index, element) {
        respuestas.push({textoRespuesta: element.value, cantidad:0})
      })

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    
    //Editar Pregunta
    e.botonEditarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(isNaN(id)) {
        alert("Elegi que pregunta queres editar")
      } else {
        const txtPregunta = prompt('Editar pregunta', modelo.preguntas[id].textoPregunta);
        contexto.controlador.editarPregunta(id, txtPregunta)
      }
    });

    //Borrar Pregunta
    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'))
      if(isNaN(id)) {
        alert("Elegi que pregunta queres borrar")
      } else {
        contexto.controlador.borrarPregunta(id)
      }
    });

    //Borrar todas las Preguntas
    e.borrarTodo.click(function() {
      alert('estas seguro que queres borrar todo?')
      contexto.controlador.borrarTodo()
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};