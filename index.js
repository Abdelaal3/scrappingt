import axios from "axios";

try {
    const res = await axios.get(
        "https://jdwel.com/wp-json/jmanager/web/v1/live/matches/",
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "ar,en-US;q=0.9,en;q=0.8",
                "Referer": "https://jdwel.com/today/",
                "Origin": "https://jdwel.com",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            },
        }
    );

    console.log(res.data);
} catch (err) {
    console.log(err.response?.status, err.response?.data);
}
