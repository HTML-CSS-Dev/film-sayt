import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Section from "/src/components/section/Section";
import { UserContext } from "/src/context/UserContext";
import {API_KEY} from "/src/utils/api.key";

export default function Header() {
    const {type , setType} = useContext(UserContext);
    const {data , setData} = useContext(UserContext);
    const [name , setName] = useState('');
    const [vote , setVote] = useState('');
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');

    function changeStatus(e) {
        setType(e.target.value);
        const x = e.target.parentElement.children;

        for ( let btn of x ) {
            btn.style.background = "#22254b";
        }
            e.target.style.background = "#1a1b2c";
    }

    // search by title
    function searchFilmbyTitle(e) {
        const searchFilm = e.target.value.trim();
        if (searchFilm === "") {
            altrnative();
            return
        }

        setName(searchFilm);
    }


    useEffect(
        () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`+ name).then(
            res => {
                setData(res.data.results);
            } 
        ).catch(
            err => console.log(err.message)
        );
        } , [name]);


    // search by Score:
    function searchByScore(e) {
        const scoreSearch = e.target.value;
        if ( scoreSearch == "" ) {
            altrnative();
            return
        }

        if ( scoreSearch == '1' )
            return

        if ( scoreSearch >= 6 && scoreSearch <= 10 ) {
            setVote(scoreSearch);
            return
        }

        alert("please input the scroe between 6 and 10");
        e.target.value = "";
    }

    useEffect( () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_average.gte=` + vote)
        .then(
            res => {
                setData(res.data.results);
            }
        )
        .catch(
            err => console.log(err.message)
        )
    } , [vote]);


    function altrnative () {
        axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`).then(
                res => {
                    if ( res.status === 200 ) {
                        setData(res.data.results);
                    }
                }
            ).catch(
                err => console.log(err.message)
        )
    }

    function minDate(e) {
        const date = new Date();
        const newDate = e.target.value;
        const dates = date.toISOString().slice(0, 10).replace("2026" , newDate);
        setStartDate(dates);
    }

    function maxDate(e) {
        const date = new Date();
        const newDate = e.target.value;
        const dates = date.toISOString().slice(0, 10).replace("2026" , newDate);
        setEndDate(dates);
    }

    useEffect(
        () => {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`)
            .then(
                res => {
                    if ( res.status == 200 ) {
                        setData(res.data.results)
                    }
                }
            )
            .catch(
                err => console.log(err.message)
            )

         } , [ startDate , endDate ] )

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
                            <input type="number" onChange={minDate} placeholder="min" id="min"/>
                            <input type="number" onChange={maxDate} placeholder="max" id="max"/>
                        </div>
                        <div className="row1">
                            <input onChange={searchByScore} type="number" maxLength={0} min={6} max={10} placeholder="score" id="score"/>
                        </div>
                      </div>
                </div>
            </div>
        </>
    )
}