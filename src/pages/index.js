import  { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import  { addTodo, showTodos } from "../db";


export default function Index() {
    const [todos, setTodos] = useState([]);
    const [offline, setOffline] = useState(false);

    
    useEffect(() => {
    let offlineLS = localStorage.getItem('offline');

     if(offlineLS) {
        console.log('== Make it available offline ==');
            async function fetchData() {
                const todo = await showTodos();
               await setTodos(todo);
              }
        
            fetchData();
        }
        else{
            console.log('== Make it available Online ==');
            fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json =>  setTodos(json));
        }

    }, [offline])


   const toggleDocs = () => {
       addTodo(todos);
       setOffline(!offline);
       localStorage.setItem('offline',!offline);
    }

    // console.log('todos===>', todos);

    return (
        <>
        <h1>Todos {todos?.length}</h1>
        <div className="onoffswitch">
        <input type="checkbox" onChange={toggleDocs} name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" checked={!localStorage.getItem('offline')} />
        <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch"></span>
        </label>
     </div>

        <hr/>
        <div className='code'>
            {!todos && <p> Loading... </p>}
           {todos?.map(((d, i )=> <p key={i}> <Link to={`/todos/${d.id}`}> {d.title} </Link> </p>))}
        </div>
        </>
    )
}
