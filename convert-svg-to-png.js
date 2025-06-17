// convert-svg-to-png.js
// Converts dta.svg to a 1200x630 PNG for Open Graph SEO usage

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, 'public', 'assets', 'dta.svg');
const outputPng = path.join(__dirname, 'public', 'og-image.png');

const slogan = 'where dream take off';
const sloganFontSize = 64;
const sloganHeight = 120;
const sloganSvg = Buffer.from(`
  <svg width='1200' height='${sloganHeight}' xmlns='http://www.w3.org/2000/svg'>
    <rect width='100%' height='100%' fill='white'/>
    <text x='50%' y='60%' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='${sloganFontSize}' fill='#222' font-weight='bold'>${slogan}</text>
  </svg>
`);

async function convertSvgToPng() {
  if (!fs.existsSync(inputSvg)) {
    console.error('Input SVG not found:', inputSvg);
    process.exit(1);
  }
  try {
    // Render logo to PNG (white background)
    const logoPng = await sharp(inputSvg)
      .resize(1200, 510, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: '#fff' })
      .png({ quality: 100 })
      .toBuffer();

    // Composite logo and slogan
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([
        { input: logoPng, top: 0, left: 0 },
        { input: sloganSvg, top: 510, left: 0 },
      ])
      .png({ quality: 100 })
      .toFile(outputPng);
    console.log('Converted', inputSvg, 'to', outputPng, 'with slogan overlay.');
  } catch (err) {
    console.error('Error converting SVG to PNG:', err);
    process.exit(1);
  }
}

convertSvgToPng(); 