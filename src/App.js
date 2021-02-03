import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = process.env.REACT_APP_KEY
      const URL = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //calcular total páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas);
    }
    consultarAPI();
  }, [busqueda])

  //definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir la página siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
   <div className="container">
     <div className="jumbotron">
      <p className="lead text-center">Buscador de imágenes</p>
        <Formulario
        guardarBusqueda={guardarBusqueda}
      />
     </div>
     <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo;Anterior</button>
        <button
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
     </div>
   </div>
  );
}

export default App;
