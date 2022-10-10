import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useRoutes } from 'react-router-dom';
import LyricsDataService from "../services/lyrics";
import "bootstrap/dist/css/bootstrap.min.css";
//Component that displays the lyrics of a song

const LyricList = props => {
    const songTitle = props[0].song_title;
    const artist = props[0].artist;
    const album = props[0].album;
    const lyrics = props[0].lyrics;

    console.log(songTitle);

    return (
        <div class="text-center">
            <h4>Lyrics:</h4>
            <p>{lyrics}</p>
        </div>
    )
}
export default LyricList;
