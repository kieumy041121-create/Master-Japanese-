import { ThematicGroup, ThematicTopic, ThematicWord } from './types';
import { GROUP_1_TOPICS } from './group1';
import { GROUP_2_TOPICS } from './group2';
import { GROUP_3_TOPICS } from './group3';
import { GROUP_4_TOPICS } from './group4';
import { GROUP_5_TOPICS } from './group5';
import { JPT_THEMATIC_TOPIC } from './jptTopic';
import { MASSIVE_THEMATIC_TOPICS } from './massiveThematicBank';
import { sanitizeVocabPhonetics, toHepburnRomaji } from '../kanaRomajiUtils';

export * from './types';
export { GROUP_1_TOPICS } from './group1';
export { GROUP_2_TOPICS } from './group2';
export { GROUP_3_TOPICS } from './group3';
export { GROUP_4_TOPICS } from './group4';
export { GROUP_5_TOPICS } from './group5';
export { JPT_THEMATIC_TOPIC } from './jptTopic';
export {
  MASSIVE_THEMATIC_TOPICS,
  getMassiveThematicBank,
  searchMassiveThematicBank,
  resolveAnyWordAsThematicWord
} from './massiveThematicBank';

export const THEMATIC_GROUPS: ThematicGroup[] = [
  {
    id: 'foundation_daily',
    title: '1. Chủ đề nền tảng & Đời sống hàng ngày',
    shortTitle: 'Nền tảng & Đời sống',
    description: 'Từ vựng cốt lõi thiết yếu hàng ngày: Gia đình, thời gian, thời tiết, màu sắc, vị trí, cảm xúc và sức khỏe cơ thể người.',
    iconName: 'Home',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    topicIds: [
      'topic-1-family',
      'topic-2-time',
      'topic-3-weather',
      'topic-4-colors-shapes',
      'topic-5-position-direction',
      'topic-6-emotions',
      'topic-7-body-health'
    ]
  },
  {
    id: 'living_dining',
    title: '2. Sinh hoạt & Ăn uống',
    shortTitle: 'Sinh hoạt & Ăn uống',
    description: 'Thế giới ẩm thực Nhật Bản, đồ uống, nhà hàng quán xá, mua sắm siêu thị, nhà cửa đồ gia dụng và thời trang trang phục.',
    iconName: 'Utensils',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    topicIds: [
      'topic-8-cuisine',
      'topic-9-drinks',
      'topic-10-restaurant',
      'topic-11-shopping',
      'topic-12-house-appliances',
      'topic-13-fashion'
    ]
  },
  {
    id: 'society_work_study',
    title: '3. Xã hội, Công việc & Học tập',
    shortTitle: 'Công việc & Học tập',
    description: 'Môi trường làm việc và học tập tại Nhật: Nghề nghiệp, văn phòng thương mại, trường học, giao thông đi lại và hành chính ngân hàng bưu điện.',
    iconName: 'Briefcase',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    topicIds: [
      'topic-14-jobs',
      'topic-15-office-trade',
      'topic-16-school',
      'topic-17-traffic',
      'topic-18-bank-admin'
    ]
  },
  {
    id: 'entertainment_hobbies',
    title: '4. Giải trí, Sở thích & Thiên nhiên động vật',
    shortTitle: 'Giải trí & Sở thích',
    description: 'Văn hóa và đam mê xứ Phù Tang: Động vật thực vật bốn mùa, thể thao trò chơi võ đạo Sumo, du lịch nghỉ dưỡng Onsen, âm nhạc phim ảnh & nghệ thuật Kabuki.',
    iconName: 'Sparkles',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    topicIds: [
      'topic-19-animals-plants',
      'topic-20-sports-games',
      'topic-21-travel',
      'topic-22-music-arts'
    ]
  },
  {
    id: 'advanced_specialized',
    title: '5. Chuyên ngành nâng cao (N3 - N1 / Kỹ sư / Tokutei)',
    shortTitle: 'Chuyên ngành nâng cao',
    description: 'Từ vựng chuyên sâu dành cho kỹ sư và chuyên gia: Kỹ thuật IT & cơ khí chế tạo, môi trường xử lý rác thải 3R, kinh tế thị trường chứng khoán & luật lệ giao thông pháp luật.',
    iconName: 'Award',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    topicIds: [
      'topic-23-tech-engineering',
      'topic-24-environment-science',
      'topic-25-economy-law'
    ]
  },
  {
    id: 'jpt_exam_mastery',
    title: 'Chuyên đề Kỳ thi JPT Chuẩn Quốc Tế (Thang điểm 990)',
    shortTitle: '🏆 Kỳ thi JPT (Thang 990)',
    description: 'Kho từ vựng khổng lồ độc lập và chuyên sâu cho kỳ thi JPT 990 điểm: Bẫy tìm lỗi sai chính tả/ngữ pháp (誤文訂正), Điền khuyết ngữ cảnh (空所補充), Đọc hiểu tài liệu thương mại (読解実務) và Phản xạ đàm thoại (聴解対話).',
    iconName: 'Award',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    topicIds: [
      'topic-jpt-mastery'
    ]
  },
  {
    id: 'massive_jlpt_mastery',
    title: '6. Đại Kho Toàn Năng 50.000+ Từ Vựng JLPT N5–N1',
    shortTitle: '⚡ Đại Kho 50.000+ (N5–N1)',
    description: 'Đại kho từ vựng toàn thư 50.000+ từ vựng độc bản chuẩn điển & 5.000+ mẫu câu đàm thoại theo 10 địa điểm thực tế: N5 Sơ cấp (3.500+ từ), N4 Giao tiếp (8.000+ từ), N3 Trung cấp (12.000+ từ), N2 Thương mại (12.000+ từ), N1 Thượng đỉnh (15.000+ từ), và 5.000+ Mẫu câu tình huống từng địa điểm.',
    iconName: 'Zap',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    topicIds: [
      'topic-massive-n5',
      'topic-massive-n4',
      'topic-massive-n3',
      'topic-massive-n2',
      'topic-massive-n1',
      'topic-massive-situational-sentences'
    ]
  }
];

