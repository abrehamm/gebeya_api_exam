const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const itemRouter = require("./routes/item");
const cartRouter = require("./routes/cart");
const userRouter = require("./routes/user");

const app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

mongoose
  .connect("mongodb://localhost:27017/gebeya", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log("DB connection failed, check it!");
  });

app.use("/items", itemRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple API application made with Express and documented with Swagger",

      contact: {
        name: "Abreham M.",
        url: "https://github.com/abrehamm",
        email: "abruki07@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./routes/cart.js", "./routes/item.js", "./routes/user.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error message for all unsupported routes
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = app;
