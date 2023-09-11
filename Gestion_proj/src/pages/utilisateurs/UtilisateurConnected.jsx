import { useState, useEffect } from 'react';
import { db, auth} from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Importez doc et getDoc depuis Firestore



function UtilisateurConnected() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Utilisateur connecté, récupérez ses informations depuis Firestore
        const userRef = doc(db, 'users', user.uid); // Supposons que 'users' est la collection Firestore pour les utilisateurs
        getDoc(userRef)
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setCurrentUser(userData);
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
          });
      } else {
        // Aucun utilisateur connecté
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
}

export default UtilisateurConnected;
