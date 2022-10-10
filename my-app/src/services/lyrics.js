import http from "../http-common";

class LyricsDataService {
    getLyrics(artista = "Taylor Swift", by = null) {
        console.log("check 2");
        return http.get(`findartist?artist_name=${artista}`);
    }
}

export default new LyricsDataService();
