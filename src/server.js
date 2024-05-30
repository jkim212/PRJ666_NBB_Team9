const express = require('express');
const passport = require('passport');
const connectDB = require('./config/database');
const otpRoutes = require('./routes/otpRoutes');
const testingRoutes = require('./routes/testing');
const multer = require('multer');
const Post = require('./models/post');
const fs = require('fs');
const uploadMiddleware = multer({ dest: 'uploads/' });
var cors=require('cors');
require('./utils/passport');

const app = express();
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(passport.initialize());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  // Start server if database connection is successful
  app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit process with failure
});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {id,title,content} = req.body;
  const postDoc = await Post.findById(id);
  await postDoc.update({
    title,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

    res.json(postDoc);
  });

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);


  const { title, content } = req.body;
  const postDoc = await Post.create({
    title,
    content,
    image: newPath,
  });
  res.json(postDoc);
  console.log(postDoc);
});

app.get('/post', async (req,res) => {
  res.json(await Post.find().sort({createdAt: -1}));
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
})

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/testing', (req, res) => {
  res.send('testing route');
});
app.use('/', otpRoutes);
app.use('/', testingRoutes);
