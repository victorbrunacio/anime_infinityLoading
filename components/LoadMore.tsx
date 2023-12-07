"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchAnime } from "@/app/action";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2
function LoadMore() {
  const { ref, inView } = useInView({})
  const [data, setdata] = useState<AnimeProp[]>([])


  useEffect(() => {
    if (inView) {
      fetchAnime(page++)
        .then((res) => {
          //setando a data assim, sempre vai geral um acumulo assim quando for chegar no final da pagina aonde o loading vai estar, ele vai aumentando o array com novos filmes
          setdata([...data, ...res])
        })
    }
  }, [inView, data]);
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index:number ) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref} >
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
