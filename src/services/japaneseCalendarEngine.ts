/**
 * Japanese Astronomical Calendar Engine:
 * - 24 Solar Terms (二十四節気 — Nijūshi Sekki) with authentic Jikō no Aisatsu letter openings
 * - 72 Micro-Seasons (七十二候 — Shichijūni Kō) with Wairo traditional colors & ambient motifs
 */

export interface SolarTermInfo {
  index: number;
  kanji: string;
  reading: string;
  vietnamese: string;
  seasonVi: 'Xuân' | 'Hạ' | 'Thu' | 'Đông';
  startMonth: number;
  startDay: number;
  jikoFormal: string;
  jikoFormalReading: string;
  jikoCasual: string;
  jikoCasualReading: string;
  meaningVi: string;
  wairoHex: string;
  wairoNameJp: string;
  wairoNameVi: string;
}

export interface MicroSeasonInfo {
  index: number; // 1..72
  sekkiKanji: string;
  kanji: string;
  reading: string;
  vietnamese: string;
  poeticDescVi: string;
  startMonth: number;
  startDay: number;
  seasonTag: 'Xuân' | 'Hạ' | 'Thu' | 'Đông';
  ambientMotif: 'sakura' | 'rain' | 'mist' | 'firefly' | 'maple' | 'snow';
  wairoHex: string;
  wairoNameJp: string;
  wairoNameVi: string;
}

export interface StationeryTheme {
  id: string;
  nameVi: string;
  nameJp: string;
  season: 'Xuân' | 'Hạ' | 'Thu' | 'Đông';
  paperBgLight: string;
  paperBgDark: string;
  accentHex: string;
  motifKanji: string;
}

export interface VintageStamp {
  id: string;
  kanji: string;
  labelVi: string;
  yenLabel: string;
  colorHex: string;
}

export const STATIONERY_THEMES: StationeryTheme[] = [
  {
    id: 'sakura_washi',
    nameVi: 'Giấy Washi Cánh Anh Đào',
    nameJp: '桜和紙',
    season: 'Xuân',
    paperBgLight: '#fcf6f4',
    paperBgDark: '#1c1718',
    accentHex: '#c97b84',
    motifKanji: '桜',
  },
  {
    id: 'ajisai_rain',
    nameVi: 'Giấy Mưa Cẩm Tú Cầu',
    nameJp: '紫陽花雨',
    season: 'Hạ',
    paperBgLight: '#f3f6fa',
    paperBgDark: '#131922',
    accentHex: '#5b7fa6',
    motifKanji: '雨',
  },
  {
    id: 'momiji_gold',
    nameVi: 'Giấy Lá Phong Hoàng Hôn',
    nameJp: '紅葉箋',
    season: 'Thu',
    paperBgLight: '#fbf5ee',
    paperBgDark: '#1d1612',
    accentHex: '#b85c38',
    motifKanji: '楓',
  },
  {
    id: 'yukimi_indigo',
    nameVi: 'Giấy Tuyết Trắng Chàm Sâu',
    nameJp: '雪見藍',
    season: 'Đông',
    paperBgLight: '#f4f6f8',
    paperBgDark: '#11161d',
    accentHex: '#3f5d7d',
    motifKanji: '雪',
  },
];

export const VINTAGE_STAMPS: VintageStamp[] = [
  { id: 'st_tsuru', kanji: '鶴', labelVi: 'Hạc Giấy Trường Thọ', yenLabel: '84円', colorHex: '#b84a39' },
  { id: 'st_fuji', kanji: '富', labelVi: 'Phú Sĩ Sương Sớm', yenLabel: '110円', colorHex: '#335c81' },
  { id: 'st_tsuki', kanji: '月', labelVi: 'Trăng Rằm Kyoto', yenLabel: '63円', colorHex: '#9c7834' },
  { id: 'st_cha', kanji: '茶', labelVi: 'Trà Thất Uji', yenLabel: '84円', colorHex: '#4f6d4f' },
];

