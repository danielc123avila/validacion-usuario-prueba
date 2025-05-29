const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = 3001;

const TOKEN = "790cfdfb568c8ca697c72f52d8fab5af63ede025";

// Middleware para permitir CORS desde tu app Angular
app.use(cors());

// Middleware proxy
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://botai.smartdataautomation.com",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api": "/api_backend_ai",
    },
    onProxyReq: (proxyReq, req, res) => {
      // Agregar el token de autorización
      proxyReq.setHeader("Authorization", `Token ${TOKEN}`);
    },
    onError: (err, req, res) => {
      res.status(500).json({
        error: "Error en el proxy",
        message: err.message,
      });
    },
  })
);

process.removeAllListeners("warning");

// Servidor activo
app.listen(PORT, () => {
  console.log(`Proxy Node server escuchando en http://localhost:${PORT}`);
});
