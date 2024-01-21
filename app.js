const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./config/swaggerDef");
const routes = require("./routes");

const app = express();
const port = 3000;

console.log("config:", config.util.toObject());
app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: swaggerDef,
  apis: ["app.js", "./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", routes);

app.listen(port, "0.0.0.0", () => {
  const ip = require("ip");
  console.log(`Server is running at http://${ip.address()}:${port}`);
});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./config/swaggerDef");
const routes = require("./routes");

const app = express();
const port = 3000;

console.log("config:", config.util.toObject());
app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: swaggerDef,
  apis: ["app.js", "./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", routes);

app.listen(port, "0.0.0.0", () => {
  const ip = require("ip");
  console.log(`Server is running at http://${ip.address()}:${port}`);
});
