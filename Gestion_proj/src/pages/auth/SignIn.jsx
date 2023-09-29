import { signInWithEmailAndPassword } from "firebase/auth";

import  { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate,Link } from "react-router-dom"; // Importer useNavigate
import {BsPersonCircle} from 'react-icons/bs'


const SignIn = () => {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialiser useNavigate

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        
  

        // Rediriger vers le tableau de bord après une connexion réussie
        navigate("/"); // Utiliser useNavigate pour rediriger vers "/"
      })
      .catch((error) => {
        console.log(error);
        setError(true); // Définit l'erreur à true en cas d'échec de connexion

      });
  };

  return (
    <div className="form-wrapper" >
      <div className="sign-in-container">

      <form onSubmit={signIn}>
        <h1> Connectez - vous </h1>

<BsPersonCircle className="icon" style={{ fontSize: '90px' }} />

        <input
          type="email"
          placeholder="Entez votre  email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Entez votre mot de passe "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit">se connecter </button>
        {error && <span> email ou  mot de passe errone <br/> </span>}
        <Link to="/register">
          <button className="create-account-button">Créer un compte</button>
        </Link>
      </form>
    </div>

    </div>
    
  );
};

export default SignIn;