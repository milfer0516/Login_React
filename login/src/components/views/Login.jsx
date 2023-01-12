import { useState, useEffect } from "react";
import logo from "../../assets/img/imagen-login.png"
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom"; 
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3000/usuarios";
const cookie = new Cookies();
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navegacion = useNavigate()

  const handleEmailChange = ({ target: { value } }) => {
     setEmail(value);
    //console.log(value)
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    //console.log(value)
  };


  const iniciarSession = async () => {
    await axios.get(baseUrl, 
      {
        params:{
          email: email, 
          password: md5(password)
        }})
        .then((response) => {
          //console.log(response.data)
          return response.data;
        })
        .then((response) => {
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
  const handleFormSubmit = (event) => {
    //console.log("Submit");
    event.preventDefault();
    iniciarSession().then(() => navegacion("./main"))
  };
  
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

