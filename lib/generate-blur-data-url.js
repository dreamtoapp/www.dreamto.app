const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../public/assets/homepage/images/img7.avif');

sharp(input)
  .resize(10)
  .toBuffer()
  .then((buf) => {
    const dataUrl = 'data:image/avif;base64,' + buf.toString('base64');
    console.log(dataUrl);
    fs.writeFileSync(path.join(__dirname, '../public/assets/homepage/images/img7-blur.txt'), dataUrl);
  })
  .catch((err) => {
    console.error('Error generating blurDataURL:', err);
  }); 