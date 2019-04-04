/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores

  this.modelo.preguntasCargadas.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

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

  
};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.cargarPreguntasGuardadas();
    this.reconstruirLista();
    this.configuracionDeBotones();
    
  },

  construirElementoPregunta: function(pregunta){
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
    for (var i=0;i< preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  cargarPreguntasGuardadas: function(){
    var preguntasGuardadas = JSON.parse(localStorage.getItem('Listado Preguntas'));
    if(preguntasGuardadas == null){
      preguntasGuardadas = []
    }
    this.controlador.cargarPreguntas(preguntasGuardadas)
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //Boton Agregar Pregunta
    e.botonAgregarPregunta.click(function() {
      var pregunta = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function(index, element) {
        respuestas.push({textoRespuesta: element.value, cantidad:0})
      })
     
      
      if(respuestas[0].textoRespuesta == ''){
        alert('Escribi una pregunta con sus respuestas')
        return
      }
      contexto.limpiarFormulario();
      respuestas.pop()
      contexto.controlador.agregarPregunta(pregunta, respuestas);
    });
    
    //Editar Pregunta
    e.botonEditarPregunta.click(function(){
      var id = $('.list-group-item.active').attr('id');
      if(isNaN(id)) {
          alert("Elegi que pregunta queres editar")
          return
      } 
      $('#agregarPregunta').hide()
      $('#respuesta').remove()
      $('#guardarCambios').toggleClass('hide')
      var keyPregunta = modelo.preguntas.findIndex(x => x.id == id)
      var txtPregunta = modelo.preguntas[keyPregunta].textoPregunta
      var respuestas = modelo.preguntas[keyPregunta].cantidadPorRespuesta
      var respuestasNew = [];

      // cargo txt pregunta
      e.pregunta.val(e.pregunta.val() + txtPregunta)

      // cargo txt respuesta
     for(var i = 0; i < respuestas.length; i++){
        var $template = $('#optionTemplate'),
            $clone = $template
            .clone()
            .removeClass('hide')
            .attr('id', i)
            .insertBefore($template)
            $option = $clone.find('[name="option[]"]').val(modelo.preguntas[keyPregunta].cantidadPorRespuesta[i].textoRespuesta)
      }

      $('#guardarCambios').click(function() {
        $('[name="option[]"]').each(function(index, element) {
          var resp = modelo.preguntas[keyPregunta].cantidadPorRespuesta[index]
          if(element.value && resp){
            var cant = modelo.preguntas[keyPregunta].cantidadPorRespuesta[index].cantidad
            respuestasNew.push({textoRespuesta: element.value, cantidad: cant})
          } else {
            respuestasNew.push({textoRespuesta: element.value, cantidad:0})
          }
        });
          
        txtPregunta = e.pregunta.val();
        respuestasNew.pop()
        console.log(keyPregunta, txtPregunta,respuestasNew)

        $('#agregarPregunta').show()
        $('#respuesta').remove()
        $('#guardarCambios').addClass('hide')
        contexto.limpiarFormulario()
        contexto.controlador.editarPregunta(keyPregunta, txtPregunta,respuestasNew)
      })
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