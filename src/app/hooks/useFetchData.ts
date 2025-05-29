"use client";
import { useState, useEffect } from 'react';
import { GifResponse } from '../interfaces/gifInterface';

interface useFetchDataProps {
    url: string,
}

const useFetchData = function({ url }: useFetchDataProps)  {
     const [ data, setData ] = useState<GifResponse | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(url);

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
    }, [url])

    return data 
}

export default useFetchData;