export const TWENTY_FOUR_SEKKI: SolarTermInfo[] = [
  { index: 1, kanji: '小寒', reading: 'しょうかん', vietnamese: 'Tiểu Hàn', seasonVi: 'Đông', startMonth: 1, startDay: 5, jikoFormal: '厳寒の候', jikoFormalReading: 'げんかんのこう', jikoCasual: '寒さ厳しき折', jikoCasualReading: 'さむさきびしきおり', meaningVi: 'Vào tiết trời rét đậm đầu năm mới', wairoHex: '#335c81', wairoNameJp: '勝色 (Kachiiro)', wairoNameVi: 'Xanh chàm mùa đông' },
  { index: 2, kanji: '大寒', reading: 'だいかん', vietnamese: 'Đại Hàn', seasonVi: 'Đông', startMonth: 1, startDay: 20, jikoFormal: '大寒の候', jikoFormalReading: 'だいかんのこう', jikoCasual: '一年で最も寒い頃となりました', jikoCasualReading: 'いちねんでもっともさむいころとなりました', meaningVi: 'Giữa tiết trời lạnh giá nhất trong năm', wairoHex: '#2f4858', wairoNameJp: '鉄御納戸 (Tetsuonando)', wairoNameVi: 'Lam sắt tuyết lạnh' },
  { index: 3, kanji: '立春', reading: 'りっしゅん', vietnamese: 'Lập Xuân', seasonVi: 'Xuân', startMonth: 2, startDay: 4, jikoFormal: '立春の候', jikoFormalReading: 'りっしゅんのこう', jikoCasual: '暦の上では春となりました', jikoCasualReading: 'こよみのうえでははるとなりました', meaningVi: 'Theo lịch tiết khí, mùa xuân đã bắt đầu gõ cửa', wairoHex: '#c97b84', wairoNameJp: '紅梅色 (Kōbaiiro)', wairoNameVi: 'Hồng hoa mơ sớm' },
  { index: 4, kanji: '雨水', reading: 'うすい', vietnamese: 'Vũ Thủy', seasonVi: 'Xuân', startMonth: 2, startDay: 19, jikoFormal: '余寒の候', jikoFormalReading: 'よかんのこう', jikoCasual: '雪解けの季節となりました', jikoCasualReading: 'ゆきどけのきせつとなりました', meaningVi: 'Tuyết dần tan thành mưa xuân êm dịu', wairoHex: '#7d98a1', wairoNameJp: '瓶覗 (Kamenozoki)', wairoNameVi: 'Xanh nhạt nước tuyết tan' },
  { index: 5, kanji: '啓蟄', reading: 'けいちつ', vietnamese: 'Kinh Trập', seasonVi: 'Xuân', startMonth: 3, startDay: 5, jikoFormal: '早春の候', jikoFormalReading: 'そうしゅんのこう', jikoCasual: '一雨ごとに暖かさを増す今日この頃', jikoCasualReading: 'ひとあめごとにあたたかさをますきょうこのごろ', meaningVi: 'Sau mỗi cơn mưa xuân, hơi ấm lại thêm phần rõ rệt', wairoHex: '#6b8e5e', wairoNameJp: '萌黄 (Moegi)', wairoNameVi: 'Xanh mầm non đầu xuân' },
  { index: 6, kanji: '春分', reading: 'しゅんぶん', vietnamese: 'Xuân Phân', seasonVi: 'Xuân', startMonth: 3, startDay: 20, jikoFormal: '春分の候', jikoFormalReading: 'しゅんぶんのこう', jikoCasual: '日脚もすっかり伸びてまいりました', jikoCasualReading: 'ひあしもすっかりのびてまいりました', meaningVi: 'Ngày dài dần ra trong ánh nắng xuân dịu nhẹ', wairoHex: '#d48b99', wairoNameJp: '桜色 (Sakurairo)', wairoNameVi: 'Hồng cánh anh đào' },
  { index: 7, kanji: '清明', reading: 'せいめい', vietnamese: 'Thanh Minh', seasonVi: 'Xuân', startMonth: 4, startDay: 4, jikoFormal: '陽春の候', jikoFormalReading: 'ようしゅんのこう', jikoCasual: '桜の花がほころぶ季節となりました', jikoCasualReading: 'さくらのはながほころぶきせつとなりました', meaningVi: 'Tiết trời trong sáng, hoa anh đào khe khẽ hé nở', wairoHex: '#739973', wairoNameJp: '若草色 (Wakakusairo)', wairoNameVi: 'Xanh cỏ non thanh minh' },
  { index: 8, kanji: '穀雨', reading: 'こくう', vietnamese: 'Cốc Vũ', seasonVi: 'Xuân', startMonth: 4, startDay: 20, jikoFormal: '晩春の候', jikoFormalReading: 'ばんしゅんのこう', jikoCasual: '柔らかな春雨が緑を潤す頃', jikoCasualReading: 'やわらかなはるさめがみどりをうるおすころ', meaningVi: 'Cơn mưa cuối xuân dịu dàng tưới mát chồi xanh', wairoHex: '#5b8266', wairoNameJp: '青竹色 (Aotakeiro)', wairoNameVi: 'Xanh trúc sau mưa' },
  { index: 9, kanji: '立夏', reading: 'りっか', vietnamese: 'Lập Hạ', seasonVi: 'Hạ', startMonth: 5, startDay: 5, jikoFormal: '新緑の候', jikoFormalReading: 'しんりょくのこう', jikoCasual: '薫風が心地よい季節となりました', jikoCasualReading: 'くんぷうがここちよいきせつとなりました', meaningVi: 'Gió đầu hạ mang hương lá non thổi qua thật dễ chịu', wairoHex: '#3c7a57', wairoNameJp: '常磐色 (Tokiwairo)', wairoNameVi: 'Xanh ngọc tán lá đầu hạ' },
  { index: 10, kanji: '小満', reading: 'しょうまん', vietnamese: 'Tiểu Mãn', seasonVi: 'Hạ', startMonth: 5, startDay: 21, jikoFormal: '軽暑の候', jikoFormalReading: 'けいしょのこう', jikoCasual: '木々の緑がいっそう深まってまいりました', jikoCasualReading: 'きぎのみどりがいっそうふかまってまいりました', meaningVi: 'Sắc xanh cây cối càng thêm thẫm dưới nắng đầu mùa', wairoHex: '#4b7f6b', wairoNameJp: '青磁色 (Seijiiro)', wairoNameVi: 'Men ngọc thanh hạ' },
  { index: 11, kanji: '芒種', reading: 'ぼうしゅ', vietnamese: 'Mang Chủng', seasonVi: 'Hạ', startMonth: 6, startDay: 5, jikoFormal: '入梅の候', jikoFormalReading: 'にゅうばいのこう', jikoCasual: '紫陽花が雨に映える季節となりました', jikoCasualReading: 'あじさいがあめにはえるきせつとなりました', meaningVi: 'Mùa cẩm tú cầu bừng sáng trong làn mưa rào tháng Sáu', wairoHex: '#5b7fa6', wairoNameJp: '紫陽花 (Ajisai)', wairoNameVi: 'Lam tím cẩm tú cầu' },
  { index: 12, kanji: '夏至', reading: 'げし', vietnamese: 'Hạ Chí', seasonVi: 'Hạ', startMonth: 6, startDay: 21, jikoFormal: '夏至の候', jikoFormalReading: 'げしのこう', jikoCasual: '梅雨の晴れ間が嬉しい今日この頃', jikoCasualReading: 'つゆのはれまがうれしいきょうこのごろ', meaningVi: 'Những khoảng trời hửng nắng giữa mùa mưa thật đáng quý', wairoHex: '#3b6e8c', wairoNameJp: '納戸色 (Nandoiro)', wairoNameVi: 'Xanh thẳm hạ chí' },
  { index: 13, kanji: '小暑', reading: 'しょうしょ', vietnamese: 'Tiểu Thử', seasonVi: 'Hạ', startMonth: 7, startDay: 7, jikoFormal: '盛夏の候', jikoFormalReading: 'せいかのこう', jikoCasual: '風鈴の音色が涼を呼ぶ季節となりました', jikoCasualReading: 'ふうりんのねいろがりょうをよぶきせつとなりました', meaningVi: 'Tiếng chuông gió ngân vang gọi về làn gió mát giữa hè', wairoHex: '#2f6f7e', wairoNameJp: '浅葱色 (Asagiiro)', wairoNameVi: 'Xanh ngọc chuông gió' },
  { index: 14, kanji: '大暑', reading: 'たいしょ', vietnamese: 'Đại Thử', seasonVi: 'Hạ', startMonth: 7, startDay: 22, jikoFormal: '大暑の候', jikoFormalReading: 'たいしょのこう', jikoCasual: '蝉時雨が夏の盛りを告げております', jikoCasualReading: 'せみしぐれがなつのさかりをつげております', meaningVi: 'Tiếng ve ngân như cơn mưa rào báo hiệu đỉnh điểm mùa hạ', wairoHex: '#275d6d', wairoNameJp: '藍色 (Aiiro)', wairoNameVi: 'Chàm sâu giữa hạ' },
  { index: 15, kanji: '立秋', reading: 'りっしゅう', vietnamese: 'Lập Thu', seasonVi: 'Thu', startMonth: 8, startDay: 7, jikoFormal: '残暑の候', jikoFormalReading: 'ざんしょのこう', jikoCasual: '夕風に秋の気配を感じる頃となりました', jikoCasualReading: 'ゆうかぜにあきのけはいをかんじるころとなりました', meaningVi: 'Trong cơn gió chiều đã thoáng ẩn hiện hơi thở mùa thu', wairoHex: '#8d6e47', wairoNameJp: '朽葉色 (Kuchibairo)', wairoNameVi: 'Vàng nâu lá chớm thu' },
  { index: 16, kanji: '処暑', reading: 'しょしょ', vietnamese: 'Xử Thử', seasonVi: 'Thu', startMonth: 8, startDay: 23, jikoFormal: '処暑の候', jikoFormalReading: 'しょしょのこう', jikoCasual: '朝夕はずいぶん過ごしやすくなりました', jikoCasualReading: 'あさゆうはずいぶんすごしやすくなりました', meaningVi: 'Sáng sớm và chiều muộn đã trở nên mát dịu dễ chịu', wairoHex: '#9c7834', wairoNameJp: '黄櫨染 (Kōrozen)', wairoNameVi: 'Hổ phách chiều thu' },
  { index: 17, kanji: '白露', reading: 'はくろ', vietnamese: 'Bạch Lộ', seasonVi: 'Thu', startMonth: 9, startDay: 7, jikoFormal: '初秋の候', jikoFormalReading: 'しょしゅうのこう', jikoCasual: '草葉に白露が宿る季節となりました', jikoCasualReading: 'くさばにしらつゆがやどるきせつとなりました', meaningVi: 'Giọt sương trắng bắt đầu đọng trên ngọn cỏ sớm mai', wairoHex: '#6c7a6b', wairoNameJp: '利休鼠 (Rikyūnezumi)', wairoNameVi: 'Xám lục sương thu' },
  { index: 18, kanji: '秋分', reading: 'しゅうぶん', vietnamese: 'Thu Phân', seasonVi: 'Thu', startMonth: 9, startDay: 22, jikoFormal: '秋冷の候', jikoFormalReading: 'しゅうれいのこう', jikoCasual: '虫の音に耳を傾ける夜長となりました', jikoCasualReading: 'むしのねにみみをかたむけるよながとなりました', meaningVi: 'Những đêm thu dài lắng nghe tiếng côn trùng rả rích', wairoHex: '#a35d42', wairoNameJp: '柿色 (Kakiiro)', wairoNameVi: 'Đỏ cam quả hồng thu' },
  { index: 19, kanji: '寒露', reading: 'かんろ', vietnamese: 'Hàn Lộ', seasonVi: 'Thu', startMonth: 10, startDay: 8, jikoFormal: '仲秋の候', jikoFormalReading: 'ちゅうしゅうのこう', jikoCasual: '金木犀の甘い香りが漂う頃となりました', jikoCasualReading: 'きんもくせいのあまいかおりがただようころとなりました', meaningVi: 'Hương hoa mộc tê ngọt ngào thoảng bay trong gió mát', wairoHex: '#b87333', wairoNameJp: '金木犀 (Kinmokusei)', wairoNameVi: 'Cam vàng hoa mộc tê' },
  { index: 20, kanji: '霜降', reading: 'そうこう', vietnamese: 'Sương Giáng', seasonVi: 'Thu', startMonth: 10, startDay: 23, jikoFormal: '晩秋の候', jikoFormalReading: 'ばんしゅうのこう', jikoCasual: '山々が錦に染まる季節となりました', jikoCasualReading: 'やまやまがにしきにそまるきせつとなりました', meaningVi: 'Núi non khoác lên tấm áo gấm đỏ vàng cuối thu', wairoHex: '#a83c32', wairoNameJp: '紅葉色 (Momijiiro)', wairoNameVi: 'Đỏ thẫm lá phong' },
  { index: 21, kanji: '立冬', reading: 'りっとう', vietnamese: 'Lập Đông', seasonVi: 'Đông', startMonth: 11, startDay: 7, jikoFormal: '立冬の候', jikoFormalReading: 'りっとうのこう', jikoCasual: '木枯らしが吹く季節となりました', jikoCasualReading: 'こがらしがふくきせつとなりました', meaningVi: 'Cơn gió lạnh đầu đông (Kogarashi) đã bắt đầu thổi về', wairoHex: '#735748', wairoNameJp: '焦茶 (Kogecha)', wairoNameVi: 'Nâu trầm gỗ ấm' },
  { index: 22, kanji: '小雪', reading: 'しょうせつ', vietnamese: 'Tiểu Tuyết', seasonVi: 'Đông', startMonth: 11, startDay: 22, jikoFormal: '初冬の候', jikoFormalReading: 'しょとうのこう', jikoCasual: '温かいお茶がいっそう恋しい季節です', jikoCasualReading: 'あたたかいおちゃがいっそうこいしいきせつです', meaningVi: 'Mùa mà một tách trà nóng càng trở nên đáng nhớ hơn bao giờ hết', wairoHex: '#4b5b6b', wairoNameJp: '藍鼠 (Ainezumi)', wairoNameVi: 'Lam xám sương tuyết' },
  { index: 23, kanji: '大雪', reading: 'たいせつ', vietnamese: 'Đại Tuyết', seasonVi: 'Đông', startMonth: 12, startDay: 7, jikoFormal: '師走の候', jikoFormalReading: 'しわすのこう', jikoCasual: '今年も残すところあとわずかとなりました', jikoCasualReading: 'ことしものこすところあとわずかとなりました', meaningVi: 'Một năm nữa lại dần khép lại trong không khí tháng Chạp', wairoHex: '#3b4f66', wairoNameJp: '濃藍 (Koiai)', wairoNameVi: 'Chàm đậm đêm đông' },
  { index: 24, kanji: '冬至', reading: 'とうじ', vietnamese: 'Đông Chí', seasonVi: 'Đông', startMonth: 12, startDay: 21, jikoFormal: '歳晩の候', jikoFormalReading: 'さいばんのこう', jikoCasual: '柚子湯の香りに心和む頃となりました', jikoCasualReading: 'ゆずゆのかおりにこころなごむころとなりました', meaningVi: 'Hương bồn tắm chanh Yuzu sưởi ấm lòng người đêm dài nhất năm', wairoHex: '#2f455c', wairoNameJp: '深川鼠 (Fukagawanezumi)', wairoNameVi: 'Lam sương đêm đông chí' },
];

