import axios from "axios";
import { useContext, useRef, useState } from "react";
import Section from "/src/components/section/Section";
import { UserContext } from "/src/context/UserContext";
import {API_KEY} from "/src/utils/api.key";

export default function Header() {
    const {type , setType} = useContext(UserContext);
    const {data , setData} = useContext(UserContext);
    const Color = useRef("red");

    function changeStatus(e) {
        setType(e.target.value);
        const x = e.target.parentElement.children;

        for ( let btn of x ) {
            btn.style.background = "#22254b";
        }
            e.target.style.background = "#1a1b2c";
    }

    // function changeData(e) {
    //     // optimize search:
    //     const searchFilm = data.filter(
    //         el => el.title.toLowerCase().includes(e.target.value.trim().toLowerCase())
    //     );

    //     if (e.target.value.trim() === "") {
    //         axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`).then(
    //             res => {
    //                 if (res.status === 200) {
    //                     setData(res.data.results);
    //                 }
    //             }
    //         ).catch(
    //             err => console.log(err.message)
    //         )

    //         return
    //     }
    //     setData(searchFilm);
    // }


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
                            <input  type="text" placeholder="search" id="search"/>
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