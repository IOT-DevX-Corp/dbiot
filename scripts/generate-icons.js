import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(process.cwd(), 'src', 'assets', 'base-icon.svg');
const outputDir = path.join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Generate icons for each size
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`Generated icon-${size}x${size}.png`);
    }

    // Generate additional icons for actions
    const actionIcons = {
      'check.png': '#4CAF50',
      'snooze.png': '#FFA000'
    };

    for (const [filename, color] of Object.entries(actionIcons)) {
      const svg = `
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="${color}"/>
          <path d="${filename === 'check.png' 
            ? 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
            : 'M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z'
          }" fill="white"/>
        </svg>`;

      await sharp(Buffer.from(svg))
        .resize(72, 72)
        .toFile(path.join(outputDir, filename));
      
      console.log(`Generated ${filename}`);
    }

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();