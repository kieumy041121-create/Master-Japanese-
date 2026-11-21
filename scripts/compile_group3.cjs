const fs = require('fs');
const path = require('path');

const { t14_words } = require('./build_group3_part1.cjs');
const { t15_words } = require('./build_group3_part2.cjs');
const { t16_words } = require('./build_group3_part3.cjs');
const { t17_words } = require('./build_group3_part4.cjs');
const { t18_words } = require('./build_group3_part5.cjs');

const topics = [
  {
    id: 'topic-14-jobs',
    groupId: 'society_work_study',
    groupTitle: 'Xã hội, Công việc & Học tập',
    title: 'Nghề nghiệp & Nơi làm việc',
    subtitle: 'Bác sĩ, kỹ sư, giáo viên, nhân viên văn phòng & nhà máy',
    iconName: 'Briefcase',
    colorScheme: {
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-950/60 text-blue-300 border-blue-800/60'
    },
    description: 'Bức tranh toàn cảnh về thị trường việc làm tại Nhật: các ngành nghề phổ biến, môi trường công sở, nhà máy chế tạo và chế độ đãi ngộ.',
    subtopics: ['Ngành nghề chuyên môn & kỹ thuật', 'Y tế, giáo dục & pháp luật', 'Nơi làm việc & công xưởng', 'Chế độ tuyển dụng & hợp đồng'],
    words: t14_words
  },
  {
    id: 'topic-15-office-trade',
    groupId: 'society_work_study',
    groupTitle: 'Xã hội, Công việc & Học tập',
    title: 'Văn phòng & Thương mại',
    subtitle: 'Hợp đồng, cuộc họp, máy tính, email, danh thiếp & Horenso',
    iconName: 'Building2',
    colorScheme: {
      bg: 'from-sky-500/10 to-blue-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
      gradient: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-950/60 text-sky-300 border-sky-800/60'
    },
    description: 'Thành thạo kỹ năng giao tiếp công sở Nhật Bản: quy tắc Horenso, trao đổi danh thiếp, soạn thảo email thương mại, điều phối cuộc họp và ký kết hợp đồng.',
    subtopics: ['Quy tắc ứng xử công sở & Horenso', 'Email & máy tính văn phòng', 'Họp hành & thuyết trình dự án', 'Đàm phán thương mại & ký hợp đồng'],
    words: t15_words
  },
  {
    id: 'topic-16-school',
    groupId: 'society_work_study',
    groupTitle: 'Xã hội, Công việc & Học tập',
    title: 'Trường học & Học tập',
    subtitle: 'Sách vở, lớp học, thầy cô, kỳ thi, môn học & du học',
    iconName: 'GraduationCap',
    colorScheme: {
      bg: 'from-amber-500/10 to-yellow-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-yellow-600',
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/60'
    },
    description: 'Môi trường giáo dục Nhật Bản từ tiểu học, trung học đến đại học và trường tiếng: dụng cụ học tập, thi cử, câu lạc bộ ngoại khóa và lễ tốt nghiệp.',
    subtopics: ['Cấp bậc trường học & khuôn viên', 'Dụng cụ học tập & sách vở', 'Thi cử, điểm số & học bổng', 'Hoạt động ngoại khóa & lễ nghi'],
    words: t16_words
  },
  {
    id: 'topic-17-traffic',
    groupId: 'society_work_study',
    groupTitle: 'Xã hội, Công việc & Học tập',
    title: 'Giao thông & Đi lại',
    subtitle: 'Xe buýt, tàu điện, máy bay, taxi, chỉ đường & vé xe',
    iconName: 'Train',
    colorScheme: {
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
    },
    description: 'Làm chủ mạng lưới giao thông công cộng hiện đại bậc nhất thế giới của Nhật Bản: tàu điện ngầm, Shinkansen, thẻ Suica, đổi tuyến và văn hóa đi lại an toàn.',
    subtopics: ['Phương tiện giao thông đô thị', 'Nhà ga, thẻ IC & vé tàu xe', 'Hàng không sân bay & xuất nhập cảnh', 'Lái xe ô tô & luật giao thông'],
    words: t17_words
  },
  {
    id: 'topic-18-bank-admin',
    groupId: 'society_work_study',
    groupTitle: 'Xã hội, Công việc & Học tập',
    title: 'Ngân hàng, Bưu điện & Hành chính',
    subtitle: 'Mở tài khoản, gửi thư, thẻ My Number, thuế & visa',
    iconName: 'Landmark',
    colorScheme: {
      bg: 'from-violet-500/10 to-purple-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      gradient: 'from-violet-500 to-purple-600',
      badgeBg: 'bg-violet-950/60 text-violet-300 border-violet-800/60'
    },
    description: 'Giải quyết trọn vẹn mọi thủ tục hành chính, tài chính và bưu chính tại Nhật: mở sổ ngân hàng, chuyển tiền ATM, nộp đơn tại Ủy ban, thẻ My Number và visa lưu trú.',
    subtopics: ['Giao dịch ngân hàng & thẻ ATM', 'Bưu điện & chuyển phát bưu kiện', 'Thủ tục ủy ban & phiếu cư trú', 'Bảo hiểm, thuế & gia hạn visa'],
    words: t18_words
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

export const GROUP_3_TOPICS: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', 'group3.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully created group3.ts with', topics.reduce((acc, t) => acc + t.words.length, 0), 'words total!');
