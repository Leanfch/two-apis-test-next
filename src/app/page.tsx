"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

const URL_CAT_FACT = 'https://catfact.ninja/fact';

const useCatFact = () => {
    const [catFact, setCatFact] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCatFact() {
            try {
                const response = await fetch(URL_CAT_FACT);
                const data = await response.json();
                setCatFact(data.fact);
            } catch (error) {
                console.error("Failed to fetch cat fact:", error);
                setCatFact(null);
            }
        }

        fetchCatFact();
    }, []);

    return catFact;
};

const useGiphy = (query: string | null) => {
    const [gifUrl, setGifUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) return;

        const fetchGiphy = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const URL_GIPHY = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;
                const response = await fetch(URL_GIPHY);
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    setGifUrl(data.data[0].images.original.url);
                } else {
                    setError("No GIFs found for this query.");
                    setGifUrl(null);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message || "Failed to fetch GIF.");
                } else {
                    setError("An unexpected error occurred.");
                }
                setGifUrl(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGiphy();
    }, [query]);

    return { gifUrl, isLoading, error };
};

export default function Home() {
    const catFact = useCatFact();
    const query = catFact?.split(' ', 3).join(' ') || null;
    const { gifUrl, isLoading, error } = useGiphy(query);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Hello world!</h1>
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