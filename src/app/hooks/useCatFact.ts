import { useState, useEffect } from 'react';

interface props {
    url: string
    refresh: boolean
}

const useCatFact = ({ url, refresh }: props) => {
    const [catFact, setCatFact] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCatFact() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setCatFact(data.fact);
            } catch (error) {
                console.error("Failed to fetch cat fact:", error);
                setCatFact(null);
            }
        }

        fetchCatFact();
    }, [url, refresh]);

    return catFact;
};

export default useCatFact