/**
 * 72 Micro-Seasons (七十二候) — 3 micro-seasons (初候・次候・末候) per 24 Solar Term.
 * Built deterministically from authentic Japanese Kō titles so every single day of the year maps accurately.
 */
const SEVENTY_TWO_KO_RAW: Array<[string, string, string, string, MicroSeasonInfo['ambientMotif']]> = [
  // 1. Tiểu Hàn (Jan 5 - Jan 19)
  ['芹乃栄', 'せりすなわちさかう', 'Rau cần nước bắt đầu xanh tốt', 'Giữa suối lạnh đầu năm, mầm rau cần vẫn lặng lẽ vươn xanh.', 'snow'],
  ['水泉動', 'しみずあたたかをふくむ', 'Mạch nước ngầm khẽ ấm dần', 'Dưới lớp băng tuyết, dòng suối ngầm bắt đầu chuyển mình.', 'snow'],
  ['雉始雊', 'きじはじめてなく', 'Chim trĩ cất tiếng gáy đầu mùa', 'Tiếng chim trĩ vang vọng trên sườn đồi phủ sương sớm.', 'mist'],
  // 2. Đại Hàn (Jan 20 - Feb 3)
  ['款冬華', 'ふきのはなさく', 'Nụ hoa Fuki hé nở dưới tuyết', 'Bông hoa đầu tiên nhú lên từ nền tuyết trắng báo tin xuân.', 'snow'],
  ['水沢腹堅', 'さわみずこおりつめる', 'Sông suối đóng băng dày nhất', 'Đỉnh điểm tĩnh lặng của mùa đông trước khi đất trời đổi sắc.', 'snow'],
  ['鶏始乳', 'にわとりはじめてとやにつく', 'Gà mái bắt đầu ấp ổ đón xuân', 'Sinh khí ấm áp âm thầm trở lại trong từng mái nhà nhỏ.', 'mist'],
  // 3. Lập Xuân (Feb 4 - Feb 18)
  ['東風解凍', 'はるかぜこおりをとく', 'Gió đông khẽ tan lớp băng giá', 'Làn gió phương đông đầu tiên chạm vào mặt nước giá lạnh.', 'mist'],
  ['黄鶯睍睆', 'うぐいすなく', 'Chim oanh vàng cất tiếng hót xuân', 'Tiếng chim Uguisu lảnh lót trên cành mơ sớm.', 'sakura'],
  ['魚上氷', 'うおこおりをいずる', 'Đàn cá ngoi lên khe băng tan', 'Ánh nắng xuyên qua khe băng đánh thức làn nước trong.', 'mist'],
  // 4. Vũ Thủy (Feb 19 - Mar 4)
  ['土脉潤起', 'つちのしょううるおいおこる', 'Mạch đất thấm đẫm hơi mưa xuân', 'Cơn mưa đầu xuân làm đất mềm lại và dậy mùi cỏ ẩm.', 'rain'],
  ['霞始靆', 'かすみはじめてたなびく', 'Sương xuân bắt đầu giăng mờ đỉnh núi', 'Làn sương Kasumi bảng lảng ôm lấy chân núi phía xa.', 'mist'],
  ['草木萌動', 'そうもくめばえいずる', 'Cỏ cây đồng loạt nhú mầm non', 'Nhựa sống căng tràn trong từng nụ biếc bên hiên nhà.', 'sakura'],
  // 5. Kinh Trập (Mar 5 - Mar 19)
  ['蟄虫啓戸', 'すごもりむしとをひらく', 'Côn trùng mở cửa hang đón nắng', 'Vạn vật rời giấc ngủ đông, khẽ khàng bước ra ánh sáng.', 'mist'],
  ['桃始笑', 'ももはじめてさく', 'Hoa đào bắt đầu mỉm cười khoe sắc', 'Người Nhật gọi nụ đào hé nở là "hoa cười" (Hana warau).', 'sakura'],
  ['菜虫化蝶', 'なむしちょうとなる', 'Sâu xanh hóa bướm trắng bay lượn', 'Đôi cánh bướm mỏng manh chao nghiêng trên thảm hoa cải vàng.', 'sakura'],
  // 6. Xuân Phân (Mar 20 - Apr 3)
  ['雀始巣', 'すずめはじめてすくう', 'Chim sẻ bắt đầu bện tổ mùa xuân', 'Tiếng chim sẻ ríu rít dưới mái hiên gỗ ấm nắng.', 'sakura'],
  ['桜始開', 'さくらはじめてひらく', 'Hoa anh đào bắt đầu bung cánh', 'Khoảnh khắc dịu dàng nhất khi những cánh hoa đầu tiên hé mở.', 'sakura'],
  ['雷乃発声', 'かみなりすなわちこえをはっす', 'Tiếng sấm xuân đầu tiên vọng về', 'Tiếng sấm xa gọi những cơn mưa rào tưới mát trời xuân.', 'rain'],
  // 7. Thanh Minh (Apr 4 - Apr 19)
  ['玄鳥至', 'つばめきたる', 'Chim én phương nam trở về', 'Cánh én chao liệng trên bầu trời trong xanh sau mưa.', 'sakura'],
  ['鴻雁北', 'こうがんかえる', 'Đàn nhạn trời bay về phương bắc', 'Một lời chào tạm biệt dịu dàng dành cho những ngày lạnh.', 'mist'],
  ['虹始見', 'にじはじめてあらわる', 'Cầu vồng mùa xuân lần đầu xuất hiện', 'Sau cơn mưa rào ngắn, vầng cầu vồng bắc ngang bầu trời trong.', 'rain'],
  // 8. Cốc Vũ (Apr 20 - May 4)
  ['葭始生', 'あしはじめてしょうず', 'Bờ lau sậy ven sông nhú chồi xanh', 'Ven bờ nước, những mầm lau non đung đưa trong gió nhẹ.', 'rain'],
  ['霜止出苗', 'しもやみてなえいずる', 'Sương muối dứt hẳn, mạ non vươn lên', 'Nắng ấm trải đều trên những thửa ruộng ngập nước gương trời.', 'mist'],
  ['牡丹華', 'ぼたんはなさく', 'Hoa mẫu đơn lộng lẫy khoe hương', 'Những đóa mẫu đơn kiêu sa nở rộ khép lại mùa xuân dịu ngọt.', 'sakura'],
  // 9. Lập Hạ (May 5 - May 20)
  ['蛙始鳴', 'かわずはじめてなく', 'Tiếng ếch đêm đầu hạ cất lên', 'Âm thanh mộc mạc trên đồng nước khi hoàng hôn buông xuống.', 'rain'],
  ['蚯蚓出', 'みみずいずる', 'Đất ấm đánh thức sinh linh dưới lòng đất', 'Khu vườn sau mưa thoảng hương đất ẩm đầy sức sống.', 'mist'],
  ['竹笋生', 'たけのこしょうず', 'Măng trúc non đội đất vươn cao', 'Rừng trúc Kyoto rì rào đón những búp măng đầu mùa.', 'mist'],
  // 10. Tiểu Mãn (May 21 - Jun 4)
  ['蚕起食桑', 'かいこおきてくわをはむ', 'Tằm non thức giấc ăn lá dâu xanh', 'Lá dâu xanh mướt dưới ánh nắng trong trẻo tháng Năm.', 'mist'],
  ['紅花栄', 'べにばなさかう', 'Hoa hồng hoa nở rực rỡ trên đồng', 'Sắc đỏ cam ấm áp tỏa sáng giữa thảm lá xanh non.', 'firefly'],
  ['麦秋至', 'むぎのときいたる', 'Mùa lúa mạch chín vàng óng ả', 'Gió đầu hạ thổi qua cánh đồng lúa mạch tựa mùa thu thu nhỏ.', 'mist'],
  // 11. Mang Chủng (Jun 5 - Jun 20)
  ['螳螂生', 'かまきりしょうず', 'Bọ ngựa con chào đời giữa tán lá', 'Vườn mùa mưa rộn ràng những sinh linh bé nhỏ.', 'rain'],
  ['腐草為蛍', 'くされたるくさほたるとなる', 'Đom đóm thắp sáng ven suối đêm', 'Những đốm sáng xanh dịu bay lững lờ bên bờ nước tĩnh lặng.', 'firefly'],
  ['梅子黄', 'うめのみきばむ', 'Quả mơ ngả vàng trên cành ướt mưa', 'Hương mơ chín thoang thoảng báo hiệu mùa mưa Tsuyu.', 'rain'],
  // 12. Hạ Chí (Jun 21 - Jul 6)
  ['乃東枯', 'なつかれくさかるる', 'Cỏ hạ chí lặng lẽ khép chu kỳ', 'Thiên nhiên đổi nhịp trong những ngày ánh sáng dài nhất năm.', 'rain'],
  ['菖蒲華', 'あやめはなさく', 'Hoa diên vĩ tím nở giữa làn mưa', 'Sắc tím thanh tao bên hồ nước làm dịu cái ẩm tháng Sáu.', 'rain'],
  ['半夏生', 'はんげしょうず', 'Lá Bán Hạ chuyển trắng nửa phiến', 'Một nét mỹ học kỳ diệu giữa vườn hạ thanh vắng.', 'mist'],
  // 13. Tiểu Thử (Jul 7 - Jul 21)
  ['温風至', 'あつかぜいたる', 'Làn gió ấm mùa hè tràn về', 'Tiếng chuông gió thủy tinh ngân khe khẽ bên hiên nhà gỗ.', 'firefly'],
  ['蓮始開', 'はすはじめてひらく', 'Hoa sen sớm mai bắt đầu hé nở', 'Trong ánh bình minh, nụ sen bung nở với hương thơm thanh khiết.', 'mist'],
  ['鷹乃学習', 'たかすなわちわざをならう', 'Chim ưng non tập sải cánh bay cao', 'Bầu trời tháng Bảy cao vời vợi cùng những đám mây trắng lớn.', 'firefly'],
  // 14. Đại Thử (Jul 22 - Aug 6)
  ['桐始結花', 'きりはじめてはなをむすぶ', 'Cây ngô đồng kết nụ hoa cho mùa sau', 'Giữa đỉnh hè rực rỡ, tự nhiên đã ươm mầm cho mùa xuân kế tiếp.', 'firefly'],
  ['土潤溽暑', 'つちうるおうてむしあつし', 'Hơi ẩm đất bốc lên giữa chiều hạ', 'Cơn mưa rào chiều bất chợt gột rửa phố phường nóng bức.', 'rain'],
  ['大雨時行', 'たいうときどきふる', 'Những cơn mưa hạ lớn chợt đến chợt đi', 'Mây tích tụ rồi vỡ òa thành bản giao hưởng mùa hè ngắn ngủi.', 'rain'],
  // 15. Lập Thu (Aug 7 - Aug 22)
  ['涼風至', 'すずかぜいたる', 'Làn gió mát đầu thu khẽ lướt qua', 'Giữa cái nắng cuối hè, gió chiều chợt mang vị mát thanh tao.', 'mist'],
  ['寒蝉鳴', 'ひぐらしなく', 'Tiếng ve sầu chiều (Higurashi) ngân buồn', 'Âm thanh "kana-kana" lúc hoàng hôn gợi nỗi man mác Mono no aware.', 'maple'],
  ['蒙霧升降', 'ふかききりまとう', 'Sương thu sâu bắt đầu quấn quýt triền núi', 'Sáng sớm vùng núi chìm trong tấm voan trắng thanh bình.', 'mist'],
  // 16. Xử Thử (Aug 23 - Sep 6)
  ['綿柎開', 'わたのはなしべひらく', 'Quả bông nứt vỏ khoe chùm sợi trắng', 'Ánh nắng dịu hơn, bầu trời bắt đầu trong cao sắc thu.', 'mist'],
  ['天地始粛', 'てんちはじめてさむし', 'Trời đất bắt đầu dịu lại cái oi nồng', 'Nhịp sống chậm lại theo bước chân êm ái của tháng Tám muộn.', 'maple'],
  ['禾乃登', 'こくものすなわちみのる', 'Bông lúa trĩu hạt cúi đầu chín vàng', 'Cánh đồng quê Nhật Bản tỏa hương lúa mới thanh bình.', 'maple'],
  // 17. Bạch Lộ (Sep 7 - Sep 21)
  ['草露白', 'くさのつゆしろし', 'Giọt sương trắng lấp lánh trên ngọn cỏ', 'Mỗi giọt sương sớm phản chiếu cả bầu trời thu trong veo.', 'mist'],
  ['鶺鴒鳴', 'せきれいなく', 'Chim chìa vôi cất tiếng bên bờ đá', 'Ven dòng suối thu, tiếng chim nhỏ nhắn vọng giữa không gian yên ả.', 'maple'],
  ['玄鳥去', 'つばめさる', 'Đàn én rời mái hiên bay về phương nam', 'Lời tạm biệt nhẹ nhàng khép lại những tháng ngày rực nắng.', 'maple'],
  // 18. Thu Phân (Sep 22 - Oct 7)
  ['雷乃収声', 'かみなりすなわちこえをおさむ', 'Tiếng sấm mùa hạ lặng lẽ thu mình', 'Bầu trời thu quang đãng, yên tĩnh đến độ nghe rõ tiếng lá rơi.', 'maple'],
  ['蟄虫坏戸', 'むしかくれてとをふさぐ', 'Côn trùng khép cửa tổ chuẩn bị trú đông', 'Đêm thu dài hơn, tiếng dế ngân chậm rãi ngoài hàng rào.', 'maple'],
  ['水始涸', 'みずはじめてかるる', 'Nước ruộng rút dần đón mùa gặt mới', 'Mùi rơm khô và gió mát làm lòng người thêm phần tĩnh tại.', 'maple'],
  // 19. Hàn Lộ (Oct 8 - Oct 22)
  ['鴻雁来', 'こうがんきたる', 'Đàn nhạn trời phương bắc bay về trú đông', 'Đội hình chữ V lướt qua vầng trăng thu thanh khiết.', 'maple'],
  ['菊花開', 'きくのはなひらく', 'Hoa cúc mùa thu nở rộ thanh tao', 'Hương cúc dịu nhẹ gắn liền với trà đạo và thi ca Nhật Bản.', 'maple'],
  ['蟋蟀在戸', 'きりぎりすとにあり', 'Tiếng dế nỉ non ngay sát khung cửa gỗ', 'Bên tách trà rang Hōjicha ấm nóng, đêm thu trở nên thật gần.', 'maple'],
  // 20. Sương Giáng (Oct 23 - Nov 6)
  ['霜始降', 'しもはじめてふる', 'Sương giá đầu mùa khẽ phủ mặt đất', 'Sáng sớm hơi thở hóa làn khói trắng mỏng giữa công viên.', 'maple'],
  ['霎時施', 'こさめときどきふる', 'Cơn mưa thu lất phất (Shigure) chợt qua', 'Mưa Shigure khiến sắc lá phong đỏ càng thêm rực rỡ sâu lắng.', 'rain'],
  ['楓蔦黄', 'もみじつたきばむ', 'Lá phong và dây thường xuân rực sắc thu', 'Cả khu vườn đền cổ nhuộm đỏ thẫm trong nắng chiều tà.', 'maple'],
  // 21. Lập Đông (Nov 7 - Nov 21)
  ['山茶始開', 'つばきはじめてひらく', 'Hoa trà mi mùa đông bắt đầu hé nở', 'Giữa sắc trời se lạnh, cánh hoa Sazanka hồng thắm mang hơi ấm.', 'maple'],
  ['地始凍', 'ちはじめてこおる', 'Mặt đất sớm mai bắt đầu se lạnh đông cứng', 'Bước chân trên con đường rải sỏi vang lên âm thanh giòn tan.', 'snow'],
  ['金盞香', 'きんせんかさく', 'Hoa thủy tiên vàng tỏa hương thanh khiết', 'Hương thơm dịu mảnh đánh thức giác quan giữa tiết đầu đông.', 'mist'],
  // 22. Tiểu Tuyết (Nov 22 - Dec 6)
  ['虹蔵不見', 'にじかくれてみえず', 'Cầu vồng ẩn mình sau ánh nắng yếu dần', 'Bầu trời cuối năm trầm tĩnh, dịu mắt như bức tranh thủy mặc.', 'mist'],
  ['朔風払葉', 'きたかぜこのはをはらう', 'Gió bấc khẽ quét những chiếc lá cuối cùng', 'Cành cây trần trụi phô bày vẻ đẹp Wabi-sabi mộc mạc.', 'snow'],
  ['橘始黄', 'たちばなはじめてきばむ', 'Trái quýt cổ Tachibana ngả sắc vàng tươi', 'Đốm màu ấm áp giữa khu vườn đông yên ắng.', 'snow'],
  // 23. Đại Tuyết (Dec 7 - Dec 20)
  ['閉塞成冬', 'そらさむくふゆとなる', 'Mây đông khép kín mang mùa lạnh sâu về', 'Ánh đèn vàng từ quán cà phê góc phố bỗng trở nên ấm lạ thường.', 'snow'],
  ['熊蟄穴', 'くまあなにこもる', 'Gấu núi thu mình vào hang ngủ đông', 'Thời điểm tuyệt vời để sống chậm lại và đọc sách bên lò sưởi.', 'snow'],
  ['鱖魚群', 'さけのうおむらがる', 'Đàn cá hồi ngược dòng trở về sông cũ', 'Vòng tuần hoàn kiên định của tự nhiên giữa dòng nước lạnh.', 'snow'],
  // 24. Đông Chí (Dec 21 - Jan 4)
  ['乃東生', 'なつかれくさしょうず', 'Mầm cỏ nhỏ âm thầm nhú dưới lòng tuyết', 'Ngay trong đêm dài nhất năm, ánh sáng và sự sống đã bắt đầu trở lại.', 'snow'],
  ['麋角解', 'さわしかつのおつる', 'Hươu núi thay gạc đón chu kỳ mới', 'Buông bỏ điều cũ kỹ để nhẹ nhàng bước sang một năm thanh thản.', 'snow'],
  ['雪下出麦', 'ゆきわたりてむぎのびる', 'Mầm lúa mạch vươn lên dưới lớp tuyết dày', 'Sức sống bền bỉ ẩn giấu dưới vẻ ngoài tĩnh lặng nhất.', 'snow'],
];

