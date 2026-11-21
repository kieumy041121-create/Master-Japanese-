const fs = require('fs');
const path = require('path');

const { t19_words } = require('./build_group4_t19.cjs');
const { t20_words } = require('./build_group4_t20.cjs');
const { t21_words } = require('./build_group4_t21.cjs');
const { t22_words } = require('./build_group4_t22.cjs');

const topics = [
  {
    id: 'topic-19-animals-plants',
    groupId: 'entertainment_hobbies',
    groupTitle: 'Giải trí, Sở thích & Thiên nhiên động vật',
    title: 'Động vật & Thực vật',
    subtitle: 'Chó mèo, chim muông, sinh vật biển, cây cối & hoa bốn mùa',
    iconName: 'Trees',
    colorScheme: {
      bg: 'from-emerald-500/10 to-green-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-green-600',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
    },
    description: 'Thế giới sinh vật đa dạng phong phú của Nhật Bản: thú cưng thân thiết, chim chóc đại ngàn, cá biển trù phú, hoa bốn mùa Sakura Momiji và cây cảnh Bonsai.',
    subtopics: ['Thú cưng & động vật nuôi', 'Động vật hoang dã & chim chóc', 'Sinh vật biển & côn trùng mùa hè', 'Cây cối, hoa bốn mùa & Bonsai'],
    words: t19_words
  },
  {
    id: 'topic-20-sports-games',
    groupId: 'entertainment_hobbies',
    groupTitle: 'Giải trí, Sở thích & Thiên nhiên động vật',
    title: 'Thể thao & Trò chơi',
    subtitle: 'Bóng chày, bóng đá, võ đạo Sumo/Kendo, Game & Boardgame',
    iconName: 'Gamepad2',
    colorScheme: {
      bg: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/60'
    },
    description: 'Đam mê vận động và thế giới giải trí Nhật Bản: các môn võ đạo truyền thống Sumo Kendo, bóng chày Koshien rực lửa, thể thao ngoài trời và văn hóa Game điện tử.',
    subtopics: ['Võ đạo truyền thống & bóng chày', 'Thể thao hiện đại & điền kinh', 'Trò chơi dân gian Karuta/Origami', 'Video game, eSports & cờ tướng Shogi'],
    words: t20_words
  },
  {
    id: 'topic-21-travel',
    groupId: 'entertainment_hobbies',
    groupTitle: 'Giải trí, Sở thích & Thiên nhiên động vật',
    title: 'Du lịch & Khách sạn',
    subtitle: 'Đặt phòng Ryokan, tắm Onsen, đền chùa Shinto & lễ hội Matsuri',
    iconName: 'Palmtree',
    colorScheme: {
      bg: 'from-teal-500/10 to-cyan-500/10',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      gradient: 'from-teal-500 to-cyan-600',
      badgeBg: 'bg-teal-950/60 text-teal-300 border-teal-800/60'
    },
    description: 'Trải nghiệm du lịch Nhật Bản chuẩn bản địa: đặt phòng lữ quán Ryokan, nghi thức tắm suối khoáng nóng Onsen, chiêm bái đền chùa Thần đạo và hòa mình vào lễ hội Matsuri.',
    subtopics: ['Khách sạn, Ryokan & đặt phòng', 'Nghi thức tắm suối khoáng Onsen', 'Đền chùa, cổng Torii & bùa Omamori', 'Lễ hội truyền thống Matsuri & pháo hoa'],
    words: t21_words
  },
  {
    id: 'topic-22-music-arts',
    groupId: 'entertainment_hobbies',
    groupTitle: 'Giải trí, Sở thích & Thiên nhiên động vật',
    title: 'Âm nhạc, Phim ảnh & Nghệ thuật',
    subtitle: 'Nhạc cụ, rạp chiếu phim, kịch Kabuki, Anime & hội họa Ukiyo-e',
    iconName: 'Film',
    colorScheme: {
      bg: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-600',
      badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-800/60'
    },
    description: 'Kho tàng nghệ thuật tinh hoa xứ Phù Tang: nhạc cụ cổ truyền đàn Shamisen, rạp chiếu phim điện ảnh, kịch nghệ Kabuki/Noh danh tiếng, Anime và tranh khắc gỗ Ukiyo-e.',
    subtopics: ['Nhạc cụ hiện đại & truyền thống', 'Điện ảnh rạp chiếu & đạo diễn', 'Hội họa, mỹ thuật & tranh Ukiyo-e', 'Kịch nghệ Kabuki, Noh & văn hóa Pop Anime'],
    words: t22_words
  }
];

// Verify word counts
topics.forEach(t => {
  console.log(`Topic ${t.id}: ${t.words.length} words (Valid: ${t.words.length >= 100})`);
  if (t.words.length < 100) {
    throw new Error(`Topic ${t.id} has only ${t.words.length} words (< 100)`);
  }
});

const fileContent = `import { ThematicTopic } from './types';

export const GROUP_4_TOPICS: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', 'group4.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully created group4.ts with', topics.reduce((acc, t) => acc + t.words.length, 0), 'words total!');
