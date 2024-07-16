
import { useState } from 'react';
import './App.css';
import { Button, Form, FormGroup } from 'react-bootstrap';
import iAx from './ConfigAXIOS';

function App() {

  const [ver, setVer] = useState(true); //se inicia en true para que saque el error en los campos cuando no se ingresa info

  const validaForma = (event) => {
    console.log("Estoy validando mi forma");
    event.preventDefault(); //evita que la pagina se recargue despues de ingresar datos
    const form = event.currentTarget;

    if (form.checkValidity() === false) { //se ponen los 3= por q debe ser el mismo contenido y el mismo tipo de variable
      console.log("Formulario presenta errores")
    } else {
      
      const data ={
        isbn: form.elements.isbn.value,
        titulo: form.elements.titulo.value,
        autor: form.elements.autor.value
      }
      console.log("DATA>>>" + JSON.stringify(data)); //json.stringify convierte en objeto JSON
      crearLibro(JSON.stringify(data));
    }
  }

  async function crearLibro(data){
//endpoint
    try{
      const rta = await iAx.post('/setLibro',data);
      console.log("Rta>>>" + JSON.stringify(rta)); 
      //console.log("data: " + JSON.stringify(rta.data));
    }catch(error){
      console.log("Error>>>" + error.message);
    }
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
    </>
  );
}

export default App;
