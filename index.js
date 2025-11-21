import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/today", async (req, res) => {
    try {
        const url = "https://www.filgoal.com/matches/?date=2025-11-21";

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // استنى لحد ما العناصر تظهر
        await page.waitForSelector(".match-card", { timeout: 10000 });

        const matches = await page.evaluate(() => {
            const cards = document.querySelectorAll(".match-card");
            const result = [];

            cards.forEach((card) => {
                const teamA = card.querySelector(".teamA .teamName")?.innerText.trim() || "";
                const teamB = card.querySelector(".teamB .teamName")?.innerText.trim() || "";
                const score = card.querySelector(".matchCardScore")?.innerText.trim() || "";
                const time = card.querySelector(".matchCardTime")?.innerText.trim() || "";
                const status = card.querySelector(".matchStatus")?.innerText.trim() || "";
                const league = card.querySelector(".matchCardLeague")?.innerText.trim() || "";

                result.push({ teamA, teamB, score, time, status, league });
            });

            return result;
        });

        await browser.close();

        res.json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Scraping failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
