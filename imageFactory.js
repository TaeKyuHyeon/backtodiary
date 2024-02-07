const { createCanvas, loadImage, registerFont } = require('canvas');

async function createCombinedImage(overlayImagePath, text) {
    // 캔버스 생성 (1080x1420 비율)
    const canvas = createCanvas(1080, 1420);
    const context = canvas.getContext('2d');

    // 배경 이미지 로드
    const bgImage = await loadImage("./resources/bg.jpg");
    context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // 첨부 이미지 로드 및 배치
    const overlayImage = await loadImage(overlayImagePath);
    // 이미지를 중앙에 배치
    const overlayX = (canvas.width - overlayImage.width) / 2;
    const overlayY = (canvas.height - overlayImage.height) / 2;
    context.drawImage(overlayImage, overlayX, overlayY);

    // 폰트 로드
    registerFont("./resources/font/diary.ttf", { family: 'MyFont' });

    // 텍스트 스타일 설정
    context.font = '40px MyFont'; // 폰트 사이즈와 폰트명 설정
    context.fillStyle = 'white'; // 텍스트 색상 설정
    context.textAlign = 'center'; // 텍스트 정렬 설정

    // 텍스트를 캔버스 중앙에 배치
    const textX = canvas.width / 2;
    const textY = canvas.height - 50;
    context.fillText(text, textX, textY);

    // 이미지를 파일로 저장
    // const outputStream = fs.createWriteStream(outputPath);
    // const stream = canvas.createPNGStream(); // PNG 형식으로 저장할 수 있습니다.
    // stream.pipe(outputStream);
    // outputStream.on('finish', () => console.log('Image created successfully'));
    
    // 캔버스의 이미지 데이터를 base64 형식의 데이터 URL로 변환하여 반환
    const imageData = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imageData, 'base64');

    return buffer;
    // res.writeHead(200, {
    //     'Content-Type': 'image/png',
    //     'Content-Length': buffer.length
    // });
    // res.end(buffer);
}

// 함수 호출
// createCombinedImage(
//     'background.jpg', // 배경 이미지 경로
//     'overlay.png', // 첨부 이미지 경로
//     'Hello, World!', // 텍스트 내용
//     'font.ttf', // 사용할 폰트 파일 경로
//     'output.png' // 생성된 이미지의 출력 경로
// );

module.exports = createCombinedImage;