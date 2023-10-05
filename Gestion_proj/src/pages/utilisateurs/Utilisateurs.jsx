import  { useState, useEffect } from "react";
import { db } from "../../firebase"; // Assurez-vous d'importer votre instance Firestore
import { collection, getDocs } from "firebase/firestore";
import Header from '../../Composants/Header';
import Sidebar from '../../Composants/Sidebar'

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);

      const userList = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        return userData;
      });

      setUsers(userList);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div  className="table-container">
        <h2  className="titre-user">Liste des utilisateurs</h2>
        
        
        <table>
          <thead>
            <tr>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Mail</th>
              <th>Date de création de compte</th>
              <th>role</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td> {user.lastName}</td>
                <td>{user.phone} </td>
                <td>{user.email}</td>
                <td>{user.createdAt.toDate().toLocaleDateString()}</td>
                <td>{user.role}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;