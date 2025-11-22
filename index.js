import express from "express";
import axios from "axios";

const app = express();

app.get("/today", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://jdwel.com/wp-json/jmanager/web/v1/live/matches/"
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Request failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
