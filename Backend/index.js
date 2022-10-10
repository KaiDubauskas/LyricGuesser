//kotolominian: 674901d3b7ce431d138e4b784ec18a2e
//JonnyKorlet: dc2bed87b28488950c39ff2c0ff2ec2d
//Ranas: f1865c1ca1fde95012cf743b577990fe
//Mine: 674901d3b7ce431d138e4b784ec18a2e
const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5000/',
    credentials: true,
    optionSuccessStatus: 200,
}
require('dotenv').config()
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const url = `https://api.musixmatch.com/ws/1.1/`;
const key = process.env.API_KEY;

app.get('/', (req, res) => {
    res.send('Hello from homepage');
});
//taylor swift artist id  259675

let albums = [];
let song = [];
let lyrics = [];

const getArtist = async (req, res) => {
    axios.get(`${url}/artist.search?q_artist=${req.query.artist_name}&page_size=1&apikey=${key}`)
        .then((response) => {
            let data = response.data.message.body.artist_list[0].artist.artist_id;
            retreiveAlbumsFromArtist(data, res);
        })
        .catch((error) => {
            console.log(error);
        });
}

const retreiveAlbumsFromArtist = async (req, res) => {
    albums = [];
    axios.get(`${url}/artist.albums.get?artist_id=${req}&apikey=${key}`)
        .then((response) => {
            const data = response.data;
            data.message.body.album_list.forEach((element) =>
                albums.push({ album_name: element.album.album_name, album_id: element.album.album_id })
            );
            getSongsFromRandomAlbum(req, res);
        })
        .catch((error) => {
            console.log(error);
        });
}


const getSongsFromRandomAlbum = async (req, res) => {
    song = [];
    let numGenerator = Math.floor(Math.random() * albums.length);
    axios.get(`${url}/album.tracks.get?album_id=${albums[numGenerator].album_id}&apikey=${key}`)
        .then((response) => {
            const data = response.data;
            let numGeneratorTwo = Math.floor(Math.random() * data.message.body.track_list.length);
            song.push({
                song_title: data.message.body.track_list[numGeneratorTwo].track.track_name,
                artist: data.message.body.track_list[numGeneratorTwo].track.artist_name,
                album: data.message.body.track_list[numGeneratorTwo].track.album_name

            });
            getLyricsFromSong(req, res);
        })
        .catch((error) => {
            console.log(error);
        });
}

const getLyricsFromSong = async (req, res) => {
    lyrics = [];
    await axios.get(encodeURI(`${url}/matcher.lyrics.get?q_track=${song[song.length - 1].song_title}&q_artist=${song[song.length - 1].artist}&apikey=${key}`))
        .then((response) => {
            const data = response.data;
            lyrics.push({
                song_title: song[song.length - 1].song_title,
                artist: song[song.length - 1].artist,
                album: song[song.length - 1].album,
                lyrics: data.message.body.lyrics.lyrics_body
            });
            res.send(lyrics);
        })
        .catch((error) => {
            console.log(error);
        });
}

app.get('/findartist', (req, res) => {
    getArtist(req, res);
    console.log("Request Received");
})

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})
