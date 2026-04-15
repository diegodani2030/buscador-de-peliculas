import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function Detalle() {

    const {id} =useParams() 
    const [datos, setDatos] = useState (null)
    const navegar = useNavigate ()
    const [cargando, setCargando] = useState (false)


useEffect(() => {
    async function buscarDetalle() {
      setCargando (true)
      const respuesta = await fetch(`https://api.tvmaze.com/shows/${id}`)
      const resultado = await respuesta.json()
      setDatos(resultado)
      setCargando(false)
    }
    buscarDetalle()
  }, [id])

  return(
   <div>
    {cargando &&
    <p className="buscando">Cargando...</p>}
    <div className="detalle">
     <button className="detalle-boton" onClick={() => navegar(-1)}>← Atrás</button>
     <div className="detalle-contenido">
       {datos && datos.image && <img className="detalle-imagen" src={datos.image.medium} alt={datos.name} />}
       <div className="detalle-info">
        {datos && <h2>{datos.name}</h2>}
        {datos && <p>{datos.premiered}</p>}
        {datos && <p>{datos.genres.join(", ")}</p>}
        {datos && <p dangerouslySetInnerHTML={{__html: datos.summary}} />}
       </div>
      </div>
    </div>
   </div>
 )
}

export default Detalle