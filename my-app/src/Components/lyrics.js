import { getToPathname } from "@remix-run/router";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useRoutes, useLocation } from 'react-router-dom';
import LyricsDataService from "../services/lyrics";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LyricList from "./lyriclist";
//Main part of the website
//Runs the game loop, displaying lyrics and handling user input

const Lyrics = (props) => {
    const location = useLocation();
    const artistName = location.state.artist.artistName;
    const [lyrics, setLyrics] = useState([]);
    const [songUserInput, setsongUserInput] = useState("");
    const [questionNum, setQuestionNum] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);
    const [results, setResults] = useState([]);
    const numQuestions = 5;

    useEffect(() => {
        if ((questionNum + 1) > numQuestions)
            gameOver();
    }, [questionNum])

    useEffect(() => {
        retreiveSongs();
    }, [])

    //Makes GET request and stores pushed result into lyrics array
    const retreiveSongs = () => {
        resetValues();
        console.log("check 1");
        for (let i = 0; i < numQuestions; i++) {
            LyricsDataService.getLyrics(artistName).then(response => {
                setLyrics(lyrics => [...lyrics, response.data]);
            }).catch(e => {
                console.log(e);
            });
        }
    };


    //removes last set of lyrics from array
    //called when User guesses song name, thereby reloading the next set of lyrics
    const removeLastLyrics = () => {
        setLyrics(lyrics.slice(0, lyrics.length - 1));
    }

    //handles the user's song guess, displays correct or incorrect and stores result in [results]
    const songSongGuess = () => {
        if ((lyrics[lyrics.length - 1][0].song_title) == (songUserInput)) {
            document.getElementById("correctOrNot").innerHTML = "CORRECT</br> " + lyrics[lyrics.length - 1][0].song_title + "</br>";
            setNumCorrect(numCorrect + 1);
            setResults(results => [...results, (questionNum + 1) + ". CORRECT: <b>" + (lyrics[lyrics.length - 1][0].song_title) + "</b></br>"]);
        } else {
            document.getElementById("correctOrNot").innerHTML =
                "INCORRECT </br> The correct answer was: " + lyrics[lyrics.length - 1][0].song_title +
                "</br>You said: " + songUserInput + "</br>";
            setResults(results => [...results, (questionNum + 1) + ". INCORRECT: You said <b>" + (songUserInput) +
                "</b> and the correct answer was <b>" + (lyrics[lyrics.length - 1][0].song_title) + "</b></br>"]);
        }
        setQuestionNum(questionNum + 1);
        removeLastLyrics();
    }

    //handles game over
    const gameOver = () => {
        document.getElementById("submitSongForm").style.visibility = "hidden";
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("questions").innerHTML = "";
        results.forEach(element => document.getElementById("results").innerHTML += element);
        document.getElementById("results").innerHTML +=
            "</br>Total Score: " + numCorrect + "/" + numQuestions + " questions correct";
        document.getElementById("correctOrNot").innerHTML = "";
    }

    //resets all values; called on page load and when player clicks 'Play Again'
    const resetValues = () => {
        setLyrics([]);
        setQuestionNum(0);
        setNumCorrect(0)
        setResults([]);
        document.getElementById("submitSongForm").style.visibility = "visible";
        document.getElementById("playAgain").style.visibility = "hidden";
        document.getElementById("results").innerHTML = "";
        document.getElementById("correctOrNot").innerHTML = "";
    }

    const onChangeSongInput = e => {
        setsongUserInput(e.target.value);
    }

    return (
        <>
            <div className="bod text-center">
                <div className="cover-container d-flex p-2 mx-auto flex-column text-light">
                    <div className="container mb-2">
                        <header className="masthead mb-auto">
                            <div className="inner">
                                <h2 className="masthead-brand">LyricGuesser</h2>
                            </div>
                        </header>
                    </div>
                    <h3>Artist: {artistName}</h3>
                    <h4 id="questions">Question: {questionNum + 1}/{numQuestions}</h4>
                    {
                        (lyrics.length != 0) ?
                            <div>
                                <LyricList {...lyrics[lyrics.length - 1]} />
                            </div>
                            :
                            (console.log("empty"))
                    }
                    <div id="submitSongForm" className="container-fluid d-flex flex-column align-items-center justify-content-center">
                        <form>
                            <label htmlFor="insertSong"></label>
                            <input
                                type="text"
                                id="insertSong"
                                className="form-control"
                                placeholder="eg. Last Friday Night"
                                value={songUserInput}
                                onChange={onChangeSongInput}
                            />
                        </form>
                        <button onClick={songSongGuess} className="butt">
                            Submit
                        </button>
                    </div>
                    <div id="results"></div>
                    <div id="correctOrNot"></div>
                    <div className="d-flex align-items-center justify-content-center">
                        <button onClick={retreiveSongs} id="playAgain" className="d-flex butt">
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Lyrics;
