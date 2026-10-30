const fs = require('fs');
const path = require('path');

const fdPath = path.resolve(__dirname, '../src/pages/FinancialDirectory.tsx');
const fdCode = fs.readFileSync(fdPath, 'utf8');

const categoryRegex = /\{\s*id:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["'],\s*desc:\s*["']([^"']+)["'][\s\S]*?links:\s*\[([\s\S]*?)\]\s*\}/g;
const directoryMap = {};
let catMatch;
while ((catMatch = categoryRegex.exec(fdCode)) !== null) {
  const catId = catMatch[1];
  const catTitle = catMatch[2];
  const linksBlock = catMatch[4];
  const linkRegex = /name:\s*["']([^"']+)["'],\s*href:\s*["']([^"']+)["'],\s*desc:\s*["']([^"']+)["'](?:,\s*badge:\s*["']([^"']+)["'])?/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(linksBlock)) !== null) {
    const href = linkMatch[2];
    directoryMap[href] = {
      name: linkMatch[1],
      desc: linkMatch[3],
      category: catTitle,
      categoryId: catId,
      badge: linkMatch[4] || ''
    };
  }
}

const outPath = path.resolve(__dirname, '../src/data/financialDirectoryLinks.json');
fs.writeFileSync(outPath, JSON.stringify(directoryMap, null, 2), 'utf8');
console.log(`Successfully built ${Object.keys(directoryMap).length} directory links into ${outPath}`);
