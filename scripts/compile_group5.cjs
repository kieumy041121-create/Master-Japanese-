const fs = require('fs');
const path = require('path');

const { t23_words } = require('./build_group5_t23.cjs');
const { t24_words } = require('./build_group5_t24.cjs');
const { t25_words } = require('./build_group5_t25.cjs');

const topics = [
  {
    id: 'topic-23-tech-engineering',
    groupId: 'advanced_specialized',
    groupTitle: 'Chuyên ngành nâng cao (Dành cho N3 - N1 / Kỹ sư / Tokutei)',
    title: 'Kỹ thuật & Công nghệ',
    subtitle: 'Cơ khí chế tạo, Điện - Điện tử, Xây dựng kiến trúc & Công nghệ thông tin (IT)',
    iconName: 'Cpu',
    colorScheme: {
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-950/60 text-blue-300 border-blue-800/60'
    },
    description: 'Bộ từ vựng kỹ thuật chuyên sâu cho kỹ sư & lao động tay nghề cao tại Nhật: Công nghệ thông tin IT/AI, cơ khí chế tạo CNC, kỹ thuật điện - bán dẫn, và quản lý thi công xây dựng kiến trúc.',
    subtopics: ['Công nghệ thông tin & phần mềm (IT/AI)', 'Kỹ thuật cơ khí & chế tạo máy CNC', 'Điện - Điện tử & Bán dẫn vi mạch', 'Xây dựng, kiến trúc & Quản lý chất lượng Kaizen'],
    words: t23_words
  },
  {
    id: 'topic-24-environment-science',
    groupId: 'advanced_specialized',
    groupTitle: 'Chuyên ngành nâng cao (Dành cho N3 - N1 / Kỹ sư / Tokutei)',
    title: 'Môi trường & Khoa học',
    subtitle: 'Biến đổi khí hậu, xử lý rác thải 3R, tài nguyên năng lượng xanh & khoa học tự nhiên',
    iconName: 'Leaf',
    colorScheme: {
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
    },
    description: 'Từ vựng môi trường và khoa học chuẩn học thuật N2-N1: Biến đổi khí hậu toàn cầu, quy trình phân loại rác thải và tái chế 3R nghiêm ngặt của Nhật Bản, năng lượng tái tạo và khoa học tự nhiên.',
    subtopics: ['Biến đổi khí hậu & hiện tượng nóng lên toàn cầu', 'Phân loại rác thải & xã hội tuần hoàn 3R', 'Năng lượng tái tạo & tài nguyên khoáng sản', 'Khoa học tự nhiên: Hóa học, Vật lý & Di truyền học'],
    words: t24_words
  },
  {
    id: 'topic-25-economy-law',
    groupId: 'advanced_specialized',
    groupTitle: 'Chuyên ngành nâng cao (Dành cho N3 - N1 / Kỹ sư / Tokutei)',
    title: 'Kinh tế, Pháp luật & Xã hội học',
    subtitle: 'Thị trường chứng khoán, Luật lệ giao thông, Chính trị nghị viện & Vấn đề xã hội Nhật Bản',
    iconName: 'Scale',
    colorScheme: {
      bg: 'from-rose-500/10 to-amber-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      gradient: 'from-rose-500 to-amber-600',
      badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-800/60'
    },
    description: 'Từ vựng cao cấp bậc nhất cho đời sống công sở, tài chính và pháp luật Nhật Bản: Thị trường chứng khoán & tiền tệ, luật giao thông đường bộ chi tiết, cơ chế tư pháp tòa án, chính trị nghị viện và các vấn đề đương đại như già hóa dân số.',
    subtopics: ['Kinh tế, tỷ giá tiền tệ & thị trường chứng khoán', 'Hiến pháp, tòa án tư pháp & luật thương mại', 'Luật giao thông đường bộ & an toàn lái xe', 'Chính trị nghị viện & các vấn đề xã hội đương đại'],
    words: t25_words
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

export const GROUP_5_TOPICS: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', 'group5.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully created group5.ts with', topics.reduce((acc, t) => acc + t.words.length, 0), 'words total!');
