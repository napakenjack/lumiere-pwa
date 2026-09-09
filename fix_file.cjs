const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

// I will clean up the broken image lines
data = data.replace(/images: \[\'https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format[^\n]*/g, "images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],");

fs.writeFileSync('src/data/mockData.ts', data);
