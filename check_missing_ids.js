const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /document\.getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
let match;
const ids = [];
while ((match = regex.exec(html)) !== null) {
  ids.push(match[1]);
}

const uniqueIds = [...new Set(ids)];
console.log('Total unique IDs used in getElementById:', uniqueIds.length);

const missing = [];
uniqueIds.forEach(id => {
  const hasDouble = html.includes('id="' + id + '"');
  const hasSingle = html.includes("id='" + id + "'");
  if (!hasDouble && !hasSingle) {
    missing.push(id);
  }
});

console.log('Missing IDs count:', missing.length);
if (missing.length) {
  console.log('Missing IDs:', missing);
}
