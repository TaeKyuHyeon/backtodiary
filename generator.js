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
    return_type: "base64_string",
    width: 560,
    height: 392,
  };

  let response = await axios.post(apiUrl, data, { headers });
  console.error(response.data);
  const modifiedImages = response.data.images.map((image) => {
    return { ...image, image: "data:image/png;base64," + image.image };
  });
  response.data.images = modifiedImages;
  return response.data;
}

module.exports = generateImage;