function dayOfYear(month: number, day: number): number {
  const daysBeforeMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  return (daysBeforeMonth[month - 1] || 0) + day;
}

export function getCurrentSolarTerm(date: Date = new Date()): SolarTermInfo {
  const target = dayOfYear(date.getMonth() + 1, date.getDate());
  let current = TWENTY_FOUR_SEKKI[TWENTY_FOUR_SEKKI.length - 1]; // Default to Đông Chí for Jan 1-4

  for (const term of TWENTY_FOUR_SEKKI) {
    const start = dayOfYear(term.startMonth, term.startDay);
    if (target >= start) {
      current = term;
    }
  }
  return current;
}

export function getCurrentMicroSeason(date: Date = new Date()): MicroSeasonInfo {
  const sekki = getCurrentSolarTerm(date);
  const sekkiIdx = sekki.index - 1; // 0..23
  const target = dayOfYear(date.getMonth() + 1, date.getDate());
  let sekkiStart = dayOfYear(sekki.startMonth, sekki.startDay);

  // Handle wrap-around for Jan 1..4 falling inside Đông Chí (Dec 21)
  let offsetDays = target - sekkiStart;
  if (offsetDays < 0) {
    offsetDays = target + (365 - sekkiStart);
  }

  const subIndex = Math.min(2, Math.max(0, Math.floor(offsetDays / 5))); // 0, 1, or 2
  const globalIdx = sekkiIdx * 3 + subIndex; // 0..71
  const entry = SEVENTY_TWO_KO_RAW[globalIdx] || SEVENTY_TWO_KO_RAW[0];

  const startDateObj = new Date(date.getFullYear(), sekki.startMonth - 1, sekki.startDay + subIndex * 5);

  return {
    index: globalIdx + 1,
    sekkiKanji: sekki.kanji,
    kanji: entry[0],
    reading: entry[1],
    vietnamese: entry[2],
    poeticDescVi: entry[3],
    startMonth: startDateObj.getMonth() + 1,
    startDay: startDateObj.getDate(),
    seasonTag: sekki.seasonVi,
    ambientMotif: entry[4],
    wairoHex: sekki.wairoHex,
    wairoNameJp: sekki.wairoNameJp,
    wairoNameVi: sekki.wairoNameVi,
  };
}
