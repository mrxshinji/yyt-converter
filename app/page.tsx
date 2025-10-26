"use client";

import { useEffect, useState } from "react";
import type { CardData } from "@/app/types"; // or "@/lib/types"
import Image from "next/image";

export default function Home() {
  const [url, setUrl] = useState(
    "https://yuyu-tei.jp/sell/gcg/s/search?vers[]=gd02&vers[]=reto"
  );
  const [rate, setRate] = useState(0.032);
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cards?url=${encodeURIComponent(url)}&rate=${rate}`
      );
      const data = await res.json();
      setCards(data.cards);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Yuyu-Tei Card Converter</h1>

      {/* Input area */}
      <div className='flex flex-col md:flex-row gap-3 mb-6'>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter Yuyu-Tei URL'
          className='flex-1 border p-2 rounded-md'
        />
        <input
          type='number'
          value={rate}
          step='0.001'
          onChange={(e) => setRate(parseFloat(e.target.value))}
          placeholder='Conversion rate (e.g. 0.032)'
          className='w-40 border p-2 rounded-md'
        />
        <button
          onClick={handleFetch}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        >
          Fetch
        </button>
      </div>

      {/* Cards display */}
      {loading ? (
        <p>Loading cards...</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {cards.map((card) => (
            <div
              key={card.name}
              className='border p-2 rounded-lg shadow hover:shadow-lg'
            >
              {card.link && (
                <Image
                  src={card.link}
                  alt={card.name}
                  width={100}
                  height={140}
                  className='rounded-md mb-2'
                />
              )}
              <h2 className='font-semibold text-sm'>{card.name}</h2>
              <p>
                ¥{card.yen} → {card.converted}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
