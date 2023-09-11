import 
{ BsFillClipboard2DataFill , BsPeopleFill, }
 from 'react-icons/bs'
 import {MdEngineering} from 'react-icons/md'
 import {AiFillFolderOpen} from 'react-icons/ai'

 
 import 
 { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { useState, useEffect } from 'react';
 import { db } from '../firebase'; // Importez la configuration Firebase de votre projet
import { collection, query, where, getDocs } from 'firebase/firestore';


function Home() {

  const [taskCount, setTaskCount] = useState(0); // État local pour stocker le nombre de tâches

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const tasksRef = collection(db, 'tasks');
        const q = query(
          tasksRef,
          where('etat', 'not-in', ['TERMINE', 'DESACTIVED']) // Excluez les états "TERMINE" et "DESACTIVED"
        );
        const querySnapshot = await getDocs(q);

        // Mettez à jour l'état local avec le nombre de tâches correspondantes
        setTaskCount(querySnapshot.size);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de tâches : ', error);
      }
    };

    fetchTaskCount();
  }, []);

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Tableau de Bord</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Projets en cours </h3>
                    <BsFillClipboard2DataFill className='card_icon'/>
                </div>
               <h1>{taskCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>  Documents </h3>
                    <AiFillFolderOpen className='card_icon'/>
                </div>
                <h1> 20 </h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Clients</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>24</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>  Equipe ANPTIC </h3>
                    <MdEngineering className='card_icon'/>
                </div>
                <h1> </h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home