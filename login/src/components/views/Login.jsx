import { useState, useEffect } from "react";
import logo from "../../assets/img/imagen-login.png"
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom"; 
import Cookies from "universal-cookie";

// Capturo la url del servidor donde se hacen las peticiones
const baseUrl = "http://localhost:3000/usuarios";

//Instancio la dependencia de las cookies para poder setear los valores capturados por el usuario
const cookie = new Cookies();
function Login() {

  // Capturo los valores ingresados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navegacion = useNavigate()

  // Metodo para capturar el campo del email
  const handleEmailChange = ({ target: { value } }) => {
     setEmail(value);
    //console.log(value)
  };

  // Metodo para capturar el campo del password
  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    //console.log(value)
  };

  //Funcion donde hago la consulta del usuario si se encuentra en API
  const iniciarSession = async () => {
    await axios.get(baseUrl, 
      {
        params:{
          email: email, 
          password: md5(password) // Hago uso de la dependencia md5 para la encriptacion del password
        }})
        .then((response) => {
          //console.log(response.data)
          return response.data;
        })
        .then((response) => {
          //Verifico si los campos estan con valores para dar acceso a la pagina
          if(response.length > 0) {
            let respuesta = response[0]
            cookie.set("id", respuesta.id, {path: "/"})
            cookie.set("userName", respuesta.userName, {path: "/"})
            cookie.set("email", respuesta.email, {path: "/"})
            //alert("Bienvenido: " + respuesta.userName + " Ingreso exitoso")
          } else {
            alert("Usuario o contraseña incorrecto")
          }
        })
        .catch((error) => {console.log(error)});
  }

  // Si estan bien los valores que se ingresan y lo dirijo a la pagina principal
  const handleFormSubmit = (event) => {
    //console.log("Submit");
    event.preventDefault();
    iniciarSession().then(() => navegacion("./main"))
  };
  
  // Aca manejo el estado del usuario si se encuentra logueado
  //Si ya esta logueado el usuario lo redirija a la pagina principal
  useEffect(() => {
    if(cookie.get("email")){
      window.location.href = "./main"
    }
  },[])
  
  return (
    <div className="container">
      <div className="form-container">
        <form  onSubmit={handleFormSubmit}>
          <img className="logo-img" src={logo} alt="" />
          <h2>Iniciar sesión</h2>
          <div className="form-body">
          <label>
            
            <input
              placeholder="Ingrese su correo"
              type="email"
              onChange={handleEmailChange}
              value={email}
            />
          </label>
          </div>
          <label>
            
            <input
              placeholder="Ingrese su contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit" onClick={() => iniciarSession() } className="btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

