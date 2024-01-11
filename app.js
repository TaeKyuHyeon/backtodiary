const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const config = require("config");

const app = express();
const port = 3000;

// 환경에 따라 설정 파일을 로드합니다.
console.log("config:", config.util.toObject());
app.use(bodyParser.json());

app.post("/generateImage/:prompt", async (req, res) => {
  try {
    const prompt = req.params.prompt;

    // prompt와 inputString을 사용하여 이미지를 생성하는 함수 호출
    const generatedImage = await generateImage(prompt);

    // 생성된 이미지를 클라이언트에 응답
    res.json({ generatedImage });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 이미지 생성 함수
async function generateImage(prompt) {
  // config.js에서 apiUrl 가져오기
  const apiUrl = config.get("apiUrl");
  const negativePrompt = config.get("negativePrompt");
  const promptPrefix = config.get("promptPrefix");
  const generateImageCount = 2;

  // POST 요청 헤더 설정
  const headers = {
    Authorization: config.get("karloRestApiKey"),
    "Content-Type": "application/json",
    // 추가적인 헤더 값들을 설정할 수 있습니다.
  };

  const data = {
    prompt: promptPrefix + prompt,
    negative_prompt: negativePrompt,
    samples: generateImageCount,
    // 추가적인 필요한 데이터를 설정할 수 있습니다.
  };

  const response = await axios.post(apiUrl, data, { headers });

  // 생성된 이미지 또는 이미지 URL을 반환
  return response.data;
}

app.listen(port, '0.0.0.0', () => {
  const ip = require('ip');
  console.log(`Server is running at http://${ip.address()}:${port}`);
});