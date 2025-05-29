"use client";
import Image from "next/image";
import useFetchData from "./hooks/useFetchData";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

const query = "asd";

const URL_GIPHY = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;

export default function Home() {

    const dataGif = useFetchData({ url: URL_GIPHY });

    return (
    <div>
      <h1>Hello world!</h1>
      {dataGif && (
        <Image
          priority={true}
          src={dataGif.data[0].images.original.url}
          width={parseInt(dataGif.data[0].images.original.width)}
          height={parseInt(dataGif.data[0].images.original.height)}
          alt={dataGif.data[0].alt_text}
        />
      )}
    </div>
  );
}
