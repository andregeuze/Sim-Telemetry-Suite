var { FuseBox, CSSPlugin } = require("fuse-box")

var fuse = FuseBox.init({
    homeDir: "./app",
    output: "wwwroot/$name.js",
    cache: true,
    log: true,
    debug: true,
    plugins: [
        CSSPlugin()
    ]
})

fuse.dev({
    port: 5555,
    socketURI: "ws://localhost:5556",
    root: "wwwroot",
    fallback: "index.html",
    proxy: {
        "/hub": {
            target: "http://localhost:55003",
            changeOrigin: true,
            pathRewrite: {
                "^/hub": "/",
            },
        },
    }
});

fuse.bundle("app")
    .instructions("> app.js")
    .watch()
    .hmr({ reload: true })

fuse.run()