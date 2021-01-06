import React, {useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";

export default function Details(props) {
    let { id } = useParams();
    const [todoDetails, settodoDetails] = useState(null)

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(json => settodoDetails(json))
    }, [])

    return (
        <div className='code'>
            <br /> <br />
            <Link to={`/`}> {"Go Back"} </Link>
            {!todoDetails? <p> Loading.... </p>
            :
            <div className='crd'>
            <p> {todoDetails.title}  </p>
            {todoDetails.completed ? <b style={{color:'green'}}> Completed </b> : <b style={{color:'red'}}> Not Completed  </b>}
            </div>
            }
        </div>
    )
}
