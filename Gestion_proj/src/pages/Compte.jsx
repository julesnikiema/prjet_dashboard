import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from '../Composants/Header';
import Sidebar from '../Composants/Sidebar'

const Compte = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if(auth.currentUser) {  // Vérifiez si un utilisateur est connecté
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
      
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, userData);
    alert("Informations mises à jour!");
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="grid-container" >
      <Header />
      <Sidebar />     
        <div>
      <h1>Mise à jour du compte</h1>
      <form onSubmit={handleUpdate}>
        {/* Ajouter ici tous vos champs comme Prénom, Nom, etc. */}
        <input
          type="text"
          placeholder="Prenom"
          value={userData.firstName}
          onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
        />
        <input
            type="text"
            placeholder="Nom"
            value={userData.lastName || ""}
            onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={userData.phone || ""}
            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email || ""}
            onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
          />
        {/* ... Autres champs ... */}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    </div>
   
  );
};

export default Compte;
