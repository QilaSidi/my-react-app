const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api", // Routes that go to the backend at port 8080
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );

    app.use(
        "/auth", // Routes that go to the backend at port 8082
        createProxyMiddleware({
            target: "http://localhost:8082",
            changeOrigin: true,
        })
    );
};
