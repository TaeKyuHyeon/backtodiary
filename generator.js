const axios = require("axios");
const config = require("config");
const LanguageType = require("./const/languageType");

async function generateImage(prompt, lang, count) {
  const apiUrl = config.get("apiUrl");
  const negativePrompt = config.get(`${lang}NegativePrompt`);
  const promptPrefix = config.get(`${lang}PromptPrefix`);

  const headers = {
    Authorization: config.get("karloRestApiKey"),
    "Content-Type": "application/json",
  };

  const data = {
    prompt: promptPrefix + prompt,
    negative_prompt: negativePrompt,
    samples: count,
  };

  const response = await axios.post(apiUrl, data, { headers });
  return response.data;
}

module.exports = generateImage;
