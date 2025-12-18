import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookiParser from "cookie-parser";
import fetch from "node-fetch";
import * as fs from 'fs';

dotenv.config();
const app = express();
const port = process.env.PORT;
const API_URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;
const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookiParser());

app.get('/', (req, res) => {
    res.send("Weather app backend ");
});

// app.get('/api/v1/forecast', async (req, res) => {
//     const { lat, lon, cnt } = req.query;

//     if (!lat || !lon || !cnt) {
//         return res.status(400).json({ success: false, message: 'lat, lon, and cnt parameters are required' });
//     }

//     try {

//         const url = `${API_URL}?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API_KEY}&units=metric`;
//         console.log(API_KEY);
//         console.log(url);
//         const response = await fetch( url, {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//         });

//         const result = await response.json();
//         res.status(200).json({success: true, message: "Successfully get forecast report.", data: result});

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ success: false ,message: 'Failed to fetch forecast data' });
//     }
// });

app.get('/api/v1/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ success: false, message: "lat and lon parameters are required" });
    }

    try {
        const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        // console.log(lat + " " + lon);
        // console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        res.status(200).json({ success: true, message: "Successfully get weather report.", data: result });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch forecast data' });
    }
});

app.get('/api/v1/weather/bySearch', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        // const response = await axios.get(url);
        // res.json(response.data);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        res.status(200).json({ success: true, message: "Successfully get weather report.", data: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/api/v1/cities', async (req, res) => {
    const { q = '' } = req.query;
    try {
        const cities = await JSON.parse(fs.readFileSync('./assets/data/cities.json', 'utf-8'));

        if (!q || q.length < 2) {
            return res.json([]);
        }

        // console.log("query = ", q);

        const match = cities
            .filter(city =>
                city.name.toLowerCase().startsWith(q.toLowerCase())
            )
            .map(city => `${city.name}`)
            .slice(0, 20);

        res.status(200).json({ success: true, message: "Successfully get cities.", data: match });
        // console.log(typeof(match));

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch city data : ' + error.message })
    }

});


app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}`);
});


