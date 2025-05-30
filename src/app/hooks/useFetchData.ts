"use client";
import { useState, useEffect } from 'react';

interface useFetchDataProps {
    url: string,
}

const useFetchData = function({ url }: useFetchDataProps) : object | null  {
     const [ data, setData ] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(url);

                if(!response.ok){
                    throw new Error(`Response status ${response.status}`);
                }

                const responseData = await response.json();

                setData(responseData);
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [url])

    return data 
}

export default useFetchData;