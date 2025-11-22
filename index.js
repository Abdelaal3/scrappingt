import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/today", async (req, res) => {
    const url = "https://livescore.bz/";
    
    try {
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const $ = cheerio.load(data);
        const matches = [];

        $(".score_row").each((i, el) => {
            matches.push({
                time: $(el).find(".score_time").text().trim(),
                league: $(el).find(".score_tournament").text().trim(),
                teamA: $(el).find(".score_home_txt").text().trim(),
                score: $(el).find(".score_score").text().trim(),
                teamB: $(el).find(".score_away_txt").text().trim(),
            });
        });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: "Scraping failed", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
