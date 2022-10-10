import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useRoutes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
//import "bootstrap/dist/js/bootstrap.bundle.min";
import '../App.css';
import '../Button.css'



const Homepage = () => {
    const [artistName, setArtistName] = useState("");

    const onChangeSetArtistName = e => {
        setArtistName(e.target.value);
    }

    return (
        <div className="bod text-center">
            <div className="cover-container d-flex p-2 mx-auto flex-column">
                <div className="container">
                    <header className="masthead mb-auto">
                        <div className="inner">
                            <h2 className="masthead-brand">LyricGuesser</h2>
                        </div>
                    </header>
                </div>
                <div role="main" className="cover h-100 d-flex align-items-center">
                    <div className="text-light">
                        <div className="mainInfo">
                            <div className="container-fluid">
                                <h1 class="cover-heading">How Well do You Know Your Favorite Artists?</h1>
                                <p class="jumbo">Hover over the Start bar and type in the name of your favorite artist. You will be prompted with a set of lyrics from one of their songs.
                                    Try and guess the song and see if you can get all of them right!</p>
                            </div>
                            <div className="container-fluid lead">
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        className="textbox"
                                        placeholder="eg.Taylor Swift"
                                        value={artistName}
                                        onChange={onChangeSetArtistName}></input>
                                    <a className="search-btn" href="#">
                                        <Link to={{
                                            pathname: `/findartist`,
                                        }} style={{ textDecoration: 'none' }} state={{ artist: { artistName } }}>
                                            <p className="buttonText font-weight-normal">Start</p>
                                        </Link>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >







    )
}

export default Homepage;



