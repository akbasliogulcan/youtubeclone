import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api"; //*api: Api isteklerini yönetmek için kullanılan bir araçtır.
import VideoCard from "../../Components/Videocard";
const Feed = () => {
  //*State kurulumları
  let [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //* Url'deki parametreye eriş
  const [params] = useSearchParams(); //*useSearchParams: React Router'da URL parametrelerini yönetmek için kullanılır.
  const selectedCategory = params.get("category"); //*buradaki category Sidebar daki /?category ile aynı olmak zorunda.

  //!Sayfa yüklendiği anda Api isteği at
  useEffect(() => {
    //*Api isteği atılacak url'i belirle
    const url = !selectedCategory
      ? "/home"
      : selectedCategory === "trending"
      ? "/trending"
      : `/search?query=${selectedCategory}`;
    //!Api isteği at
    api
      .get(url)
      .then((res) => setVideos(res.data.data)) //*başarılı olursa
      .catch((err) => setError(err.message)) //*hata olursa
      .finally(() => setIsLoading(false)); //*her durumda isLoading false olacak
  }, [selectedCategory]); //*selectedCategory değiştiğinde useEffect tetiklenecek

  //*Gelen  video verisi içinde type'ı "video" olanları filtrele
  videos = videos.filter((video) => video.type === "video");

  return (
    <div className="flex">
      <Sidebar selectedCategory={selectedCategory} />
      <div className="videos">
        {/* isloading ise yükleniyor,  hata varsa hata, bunların hiçbiri yoksa videoları map'le. */}
        {isLoading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          videos.map((video, key) => <VideoCard key={key} video={video} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
