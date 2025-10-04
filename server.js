const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const app = express();
const PORT = 3000;

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, fileFilter: (_, file, cb) => {
  cb(null, file.mimetype.startsWith('audio/'));
}});

// Serve static files
app.use(express.static(__dirname));
app.use('/uploads', express.static(uploadDir));

// Upload route
app.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file || !req.body.title) {
    return res.status(400).send('Missing title or audio file');
  }
  res.send(`<p>✅ Uploaded: ${req.body.title}</p><audio controls src="/uploads/${req.file.filename}"></audio>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
