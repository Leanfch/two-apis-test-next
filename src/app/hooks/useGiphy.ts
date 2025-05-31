import { useEffect, useState } from 'react';

interface props {
    query: string | ''
}

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

const useGiphy = ({ query }: props) => {
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

export default useGiphy;