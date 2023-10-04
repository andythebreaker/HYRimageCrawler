const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const sharp = require('sharp'); // 使用Sharp圖片處理庫

const app = express();
const port = 45837;

var width = 3000;
var height = 3000;
var stat = 0;

// Set up multer storage and filter for image files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Error: Only JPEG, JPG, and PNG files are allowed!');
    }
  },
});

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Serve HTML form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/up.html');
});

app.get('/width', (req, res) => {
  res.send(width.toString());
});

app.get('/height', (req, res) => {
  res.send(height.toString());
});

app.get('/stat', (req, res) => {
  res.send(stat.toString());
});

//set width and height
app.get('/setwidth', (req, res) => {
  width = req.query.width;
  res.send(width.toString());
});

app.get('/setheight', (req, res) => {
  height = req.query.height;
  res.send(height.toString());
});

app.get('/setstat', (req, res) => {
  stat = req.query.stat;
  res.send(stat.toString());
});

// Handle file upload
app.post('/upload',upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
