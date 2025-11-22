import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/today", async (req, res) => {
    try {
        const url = "https://www.yallakora.com/tag/65219/%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF-%D9%85%D8%A8%D8%A7%D8%B1%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D9%8A%D9%88%D9%85";
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        const $ = cheerio.load(data);

        const matches = [];

        $(".match-card").each((i, el) => {
            matches.push({
                teamA: $(el).find(".teamA .teamName").text().trim(),
                teamB: $(el).find(".teamB .teamName").text().trim(),
                score: $(el).find(".matchCardScore").text().trim(),
                time: $(el).find(".matchCardTime").text().trim(),
                status: $(el).find(".matchStatus").text().trim(),
                league: $(el).find(".matchCardLeague").text().trim(),
            });
        });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: "Scraping failed", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
