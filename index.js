import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/today", async (req, res) => {
    try {
        const url = "https://www.worldfootball.net/all_matches/";
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });

        const $ = cheerio.load(data);
        const matches = [];

        $("table.standard_tabelle tr").each((i, el) => {
            const time = $(el).find("td:nth-child(1)").text().trim();
            const tournament = $(el).find("td:nth-child(2)").text().trim();
            const teamA = $(el).find("td:nth-child(3)").text().trim();
            const result = $(el).find("td:nth-child(4)").text().trim();
            const teamB = $(el).find("td:nth-child(5)").text().trim();

            if (teamA && teamB) {
                matches.push({
                    time,
                    tournament,
                    teamA,
                    result,
                    teamB,
                });
            }
        });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: "Scraping failed", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
