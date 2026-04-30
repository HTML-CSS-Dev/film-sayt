import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "/src/context/UserContext";
import {API_KEY} from "/src/utils/api.key";

export default function Section() {
    const {data , setData} = useContext(UserContext);
    const {type} = useContext(UserContext);
    const {name} = useContext(UserContext);
    const [count , setCount] = useState(1);

    function increment() {

        if ( count >= 20 ) {
            setCount(20)
            return
        }

        setCount(c => c + 1)
    }

    function decrement() {
        if ( count <= 1 ) {
            setCount(1)
            return
        }
        setCount(c => c - 1)
    }

    // change page width type and page
    useEffect(
        () => {
            axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${count}`).then(
                res => {
                    if ( res.status === 200 ) {
                        setData(res.data.results);
                    }
                }
            ).catch(
                err => console.log(err.message)
            )
        } , [type , count]);

    return (
          <div className="container">
        <div className="append">
            { data.map(
                (item , index) => {  
                    return <div className="movie" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}  alt={item.title}/>

                        <div className="movie-info">
                               <h3>{item.title}</h3>
                               <span className="orange">{item.vote_average}</span>
                        </div>
                            <span className="date">{item.release_date}</span>
                    </div>
                }
            )}
            
        </div>
        <div className="pn">
            <button onClick={decrement} className="prev">prev</button>
            <span className="title">{count}</span>
            <button onClick={increment} className="next">next</button>
        </div>
       </div>
    )
}