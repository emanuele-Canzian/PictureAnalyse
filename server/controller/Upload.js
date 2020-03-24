const vision = require('@google-cloud/vision');
const fs = require('fs');
const multer = require('multer');



//set Storage
const storage = multer.diskStorage({
  destination: '../images/',
  filename: function (req,file,cb) {
    cb(null,file.fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});
const upload = multer({
  storage : storage
}).single('pictureField');

module.exports={

  async upload(req, res){
    upload(req,res,(err) =>{
      if (err){
        console.log("u failed")
      }
      else{
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
    });

  }

};
