const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

// The file got corrupted, let's restore it completely from our last known good state
