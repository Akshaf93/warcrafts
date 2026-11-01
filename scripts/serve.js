// Minimal static server for local preview: node scripts/serve.js  → http://localhost:8080
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "site");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (req.method === "POST") { res.writeHead(200); return res.end("ok (local preview — forms only work on Netlify)"); }
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": types[".html"] }); return res.end(fs.readFileSync(path.join(root, "404.html"))); }
    res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(process.env.PORT || 8080, () => console.log("Preview: http://localhost:" + (process.env.PORT || 8080)));
