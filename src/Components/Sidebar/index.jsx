import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../constants";
const index = ({ selectedCategory }) => {
  return (
    <aside>
      {categories.map((i, index) => (
        //*.map(...): Her kategori (i) için JSX öğesi oluşturur.
        // *index: Her elemanın sırasını belirtmek için kullanılır (key olarak).

        <Link to={`/?category=${i.path}`} key={index} className="category-link">
          <div
            className={`flex items-center gap-2 py-4 px-2 md:px-3 md:text-lg cursor-pointer rounded hover:bg-[#2d2d2d]
                      ${
                        (i.path === selectedCategory ||
                          (i.path === "/" && !selectedCategory)) &&
                        "bg-[#242424]"
                      }`} //*BURADA SEÇİLEN KATEGORİYİ VURGULAMA(ÜSTÜNE GELİNDİĞİNDE) YAPILDI.
          >
            <span className="max-md:text-2xl">{i.icon}</span>
            <span className="max-md:hidden">{i.name} </span>
            {/*max-md:hidden: Mobilde isimleri gizler. Yani mobilde sadece icon görünür. */}
          </div>
          {i.divider && <hr />}
          {/* //*divider varsa constants da yani alttan çizgiekler. */}
        </Link>
      ))}
    </aside>
  );
};

export default index;
