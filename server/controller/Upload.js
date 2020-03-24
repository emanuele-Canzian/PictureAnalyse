const vision = require('@google-cloud/vision');
const multer = require('multer');


//set Storage
const storage = multer.diskStorage({
  destination: '../images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('pictureField');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = {

  async upload(req, res) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err)
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: no file Selected'
          });
        } else {
          console.log(req.file);
          imageDir = `${process.cwd()}/images/`;
          const client = new vision.ImageAnnotatorClient({
            keyFilename: './ApiKey.json'
          });
          client
            .labelDetection(`${imageDir}${req.file.filename}`)
            .then(results => {
              const labels = results[0].labelAnnotations;
              labels.forEach(label => console.log(label));
              res.status(200).json({data: labels});
            })
            .catch(err => {
              console.error('ERROR:', err);
            });
        }
      }
    });
  }
};
