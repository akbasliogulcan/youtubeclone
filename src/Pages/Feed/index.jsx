import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api"; //*api: Api isteklerini yönetmek için kullanılan bir araçtır.
const Feed = () => {
  //*State kurulumları
  const [videos, setVideos] = useState([]);
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
  }, []);

  return (
    <div className="flex">
      <Sidebar selectedCategory={selectedCategory} />
      <div className="videos">
        {/* isloading ise yükleniyor hata varsa  hata, bunların hiçbiri yoksa maplenecek */}
        {isLoading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          videos.map((video) => <h1>{video.title}</h1>)
        )}
      </div>
    </div>
  );
};

export default Feed;
