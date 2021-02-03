import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';

function App() {

  //state de la app
  const [busqueda, guardarBusqueda] = useState('');
  
  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = process.env.REACT_APP_KEY
      const URL = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      guardarBusqueda(resultado.hits);
    }
    consultarAPI();
  }, [busqueda])

  return (
   <div className="container">
     <div className="jumbotron">
      <p className="lead text-center">Buscador de imágenes</p>
      <Formulario
        guardarBusqueda={guardarBusqueda}
      />
     </div>
   </div>
  );
}

export default App;
