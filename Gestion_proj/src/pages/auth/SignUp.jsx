import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate, Link } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [agentService, setAgentService] = useState("Service par défaut");
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        firstName,
        lastName,
        phone,
        email,
        agentService,
        role: "utilisateur",
        createdAt: serverTimestamp(),
      });

      console.log("Utilisateur enregistré avec succès dans Firestore.");

      navigate("/");
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <select
          value={agentService}
          onChange={(e) => setAgentService(e.target.value)}
        >
          <option value="Service par défaut">Sélectionnez un service</option>
          <option value="DG">Direction Generale</option>
          <option value="SG">Secratariat General</option>
          <option value="SP">SP</option>
          <option value="CT">Conseiller Technique</option>
          <option value="DCM">DCM</option>
          <option value="DEI">DEI</option>
          <option value="DEST">DEST</option>
          <option value="DFPTIC">DFPTIC</option>
          <option value="DFC">DFC</option>
          <option value="DIG">DIG</option>
          <option value="DSA">DSA</option>
          <option value="DRH">DRH</option>
          <option value="PRM">DIG</option>
          <option value="SCMRP">SCMRP</option>
        </select>
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
