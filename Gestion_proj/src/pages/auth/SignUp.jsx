import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {BsPersonCircle} from 'react-icons/bs'
import { useNavigate,Link } from "react-router-dom"; // Importer useNavigate
import { serverTimestamp } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; // Importez doc et setDoc depuis Firestore




const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

 
  const signUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Créer un compte utilisateur avec Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Récupérer l'ID de l'utilisateur nouvellement créé
      const userId = userCredential.user.uid;

      // Ajouter les informations de l'utilisateur à Firestore
      const userRef = doc(db, "users", userId); // "users" est le nom de votre collection Firestore
      await setDoc(userRef, {
        firstName,
        lastName,
        phone,
        email,
        createdAt: serverTimestamp(), // Utiliser serverTimestamp pour obtenir la date actuelle
      });

      console.log("Utilisateur enregistré avec succès dans Firestore.");

      navigate("/login"); // Rediriger vers la page de connexion après la création du compte
    } catch (error) {
      setError(error.message);
    }
  };

 
  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <BsPersonCircle className="icon" style={{ fontSize: '90px' }} />
        <h1>Créer un compte</h1>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          type="tel"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button type="submit">Créer</button>
        <p>{error}</p>
        <Link to="/login">
          <button className="create-account-button">Se connecter</button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;