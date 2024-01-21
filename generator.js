const axios = require("axios");
const config = require("config");

async function generateImage(prompt) {
  const apiUrl = config.get("apiUrl");
  const negativePrompt = config.get("negativePrompt");
  const promptPrefix = config.get("promptPrefix");
  const generateImageCount = 2;

  const headers = {
    Authorization: config.get("karloRestApiKey"),
    "Content-Type": "application/json",
  };

  const data = {
    prompt: promptPrefix + prompt,
    negative_prompt: negativePrompt,
    samples: generateImageCount,
  };

  const response = await axios.post(apiUrl, data, { headers });
  return response.data;
}

module.exports = generateImage;
