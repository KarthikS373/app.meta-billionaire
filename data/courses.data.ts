import { NextRouter } from "next/router";
import React from "react";

const data = {
  categories: [
    {
      id: 1,
      name: "Forex",
      slug: "forex",
      banner: "/course-category/forex.jpeg ",
      duration: 4,
      description:
        "Forex course offered by Swiper FX",
      btnText: "Full course here",
      onClick: (e: React.MouseEvent<HTMLButtonElement>, router: NextRouter) => {
        window.open(
          `https://swiperfx.gumroad.com/l/swiperfxcourse?_gl=1*655q6v*_ga*NzMwNDk4MzQxLjE2Nzc1ODcwNDA.*_ga_6LJN6D94N6*MTY3NzU4NzA0My4xLjEuMTY3NzU4NzE2My4wLjAuMA`
        );
      },
    },
  ],
  types: [
    { id: 0, type: "video" },
    { id: 1, type: "pdf" },
    { id: 2, type: "doc" },
  ],
};

export default data;
