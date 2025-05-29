"use client";
import { useEffect, useState } from 'react';
import { GifResponse } from './interfaces/gifInterface';
import Image from 'next/image';

const API_KEY = "IYH3EMsnih48LGbZ2oNdcqYvu2Vtip4Q";

const query = 'asd';

const URL_GIPHY = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;

export default function Home() {

    const [ data, setData ] = useState<GifResponse | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(URL_GIPHY);

                if(!response.ok){
                    throw new Error(`Response status ${response.status}`);
                }

                const dataGif = await response.json();

                setData(dataGif);
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [])

  return (
    <div>
        <h1>Hello world!</h1>
        {data && <Image priority={true} src={data.data[0].images.original.url} width={parseInt(data.data[0].images.original.width)} height={parseInt(data.data[0].images.original.height)} alt={data.data[0].alt_text}/>}
    </div>
  );
}
