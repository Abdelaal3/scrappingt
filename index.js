import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/news", async (req, res) => {
  const url = "https://www.alwafd.news/5596662";

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    const title = $(".news-post h1").text().trim();
    const date = $(".info time").text().trim();

    const paragraphs = [];
    $(".paragraph-list p").each((i, el) => {
      paragraphs.push($(el).text().trim());
    });

    res.json({
      title,
      date,
      paragraphs,
    });

  } catch (err) {
    res.status(500).json({
      error: "Scraping failed",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
