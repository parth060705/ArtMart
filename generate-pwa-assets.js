import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simple icon
function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);
  
  // Simple "A" logo
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A', size / 2, size / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buffer);
}

// Generate icons
createIcon(192, 'pwa-192x192.png');
createIcon(512, 'pwa-512x512.png');

// Create apple-touch-icon
createIcon(180, 'apple-touch-icon.png');

// Create favicon
createIcon(32, 'favicon.ico');

console.log('PWA assets generated successfully!');
