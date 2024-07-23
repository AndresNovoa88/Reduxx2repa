
import React, { useEffect,useState } from 'react';
import './App.css';
import { Button, Form, FormGroup } from 'react-bootstrap';
import iAx from './ConfigAXIOS';
import { useDispatch, useSelector } from 'react-redux';
import { setAutor, setIsbn, setTitulo } from './reducers';

function App() {

  

  const disp = useDispatch(); /**
   * por medio de dispatch podemos comunicarnos con el store y hacer la actulizacion correspondiente
   */
  const usIsbn = useSelector(state => state.holaAPP.isbn);
  const usTitulo = useSelector(state => state.holaAPP.titulo);
  const usAutor = useSelector(state => state.holaAPP.autor);
  /**
   * usIsbn es el nombre con el q manejamos el useSelector
   * state es que es lo q nos va a retornar por medio del nombre del reducers que es holaAPP
   * despues se hace referencia al objeto como tal .isbn
   * DE ESTA FORMA ES COMO TOMAMOS EL ESTADO ACTUAL DE LOS OBJETOS QUE TENEMOS DENTRO DEL STORE
   */
  const [ver, setVer] = useState(true); //se inicia en true para que saque el error en los campos cuando no se ingresa info

  const validaForma = (event) => {
    console.log("Estoy validando mi forma");
    event.preventDefault(); //evita que la pagina se recargue despues de ingresar datos
    const form = event.currentTarget;

    if (form.checkValidity() === false) { //se ponen los 3= por q debe ser el mismo contenido y el mismo tipo de variable
      console.log("Formulario presenta errores")
    } else {

      const data = {
        isbn: form.elements.isbn.value,
        titulo: form.elements.titulo.value,
        autor: form.elements.autor.value
      }
      console.log("DATA>>>" + JSON.stringify(data)); //json.stringify convierte en objeto JSON
      disp(setIsbn(data.isbn));
      disp(setTitulo(data.titulo));
      disp(setAutor(data.autor)); //se pasa la info seleccionando el isbn del store

      crearLibro(JSON.stringify(data));
    }
  }

  async function crearLibro(data) {
    //endpoint
    try {
      const rta = await iAx.post('/setLibro', data);
      //console.log("Rta>>>" + JSON.stringify(rta, null, 2)); 
      console.log("data: " + JSON.stringify(rta.data));
      console.log("status: " + rta.status);
      console.log("ch: " + rta.config.headers);
    } catch (error) {
      console.log("Error>>>" + error.message);
    }
  }

  //FUNCION ASINCRONA
  function funAsync() {
    console.log("inicio en funAsync");

    setTimeout(() => {
      for (let x = 0; x < 11; x++) {
        console.log("HOLA: " + x);
      }
    }, 5000);

    console.log("Fin de funAsync");
  }


  //FUNCION SINCRONA
  function funsync() {
    console.log("inicio en funsync");

    for (let x = 0; x < 11; x++) {
      console.log("x: " + x);
    }
    console.log("Fin de funsync");
  }
  function prueba() {
    console.log("111");

    funAsync();

    console.log("222");
  }
  //se crea el function ver store para el boton de abajo
  function verStore() {
    console.log("ESTADO ACTUAL DE LOS OBJETOS EN EL STORE");
    console.log("ISBN: " + usIsbn); //agregamos el useSelector de lineas arriba
    console.log("Titulo: " + usTitulo);
    console.log("Autor: " + usAutor);
  }
  return (
    <>
      <Form noValidate onSubmit={validaForma} validated={ver}>
        <FormGroup controlId='idISBN'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control type='text' name='isbn' placeholder='ISBN' required />
        </FormGroup>

        <FormGroup controlId='idTITULO'>
          <Form.Label>Titulo</Form.Label>
          <Form.Control type='text' name='titulo' placeholder='Titulo' required />
        </FormGroup>

        <FormGroup controlId='idAUTOR'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control type='text' name='autor' placeholder='AUTOR' required />
        </FormGroup>

        <Button type='submit' variant='warning'>Guardar</Button>
      </Form>

      <Button type='button' variant='info' onClick={prueba}>Sync/Async</Button>
      <Button type='button' variant='warning' onClick={verStore}>Store</Button>
    </>
  );
}

export default App;

/**
 * Los 5 elementos basicos de REDUX
 * 1.STORE es el ligar central donde vamos a administrar el estado de los
 * objetos que me interesa administrar.
 * 2.ACTIONS la forma de comunicar un componente con el STORE indicandole
 * cual es la actividad que quiere realizar con un objeto
 * 3.REDUCERS es la funcion que va a llamar el STORE para hacer la actualizacion
 * del estado de un objeto pasandole dos parametros que son: el estado
 * actual del objeto y la accion q me envio en un momento determinado mi
 * componente para que haga la actualizacion del estado de ese objeto.
 * 4.DISPATCH es la forma como tienen los componentes de enviar una accion
 * al STORE
 * 5.SELECTOR el medio por el cual los componentes pueden verificar, mirar o consultar
 * el estado de un objeto que se encuentra dentro del STORE
 */
