import {useEffect} from 'react'
import Cookies from "universal-cookie"

const cookie = new Cookies();
export default function Dashboard() {

    // Con este metodo seteo todos los valores del usuario
    // si al momento de dar click al boton cerrar sesion no quede los datos
    // y todo quede vacio
    const cerrarSesion = () => {
        cookie.remove("id", {path: "/"})
        cookie.remove("userName", {path: "/"})
        cookie.remove("email", {path: "/"})
        window.location.href = "/";
    }

      // Aca manejo el estado del usuario no se encuentra logueado
    //Si no esta logueado el usuario lo redirija a la pagina del login
    useEffect(() => {
        if(!cookie.get("email")) {
            window.location.href = "/";
        }
    },[])
  return (
    <>
        <main>
            <div className='main-container'>

                <h1 className='title'>Bienvenido {cookie.get("userName")}</h1>
                <button className='btn-main' onClick={() => cerrarSesion() }>Cerrar Sesion</button>

            </div>
        </main>
    </>
  )
}
