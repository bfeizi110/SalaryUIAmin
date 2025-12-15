const fs = require('fs');
const path = require('path');

const now = new Date();
const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yyyy = now.getFullYear();
const hh = String(now.getHours()).padStart(2, '0');
const mi = String(now.getMinutes()).padStart(2, '0');
const ss = String(now.getSeconds()).padStart(2, '0');

const timestamp = `${yyyy}${mm}${dd}:${hh}${mi}${ss}`;
const versionStr = `(fR${timestamp})`;

console.log('Build Version:', versionStr);

// مسیر فایل version.ts
const filePath = path.join(__dirname, 'version.ts');

let content = fs.readFileSync(filePath, 'utf8');
content = content.replace('__BUILD_TIMESTAMP__', timestamp);

fs.writeFileSync(filePath, content);

console.log('version.ts Updated:', versionStr);