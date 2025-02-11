import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "true",
    methods: ["GET"],
    credentials: true,
  })
);

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Lütfen bir şehir adı girin." });
  }

  const API_KEY = process.env.KEY;
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

  try {
    console.log("API isteği yapılıyor:", API_URL);
    const response = await axios.get(API_URL);
    console.log("API yanıtı:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("API hatası:", error.response?.data || error.message);
    res.status(500).json({ error: "Hava durumu verisi alınamadı." });
  }
});

app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
