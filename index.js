import express from "express";
import axios from "axios";

const app = express();
const API_KEY = "YOUR_API_KEY";

app.get("/today", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.football-data.org/v4/matches",
            {
                headers: {
                    "X-Auth-Token": API_KEY,
                },
            }
        );

        res.json(response.data.matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("running"));
