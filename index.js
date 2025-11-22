import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/matches", async (req, res) => {
  try {
    const url = "https://jdwel.com/today/";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "ar",
        "Referer": "https://jdwel.com/",
      },
    });

    const $ = cheerio.load(data);
    const matches = [];

    $(".match_row").each((_, el) => {
      const homeTeam = $(el).find(".hometeam .the_team").text().trim();
      const awayTeam = $(el).find(".awayteam .the_team").text().trim();
      const homeLogo = $(el).find(".hometeam img").attr("src");
      const awayLogo = $(el).find(".awayteam img").attr("src");
      const score = $(el).find(".match_score").text().trim();
      const time = $(el).find(".the_time").text().trim();

      matches.push({
        homeTeam,
        awayTeam,
        score,
        time,
        homeLogo,
        awayLogo,
      });
    });

    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Scraping failed",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
