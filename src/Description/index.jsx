import millify from "millify";
import React, { useState } from "react";
const Description = ({ video }) => {
  const [isOpen, setIsopen] = useState(false);
  const text = isOpen
    ? video.description
    : video.description.slice(0, 100) + "... daha fazla"; //* isOpen true ise description'ı tam göster, false ise ilk 100 karakteri göster ve "daha fazla" ekle
  return (
    <div
      onClick={() => setIsopen(!isOpen)} //* Tıklandığında isOpen state'ini değiştirir.
      className="mt-4 p-2 cursor-pointer bg-[#3e403f] hover:opacity-80 trasition duration-300"
    >
      <div className="flex gap-4 mb-2">
        <p>{millify(video.viewCount)} Görüntülenme</p>
        <p>
          {new Date(video.publishDate).toLocaleDateString("tr", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      {/* whitespace-pre-wrap satır sonlarını algılayarak texti yazdır */}
      <p className="whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default Description;
