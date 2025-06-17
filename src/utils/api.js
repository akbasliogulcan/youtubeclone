import axios from "axios";
const api = axios.create({
           baseURL: "https://yt-api.p.rapidapi.com/",
           headers: {
                      "x-rapidapi-key": "8b1e983dedmsh3268031e2c3c296p19ea34jsn5df2ab48bc52",
                      "x-rapidapi-host": "yt-api.p.rapidapi.com"
           },
           params: { geo: "TR", lang: "tr", }
});

export default api