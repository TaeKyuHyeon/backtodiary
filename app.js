const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const config = require("config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./config/swaggerDef");

const app = express();
const port = 3000;

// 환경에 따라 설정 파일을 로드합니다.
console.log("config:", config.util.toObject());
app.use(bodyParser.json());
// 모든 경로에 대해 CORS 허용
app.use(cors());
// 또는 특정 경로에 대해서만 CORS 허용
// app.use("/api", cors());


const options = {
  definition: swaggerDef,
  apis: ["app.js", "./routes/*.js"], // API를 기술한 파일들의 경로
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
/**
 * @swagger
 * /generateImage/{prompt}:
 *   post:
 *     summary: Generate image based on prompt
 *     parameters:
 *       - in: path
 *         name: prompt
 *         description: The prompt for image generation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt for image generation
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generatedImage:
 *                   type: object
 *                   description: Information about the generated image
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the generated image
 *                     model_version:
 *                       type: string
 *                       description: The version of the image generation model
 *                     images:
 *                       type: array
 *                       description: Array of generated images
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The ID of the image
 *                           image:
 *                             type: string
 *                             format: uri
 *                             description: The URL of the generated image
 *                           seed:
 *                             type: integer
 *                             description: The seed used for image generation
 *                           nsfw_content_detected:
 *                             type: boolean
 *                             description: Whether NSFW content is detected
 *                           nsfw_score:
 *                             type: number
 *                             description: NSFW score of the image
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
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

/**
 * @swagger
 * /example:
 *   get:
 *     description: Example endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get("/example", (req, res) => {
  res.send("Hello, Swagger!");
});

app.listen(port, "0.0.0.0", () => {
  const ip = require("ip");
  console.log(`Server is running at http://${ip.address()}:${port}`);
});
