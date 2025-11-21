import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.get("/", (req, res) => {
    res.send("Working!");
});

// API endpoint هنعمل فيه Scraping بعدين
app.get("/today", async (req, res) => {
    res.json({ message: "Scraping will be here" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
