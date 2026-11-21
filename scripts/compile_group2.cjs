const fs = require('fs');
const path = require('path');

const { t8_words } = require('./build_group2_t8.cjs');
const { t9_words } = require('./build_group2_t9.cjs');
const { t10_list } = require('./build_group2_t10.cjs');
const { t11_words } = require('./build_group2_t11.cjs');
const { t12_words } = require('./build_group2_t12.cjs');
const { t13_words } = require('./build_group2_t13.cjs');

function makeWord(id, [word, reading, romaji, sino, mean, level, exJp, exVn]) {
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

const t10_words = t10_list.map((item, idx) => makeWord(`rest-${idx + 1}`, item));

const topics = [
  {
    id: 'topic-8-cuisine',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Ẩm thực & Món ăn',
    subtitle: 'Ramen, Sushi, Bento, lẩu nướng & nguyên liệu tươi ngon',
    iconName: 'UtensilsCrossed',
    colorScheme: {
      bg: 'from-amber-500/10 to-red-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-red-600',
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/60'
    },
    description: 'Kho từ vựng ẩm thực Nhật Bản Washoku đỉnh cao, tên các món quốc hồn quốc túy, gia vị nêm nếm và cảm giác vị giác phong phú.',
    subtopics: ['Món ăn truyền thống & cơm hộp', 'Thịt, cá & hải sản tươi', 'Rau củ quả & nấm', 'Gia vị & bánh ngọt Wagashi'],
    words: t8_words
  },
  {
    id: 'topic-9-drinks',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Đồ uống & Trà đạo',
    subtitle: 'Trà xanh Sencha, Matcha, Cafe, Bia tươi & Rượu Sake',
    iconName: 'Coffee',
    colorScheme: {
      bg: 'from-lime-500/10 to-emerald-500/10',
      border: 'border-lime-500/30',
      text: 'text-lime-400',
      gradient: 'from-lime-500 to-emerald-600',
      badgeBg: 'bg-lime-950/60 text-lime-300 border-lime-800/60'
    },
    description: 'Thế giới thức uống xứ Phù Tang từ trà xanh thanh tao, cà phê sành điệu đến các dòng bia tươi, Sake đại ngâm nhưỡng và văn hóa cụng ly Kampai.',
    subtopics: ['Trà truyền thống & thảo mộc', 'Cà phê & nước trái cây', 'Bia & rượu Sake truyền thống', 'Văn hóa bàn rượu & nâng ly'],
    words: t9_words
  },
  {
    id: 'topic-10-restaurant',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Nhà hàng & Quán xá',
    subtitle: 'Gọi món, đặt bàn, dụng cụ bàn ăn & thanh toán',
    iconName: 'Store',
    colorScheme: {
      bg: 'from-orange-500/10 to-yellow-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      gradient: 'from-orange-500 to-yellow-600',
      badgeBg: 'bg-orange-950/60 text-orange-300 border-orange-800/60'
    },
    description: 'Bí kíp thực chiến khi bước vào nhà hàng, quán nhậu Izakaya tại Nhật: gọi món, yêu cầu phục vụ, dụng cụ bàn ăn và phong cách thanh toán lịch thiệp.',
    subtopics: ['Các loại hình quán xá', 'Gọi món & yêu cầu phục vụ', 'Dụng cụ bàn ăn & nêm nếm', 'Thanh toán & quy tắc bàn ăn'],
    words: t10_words
  },
  {
    id: 'topic-11-shopping',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Mua sắm & Giá cả',
    subtitle: 'Siêu thị, Konbini, giảm giá, thanh toán thẻ & miễn thuế',
    iconName: 'ShoppingBag',
    colorScheme: {
      bg: 'from-emerald-500/10 to-green-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-green-600',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
    },
    description: 'Cẩm nang mua sắm từ siêu thị bình dân, cửa hàng 100 yên, phố mua sắm đến trung tâm bách hóa: soi tem giảm giá, tích điểm và hoàn thuế du lịch.',
    subtopics: ['Địa điểm mua sắm & siêu thị', 'Mức giá, chiết khấu & sale off', 'Phương thức thanh toán & ví điện tử', 'Hạn sử dụng & đóng gói'],
    words: t11_words
  },
  {
    id: 'topic-12-house-appliances',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Nhà cửa & Đồ gia dụng',
    subtitle: 'Phòng ốc, nội thất, thiết bị điện tử & sinh hoạt thường nhật',
    iconName: 'Home',
    colorScheme: {
      bg: 'from-cyan-500/10 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
    },
    description: 'Từ vựng kiến trúc nhà ở Nhật, phòng ốc chiếu Tatami, thiết bị thông minh Washlet, đồ gia dụng hiện đại và cẩm nang thuê nhà, đổ rác.',
    subtopics: ['Cấu trúc căn nhà & phòng ốc', 'Đồ điện tử & gia dụng thông minh', 'Nội thất & chăn đệm kiểu Nhật', 'Thuê nhà, dọn dẹp & đổ rác'],
    words: t12_words
  },
  {
    id: 'topic-13-fashion',
    groupId: 'living_food',
    groupTitle: 'Sinh hoạt & Ăn uống',
    title: 'Thời trang & Trang phục',
    subtitle: 'Quần áo, phụ kiện, giày dép, Kimono & tạo mẫu tóc',
    iconName: 'Shirt',
    colorScheme: {
      bg: 'from-pink-500/10 to-rose-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      gradient: 'from-pink-500 to-rose-600',
      badgeBg: 'bg-pink-950/60 text-pink-300 border-pink-800/60'
    },
    description: 'Tất tần tật về phong cách thời trang Nhật Bản: trang phục công sở hiện đại, Kimono Yukata truyền thống, phụ kiện tinh tế và chăm sóc làm đẹp tóc tai.',
    subtopics: ['Trang phục thường ngày & công sở', 'Kimono, Yukata & đồ truyền thống', 'Giày dép & phụ kiện trang sức', 'Tóc tai & mỹ phẩm trang điểm'],
    words: t13_words
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

export const GROUP_2_TOPICS: ThematicTopic[] = ${JSON.stringify(topics, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'thematicVocab', 'group2.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully created group2.ts with', topics.reduce((acc, t) => acc + t.words.length, 0), 'words total!');
