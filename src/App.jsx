import { useState, useEffect} from "react";
import Detalle from "./Detalle";
import { Route, Routes, useNavigate } from "react-router-dom";

function App (){

  const [busqueda, setBusqueda] = useState ("")
  const [resultados, setResultados] = useState ([])
  const [cargando, setCargando] = useState (false)
  const navegar = useNavigate()

async function buscar (){
  setCargando(true)
  const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${busqueda}`)
  const datos = await respuesta.json()
  setResultados(datos)
  setCargando(false && resultados.length == 0)
}
  
  return(
    <Routes>
      <Route path="/" element={
        <div>
          <h1>Pelicula</h1>
          {cargando &&
          <p className="buscando">Buscando...</p>}
          {!cargando && resultados.length === 0 && 
          <p className="sin-resultados">No se encontraron resultados</p>}
          <div className="buscador">
          <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value )}
          placeholder="Escribir pelicula"
          />
          <button onClick={buscar}>Busqueda</button>
          </div>
          <ul className="resultados">
          {resultados.map((item, index) => (
          <li className="tarjeta" key={index}
          onClick={() => navegar(`/detalle/${item.show.id}`)}>
          {item.show.image &&<img src={item.show.image.medium} alt={item.show.name} />}
            <p>Nombre:{item.show.name}</p>
            <p>Lenguage:{item.show.language}</p>
            <p>Estreno:{item.show.premiered}</p>
            <p>Géneros: {item.show.genres.join(", ")}</p>
          </li>
          ))}
        </ul>
        </div>
      } />
      <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
  )
 
}

export default App