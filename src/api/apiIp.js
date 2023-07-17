const axios = require("axios");
const { API_KEY } = process.env;

const api = axios.create({
  baseUrl: "http://api.ipapi.com/api/",
});

module.exports = { api, API_KEY };