const RAW_BASE_TOPICS: ThematicTopic[] = [
  ...GROUP_1_TOPICS,
  ...GROUP_2_TOPICS,
  ...GROUP_3_TOPICS,
  ...GROUP_4_TOPICS,
  ...GROUP_5_TOPICS,
  JPT_THEMATIC_TOPIC
];

export const BASE_THEMATIC_TOPICS: ThematicTopic[] = RAW_BASE_TOPICS.map(topic => {
  const kanaMap = new Map<string, ThematicWord[]>();
  for (const w of topic.words) {
    const { cleanReading, cleanRomaji, cleanSinoViet } = sanitizeVocabPhonetics(w.word, w.reading, w.romaji, w.sinoVietnamese);
    const item: ThematicWord = {
      ...w,
      reading: cleanReading,
      romaji: cleanRomaji,
      sinoVietnamese: cleanSinoViet || w.sinoVietnamese
    };
    if (!kanaMap.has(cleanReading)) {
      kanaMap.set(cleanReading, []);
    }
    kanaMap.get(cleanReading)!.push(item);
  }

  const uniqueWords: ThematicWord[] = [];
  for (const [, list] of kanaMap.entries()) {
    list.sort((a, b) => {
      const aKanji = (a.word.match(/[\u4e00-\u9faf]/g) || []).length;
      const bKanji = (b.word.match(/[\u4e00-\u9faf]/g) || []).length;
      if (bKanji !== aKanji) return bKanji - aKanji;
      return (b.meaningVn || '').length - (a.meaningVn || '').length;
    });
    const best = list[0];
    uniqueWords.push({
      ...best,
      romaji: toHepburnRomaji(best.reading) || best.romaji
    });
  }

  return {
    ...topic,
    words: uniqueWords
  };
});

export const ALL_THEMATIC_TOPICS: ThematicTopic[] = [
  ...BASE_THEMATIC_TOPICS,
  ...MASSIVE_THEMATIC_TOPICS
];

export const TOTAL_PRELOADED_WORDS = 2650;

export function getTopicById(topicId: string): ThematicTopic | undefined {
  return ALL_THEMATIC_TOPICS.find(t => t.id === topicId);
}

export function getTopicsByGroupId(groupId: string): ThematicTopic[] {
  return ALL_THEMATIC_TOPICS.filter(t => t.groupId === groupId);
}

export function searchThematicWords(
  query: string,
  filterLevel: string = 'all',
  activeTopicId?: string
): ThematicWord[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    const targetTopics = activeTopicId 
      ? ALL_THEMATIC_TOPICS.filter(t => t.id === activeTopicId)
      : BASE_THEMATIC_TOPICS;
    const res: ThematicWord[] = [];
    for (const topic of targetTopics) {
      for (const w of topic.words) {
        if (filterLevel === 'all' || w.level === filterLevel) {
          res.push(w);
        }
      }
    }
    return res;
  }

  // Search in target topic or all 25 topics & JPT bank
  const targetTopics = activeTopicId 
    ? ALL_THEMATIC_TOPICS.filter(t => t.id === activeTopicId)
    : BASE_THEMATIC_TOPICS;

  const results: ThematicWord[] = [];
  const seenIds = new Set<string>();

  for (const topic of targetTopics) {
    for (const w of topic.words) {
      if (filterLevel !== 'all' && w.level !== filterLevel) {
        continue;
      }

      const match =
        w.word.toLowerCase().includes(normalizedQuery) ||
        w.reading.toLowerCase().includes(normalizedQuery) ||
        w.romaji.toLowerCase().includes(normalizedQuery) ||
        (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(normalizedQuery)) ||
        w.meaningVn.toLowerCase().includes(normalizedQuery) ||
        (w.exampleJp ? w.exampleJp.toLowerCase().includes(normalizedQuery) : false) ||
        (w.exampleVn ? w.exampleVn.toLowerCase().includes(normalizedQuery) : false);

      if (match && !seenIds.has(w.id)) {
        seenIds.add(w.id);
        results.push(w);
      }
    }
  }

  return results;
}
