require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.json({ error: 'no file uploaded' });
  const { originalname: name, size, mimetype: type } = req.file;
  if (!name || !size || !type) return res.json({ error: 'no file data obtained' });
  res.json({ name, type, size });
})

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App ready: http://localhost:${listener.address().port} 🚀🚀🚀`)
})