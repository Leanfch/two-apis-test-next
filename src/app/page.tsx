"use client";
import Image from "next/image";
import useCatFact from './hooks/useCatFact';
import useGiphy from './hooks/useGiphy';

const URL_CAT_FACT = 'https://catfact.ninja/fact';

export default function Home() {
    const catFact = useCatFact({ url: URL_CAT_FACT });
    const query = catFact?.split(' ', 3).join(' ') || '';
    const { gifUrl, isLoading, error } = useGiphy({ query: query});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex justify-center p-5 flex-col items-center gap-5">
            <p className="text-xl">{query}</p>
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