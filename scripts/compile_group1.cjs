const fs = require('fs');
const path = require('path');

const { t1_words } = require('./build_group1.cjs');
const { t2_words, t3_words } = require('./build_group1_part1.cjs');
const { t4_words } = require('./build_group1_part2.cjs');
const { t5_words } = require('./build_group1_part3.cjs');
const { t6_words } = require('./build_group1_part4.cjs');
const { t7_words } = require('./build_group1_part5.cjs');

const topics = [
  {
    id: 'topic-1-family',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Gia đình & Nhân xưng',
    subtitle: 'Xưng hô trong gia đình, họ hàng & quan hệ xã hội',
    iconName: 'Users',
    colorScheme: {
      bg: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/60'
    },
    description: 'Nắm vững tôn ty trật tự xưng hô chuẩn Nhật, phân định gia đình mình và gia đình người khác, bạn bè, đồng nghiệp công sở.',
    subtopics: ['Xưng hô gia đình mình', 'Xưng hô gia đình người khác', 'Bạn bè & đồng nghiệp', 'Các thế hệ & lứa tuổi'],
    words: t1_words
  },
  {
    id: 'topic-2-time',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Thời gian & Lịch trình',
    subtitle: 'Thứ, ngày, tháng, năm, mùa màng & các ngày lễ',
    iconName: 'Clock',
    colorScheme: {
      bg: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-600',
      badgeBg: 'bg-blue-950/60 text-blue-300 border-blue-800/60'
    },
    description: 'Từ vựng thời gian, mốc hẹn, lịch trình, ngày lễ quốc gia và các biểu đạt tiến độ công việc chuẩn xác.',
    subtopics: ['Thứ, ngày, tháng, năm', 'Mùa màng & ngày lễ', 'Lịch trình & deadline', 'Tần suất & khoảnh khắc'],
    words: t2_words
  },
  {
    id: 'topic-3-weather',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Thời tiết & Thiên nhiên',
    subtitle: 'Nắng, mưa, bão, động đất, núi non & sông ngòi',
    iconName: 'CloudRain',
    colorScheme: {
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
    },
    description: 'Bản đồ hiện tượng tự nhiên, khí tượng thiên văn, ứng phó thiên tai động đất bão lũ và phong cảnh thiên nhiên.',
    subtopics: ['Khí tượng thời tiết', 'Thiên tai & ứng phó', 'Địa hình núi sông biển đảo', 'Thiên văn vũ trụ'],
    words: t3_words
  },
  {
    id: 'topic-4-colors-shapes',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Màu sắc & Hình dạng',
    subtitle: 'Màu cơ bản, hình khối 2D/3D & kích thước',
    iconName: 'Palette',
    colorScheme: {
      bg: 'from-fuchsia-500/10 to-pink-500/10',
      border: 'border-fuchsia-500/30',
      text: 'text-fuchsia-400',
      gradient: 'from-fuchsia-500 to-pink-600',
      badgeBg: 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/60'
    },
    description: 'Bảng màu sắc truyền thống Nhật Bản, hình học phẳng, khối lập thể không gian và từ vựng miêu tả kích thước chính xác.',
    subtopics: ['Màu sắc cơ bản & truyền thống', 'Hình học phẳng & đa giác', 'Khối lập thể 3D', 'Kích thước & tính chất bề mặt'],
    words: t4_words
  },
  {
    id: 'topic-5-position-direction',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Vị trí & Phương hướng',
    subtitle: 'Trên dưới, trong ngoài, 4 phương 8 hướng & chỉ đường',
    iconName: 'Compass',
    colorScheme: {
      bg: 'from-indigo-500/10 to-sky-500/10',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
      gradient: 'from-indigo-500 to-sky-600',
      badgeBg: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60'
    },
    description: 'Khẩu quyết chỉ đường, định vị không gian, tọa độ 4 phương 8 hướng, vị trí tương đối và giao thông đô thị.',
    subtopics: ['Vị trí tương đối cơ bản', 'Phương vị 4 phương 8 hướng', 'Chỉ đường & lối rẽ', 'Địa thế & không gian'],
    words: t5_words
  },
  {
    id: 'topic-6-emotions',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Cảm xúc & Tính cách',
    subtitle: 'Vui buồn, giận dữ, lo lắng, thân thiện & kiên cường',
    iconName: 'Smile',
    colorScheme: {
      bg: 'from-rose-500/10 to-red-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      gradient: 'from-rose-500 to-red-600',
      badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-800/60'
    },
    description: 'Mô tả chiều sâu tâm lý con người Nhật, trạng thái cảm xúc, nét tính cách độc đáo và nghệ thuật thấu hiểu đối phương.',
    subtopics: ['Cảm xúc tích cực & tiêu cực', 'Tính cách & phẩm chất', 'Tâm trạng phức tạp', 'Nghệ thuật đối nhân xử thế'],
    words: t6_words
  },
  {
    id: 'topic-7-body-health',
    groupId: 'foundation_daily',
    groupTitle: 'Chủ đề nền tảng & Đời sống hàng ngày',
    title: 'Cơ thể người & Sức khỏe',
    subtitle: 'Bộ phận cơ thể, bệnh tật, thuốc men & bệnh viện',
    iconName: 'Activity',
    colorScheme: {
      bg: 'from-teal-500/10 to-emerald-500/10',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      gradient: 'from-teal-500 to-emerald-600',
      badgeBg: 'bg-teal-950/60 text-teal-300 border-teal-800/60'
    },
    description: 'Cẩm nang khám chữa bệnh tại Nhật, giải phẫu học cơ thể người, diễn đạt triệu chứng sức khỏe và quy trình bệnh viện.',
    subtopics: ['Bộ phận cơ thể & nội tạng', 'Triệu chứng & bệnh tật', 'Thuốc men & toa thuốc', 'Quy trình bệnh viện & cấp cứu'],
    words: t7_words
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

export const GROUP_1_TOPICS: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', 'group1.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully created group1.ts with', topics.reduce((acc, t) => acc + t.words.length, 0), 'words total!');
