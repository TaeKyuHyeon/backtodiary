const express = require("express");
const router = express.Router();
const generateImage = require("../generator");
const LanguageType = require("../const/languageType");

/**
 * @swagger
 * /generateImage:
 *   post:
 *     summary: Generate image based on prompt
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt for image generation
 *                 required: true
 *               language:
 *                 type: string
 *                 enum: ['en', 'kor']
 *                 description: The language for prompt (Default: 'en')
 *               generateImageCount:
 *                 type: integer
 *                 description: The count of generated images (Default: 2, Maximum: 5)
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
router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const language = req.body.language || LanguageType.EN; // Default to 'en' if not provided
    const generateImageCount =
      req.body.generateImageCount && req.body.generateImageCount <= 5
        ? req.body.generateImageCount
        : 2; // Default to 2, maximum 5

    // prompt와 inputString을 사용하여 이미지를 생성하는 함수 호출
    const generatedImage = await generateImage(
      prompt,
      language,
      generateImageCount
    );

    // 생성된 이미지를 클라이언트에 응답
    res.json({ generatedImage });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;