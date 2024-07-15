
import './App.css';
import { Button, Form, FormGroup } from 'react-bootstrap';

function App() {
  const validaForma = (event) => {
    console.log("Estoy validando mi forma");
  }
  return (
    <>
      <Form noValidate onSubmit={validaForma}>
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
