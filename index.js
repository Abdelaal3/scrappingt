import axios from "axios";

try {
    const res = await axios.get(
        "https://jdwel.com/wp-json/jmanager/web/v1/live/matches/",
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json",
                "Referer": "https://jdwel.com/today/",
                "Origin": "https://jdwel.com"
            },
        }
    );

    console.log(res.data);
} catch (err) {
    console.log(err.response?.status, err.response?.data);
}
