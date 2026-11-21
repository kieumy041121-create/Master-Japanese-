const fs = require('fs');
const path = require('path');

const VALID_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

function fixTopicWords(words) {
  return words.map(w => {
    // If w.level is not valid JLPT level, check where the level is
    if (!VALID_LEVELS.includes(w.level)) {
      if (VALID_LEVELS.includes(w.meaningVn)) {
        // Shifted case:
        // romaji was sinoVietnamese
        // sinoVietnamese was meaningVn
        // meaningVn was level
        // level was exampleJp
        // exampleJp was exampleVn
        const fixedSino = w.romaji;
        const fixedMeaning = w.sinoVietnamese;
        const fixedLevel = w.meaningVn;
        const fixedExJp = w.level;
        const fixedExVn = w.exampleJp;
        // Generate romaji from reading
        const fixedRomaji = w.reading;

        return {
          id: w.id,
          word: w.word,
          reading: w.reading,
          romaji: fixedRomaji,
          sinoVietnamese: fixedSino,
          meaningVn: fixedMeaning,
          level: fixedLevel,
          exampleJp: fixedExJp,
          exampleVn: fixedExVn
        };
      }
    }
    return w;
  });
}

['group1.ts', 'group2.ts', 'group3.ts', 'group4.ts', 'group5.ts'].forEach(filename => {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  // Match the JSON array
  const jsonMatch = content.match(/=\s*(\[[\s\S]*\]);/);
  if (!jsonMatch) {
    console.log('No JSON match in', filename);
    return;
  }

  const topics = JSON.parse(jsonMatch[1]);
  let fixedCount = 0;

  topics.forEach(t => {
    const origWords = t.words;
    t.words = fixTopicWords(origWords);
    origWords.forEach((ow, i) => {
      if (ow.level !== t.words[i].level) fixedCount++;
    });
  });

  const constName = filename.replace('.ts', '').toUpperCase().replace('GROUP', 'GROUP_') + '_TOPICS';
  const newContent = `import { ThematicTopic } from './types';

export const ${constName}: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Fixed ${fixedCount} words in ${filename}`);
});
