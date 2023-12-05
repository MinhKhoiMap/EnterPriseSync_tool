import { createProxyMiddleware } from "http-proxy-middleware";

export default function app() {
  app.use(
    createProxyMiddleware("/endpoint", {
      target: "url",
      changeOrigin: true,
    })
  );
}
