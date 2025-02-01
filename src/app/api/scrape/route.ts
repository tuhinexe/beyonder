import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const links: string[] = [];
    const metaTags: Record<string, string> = {};
    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href) {
        links.push(href);
      }
    });
    $("meta").each((_, element) => {
      const property = $(element).attr("property");
      const content = $(element).attr("content");
      if (property && content) {
        metaTags[property] = content;
      }
    });

    return NextResponse.json({ success: true, links, metaTags });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to scrape the website" },
      { status: 500 }
    );
  }
}
