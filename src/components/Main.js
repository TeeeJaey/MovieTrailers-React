/*
    Main component which is called from index.js
    it calls the API to fetch the data on first load and 
    dispatches the action to redux store to set the full data
*/

//#region "Imports"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import config from "../config.json";
import dummyData from "../dummyData.json";
import Header from "./Header.js";
import Actions from "../store/Actions";
import Dashboard from "./Dashboard";
import '../styles/Main.css';
//#endregion

export default function Main() {
    //#region "Definitions"
    const moviesList = useSelector(state => state.moviesList);
    const runningTrailerID = useSelector(state => state.runningTrailerID);

    const dispatch = useDispatch();
    //#endregion
    
    //#region "Make GET request to the API (The url is imported from config.json file)"
    useEffect(() => {
        axios.get(config.ApiUrl).then(res => {
        if (res.status === 200) {
            dispatch(Actions.SetFullData(res.data));
        } else {
            console.log("Error " + res.status);
            dispatch(Actions.SetFullData(dummyData));
        }
        }).catch(e =>{
            console.log("Error " + e);
            dispatch(Actions.SetFullData(dummyData));
        });
    }, []);
    //#endregion

    //#region "Set a translusent background image corresponding to the trailer that is running"
    let bgImage = "";
    if(runningTrailerID && runningTrailerID != "") {
        const movie = moviesList.find(m => m.EventCode === runningTrailerID);
        if(movie)
            bgImage = movie.EventImageUrl;
    }
    //#endregion

    //#region "Render"
    return (
        <div className="main">
            <div className="blur-bg" style={{backgroundImage:"url(" + bgImage + ")"}}></div>
            <Header />
            <Dashboard/>
        </div>
    );
    //#endregion
}
