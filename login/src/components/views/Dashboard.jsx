import {useEffect} from 'react'
import Cookies from "universal-cookie"

const cookie = new Cookies();
export default function Dashboard() {
    const cerrarSesion = () => {
        cookie.remove("id", {path: "/"})
        cookie.remove("userName", {path: "/"})
        cookie.remove("email", {path: "/"})
        window.location.href = "/";
    }

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
