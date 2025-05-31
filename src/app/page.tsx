"use client";
import Image from "next/image";
import useCatFact from './hooks/useCatFact';
import useGiphy from './hooks/useGiphy';
import { useState } from "react";

const URL_CAT_FACT = 'https://catfact.ninja/fact';

export default function Home() {
    const [ refresh, setRefresh ] = useState<boolean>(false);
    const catFact = useCatFact({ url: URL_CAT_FACT, refresh });
    const query = catFact?.split(' ', 3).join(' ') || '';
    const { gifUrl, isLoading, error } = useGiphy({ query: query});

    function handleClick() {
        setRefresh(prev => !prev);
    }


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex justify-center p-5 flex-col items-center gap-5">
            <p className="text-xl">{query}</p>
            <button onClick={handleClick}
            className="bg-sky-300 px-5 py-3 rounded-full hover:bg-sky-500 transition-colors cursor-pointer font-bold text-sky-50 shadow-md hover:shadow-lg"
            >Nuevo gif</button>
            {gifUrl && (
                <Image
                    priority={true}
                    src={gifUrl}
                    width={200}
                    height={200}
                    alt="Generated GIF"
                />
            )}
        </div>
    );
}