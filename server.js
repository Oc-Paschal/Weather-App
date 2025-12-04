import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
  const city = req.query.city;


  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "City not found or API error",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


