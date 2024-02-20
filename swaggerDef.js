const swaggerDef = {
    openapi: '3.0.0',
    info: {
      title: 'BackToDiary',
      version: '1.0.0',
      description: 'Generate Photo Diary by a child’s perspective. based-ai',
    },
    servers: [
      {
        url: 'http://localhost:3000', // 서버 주소
        description: 'Local server',
      },
    ],
  };
  
  module.exports = swaggerDef;
  