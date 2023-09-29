import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const IsAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Vérifiez si l'utilisateur actuel est un administrateur en vérifiant son rôle.
        const userRef = db.collection("users").doc(user.uid);

        userRef.get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.role === "admin") {
              navigate("/"); // Redirigez l'administrateur vers la page principale

              // Utilisateur est un administrateur, vous pouvez récupérer la liste des utilisateurs depuis Firebase.
              const usersRef = db.collection("users");
              usersRef.onSnapshot((snapshot) => {
                const usersData = [];
                snapshot.forEach((doc) => {
                  const userData = doc.data();
                  usersData.push({ id: doc.id, ...userData });
                });
                setUsers(usersData);
                setLoading(false);
              });
            } else {
               // Redirigez les utilisateurs qui ne sont pas des administrateurs vers "UserPage"
               navigate("/Userpage");
            }
          } else {
            // Document utilisateur non trouvé, gérer l'erreur ici.
          }
        });
      } else {
        // Redirigez les utilisateurs non connectés vers la page de connexion.
        // Par exemple, vous pouvez utiliser React Router pour la redirection.
        // history.push("/connexion"); // Nécessite la mise en place de React Router
      }
    });

    return unsubscribe;
  }, [navigate]);

  // Fonction pour mettre à jour le rôle d'un utilisateur
  const updateUserRole = (userId, newRole) => {
    const userRef = db.collection("users").doc(userId);
    userRef.update({ role: newRole })
      .then(() => {
        console.log("Rôle utilisateur mis à jour avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du rôle utilisateur : ", error);
      });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h1>Tableau de bord de administrateur</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - Rôle actuel : {user.role}
            <button onClick={() => updateUserRole(user.id, "nouveau_role")}>
              Changer de rôle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IsAdmin;
