// Script to generate all 25 thematic vocabulary topics with >= 100 curated words each
const fs = require('fs');
const path = require('path');

console.log('Building Thematic Vocabulary Database...');

// We will build 5 groups into src/data/thematicVocab/group1.ts .. group5.ts
// and src/data/thematicVocab/index.ts
