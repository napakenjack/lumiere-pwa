const fs = require('fs');

const photos = [
  "1620916566398-39f1143ab7be", // 1 - serum
  "1608248543803-ba4f8c70ae0b", // 2 - vitamin c
  "1586495777744-4413f21062fa", // 3 - lipstick
  "1626783405786-fb4c910cf94e", // 4 - shampoo
  "1594035910387-fea47794261f", // 5 - perfume
  "1522337660859-02fbefca4702", // 6 - body lotion pink
  "1556228578-0d85b1a4d571", // 7 - cerave
  "1631729371254-42c2892f0e6e", // 8 - foundation
  "1615397323755-e4fb3c5b8b64", // 9 - retinol
  "1591348278863-a8fb3887e2aa", // 10 - mascara
  "1535585209827-a15fcdbc4aed", // 11 - hair mask
  "1512496115851-a40870d10b75", // 12 - palette
  "1523293182086-7651a899d37f", // 13 - mens fragrance
  "1599305090598-fe179d501227", // 14 - blush
  "1571781256007-de3285c99e26", // 15 - body scrub
  "1551401344-96695b273412", // 16 - cleanser
  "1611077544342-9908da79d047", // 17 - hair oil
  "1629198688000-71f23e745b6e", // 18 - shower gel
  "1620916297397-a4a5402a3c6c", // 19 - shave cream
  "1608223653131-4137df7572ba", // 20 - gift set
  "1570172619644-defd882d2fb4", // 21 - lip balm
  "1556228720-1c251e18686b", // 22 - body wash
  "1573575154488-f98a2571b1e4", // 23 - eye cream
  "1515377800735-a312cea410e3", // 24 - perfume vanilla
];

let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

let index = 0;
data = data.replace(/images: \['https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format&fit=crop&w=800&q=80'\],/g, (match) => {
  if (index < photos.length) {
    let result = `images: ['https://images.unsplash.com/photo-${photos[index]}?auto=format&fit=crop&w=800&q=80'],`;
    index++;
    return result;
  }
  return match;
});

fs.writeFileSync('src/data/mockData.ts', data);
