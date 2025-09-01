import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder with our html files
const SRC_DIR = path.join(__dirname, "src");

// Static assets (if you later add images/js/css files)
app.use(express.static(SRC_DIR));

// Routes
app.get("/", (_req, res) => {
  res.sendFile(path.join(SRC_DIR, "home.html"));
});

app.get("/about", (_req, res) => {
  res.sendFile(path.join(SRC_DIR, "about.html"));
});

app.get("/contact", (_req, res) => {
  res.sendFile(path.join(SRC_DIR, "contact.html"));
});

// 404 fallback (optional)
app.use((req, res) => {
  res.status(404).send(`
    <style>
      body{font-family:system-ui,Segoe UI,Roboto,Arial,Helvetica,sans-serif;display:grid;place-items:center;height:100dvh;margin:0;background:#0f172a;color:#e2e8f0}
      .card{background:#111827;border:1px solid #1f2937;padding:2rem 2.25rem;border-radius:14px;max-width:520px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.25)}
      a{color:#93c5fd;text-decoration:none}
      a:hover{text-decoration:underline}
    </style>
    <div class="card">
      <h1>404 - Page Not Found</h1>
      <p>We couldn't find <code>${req.path}</code></p>
      <p><a href="/">Go to Home</a></p>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Simple site running at http://localhost:${PORT}`);
});
