import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // useSearchParams: React Router'da URL parametrelerini yönetmek için kullanılır.
import api from "../../utils/api"; // Importing the API utility for making requests
import VideoCard from "../../Components/Videocard";
import { BasicLoader } from "../../Components/Loader";
import { Error } from "../../Components/Error";
const Result = () => {
  //* Result sayfası, arama sonuçlarını göstermek için kullanılır

  //*state kurulumu
  let [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);

  //Url deki search_query parametresine eriş
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query"); // search_query parametresini alır,

  //*Api ya gönderilecek parametreleri ayarla
  const params = {
    query,
    token: page > 1 ? token : null,
  };

  //! Api isteği at
  useEffect(() => {
    api
      .get("/search", { params })
      .then((res) => {
        console.log(res);

        setVideos((prev) => [...prev, ...res.data.data]),
          setToken(res.data.continuation);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  //*Gelen  video verisi içinde type'ı "video" olanları filtrele
  videos.data = videos.data?.filter((video) => video.type === "video");

  return (
    <div className=" p-4 sm:p-6 md:p-10 h-[93vh] overflow-y-auto results">
      {isLoading ? (
        <BasicLoader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <h2 className="text-2xl">
            <span className="font-bold">{query}</span> için sonuçlar
          </h2>
          {videos.data?.map((i, key) => (
            <VideoCard key={key} video={i} isRow />
          ))}
          <div className="flex justify-center">
            <button
              onClick={() => setPage(page + 1)}
              className="bg-zinc-600 py-2 px-5 rounded-md my-10 cursor-pointer hover:bg-zinc-800 transition duration-300"
            >
              Daha Fazla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
