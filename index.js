import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/today", async (req, res) => {
    try {
        const url = "https://www.filgoal.com/matches";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const matches = [];

        $(".match-card").each((i, el) => {
            const teamA = $(el).find(".teamA .teamName").text().trim();
            const teamB = $(el).find(".teamB .teamName").text().trim();
            const score = $(el).find(".matchCardScore").text().trim();
            const time = $(el).find(".matchCardTime").text().trim();
            const status = $(el).find(".matchStatus").text().trim();
            const league = $(el).find(".matchCardLeague").text().trim();

            matches.push({
                teamA,
                teamB,
                score,
                time,
                status,
                league,
            });
        });

        res.json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Scraping failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
