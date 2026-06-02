const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { auth, adminOnly } = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

router.post('/', auth, adminOnly, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'shophub', transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }] },
      (err, result) => err ? reject(err) : resolve(result)
    ).end(req.file.buffer);
  });

  res.json({ url: result.secure_url });
});

module.exports = router;
