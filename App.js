const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = 'ff3e88f43e981c35bdc2f8cf7e8d533c';
app.get('/news/headlines', async (req, res) => {
  const { country, lang, category, from, to } = req.query;
  let apiUrl = `https://gnews.io/api/v4/top-headlines?apikey=${API_KEY}`;

  if (country) apiUrl += `&country=${country}`;
  if (lang) apiUrl += `&lang=${lang}`;
  if (category) apiUrl += `&category=${category}`;
  if (from) apiUrl += `&from=${from}`;
  if (to) apiUrl += `&to=${to}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching headlines', error });
  }
});

app.get('/news/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search results', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
