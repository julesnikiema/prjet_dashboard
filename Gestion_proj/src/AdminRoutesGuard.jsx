import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext"; // Assurez-vous d'importer votre contexte d'authentification
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Assurez-vous d'importer votre instance de Firestore

const AdminRoutesGuard = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtenez l'utilisateur actuellement connecté depuis votre contexte d'authentification

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté
    if (!currentUser) {
      navigate("/login"); // Redirigez l'utilisateur vers la page d'accueil s'il n'est pas connecté
      return;
    }

    // Accédez au document Firestore de l'utilisateur
    const userDocRef = doc(db, "users", currentUser.uid);

    // Récupérez les données Firestore de l'utilisateur
    getDoc(userDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Vérifiez le rôle de l'utilisateur
          if (userData.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            navigate("/"); // Redirigez l'utilisateur vers la page d'accueil s'il n'est pas un administrateur
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données Firestore : ", error);
        setIsAdmin(false);
        navigate("/"); // Redirigez l'utilisateur vers la page d'accueil en cas d'erreur
      });
  }, [currentUser, navigate]);

  return isAdmin ? children : null;
};

export default AdminRoutesGuard;
