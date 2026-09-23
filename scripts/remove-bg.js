
const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

const inputPath = 'assets/images/official-logo.png';
const outputPath = 'assets/images/official-logo-transparent.png';

const buf = fs.readFileSync(inputPath);
let offset = 8;
let width, height, bitDepth, colorType;
let idatChunks = [];

while (offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.slice(offset + 4, offset + 8).toString('ascii');
  const data = buf.slice(offset + 8, offset + 8 + length);
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
  } else if (type === 'IDAT') {
    idatChunks.push(data);
  }
  offset += 12 + length;
}

const allIdat = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(allIdat);

// raw has height * (1 + width * 4) bytes
const bpp = 4;
const stride = 1 + width * bpp;
const uncompressed = Buffer.from(raw);

// Filter 0 reconstruction if none or process pixels
// Since colorType is 6 (RGBA, 8-bit), we reconstruct scanlines to remove black
// But first, let's reconstruct filtered scanlines
function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

const decoded = Buffer.alloc(height * width * 4);
for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  const rowStart = y * stride + 1;
  const outRowStart = y * width * 4;

  for (let x = 0; x < width * 4; x++) {
    const rawVal = raw[rowStart + x];
    const left = (x >= 4) ? decoded[outRowStart + x - 4] : 0;
    const up = (y > 0) ? decoded[(y - 1) * width * 4 + x] : 0;
    const upLeft = (y > 0 && x >= 4) ? decoded[(y - 1) * width * 4 + x - 4] : 0;

    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + left) & 0xFF;
    else if (filter === 2) val = (rawVal + up) & 0xFF;
    else if (filter === 3) val = (rawVal + Math.floor((left + up) / 2)) & 0xFF;
    else if (filter === 4) val = (rawVal + paethPredictor(left, up, upLeft)) & 0xFF;

    decoded[outRowStart + x] = val;
  }
}

// Now transparentize black pixels in decoded
for (let i = 0; i < decoded.length; i += 4) {
  const r = decoded[i];
  const g = decoded[i + 1];
  const b = decoded[i + 2];
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness < 45) {
    decoded[i + 3] = 0; // completely transparent!
  } else if (brightness < 80) {
    // Soft anti-aliasing edge
    const alphaFactor = (brightness - 45) / 35;
    decoded[i + 3] = Math.round(decoded[i + 3] * alphaFactor);
  }
}

// Re-encode into filter 0 scanlines
const filteredOut = Buffer.alloc(height * stride);
for (let y = 0; y < height; y++) {
  filteredOut[y * stride] = 0; // filter None
  decoded.copy(filteredOut, y * stride + 1, y * width * 4, (y + 1) * width * 4);
}

const newCompressedIdat = zlib.deflateSync(filteredOut);

// Build new PNG
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // bitDepth
ihdrData[9] = 6; // RGBA
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const newIhdr = makeChunk('IHDR', ihdrData);
const newIdat = makeChunk('IDAT', newCompressedIdat);
const newIend = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([sig, newIhdr, newIdat, newIend]);
fs.writeFileSync(outputPath, finalPng);
console.log('Saved transparent logo to', outputPath, 'size:', finalPng.length);
