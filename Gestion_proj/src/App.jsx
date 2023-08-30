
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate 
} from "react-router-dom";
import { useState } from 'react'
import { auth } from "./firebase";
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth"; // impo onAuthStateChanged est correctement importé



import './css/App.css'
import Header from './Composants/Header'
import Sidebar from './Composants/Sidebar'
import Home from './pages/Home'
import SignUp from './pages/auth/SignUp'
import SignIn from "./pages/auth/SignIn";
import ErrorPage from "./pages/ErrorPage";
import Parametres from "./pages/Parametres";
import Compte from './pages/Compte';
import Utilisateurs from './pages/utilisateurs/Utilisateurs';
import AjoutProjets from './pages/projets/AjoutProjets';


// Composant de gardien de route pour les routes protégées
const currntUser = false;
const RequireAuth = ({children})=> {
  return currentUser ? children : <Navigate to ="/login" />
};

 /*
Définition du composant DashBoard :
Ce composant définit un tableau de bord de l'application. Il utilise le hook useState pour gérer l'état de openSidebarToggle, qui est un booléen indiquant si la barre latérale (sidebar) est ouverte ou non. 
La fonction OpenSidebar est définie pour inverser la valeur de openSidebarToggle à chaque appel. Ensuite, dans le rendu, ce composant retourne une structure de div avec trois composants imbriqués :
<Header> : Il semble que cela soit lié à l'en-tête de votre application. La prop OpenSidebar est passée pour gérer le basculement de la barre latérale.
<Sidebar> : Cela représente la barre latérale de votre application. La prop openSidebarToggle indique si la barre latérale est ouverte ou fermée, et OpenSidebar est passé pour gérer le changement d'état.
<Home> : Ce composant représente le contenu principal du tableau de bord. Il est rendu directement ici.*/
const DashBoard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  );
};

/* Création du routeur avec createBrowserRouter :
Ici, vous importez la fonction createBrowserRouter de la bibliothèque React Router. Vous utilisez cette fonction pour créer un routeur de navigation pour votre application. 
Un tableau d'objets est passé à cette fonction pour définir les itinéraires de l'application.
Le premier objet dans le tableau est configuré pour la racine "/" et est associé au composant DashBoard. Il a également un enfant configuré pour le chemin "/", qui est associé au composant Home.
Ensuite, il y a des itinéraires configurés pour "/login" et "/register", associés respectivement aux composants SignIn et SignUp.
L'itinéraire configuré avec le chemin "*" (tous les chemins qui n'ont pas été correspondants jusqu'à présent) est associé au composant ErrorPage.. */

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/",
    element: < DashBoard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
 

  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/addprojets",
    element: < AjoutProjets />,
  },
  {
    path: "/Utilisateurs",
    element: <Utilisateurs />,
  },
  {
    path: "/Compte",
    element: <Compte />,
  },
  {
    path: "/parametre",
    element: <Parametres />,
  },
 
  {
    path: "*",
    element: <ErrorPage />,
  },
  
 
]);

function App() {
  
    return (
      <div className="app">
        <RouterProvider router={router} />
      </div>
    );

  
}

export default App
