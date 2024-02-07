const express = require("express");
const router = express.Router();
const createCombinedImage = require("../imageFactory");

router.post("/", async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;
    const text = req.body.text;
   
    const generatedImageBuffer = await createCombinedImage(
      imageUrl,
      text
    );

    // 생성된 이미지를 클라이언트에 응답
    // res.json({ generatedImage });
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': generatedImageBuffer.length
    });
    res.end(generatedImageBuffer);
  } catch (error) {
    console.error("Error generating merged image:", error.message);
    res.status(500).json({ error: "Internal Server Error(cavas)" });
  }
});

module.exports = router;