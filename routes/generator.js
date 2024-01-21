const express = require("express");
const router = express.Router();
const generateImage = require("../generator");

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
    const generatedImage = await generateImage(prompt);
    res.json({ generatedImage });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
