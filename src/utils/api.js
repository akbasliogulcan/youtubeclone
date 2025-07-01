import axios from "axios";
const api = axios.create({
           baseURL: "https://yt-api.p.rapidapi.com/",
           headers: {
                      'x-rapidapi-key': '4dd83e7089msheb1db90c30cb240p1205d6jsndfafbe5b86f4',
                      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
           },
           params: { geo: "TR", lang: "tr", }
});

export default api