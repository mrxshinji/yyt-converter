
import axios from "axios";
import * as cheerio from "cheerio";
import { CardData } from "@/app/types"; // or "@/lib/types" if you placed it there

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const rate = parseFloat(searchParams.get("rate") || "0.032");

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);
    const cards: CardData[] = [];
    
    $(".card-product").each((_, el) => {
      const name = $(el).find(".text-primary").text().trim();
      const priceText = $(el).find(".text-end").first().text().trim();
      const yenValue = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;
      const converted = (yenValue * rate).toFixed(2);
      const link = $(el).find('.product-img').find(`img`).attr('src');
      if (name && yenValue > 0) {
        cards.push({ name, yen: yenValue, converted, link: link });
      }
    });
    
    return Response.json({ rate: rate, cards});
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 }
    );
  }
}