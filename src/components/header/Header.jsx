import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Section from "/src/components/section/Section";
import { UserContext } from "/src/context/UserContext";
import {API_KEY} from "/src/utils/api.key";

export default function Header() {
    const {type , setType} = useContext(UserContext);
    const {data , setData} = useContext(UserContext);
    const {name , setName} = useContext(UserContext);


    function changeStatus(e) {
        setType(e.target.value);
        const x = e.target.parentElement.children;

        for ( let btn of x ) {
            btn.style.background = "#22254b";
        }
            e.target.style.background = "#1a1b2c";
    }

    // search system:
    function searchFilmbyTitle(e) {
        const searchFilm = e.target.value.trim();
        if (searchFilm === "") {
            axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`).then(
                res => {
                    if ( res.status === 200 ) {
                        setData(res.data.results);
                    }
                }
            ).catch(
                err => console.log(err.message)
            )

            return
        }
        
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`+ name).then(
            res => {
                setName(searchFilm);
                setData(res.data.results);
            } 
        ).catch(
            err => console.log(err.message)
        );
    }

    return (
        <>
            <div className="header-inner">
                <div className="container rel">
                      <div className="row2">
                        <button onClick={ changeStatus } value="top_rated" className="btns">Top kinolar</button>
                        <button onClick={ changeStatus } value="popular" className="btns">popular</button>
                        <button onClick={ changeStatus } value="upcoming" className="btns">upcoming</button>
                      </div>
                      <div className="fl" >
                        <div className="row1">
                            <input onChange={searchFilmbyTitle } type="text" placeholder="search" id="search"/>
                        </div>
                        <div className="row1">
                            <input type="number" placeholder="min" id="min"/>
                            <input type="number" placeholder="max" id="max"/>
                        </div>
                        <div className="row1">
                            <input type="number" placeholder="score" id="score"/>
                        </div>
                      </div>
                </div>
            </div>
        </>
    )
}