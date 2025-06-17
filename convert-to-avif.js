const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  {
    input: 'public/assets/homepage/canon.png',
    output: 'public/assets/homepage/canon.avif',
  },
  {
    input: 'public/assets/homepage/cromboPlugin.png',
    output: 'public/assets/homepage/cromboPlugin.avif',
  },
  {
    input: 'public/assets/homepage/crombo.png',
    output: 'public/assets/homepage/crombo.avif',
  },
  {
    input: 'public/assets/homepage/images/website.jpeg',
    output: 'public/assets/homepage/images/website.avif',
  },
  {
    input: 'public/assets/homepage/images/img7.jpeg',
    output: 'public/assets/homepage/images/img7.avif',
  },
];

(async () => {
  for (const { input, output } of imagesToConvert) {
    if (!fs.existsSync(input)) {
      console.warn(`Input file not found: ${input}`);
      continue;
    }
    try {
      await sharp(input)
        .avif({ quality: 90, effort: 9 })
        .toFile(output);
      console.log(`Converted: ${input} -> ${output}`);
    } catch (error) {
      console.error(`Error converting ${input}:`, error);
    }
  }
})();