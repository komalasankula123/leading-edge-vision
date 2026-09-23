const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const regex = /(?:src|href)="([^"]+)"/g;
let match;
const localAssets = [];

while ((match = regex.exec(content)) !== null) {
  const url = match[1];
  if (!url.startsWith('http') && !url.startsWith('#') && !url.startsWith('tel:') && !url.startsWith('mailto:')) {
    localAssets.push(url);
  }
}

console.log('Total local assets found:', localAssets.length);
let allOk = true;

localAssets.forEach(asset => {
  const p = asset.replace(/^\//, '');
  if (fs.existsSync(p)) {
    console.log(' [EXISTS] ' + p);
  } else {
    console.error(' [MISSING] ' + p);
    allOk = false;
  }
});

if (allOk) {
  console.log('\nAll local assets exist on disk.');
} else {
  console.error('\nSome local assets are missing!');
  process.exit(1);
}
