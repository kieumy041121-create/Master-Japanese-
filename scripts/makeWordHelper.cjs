function makeWord(id, item) {
  const word = item[0];
  const reading = item[1];
  const romaji = item[2];
  let sino = undefined;
  let mean = '';
  let level = 'N3';
  let exJp = '';
  let exVn = '';

  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const lvlIdx = item.findIndex(x => jlptLevels.includes(x));

  if (lvlIdx === 4) {
    mean = item[3];
    level = item[4];
    exJp = item[5];
    exVn = item[6];
  } else if (lvlIdx === 5) {
    sino = item[3];
    mean = item[4];
    level = item[5];
    exJp = item[6];
    exVn = item[7];
  } else {
    if (item.length === 7) {
      mean = item[3];
      level = item[4];
      exJp = item[5];
      exVn = item[6];
    } else {
      sino = item[3];
      mean = item[4];
      level = item[5];
      exJp = item[6];
      exVn = item[7];
    }
  }

  return {
    id,
    word,
    reading,
    romaji,
    sinoVietnamese: sino || undefined,
    meaningVn: mean,
    level,
    exampleJp: exJp,
    exampleVn: exVn
  };
}

module.exports = { makeWord };
