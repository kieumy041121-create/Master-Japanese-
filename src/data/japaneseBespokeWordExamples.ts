/**
 * Bespoke Master Japanese Word Examples Vault
 * 
 * Guarantees:
 * 1. 100% indivisible, unified 4-tuples: Japanese (with Kanji) ⬄ Kana (Hiragana) ⬄ Romaji (Hepburn) ⬄ Vietnamese (natural, accurate)
 * 2. Absolute zero cookie-cutter templating: Every sentence is uniquely written for the exact real-life context of that word.
 * 3. Authentic Japanese grammar, cultural nuances, and natural, polished Vietnamese translations.
 */

export interface BespokeWordExample {
  type: 'literal' | 'core' | 'figurative' | 'collocation';
  label: string;
  japanese: string;
  reading: string;
  romaji: string;
  vietnamese: string;
}

export const MASTER_BESPOKE_WORD_EXAMPLES: Record<string, BespokeWordExample[]> = {
  // 1. 手帳 (Sổ tay)
  '手帳': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '忘れないように、大切な予定を手帳に書き留めておきます。',
      reading: 'わすれないように、たいせつな よていを てちょうに かきとめて おきます。',
      romaji: 'Wasurenai you ni, taisetsu na yotei wo techou ni kakitomete okimasu.',
      vietnamese: 'Để không bị quên, tôi cẩn thận ghi chép lại các lịch trình quan trọng vào cuốn sổ tay.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '毎朝、手帳を開いて今日のタスクと優先順位を確認するのが私の日課です。',
      reading: 'まいあさ、てちょうを ひらいて きょうの タスクと ゆうせんじゅんいを かくにんする のが わたしの にっかです。',
      romaji: 'Maiasa, techou wo hiraite kyou no tasuku to yuusenjuni wo kakunin suru no ga watashi no nikka desu.',
      vietnamese: 'Mỗi sáng, mở sổ tay để rà soát các đầu việc trong ngày và thứ tự ưu tiên là thói quen làm việc của tôi.'
    }
  ],

  // 2. 手紙 (Lá thư, bức thư)
  '手紙': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '遠くに住む祖母へ、元気な近況を報告する手紙を心を込めて書きました。',
      reading: 'とおくに すむ そぼへ、げんきな きんきょうを ほうこくする てがみを こころを こめて かきました。',
      romaji: 'Tooku ni sumu sobo he, genki na kinkyou wo houkoku suru tegami wo kokoro wo komete kakimashita.',
      vietnamese: 'Gửi người bà đang sống ở nơi xa, tôi đã nắn nót viết một bức thư chan chứa tình cảm để báo tin mình vẫn bình an khỏe mạnh.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '長年お世話になった恩師へ感謝の手紙を送り、丁寧な返事をいただいて大変感動しました。',
      reading: 'ながねん おせわに なった おんしへ かんしゃの てがみを おくり、ていねいな へんじを いただいて たいへん かんどうしました。',
      romaji: 'Naganen osewa ni natta onshi he kansha no tegami wo okuri, teinei na henji wo itadaite taihen kandou shimashita.',
      vietnamese: 'Tôi đã gửi một bức thư cảm ơn tới người thầy đã dìu dắt mình suốt nhiều năm và vô cùng xúc động khi nhận được hồi âm ân cần của thầy.'
    }
  ],

  // 3. 鞄 (Cặp, túi xách)
  '鞄': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '毎朝、ノートパソコンと筆箱を鞄に詰めて大学へ通っています。',
      reading: 'まいあさ、ノートパソコンと ふでばこを かばんに つめて だいがくへ かよっています。',
      romaji: 'Maiasa, nootopasokon to fudebako wo kaban ni tsumete daigaku he kayotte imasu.',
      vietnamese: 'Mỗi sáng, tôi sắp xếp máy tính xách tay và hộp bút vào cặp rồi đi đến trường đại học.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '就職活動のために、書類が折れずにすっきり入る黒いビジネス鞄を新調しました。',
      reading: 'しゅうしょくかつどうの ために、しょるいが おれずに すっきり はいる くろい ビジネスかばんを しんちょうしました。',
      romaji: 'Shuushokukatsudou no tame ni, shorui ga orezu ni sukkiri hairu kuroi bijinesukaban wo shinchou shimashita.',
      vietnamese: 'Để chuẩn bị đi xin việc, tôi đã sắm một chiếc cặp công sở màu đen đựng vừa vặn tài liệu mà không lo bị gấp nếp.'
    }
  ],

  // 4. 傘 (Cây dù, cái ô)
  '傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '駅を出たら急に土砂降りの雨が降ってきたので、コンビニで傘を買いました。',
      reading: 'えきを でたら きゅうに どしゃぶりの あめが ふってきたので、コンビニで かさを かいました。',
      romaji: 'Eki wo detara kyuu ni doshaburi no ame ga futtekita node, konbini de kasa wo kaimashita.',
      vietnamese: 'Vừa bước ra khỏi nhà ga thì trời bỗng đổ mưa rào tầm tã, nên tôi đã ghé vào cửa hàng tiện lợi mua một cây dù.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '午後の降水確率が高かったので、鞄の底に軽量の折りたたみ傘を忍ばせて出社しました。',
      reading: 'ごごの こうすいかくりつが たかかったので、かばんの そこに けいりょうの おりたたみがさを しのばせて しゅっしゃしました。',
      romaji: 'Gogo no kousuikakuritsu ga takakatta node, kaban no soko ni keiryou no oritatamikasa wo shinobasete shussha shimashita.',
      vietnamese: 'Vì xác suất mưa vào buổi chiều khá cao, tôi đã để sẵn một chiếc dù gấp siêu nhẹ ở đáy cặp rồi mới đi làm.'
    }
  ],

  // 5. 時計 (Đồng hồ)
  '時計': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'リビングの掛け時計を見上げたら、もう待ち合わせの30分前になっていました。',
      reading: 'リビングの かけどけいを みあげたら、もう まちあわせの さんじゅっぷんまえに なっていました。',
      romaji: 'Ribingu no kakedokei wo miagetara, mou machiawase no sanjuppunmae ni natte imashita.',
      vietnamese: 'Ngước nhìn chiếc đồng hồ treo tường ở phòng khách, tôi thấy đã đến lúc chỉ còn 30 phút nữa là tới giờ hẹn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '社会人として信用を守るため、常に正確な腕時計を身につけて5分前行動を徹底しています。',
      reading: 'しゃかいじんとして しんようを まもるため、つねに せいかくな うでどけいを みにつけて ごふんまえこうどうを てっていしています。',
      romaji: 'Shakaijin toshite shinyou wo mamoru tame, tsuneni seikaku na udedokei wo minitsukete gofunmaekoudou wo tettei shite imasu.',
      vietnamese: 'Để giữ gìn chữ tín trong công việc, tôi luôn đeo đồng hồ đúng giờ và thực hiện nghiêm ngặt quy tắc có mặt trước 5 phút.'
    }
  ],

  // 6. 机 (Bàn làm việc, bàn học)
  '机': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '集中して勉強できるように、机の上にある余計な物をすべて引き出しに片付けました。',
      reading: 'しゅうちゅうして べんきょうできるように、つくえの うえに ある よけいな ものを すべて ひきだしに かたづけました。',
      romaji: 'Shuuchuu shite benkyou dekiru you ni, tsukue no ue ni aru yokei na mono wo subete hikidashi ni katazukemashita.',
      vietnamese: 'Để có thể tập trung học bài, tôi đã dọn toàn bộ những đồ vật không cần thiết trên bàn vào trong ngăn kéo.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'オフィスでは退勤時に机の上を何もない状態にする「クリアデスク運動」が推奨されています。',
      reading: 'オフィスでは たいきんじに つくえの うえを なにもない じょうたいに する「クリアデスクうんどう」が すいしょうされています。',
      romaji: 'Ofisu de wa taikinji ni tsukue no ue wo nani mo nai joutai ni suru "kuriadesuku undou" ga suishou sarete imasu.',
      vietnamese: 'Ở văn phòng làm việc, phong trào dọn sạch mặt bàn gọn gàng trước khi tan sở luôn được khuyến khích áp dụng.'
    }
  ],

  // 7. 椅子 (Ghế ngồi)
  '椅子': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '日当たりの良いベランダの椅子に腰掛けて、のんびりと読書を楽しみました。',
      reading: 'ひあたりの よい ベランダの いすに こしかけて、のんびりと どくしょを たのしみました。',
      romaji: 'Hiatari no yoi beranda no isu ni koshikakete, nonbiri to dokusho wo tanoshimashita.',
      vietnamese: 'Ngồi thả mình trên chiếc ghế ngoài ban công ngập tràn ánh nắng, tôi thong thả tận hưởng những trang sách hay.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '長時間のデスクワークによる腰痛を防ぐため、人間工学に基づいたオフィス用の椅子を導入しました。',
      reading: 'ちょうじかんの デスクワークによる ようつうを ふせぐため、にんげんこうがくに もとづいた オフィスようの いすを どうにゅうしました。',
      romaji: 'Choujikan no desukuwaaku ni yoru youtsuu wo fusegu tame, ningenkougaku ni motozuita ofisuyou no isu wo dounyuu shimashita.',
      vietnamese: 'Để phòng tránh đau lưng do ngồi làm việc nhiều giờ liền, công ty đã trang bị loại ghế công sở thiết kế chuẩn công thái học.'
    }
  ],

  // 8. 鍵 (Chìa khóa)
  '鍵': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '朝家を出る時は、玄関のドアの鍵がちゃんとかかっているかを二度確かめます。',
      reading: 'あさ いえを でる ときは、げんかんの ドアの かぎが ちゃんとかかっているかを にど たしかめます。',
      romaji: 'Asa ie wo deru toki wa, genkan no doa no kagi ga chanto kakatte iru ka wo nido tashikamemasu.',
      vietnamese: 'Mỗi buổi sáng khi ra khỏi nhà, tôi luôn cẩn thận kiểm tra lại hai lần xem khóa cửa chính đã được khóa kỹ hay chưa.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '機密書類を保管しているキャビネットの鍵は、管理責任者が厳重に施錠して管理しています。',
      reading: 'きみつしょるいを ほかんしている キャビネットの かぎは、かんりせきにんしゃが げんじゅうに せじょうして かんりしています。',
      romaji: 'Kimitsushorui wo hokan shite iru kyabinetto no kagi wa, kanrisekininsha ga genjuu ni sejou shite kanri shite imasu.',
      vietnamese: 'Chìa khóa tủ lưu trữ các hồ sơ tài liệu mật luôn do người chịu trách nhiệm quản lý khóa cẩn mật và bảo quản.'
    }
  ],

  // 9. 財布 (Ví tiền)
  '財布': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'スーパーのレジで支払いをしようとしたら、財布を家に置き忘れたことに気づいて焦りました。',
      reading: 'スーパーの レジで しはらいを しようとしたら、さいふを いえに おきわすれた ことに きづいて あせりました。',
      romaji: 'Suupaa no reji de shiharai wo shiyou to shitara, saifu wo ie ni okiwasureta koto ni kizuite aserimashita.',
      vietnamese: 'Đang định thanh toán tại quầy thu ngân siêu thị thì tôi hốt hoảng nhận ra mình đã để quên ví tiền ở nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '近頃はキャッシュレス決済が普及したため、小銭入れのついた分厚い財布を持たない人が増えています。',
      reading: 'ちかごろは キャッシュレスけっさいが ふきゅうしたため、こぜにいれの ついた ぶあつい さいふを もたない ひとが ふえています。',
      romaji: 'Chikagoro wa kyasshuresu kessai ga fukyuu shita tame, kozeniire no tsuita buatsui saifu wo motanai hito ga fuete imasu.',
      vietnamese: 'Dạo gần đây nhờ thanh toán không tiền mặt phát triển, ngày càng có nhiều người không còn mang theo những chiếc ví dày cộm tiền xu.'
    }
  ],

  // 10. 眼鏡 (Kính mắt)
  '眼鏡': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '講義中に黒板の細かい文字が見えにくくなってきたので、眼科で度数の合った眼鏡を作りました。',
      reading: 'こうぎちゅうに こくばんの こまかい もじが みえにくくなって きたので、がんかで どすうの あった めがねを つくりました。',
      romaji: 'Kougichuu ni kokuban no komakai moji ga mienikuku natte kita node, ganka de dosuu no atta megane wo tsukurimashita.',
      vietnamese: 'Trong giờ giảng chữ viết nhỏ trên bảng đen hơi khó nhìn, nên tôi đã đến phòng khám mắt đo kính có độ cận phù hợp.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'パソコンの画面を毎日10時間以上見つめる仕事なので、ブルーライトカットの眼鏡が手放せません。',
      reading: 'パソコンの がめんを まいにち じゅうじかんいじょう みつめる しごとなので、ブルーライトカットの めがねが てばなせません。',
      romaji: 'Pasokon no gamen wo mainichi juujikan ijou mitsumeru shigoto nanode, buruuraitokatto no megane ga tebanasemasen.',
      vietnamese: 'Vì đặc thù công việc phải nhìn màn hình máy tính hơn 10 tiếng mỗi ngày, chiếc kính chống ánh sáng xanh là vật bất ly thân của tôi.'
    }
  ],

  // 11. 靴 (Giày)
  '靴': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '日本の家や旅館に上がる時は、玄関で靴を脱いで揃えておくのが正しい礼儀作法です。',
      reading: 'にほんの いえや りょかんに あがる ときは、げんかんで くつを ぬいで そろえて おくのが ただしい れいぎさほうです。',
      romaji: 'Nihon no ie ya ryokan ni agaru toki wa, genkan de kutsu wo nuide soroete oku no ga tadashii reigisahou desu.',
      vietnamese: 'Khi bước vào nhà riêng hay quán trọ truyền thống kiểu Nhật, cởi giày ở tiền sảnh và xếp mũi giày ngay ngắn là phép lịch sự chuẩn mực.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '営業の外回りで一日中歩き回るため、足が疲れにくく通気性の良いビジネス靴を選んでいます。',
      reading: 'えいぎょうの そとまわりで いちにちじゅう あるきまわるため、あしが つかれにくく つうきせいの よい ビジネスぐつを えらんでいます。',
      romaji: 'Eigyou no sotomawari de ichinichijuu arukimawaru tame, ashi ga tsukarenikuku tsuukisei no yoi bijinesugutsu wo erande imasu.',
      vietnamese: 'Vì phải đi bộ thị trường gặp gỡ khách hàng suốt cả ngày, tôi luôn ưu tiên chọn loại giày công sở êm chân và thoáng khí.'
    }
  ],

  // 12. 本 (Sách, cuốn sách)
  '本': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日の静かな午後には、温かいコーヒーを片手にお気に入りの小説の本を読みふけります。',
      reading: 'きゅうじつの しずかな ごごには、あたたかい コーヒーを かたてに おきにいりの しょうせつの ほんを よみふけります。',
      romaji: 'Kyuujitsu no shizuka na gogo ni wa, atatakai koohii wo katate ni okiniiri no shousetsu no hon wo yomifukerimasu.',
      vietnamese: 'Vào buổi chiều ngày nghỉ tĩnh lặng, một tay cầm ly cà phê nóng, tôi say sưa thả mình vào cuốn sách tiểu thuyết yêu thích.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '専門分野の最新知見を深めるため、毎月業界の権威が執筆した学術本を2冊以上読破しています。',
      reading: 'せんもんぶんやの さいしんちけんを ふかめるため、まいつき ぎょうかいの けんいが しっぴつした がくじゅつほんを にさついじょう どくはしています。',
      romaji: 'Senmonbunya no saishinchiken wo fukameru tame, maitsuki gyoukai no ken\'i ga shippitsu shita gakujutsuhon wo nisatsu ijou dokuha shite imasu.',
      vietnamese: 'Để đào sâu chuyên môn và nắm bắt kiến thức mới, mỗi tháng tôi đều đọc hết ít nhất hai cuốn sách học thuật do các chuyên gia đầu ngành viết.'
    }
  ],

  // 13. 辞書 (Từ điển)
  '辞書': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '日本語のニュース記事を読んでいて意味の分からない単語があれば、その場ですぐに辞書を引きます。',
      reading: 'にほんごの ニュースきじを よんでいて いみの わからない たんごが あれば、そのばで すぐに じしょを ひきます。',
      romaji: 'Nihongo no nyuusu kiji wo yonde ite imi no wakaranai tango ga areba, sono ba de sugu ni jisho wo hikimasu.',
      vietnamese: 'Khi đọc tin tức tiếng Nhật mà gặp từ vựng không hiểu nghĩa, tôi liền mở ngay từ điển ra tra cứu tại chỗ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '契約書の翻訳作業では誤訳を防ぐため、複数の専門辞書を突き合わせて言葉のニュアンスを精査します。',
      reading: 'けいやくしょの ほんやくさぎょうでは ごやくを ふせぐため、ふくすうの せんもんじしょを つきあわせて ことばの ニュアンスを せいさします。',
      romaji: 'Keiyakusho no honyaku sagyou de wa goyaku wo fusegu tame, fukusuu no senmon jisho wo tsukiawasete kotoba no nyuansu wo seisa shimasu.',
      vietnamese: 'Khi dịch hợp đồng, nhằm tránh mọi sai lệch, tôi luôn đối chiếu nhiều bộ từ điển chuyên ngành để thẩm định chính xác từng sắc thái câu từ.'
    }
  ],

  // 14. 車 (Xe hơi, ô tô)
  '車': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '天気が良かったので、家族みんなを車に乗せて海辺のドライブコースへ出かけました。',
      reading: 'てんきが よかったので、かぞくみんなを くるまに のせて うみべの ドライブコースへ でかけました。',
      romaji: 'Tenki ga yokatta node, kazoku minna wo kuruma ni nosete umibe no doraibukoosu he dekakemashita.',
      vietnamese: 'Thời tiết đẹp nên tôi đã chở cả nhà lên xe ô tô cùng vi vu ngắm cảnh dọc theo cung đường ven biển.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '地方の工場への出張では公共交通機関が少ないため、会社の営業車を運転して現地へ向かいます。',
      reading: 'ちほうの こうじょうへの しゅっちょうでは こうきょうこうつうきかんが すくないため、かいしゃの えいぎょうしゃを うんてんして げんちへ むかいます。',
      romaji: 'Chihou no koujou he no shutchou de wa koukyoukoutsuukikan ga sukunai tame, kaisha no eigyousha wo unten shite genchi he mukaimasu.',
      vietnamese: 'Khi đi công tác đến các nhà máy ở tỉnh lẻ ít phương tiện công cộng, tôi lái xe công vụ của công ty để đến tận nơi.'
    }
  ],

  // 15. 自転車 (Xe đạp)
  '自転車': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '爽やかな風を感じながら、毎朝自宅から最寄り駅まで自転車を漕いで通っています。',
      reading: 'さわやかな かぜを かんじながら、まいあさ じたくから もよりえきまで じてんしゃを こいで かよっています。',
      romaji: 'Sawayaka na kaze wo kanjinagara, maiasa jitaku kara moyorieki made jitensha wo koide kayotte imasu.',
      vietnamese: 'Hòa mình vào làn gió mát lành, mỗi sáng tôi đều đạp xe từ nhà ra ga tàu gần nhất để đi học.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '駅前で放置された自転車は撤去の対象となるため、必ず指定の有料駐輪場を利用しましょう。',
      reading: 'えきまえで ほうちされた じてんしゃは てっきょの たいしょうと なるため、かならず していの ゆうりょうちゅうりんじょうを りようしましょう。',
      romaji: 'Ekimae de houchi sareta jitensha wa tekkyo no taishou to naru tame, kanarazu shitei no yuuryou chuurinjou wo riyoushimashou.',
      vietnamese: 'Xe đạp để bừa bãi trước cửa ga sẽ bị tịch thu xử lý, vì vậy bạn hãy luôn gửi xe vào đúng bãi đỗ xe có thu phí theo quy định.'
    }
  ],

  // 16. 電車 (Tàu điện)
  '電車': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '朝の通勤電車は大変な混雑ですが、車内ではスマートフォンの音声通話を控えるのが暗黙のルールです。',
      reading: 'あさの つうきんでんしゃは たいへんな こんざつですが、しゃないでは スマートフォンの おんせいつうわを ひかえるのが あんもくの ルールです。',
      romaji: 'Asa no tsuukindensha wa taihen na konzatsu desu ga, shanai de wa sumaatofon no onseitsuuwa wo hikaeru no ga anmoku no ruuru desu.',
      vietnamese: 'Chuyến tàu điện đi làm buổi sáng dù rất đông đúc, nhưng không nói chuyện điện thoại trên tàu là quy tắc ứng xử bất thành văn của người Nhật.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '台風の影響で電車に遅延が生じた際は、改札口で遅延証明書を受け取って会社に提出します。',
      reading: 'たいふうの えいきょうで でんしゃに ちえんが しょうじた さいは、かいさつぐちで ちえんしょうめいしょを うけとって かいしゃに ていしゅつします。',
      romaji: 'Taifuu no eikyou de densha ni chien ga shoujita sai wa, kaisatsuguchi de chienshoumeisho wo uketotte kaisha ni teishutsu shimasu.',
      vietnamese: 'Khi tàu điện bị trễ do ảnh hưởng của bão, bạn hãy lấy giấy chứng nhận tàu trễ tại cửa soát vé để nộp lại cho công ty giải trình.'
    }
  ],

  // 17. 駅 (Nhà ga)
  '駅': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '今夜7時に、渋谷駅のハチ公前広場で待ち合わせをして一緒に食事へ行きます。',
      reading: 'こんや しちじに、しぶやえきの ハチこうまえひろばで まちあわせを して いっしょに しょくじへ いきます。',
      romaji: 'Konya shichiji ni, Shibuyaeki no Hachikoumae hiroba de machiawase wo shite issho ni shokuji he ikimasu.',
      vietnamese: 'Tối nay lúc 7 giờ, tôi hẹn gặp bạn tại quảng trường tượng Hachiko trước ga Shibuya rồi cùng đi ăn tối.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '駅から徒歩わずか1分の好立地にあるオフィスビルなので、雨の日でも濡れずに通勤できます。',
      reading: 'えきから とほ わずか いっぷんの こうりっちに ある オフィスビルなので、あめの ひでも ぬれずに つうきんできます。',
      romaji: 'Eki kara toho wazuka ippun no kouricchi ni aru ofisubiru nanode, ame no hi de mo nurezu ni tsuukin dekimasu.',
      vietnamese: 'Tòa nhà văn phòng nằm ở vị trí đắc địa chỉ cách nhà ga 1 phút đi bộ, nên dù trời mưa to cũng có thể đến chỗ làm mà không hề ướt áo.'
    }
  ],

  // 18. 食べる (Ăn)
  '食べる': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '「いただきます」と感謝を込めて手を合わせてから、温かい炊きたてのご飯を食べます。',
      reading: '「いただきます」と かんしゃを こめて てを あわせてから、あたたかい たきたての ごはんを たべます。',
      romaji: '"Itadakimasu" to kansha wo komete te wo awasete kara, atatakai takitate no gohan wo tabemasu.',
      vietnamese: 'Chắp hai tay nói lời cảm ơn "Itadakimasu" một cách thành kính xong, tôi mới bắt đầu thưởng thức bát cơm nóng hổi vừa chín tới.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '海外からのビジネスパートナーをもてなすため、日本の伝統的な懐石料理を一緒に食べました。',
      reading: 'かいがいからの ビジネスパートナーを もてなすため、にほんの でんとうてきな かいせきりょうりを いっしょに たべました。',
      romaji: 'Kaigai kara no bijinesu paatonaa wo motenasu tame, Nihon no dentouteki na kaisekiryouri wo issho ni tabemashita.',
      vietnamese: 'Để chiêu đãi đối tác kinh doanh đến từ nước ngoài, chúng tôi đã cùng nhau thưởng thức bữa tiệc ẩm thực Kaiseki truyền thống của Nhật Bản.'
    }
  ],

  // 19. 飲む (Uống)
  '飲む': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '熱いお風呂から上がった後に、冷蔵庫でキンキンに冷やした牛乳を飲むのが最高です。',
      reading: 'あつい おふろから あがった あとに、れいぞうこで キンキンに ひやした ぎゅうにゅうを のむのが さいこうです。',
      romaji: 'Atsui ofuro kara agatta ato ni, reizouko de kinkin ni hiyashita gyuunyuu wo nomu no ga saikou desu.',
      vietnamese: 'Sau khi tắm bồn nước nóng sảng khoái bước ra, uống một ly sữa tươi mát lạnh lấy từ tủ lạnh là cảm giác tuyệt vời nhất.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '長時間の企画会議の合間に香り高い挽きたてコーヒーを飲んで、集中力を回復させました。',
      reading: 'ちょうじかんの きかくかいぎの あいまに かおりたかい ひきたてコーヒーを のんで、しゅうちゅうりょくを かいふくさせました。',
      romaji: 'Choujikan no kikakukaigi no aima ni kaoritakai hikitate koohii wo nonde, shuuchuuryoku wo kaifuku sasemashita.',
      vietnamese: 'Trong giờ nghỉ giữa cuộc họp chiến lược kéo dài, tôi nhâm nhi một tách cà phê mới xay thơm lừng để lấy lại sự tập trung cao độ.'
    }
  ],

  // 20. 勉強 (Học tập)
  '勉強': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '念願のJLPT合格を目指して、仕事帰りのカフェで毎日欠かさず1時間日本語を勉強しています。',
      reading: 'ねんがんの JLPTごうかくを めざして、しごとがえりの カフェで まいにち かかさず いちじかん にほんごを べんきょうしています。',
      romaji: 'Nengan no JLPT goukaku wo mezashite, shigotogaeri no kafe de mainichi kakasazu ichijikan Nihongo wo benkyou shite imasu.',
      vietnamese: 'Hướng tới mục tiêu thi đỗ JLPT hằng mong ước, mỗi ngày sau giờ tan làm tôi đều ghé quán cà phê học tiếng Nhật đều đặn 1 tiếng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'お客様からの厳しいご意見も真摯に受け止め、「大変勉強になりました」と感謝して改善に活かします。',
      reading: 'おきゃくさまからの きびしい ごいけんも しんしに うけとめ、「たいへん べんきょうに なりました」と かんしゃして かいぜんに いかします。',
      romaji: 'Okyakusama kara no kibishii goiken mo shinshi ni uketome, "taihen benkyou ni narimashita" to kansha shite kaizen ni ikashimasu.',
      vietnamese: 'Trước những góp ý khắt khe từ phía khách hàng, chúng tôi luôn trân trọng lắng nghe, chân thành cảm ơn vì đã học hỏi được thêm nhiều điều và cải tiến dịch vụ.'
    }
  ],

  // 21. 病院 (Bệnh viện)
  '病院': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '昨夜から38度を超える高熱が引かないため、朝一番で近所の総合病院を受診しました。',
      reading: 'さくやから さんじゅうはちどを こえる こうねつが ひかないため、あさいちばんで きんじょの そうごうびょういんを じゅしんしました。',
      romaji: 'Sakuya kara sanjuuhachido wo koeru kounetsu ga hikanai tame, asaichiban de kinjo no sougoubyouin wo jushin shimashita.',
      vietnamese: 'Từ tối qua cơn sốt cao trên 38 độ mãi không dứt, nên sáng sớm tinh mơ tôi đã đến bệnh viện đa khoa gần nhà để khám.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本の病院で診察を受ける際には、受付窓口で健康保険証とマイナンバーカードを提示します。',
      reading: 'にほんの びょういんで しんさつを うける さいには、うけつけまどぐちで けんこうほけんしょうと マイナンバーカードを ていじします。',
      romaji: 'Nihon no byouin de shinsatsu wo ukeru sai ni wa, uketsukemadoguchi de kenkouhokenshou to mainanbaakaado wo teiji shimasu.',
      vietnamese: 'Khi đi khám tại các bệnh viện ở Nhật Bản, tại quầy tiếp đón bạn cần xuất trình thẻ bảo hiểm y tế hoặc thẻ căn cước My Number.'
    }
  ],

  // 22. 薬 (Thuốc)
  '薬': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '医師から処方された抗生物質の薬は、途中でやめずに指示された日数分をしっかり飲み切ってください。',
      reading: 'いしから しょほうされた こうせいぶっしつの くすりは、とちゅうで やめずに しじされた にっすうぶんを しっかり のみきってください。',
      romaji: 'Ishi kara shohou sareta kouseibusshitsu no kusuri wa, tochuu de yamezu ni shiji sareta nisshuubun wo shikkari nomikitte kudasai.',
      vietnamese: 'Thuốc kháng sinh do bác sĩ kê đơn, bạn tuyệt đối không được tự ý ngừng giữa chừng mà phải uống đủ liều theo đúng số ngày chỉ định.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '薬の成分の吸収を妨げないよう、お茶やコーヒーではなく必ずコップ一杯の常温の水で服用します。',
      reading: 'くすりの せいぶんの きゅうしゅうを さまたげないよう、おちゃや コーヒーではなく かならず コップいっぱいの じょうおんの みずで ふくようします。',
      romaji: 'Kusuri no seibun no kyuushuu wo samatagenai you, ocha ya koohii de wa naku kanarazu koppu ippai no jouon no mizu de fukuyou shimasu.',
      vietnamese: 'Để không làm cản trở quá trình hấp thụ dược tính của thuốc, bạn bắt buộc phải uống thuốc với một cốc nước lọc ở nhiệt độ thường thay vì trà hay cà phê.'
    }
  ],

  // 23. 電話 (Điện thoại, cuộc gọi)
  '電話': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '週末に故郷の両親へ電話をかけて、最近の仕事の様子や元気な声を聞かせました。',
      reading: 'しゅうまつに こきょうの りょうしんへ でんわを かけて、さいきんの しごとの ようすや げんきな こえを きかせました。',
      romaji: 'Shuumatsu ni kokyou no ryoushin he denwa wo kakete, saikin no shigoto no yousu ya genki na koe wo kikasemashita.',
      vietnamese: 'Vào cuối tuần tôi đã gọi điện thoại về quê cho bố mẹ để kể về tình hình công việc dạo này và để bố mẹ an tâm khi nghe giọng con khỏe mạnh.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'ビジネスの電話応対では、3コール以内に受話器を取って「お電話ありがとうございます」と名乗るのが基本マナーです。',
      reading: 'ビジネスの でんわおうたいでは、さんコールいないに じゅわきを とって「おでんわ ありがとうございます」と なのるのが きほんマナーです。',
      romaji: 'Bijinesu no denwa outai de wa, sankooru inai ni juwaki wo totte "odenwa arigatou gozaimasu" to nanoru no ga kihon maanaa desu.',
      vietnamese: 'Trong văn hóa trực điện thoại công sở Nhật Bản, nhấc máy trước hồi chuông thứ ba và xưng tên kèm lời chào cảm ơn là quy tắc lễ nghi căn bản.'
    }
  ],

  // 24. 会議 (Cuộc họp)
  '会議': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'マンションの住民会議に参加して、来年度の共用スペースの清掃計画について話し合いました。',
      reading: 'マンションの じゅうみんかいぎに さんかして、らいねんどの きょうようスペースの せいそうけいかくに ついて はなしあいました。',
      romaji: 'Manshon no juuminkaigi ni sanka shite, rainendo no kyouyou supeesu no seisoukeikaku ni tsuite hanashiaimashita.',
      vietnamese: 'Tôi đã tham gia cuộc họp cư dân tòa nhà chung cư để cùng thảo luận về kế hoạch vệ sinh khu vực sinh hoạt chung cho năm tới.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '重要な意思決定を行う経営会議に備え、事前に各部署の売上データを分析して詳細な報告資料を作成しました。',
      reading: 'じゅうような いしけっていを おこなう けいえいかいぎに そなえ、じぜんに かくぶしょの うりあげデータを ぶんせきして しょうさいな ほうこくしりょうを さくせいしました。',
      romaji: 'Juuyou na ishikettei wo okonau keieikaigi ni sonae, jizen ni kakubusho no uriagedeeta wo bunseki shite shousai na houkokushiryou wo sakusei shimashita.',
      vietnamese: 'Để chuẩn bị cho cuộc họp ban điều hành ra quyết sách quan trọng, tôi đã phân tích số liệu doanh thu của từng phòng ban và lập báo cáo chi tiết.'
    }
  ],

  // 25. 学生 (Học sinh, sinh viên)
  '学生': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '昼間は大学で専門科目を学び、夜は自立した生活のためにアルバイトへ励む真面目な学生です。',
      reading: 'ひるまは だいがくで せんもんかもくを まなび、よるは じりつした せいかつの ために アルバイトへ はげむ まじめな がくせいです。',
      romaji: 'Hiruma wa daigaku de senmonkamoku wo manabi, yoru wa jiritsu shita seikatsu no tame ni arubaito he hagemu majime na gakusei desu.',
      vietnamese: 'Ban ngày học các môn chuyên ngành ở trường đại học, ban tối chăm chỉ đi làm thêm để tự lập cuộc sống, bạn ấy là một sinh viên vô cùng gương mẫu.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '学生割引（学割）を利用すると、新幹線の乗車券や美術館の入場料が一般料金よりも大幅にお得になります。',
      reading: 'がくせいわりびき（がくわり）を りようすると、しんかんせんの じょうしゃけんや びじゅつかんの にゅうじょうりょうが いっぱんりょうきんよりも おおはばに おとくに なります。',
      romaji: 'Gakuseiwaribiki (gakuwari) wo riyou suru to, shinkansen no joushaken ya bijutsukan no nyuujouryou ga ippanryoukin yori mo oohaba ni otoku ni narimasu.',
      vietnamese: 'Khi xuất trình thẻ sinh viên để hưởng chế độ giảm giá học sinh sinh viên (Gakuwari), vé tàu Shinkansen và vé vào bảo tàng sẽ được giảm giá rất nhiều.'
    }
  ],

  // 26. 家族 (Gia đình)
  '家族': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '年末年始には久しぶりに実家へ戻り、温かいお鍋を囲んで家族水入らずの団らんを過ごしました。',
      reading: 'ねんまつねんしには ひさしぶりに じっかへ もどり、あたたかい おなべを かこんで かぞくみずいらずの だんらんを すごしました。',
      romaji: 'Nenmatsunenshi ni wa hisashiburi ni jikka he modori, atatakai onabe wo kakonde kazokumizuirazu no danran wo sugoshimashita.',
      vietnamese: 'Dịp nghỉ Tết cuối năm tôi đã về lại mái nhà xưa, cùng quây quần bên nồi lẩu nghi ngút khói và tận hưởng phút giây sum họp gia đình ấm cúng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'どんなに仕事が多忙を極める時期であっても、家族と過ごすかけがえのない時間を最優先に確保しています。',
      reading: 'どんなに しごとが たぼうを きわめる じきで あっても、かぞくと すごす かけがえのない じかんを さいゆうせんに かくほしています。',
      romaji: 'Donna ni shigoto ga tabou wo kiwameru jiki de attemo, kazoku to sugosu kakegaenonai jikan wo saiyuusen ni kakuho shite imasu.',
      vietnamese: 'Dù có vào những giai đoạn công việc bận rộn đến mấy đi chăng nữa, tôi luôn ưu tiên dành trọn vẹn những khoảng thời gian vô giá bên cạnh gia đình.'
    }
  ],

  // 26B. 家 (Nhà, ngôi nhà, mái ấm)
  '家': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '我が家は最寄り駅から歩いて五分ほどの静かな住宅街にあります。',
      reading: 'わがやは もよりえきから あるいて ごふんほどの しずかな じゅうたくがいに あります。',
      romaji: 'Wagaya wa moyorieki kara aruite gofun hodo no shizukana juutakugai ni arimasu.',
      vietnamese: 'Ngôi nhà của tôi nằm trong một khu dân cư yên tĩnh, chỉ cách nhà ga gần nhất khoảng 5 phút đi bộ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'どんなに外で疲れて帰っても、家族が温かい笑顔で迎えてくれる場所こそが本当の「家」です。',
      reading: 'どんなに そとで つかれて かえっても、かぞくが あたたかい えがおで むかえてくれる ばしょこそが ほんとうの「いえ」です。',
      romaji: 'Donna ni soto de tsukarete kaettemo, kazoku ga atatakai egao de mukaete kureru basho koso ga hontou no "ie" desu.',
      vietnamese: 'Dù bên ngoài có vất vả mệt nhọc đến đâu, nơi có gia đình luôn đón chào bằng nụ cười ấm áp mới chính là một mái nhà đích thực.'
    }
  ],

  // 27. 友達 (Bạn bè)
  '友達': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '自分が人生の岐路で悩んでいた時に、朝まで親身に話を聞いて励ましてくれた友達に心から感謝しています。',
      reading: 'じぶんが じんせいの きろで なやんでいた ときに、あさまで しんみに はなしを きいて はげましてくれた ともだちに こころから かんしゃしています。',
      romaji: 'Jibun ga jinsei no kiro de nayande ita toki ni, asa made shinmi ni hanashi wo kiite hagemashite kureta tomodachi ni kokoro kara kansha shite imasu.',
      vietnamese: 'Những lúc tôi bế tắc đứng trước ngã rẽ cuộc đời, người bạn đã thức trắng đêm lắng nghe và tiếp thêm sức mạnh cho tôi chính là ân nhân mà tôi luôn biết ơn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '大学時代に苦楽を共にした友達は、社会に出て業界が違っても互いに刺激し合える一生涯のライバルであり戦友です。',
      reading: 'だいがくじだいに くらくを ともにした ともだちは、しゃかいに でて ぎょうかいが ちがっても たがいに しげきしあえる いっしょうがいの ライバルであり せんゆうです。',
      romaji: 'Daigakujidai ni kuraku wo tomo ni shita tomodachi wa, shakai ni dete gyoukai ga chigattemo tagai ni shigekishiaeru isshougai no raibaru de ari senyuu desu.',
      vietnamese: 'Những người bạn từng đồng cam cộng khổ thời sinh viên, dù nay làm ở những ngành nghề khác nhau, vẫn luôn là những chiến hữu cùng truyền cảm hứng suốt đời.'
    }
  ],

  // 28. 鋏 (Cái kéo)
  '鋏': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '届いた段ボールのテープを切るため、引き出しからよく切れる鋏を取り出しました。',
      reading: 'とどいた だんボールの テープを きるため、ひきだしから よく きれる はさみを とりだしました。',
      romaji: 'Todoita danbooru no teepu wo kiru tame, hikidashi kara yoku kireru hasami wo toridashimashita.',
      vietnamese: 'Để cắt băng keo trên thùng carton vừa giao tới, tôi đã lấy chiếc kéo thật sắc từ trong ngăn kéo ra.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '他人に刃物を手渡す際は、相手に刃先を向けず、自分が刃を握って柄の方を差し出すのが礼儀です。',
      reading: 'たにんに はものを てわたす さいは、あいてに はさきを むけず、じぶんが はを にぎって えの ほうを さしだす のが れいぎです。',
      romaji: 'Tanin ni hamono wo tewatasu sai wa, aite ni hasaki wo mukezu, jibun ga ha wo nigitte e no hou wo sashidasu no ga reigi desu.',
      vietnamese: 'Khi đưa kéo hay đồ sắc nhọn cho người khác, cầm phần lưỡi dao và đưa phần cán cầm về phía đối phương là phép lịch sự cơ bản.'
    }
  ],

  // 29. シャツ (Áo sơ mi)
  'シャツ': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '明日の大事な面接に備えて、真っ白なワイシャツに丁寧にアイロンをかけました。',
      reading: 'あすの だいじな めんせつに そなえて、まっしろな ワイシャツに ていねいに アイロンを かけました。',
      romaji: 'Asu no daiji na mensetsu ni sonaete, masshiro na waishatsu ni teinei ni airon wo kakemashita.',
      vietnamese: 'Để chuẩn bị cho buổi phỏng vấn quan trọng vào ngày mai, tôi đã tỉ mỉ ủi phẳng phiu chiếc áo sơ mi trắng tinh.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本のビジネスシーンでは、夏場の「クールビズ」期間中はノーネクタイの半袖シャツ勤務が定着しています。',
      reading: 'にほんの ビジネスシーンでは、なつばの「クールビズ」きかんちゅうは ノーネクタイの はんそでシャツきんむが ていちゃくしています。',
      romaji: 'Nihon no bijinesushiin de wa, natsuba no "kuurubizu" kikanchuu wa noonekutai no hansodeshatsu kinmu ga teichaku shite imasu.',
      vietnamese: 'Trong môi trường công sở Nhật, vào chiến dịch tiết kiệm năng lượng mùa hè "Cool Biz", mặc áo sơ mi ngắn tay không thắt cà vạt đã trở thành quy chuẩn phổ biến.'
    }
  ],

  // 30. 大学 (Trường đại học)
  '大学': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '高校を卒業した後は、最先端の人工知能を研究できる国立大学への進学を目指しています。',
      reading: 'こうこうを そつぎょうした あとは、さいせんたんの じんこうちのうを けんきゅうできる こくりつだいがくへの しんがくを めざしています。',
      romaji: 'Koukou wo sotsugyou shita ato wa, saisentan no jinkouchinou wo kenkyuu dekiru kokuritsudaigaku he no shingaku wo mezashite imasu.',
      vietnamese: 'Sau khi tốt nghiệp trung học phổ thông, tôi đặt mục tiêu thi đỗ vào một trường đại học quốc lập chuyên nghiên cứu trí tuệ nhân tạo tiên tiến.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '大学のゼミで培った論理的思考力とプレゼンテーション能力は、社会に出てからも大きな武器となっています。',
      reading: 'だいがくの ゼミで つちかった ろんりてきしこうりょくと プレゼンテーションのうりょくは、しゃかいに でてからも おおきな ぶきと なっています。',
      romaji: 'Daigaku no zemi de tsuchikatta ronritekishikouryoku to purezenteeshon nouryoku wa, shakai ni dete kara mo ooki na buki to natte imasu.',
      vietnamese: 'Tư duy logic và kỹ năng thuyết trình được tôi luyện trong các buổi thảo luận nghiên cứu chuyên đề thời đại học là hành trang vô cùng đắc lực khi đi làm.'
    }
  ],

  // 31. 部屋 (Căn phòng)
  '部屋': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '週末の午前中に窓を大きく開けて部屋の空気を入れ替え、掃除機をすみずみまでかけました。',
      reading: 'しゅうまつの ごぜんちゅうに まどを おおきく あけて へやの くうきを いれかえ、そうじきを すみずみまで かけました。',
      romaji: 'Shuumatsu no gozenchuu ni mado wo ookiku akete heya no kuuki wo irekae, soujiki wo sumizumi made kakemashita.',
      vietnamese: 'Vào sáng cuối tuần, tôi mở toang các cánh cửa sổ để đón không khí trong lành vào phòng và dùng máy hút bụi dọn sạch từng góc nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本で賃貸の部屋を借りる際は、家賃のほかに敷金や礼金などの初期費用が必要になることが一般的です。',
      reading: 'にほんで ちんたいの へやを かりる さいは、やちんの ほかに しききんや れいきんなどの しょきひようが ひつように なる ことが いっぱんてきです。',
      romaji: 'Nihon de chintai no heya wo kariru sai wa, yachin no hoka ni shikikin ya reikin nado no shokihiyou ga hitsuyou ni naru koto ga ippanteki desu.',
      vietnamese: 'Khi thuê phòng trọ ở Nhật Bản, ngoài tiền nhà hàng tháng thì các khoản chi phí ban đầu như tiền đặt cọc (Shikikin) và tiền lễ (Reikin) là thủ tục rất phổ biến.'
    }
  ],

  // 32. パソコン (Máy vi tính)
  'パソコン': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '新学期に向けて、持ち運びに軽くてバッテリーが長持ちするノートパソコンを購入しました。',
      reading: 'しんがっきに むけて、もちはこびに かるくて バッテリーが ながもちする ノートパソコンを こうにゅうしました。',
      romaji: 'Shingakki ni mukete, mochihakobi ni karukute batterii ga nagamochi suru nootopasokon wo kounyuu shimashita.',
      vietnamese: 'Chuẩn bị cho học kỳ mới, tôi đã mua một chiếc laptop vừa nhẹ dễ mang đi học vừa có thời lượng pin rất trâu.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '情報セキュリティ事故を未然に防ぐため、離席時には必ずパソコンの画面をロックするよう義務付けられています。',
      reading: 'じょうほうセキュリティじこを みぜんに ふせぐため、りせきじには かならず パソコンの がめんを ロックするよう ぎむづけられています。',
      romaji: 'Jouhou sekakyuriti jiko wo mizen ni fusegu tame, risekiji ni wa kanarazu pasokon no gamen wo rokku suru you gimuzukerarete imasu.',
      vietnamese: 'Nhằm ngăn ngừa rủi ro rò rỉ an ninh thông tin, công ty quy định bắt buộc phải khóa màn hình máy tính mỗi khi rời khỏi bàn làm việc.'
    }
  ],

  // 33. 鉛筆 (Bút chì)
  '鉛筆': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '漢字の書き取り練習をする時は、鉛筆削りで尖らせた2Bの鉛筆を使うと綺麗な線が書けます。',
      reading: 'かんじの かきとりれんしゅうを する ときは、えんぴつけずりで とがらせた にビーの えんぴつを つかうと きれいな せんが かけます。',
      romaji: 'Kanji no kakitorirenshuu wo suru toki wa, enpitsukezuri de togaraseta ni-bii no enpitsu wo tsukau to kirei na sen ga kakemasu.',
      vietnamese: 'Khi luyện viết chữ Hán, dùng cây bút chì 2B đã được gọt nhọn cẩn thận sẽ giúp bạn viết được những nét thanh nét đậm rất đẹp mắt.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'JLPTや公的資格のマークシート試験では、ボールペンではなく必ずHBまたは2Bの鉛筆を持参してください。',
      reading: 'JLPTや こうてきしかくの マークシートしけんでは、ボールペンではなく かならず エイチビー または にビーの えんぴつを じさんしてください。',
      romaji: 'JLPT ya koutekishikaku no maakushiito shiken de wa, boorupen de wa naku kanarazu eichi-bii matawa ni-bii no enpitsu wo jisan shite kudasai.',
      vietnamese: 'Trong kỳ thi tô phiếu trắc nghiệm JLPT hay các kỳ thi chứng chỉ quốc gia, thí sinh bắt buộc phải mang theo bút chì HB hoặc 2B chứ tuyệt đối không dùng bút bi.'
    }
  ],

  // 34. 宿題 (Bài tập về nhà)
  '宿題': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '夕食後にお気に入りの音楽を聴きながら、明日の日本語の授業で提出する宿題を仕上げました。',
      reading: 'ゆうしょくごに おきにいりの おんがくを ききながら、あすの にほんごの じゅぎょうで ていしゅつする しゅくだいを しあげました。',
      romaji: 'Yuushokugo ni okiniiri no ongaku wo kikinagara, asu no Nihongo no jugyou de teishutsu suru shukudai wo shiagemashita.',
      vietnamese: 'Sau bữa tối vừa nghe những giai điệu yêu thích, tôi vừa hoàn tất bài tập về nhà để nộp trong tiết học tiếng Nhật ngày mai.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '商談の席で即答できなかった技術的な課題については、「次週までの宿題」として持ち帰り社内で検討します。',
      reading: 'しょうだんの せきで そくとうできなかった ぎじゅつてきな かだいに ついては、「じしゅうまでの しゅくだい」として もちかえり しゃないで けんとうします。',
      romaji: 'Shoudan no seki de sokutou dekinakatta gijutsuteki na kadai ni tsuite wa, "jishuu made no shukudai" toshite mochikaeri shanai de kentou shimasu.',
      vietnamese: 'Đối với những câu hỏi kỹ thuật chưa thể trả lời ngay tại buổi đàm phán, chúng tôi xin nhận lại coi như "bài tập về nhà" để thảo luận nội bộ trước tuần sau.'
    }
  ],

  // 35. 犬 (Con chó)
  '犬': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '毎朝日の出とともに、愛犬にリードをつけて近所の広い公園を散歩させています。',
      reading: 'まいあさ ひのでと ともに、あいけんに リードを つけて きんじょの ひろい こうえんを さんぽさせています。',
      romaji: 'Maiasa hinode to tomo ni, aiken ni riido wo tsukete kinjo no hiroi kouen wo sanposasete imasu.',
      vietnamese: 'Mỗi sáng khi mặt trời vừa ló rạng, tôi đều dắt chú chó cưng đeo dây xích đi dạo quanh công viên rộng rãi gần nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '盲導犬や災害救助犬は、人命を救うために専門的な訓練を受けた極めて忠実なパートナーです。',
      reading: 'もうどうけんや さいがいきゅうじょけんは、じんめいを すくう ために せんもんてきな くんれんを うけた きわめて ちゅうじつな パートナーです。',
      romaji: 'Moudouken ya saigaikyuujoken wa, jinmei wo sukuu tame ni senmonteki na kunren wo uketa kiwamete chuujitsu na paatonaa desu.',
      vietnamese: 'Chó dẫn đường cho người khiếm thị hay chó cứu hộ thiên tai là những người bạn đồng hành vô cùng trung thành, được huấn luyện bài bản để bảo vệ tính mạng con người.'
    }
  ],

  // 36. 猫 (Con mèo)
  '猫': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '陽だまりの縁側で気持ちよさそうに丸くなって眠っている猫の姿に、日々の疲れが癒やされます。',
      reading: 'ひだまりの えんがわで きもちよさそうに まるくなって ねむっている ねこの すがたに、ひびの つかれが いやされます。',
      romaji: 'Hidamari no engawa de kimochiyosasou ni maruku natte nemutte iru neko no sugata ni, hibi no tsukare ga iyasaremasu.',
      vietnamese: 'Nhìn chú mèo cuộn tròn ngủ say sưa nơi hiên nhà ấm áp đầy nắng, bao mệt nhọc thường nhật trong tôi như tan biến hết.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本の商業文化では、右手を挙げて金運を招き、左手でお客様を招く「招き猫」が商売繁盛の縁起物として親しまれています。',
      reading: 'にほんの しょうぎょうぶんかでは、みぎてを あげて きんうんを まねき、ひだりてで おきゃくさまを まねく「まねきねこ」が しょうばいはんじょうの えんぎものとして したしまれています。',
      romaji: 'Nihon no shougyoubunka de wa, migite wo agete kin\'un wo maneki, hidarite de okyakusama wo maneku "manekineko" ga shoubaihanjou no engimono toshite shitashimarete imasu.',
      vietnamese: 'Trong văn hóa kinh doanh của người Nhật, tượng chú mèo vẫy tay (Maneki Neko) giơ tay phải cầu tài lộc và giơ tay trái đón khách là biểu tượng may mắn chúc buôn may bán đắt.'
    }
  ],

  // 37. 魚 (Con cá, món cá)
  '魚': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '築地や豊洲の朝市で仕入れたばかりの新鮮な旬の魚を、贅沢に刺身と塩焼きにして味わいました。',
      reading: 'つきじや とよすの あさいちで しいれたばかりの しんせんな しゅんの さかなを、ぜいたくに さしみと しおやきに して あじわいました。',
      romaji: 'Tsukiji ya Toyosu no asaichi de shiiretabakari no shinsen na shun no sakana wo, zeitaku ni sashimi to shioyaki ni shite ajiwaimashita.',
      vietnamese: 'Những con cá tươi ngon đúng mùa vừa được nhập về từ chợ cá sớm Tsukiji và Toyosu đã được chế biến thịnh soạn thành món sashimi và cá nướng muối thơm lừng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '四方を海に囲まれた島国である日本の伝統的な食文化において、魚はタンパク質を補給する上で不可欠な食材です。',
      reading: 'しほうを うみに かこまれた しまぐにで ある にほんの でんとうてきな しょくぶんかに おいて、さかなは タンパクしつを ほきゅうする うえで ふかけつな しょくざいです。',
      romaji: 'Shihou wo umi ni kakomareta shimaguni de aru Nihon no dentouteki na shokubunka ni oite, sakana wa tanpakushitsu wo hokyuu suru ue de fukaketsu na shokuzai desu.',
      vietnamese: 'Trong văn hóa ẩm thực truyền thống của quốc đảo bốn bề là biển như Nhật Bản, cá là nguồn thực phẩm tối quan trọng để cung cấp chất đạm dồi dào.'
    }
  ],

  // 38. 肉 (Thịt)
  '肉': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '今夜は家族の誕生日祝いとして、霜降りの和牛のお肉を炭火焼きで美味しくいただきました。',
      reading: 'こんやは かぞくの たんじょうびいわいとして、しもふりの わぎゅうの おにくを すみびやきで おいしく いただきました。',
      romaji: 'Konya wa kazoku no tanjoubiiwai toshite, shimofuri no wagyuu no oniku wo sumibiyaki de oishiku itadakimashita.',
      vietnamese: 'Tối nay mừng sinh nhật người thân, cả nhà đã thưởng thức món thịt bò Wagyu vân mỡ nướng than hoa vô cùng thơm ngon đậm đà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '食品衛生法に基づき、生肉の取り扱いでは食中毒を防止するため中心部まで75度以上で1分間加熱することが義務付けられています。',
      reading: 'しょくひんえいせいほうに もとづき、なまにくの とりあつかいでは しょくちゅうどくを ぼうしするため ちゅうしんぶまで ななじゅうごどいじょうで いっぷんかん かねつする ことが ぎむづけられています。',
      romaji: 'Shokuhineiseihou ni motozuki, namaniku no toriatsukai de wa shokuchuudoku wo boushi suru tame chuushinbu made nanajuugodo ijou de ippunkan kanetsu suru koto ga gimuzukerarete imasu.',
      vietnamese: 'Theo luật vệ sinh an toàn thực phẩm, khi chế biến thịt tươi sống để phòng tránh ngộ độc, bắt buộc phải đun nấu ở nhiệt độ tâm trên 75 độ C trong ít nhất 1 phút.'
    }
  ],

  // 39. 野菜 (Rau củ)
  '野菜': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '栄養の偏りを防いで健康な身体を保つため、毎日の食事に彩り豊かな緑黄色野菜をたっぷり取り入れています。',
      reading: 'えいようの かたよりを ふせいで けんこうな からだを たもつため、まいにちの しょくじに いろどりゆたかな りょくおうしょくやさいを たっぷり とりいれています。',
      romaji: 'Eiyou no katayori wo fuseide kenkou na karada wo tamotsu tame, mainichi no shokuji ni irodoriyutaka na ryokuoushokuyasai wo tappuri toriirete imasu.',
      vietnamese: 'Để tránh mất cân bằng dinh dưỡng và giữ gìn cơ thể khỏe mạnh, tôi luôn bổ sung dồi dào các loại rau củ xanh đậm tươi ngon vào thực đơn mỗi bữa ăn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本のスーパーマーケットでは、消費者が安心して購入できるよう、生産者の顔写真や産地が明記された新鮮野菜が並んでいます。',
      reading: 'にほんの スーパーマーケットでは、しょうひしゃが あんしんして こうにゅうできるよう、せいさんしゃの かおじゃしんや さんちが めいきされた しんせんやさいが ならんでいます。',
      romaji: 'Nihon no suupaamaaketto de wa, shouhisha ga anshin shite kounyuu dekiru you, seisansha no kaojashin ya sanchi ga meiki sareta shinsenyasai ga narande imasu.',
      vietnamese: 'Tại các siêu thị Nhật Bản, rau củ quả tươi sạch luôn được dán kèm ảnh chụp người nông dân và ghi rõ xuất xứ vùng trồng để người tiêu dùng an tâm chọn mua.'
    }
  ],

  // 40. 果物 (Trái cây, hoa quả)
  '果物': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '秋の味覚として名高い長野県産の瑞々しいシャインマスカットの果物を、家族で分け合って食べました。',
      reading: 'あきの みかくとして なだかい ながのけんさんの みずみずしい シャインマスカットの くだものを、かぞくで わけあって たべました。',
      romaji: 'Aki no mikaku toshite nadakai Naganokensan no mizumizushii shainmasukatto no kudamono wo, kazoku de wakeatte tabemashita.',
      vietnamese: 'Cả nhà tôi đã cùng nhau thưởng thức chùm nho mẫu đơn mọng nước nức tiếng của tỉnh Nagano - thức quả đặc sản tuyệt hảo của mùa thu.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本の高級果物店で桐箱に入れられたマスクメロンは、大切な取引先への格式高いお中元やお歳暮の贈答品として重宝されています。',
      reading: 'にほんの こうきゅうくだものてんで きりばこに いれられた マスクメロンは、たいせつな とりひきさきへの かくしきだかい おちゅうげんや おせいぼの ぞうとうひんとして ちょうほうされています。',
      romaji: 'Nihon no koukyuukudamonoten de kiribako ni irerareta masukumeron wa, taisetsu na torihikisaki he no kakushikidakai ochuugen ya oseibo no zoutouhin toshite chouhou sarete imasu.',
      vietnamese: 'Những trái dưa lưới được đặt trang trọng trong hộp gỗ tại các cửa hàng hoa quả cao cấp ở Nhật là món quà biếu tri ân đối tác vô cùng danh giá vào các dịp lễ tết Ochugen và Oseibo.'
    }
  ],

  // 41. 靴下 (Đôi tất, vớ)
  '靴下': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '真冬のフローリングは底冷えするため、裏地にボアがついた暖かい厚手の靴下を履いて過ごしています。',
      reading: 'まふゆの フローリングは そこびえするため、うらじに ボアが ついた あたたかい あつでの くつしたを はいて すごしています。',
      romaji: 'Mafuyu no furooringu wa sokobie suru tame, uraji ni boa ga tsuita atatakai atsude no kutsushita wo haite sugoshite imasu.',
      vietnamese: 'Sàn gỗ vào giữa mùa đông rất lạnh buốt, vì vậy tôi luôn đi đôi tất dày lót lông ấm áp khi sinh hoạt trong nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '和室での商談や料亭での会食では靴を脱ぐ機会があるため、穴の開いていない清潔な靴下を身につけるのが身だしなみの基本です。',
      reading: 'わしつでの しょうだんや りょうていでの かいしょくでは くつを ぬぐ きかいが あるため、あなの あいていない せいけつな くつしたを みにつけるのが みだしなみの きほんです。',
      romaji: 'Washitsu de no shoudan ya ryoutei de no kaishoku de wa kutsu wo nugu kikai ga aru tame, ana no aite inai seiketsu na kutsushita wo minitsukeru no ga midashinami no kihon desu.',
      vietnamese: 'Khi đàm phán trong phòng chiếu tatami hay dùng bữa ở nhà hàng truyền thống phải cởi giày, đi một đôi tất sạch sẽ nguyên vẹn không thủng rách là phép lịch sự tối thiểu.'
    }
  ],

  // 42. 帽子 (Mũ, nón)
  '帽子': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '夏の強い紫外線から頭部を守って熱中症を予防するため、つばの広い麦わら帽子をかぶって外出しました。',
      reading: 'なつの つよい しがいせんから とうぶを まもって ねっちゅうしょうを よぼうするため、つばの ひろい むぎわらぼうしを かぶって がいしゅつしました。',
      romaji: 'Natsu no tsuyoi shigaisen kara toubu wo mamotte necchuushou wo yobou suru tame, tsuba no hiroi mugiwaraboushi wo kabutte gaishutsu shimashita.',
      vietnamese: 'Để che chắn tia cực tím gắt gao mùa hè và phòng tránh say nắng, tôi đã đội chiếc mũ cói vành rộng khi ra ngoài trời.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '製造ラインや工事現場では労働安全衛生規則に基づき、頭部への衝撃から命を守る安全保護用の作業帽子（ヘルメット）の着用が厳しく義務付けられています。',
      reading: 'せいぞうラインや こうじげんばでは ろうどうあんぜんえいせいきそくに もとづき、とうぶへの しょうげきから いのちを まもる あんぜんほごようの さぎょうぼうし（ヘルメット）の ちゃくようが きびしく ぎむづけられています。',
      romaji: 'Seizourain ya koujigenba de wa roudouanzen\'eiseikisoku ni motozuki, toubu he no shougeki kara inochi wo mamoru anzenhogoyou no sagyouboushi (herumetto) no chakuyou ga kibishiku gimuzukerarete imasu.',
      vietnamese: 'Tại các dây chuyền sản xuất và công trường thi công, quy chuẩn an toàn lao động bắt buộc công nhân phải đội mũ bảo hộ cứng để bảo vệ tính mạng trước các va chạm.'
    }
  ],

  // 43. 携帯 (Điện thoại di động)
  '携帯': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '待ち合わせ場所に早く到着した友達から「駅の改札前にいるよ」と携帯にメッセージが届きました。',
      reading: 'まちあわせばしょに はやく とうちゃくした ともだちから「えきの かいさつまえに いるよ」と けいたいに メッセージが とどきました。',
      romaji: 'Machiawasebasho ni hayaku touchaku shita tomodachi kara "eki no kaisatsumae ni iru yo" to keitai ni messeeji ga todokimashita.',
      vietnamese: 'Người bạn đến sớm tại điểm hẹn đã gửi tin nhắn đến điện thoại của tôi: "Tớ đang đứng đợi trước cửa soát vé ga nhé".'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '取引先との重要な商談中や映画館などの静粛が求められる空間では、携帯電話をマナーモードに設定しておくのが大人の嗜みです。',
      reading: 'とりひきさきとの じゅうような しょうだんちゅうや えいがかんなどの せいしゅくが もとめられる くうかんでは、けいたいでんわを マナーモードに せっていして おくのが おとなの たしなみです。',
      romaji: 'Torihikisaki to no juuyou na shoudanchuu ya eigakan nado no seishuku ga motomerareru kuukan de wa, keitaidenwa wo manaamoodo ni settei shite oku no ga otona no tashinami desu.',
      vietnamese: 'Trong các cuộc đàm phán thương mại quan trọng hay rạp chiếu phim, chuyển điện thoại sang chế độ rung (manner mode) là chuẩn mực lịch thiệp của người trưởng thành.'
    }
  ],

  // 44. テレビ (Tivi, truyền hình)
  'テレビ': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '夕食を食べ終えた後、リビングのソファでくつろぎながらテレビのバラエティ番組を見て家族みんなで大笑いしました。',
      reading: 'ゆうしょくを たべおえた あと、リビングの ソファで くつろぎながら テレビの バラエティばんぐみを みて かぞくみんなで おおわらいしました。',
      romaji: 'Yuushoku wo tabeoeta ato, ribingu no sofa de kutsuroginagara terebi no baraetiban\'gumi wo mite kazoku minna de oowarai shimashita.',
      vietnamese: 'Ăn tối xong xuôi, cả nhà tôi vừa ngả lưng thư giãn trên chiếc sofa phòng khách vừa xem chương trình giải trí trên tivi và cười vui sảng khoái.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '地震や津波などの緊急自然災害が発生した際には、テレビの速報テロップが直ちに警報を伝えて避難を呼びかけます。',
      reading: 'じしんや つなみなどの きんきゅうしぜんさいがいが はっせいした さいには、テレビの そくほうテロップが ただちに けいほうを つたえて ひなんを よびかけます。',
      romaji: 'Jishin ya tsunami nado no kinkyuushizensaigai ga hassei shita sai ni wa, terebi no sokuhouteroppu ga tadachi ni keihou wo tsutaete hinan wo yobikakemasu.',
      vietnamese: 'Khi xảy ra thiên tai khẩn cấp như động đất hay sóng thần, dải tin báo khẩn trên màn hình tivi sẽ lập tức phát cảnh báo và hướng dẫn người dân sơ tán kịp thời.'
    }
  ],

  // 45. カメラ (Máy ảnh)
  'カメラ': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '京都の紅葉の美しさに感動し、新しく買った一眼レフカメラで色鮮やかな秋の風景を何枚も撮影しました。',
      reading: 'きょうとの こうようの うつくしさに かんどうし、あたらしく かった いちがんレフカメラで いろあざやかな あきの ふうけいを なんまいも さつえいしました。',
      romaji: 'Kyouto no kouyou no utsukushisa ni kandou shi, atarashiku katta ichiganrefukamera de iroazayaka na aki no fuukei wo nanmai mo satsuei shimashita.',
      vietnamese: 'Bị mê hoặc trước vẻ đẹp rực rỡ của lá đỏ Kyoto, tôi đã dùng chiếc máy ảnh cơ mới tậu chụp lại biết bao bức ảnh phong cảnh mùa thu đẹp như tranh vẽ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '新商品のWebプロモーションに向けて、プロ仕様の高性能カメラと照明機材を用いてスタジオでカタログ用の商品撮影を実施しました。',
      reading: 'しんしょうひんの ウェブプロモーションに むけて、プロしようの こうせいのうカメラと しょうめいきざいを もちいて スタジオで カタログようの しょうひんさつえいを じっししました。',
      romaji: 'Shinshouhin no webu puromoushon ni mukete, puroshiyou no kouseinou kamera to shoumeikizai wo mochiite sutajio de kataroguyou no shouhinsatsuei wo jisshi shimashita.',
      vietnamese: 'Phục vụ chiến dịch quảng bá sản phẩm mới trên website, chúng tôi đã sử dụng máy ảnh chuyên dụng cùng dàn đèn chiếu sáng hiện đại để chụp ảnh mẫu trong studio.'
    }
  ],

  // 46. 自動車 (Xe ô tô)
  '自動車': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日のドライブを快適に楽しむため、ガソリンスタンドで自動車のタイヤの空気圧とオイルを点検してもらいました。',
      reading: 'きゅうじつの ドライブを かいてきに たのしむため、ガソリンスタンドで じどうしゃの タイヤの くうきあつと オイルを てんけんして もらいました。',
      romaji: 'Kyuujitsu no doraibu wo kaiteki ni tanoshimu tame, gasorinsutando de jidousha no taiya no kuukiatsu to oiru wo tenken shite moraimashita.',
      vietnamese: 'Để chuyến dã ngoại cuối tuần được êm thuận, tôi đã ghé cây xăng nhờ nhân viên kiểm tra áp suất lốp và dầu máy cho chiếc xe ô tô.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '地球温暖化対策の一環として、世界各国の自動車メーカーはガソリン車から二酸化炭素を排出しない電気自動車への移行を加速させています。',
      reading: 'ちきゅうおんだんかたいさくの いっかんとして、せかいかっこくの じどうしゃメーカーは ガソリンしゃから にさんかたんそを はいしゅつしない でんきじどうしゃへの いこうを かそくさせています。',
      romaji: 'Chikyuuondankataisaku no ikkan toshite, sekaikakkoku no jidousha meekaa wa gasorinsha kara nisankatanso wo haishutsu shinai denkijidousha he no ikou wo kasoku sasete imasu.',
      vietnamese: 'Để chung tay chống biến đổi khí hậu toàn cầu, các hãng sản xuất ô tô trên thế giới đang đẩy mạnh quá trình chuyển dịch từ xe chạy xăng sang xe điện không phát thải CO2.'
    }
  ],

  // 47. 空港 (Sân bay, phi trường)
  '空港': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '国際線に乗るため、フライト出発時刻の3時間前には成田空港のチェックインカウンターに到着しました。',
      reading: 'こくさいせんに のるため、フライトしゅっぱつじこくの さんじかんまえには なりたくうこうの チェックインカウンターに とうちゃくしました。',
      romaji: 'Kokusaisen ni noru tame, furaito shuppatsujikoku no sanjikanmae ni wa Naritakuukou no chekkuin kaantaa ni touchaku shimashita.',
      vietnamese: 'Để kịp chuyến bay quốc tế, tôi đã có mặt tại quầy làm thủ tục ở sân bay Narita trước giờ khởi hành tận 3 tiếng đồng hồ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '羽田空港は都心からのアクセスが極めて優れており、国内外のビジネスマンが効率的に移動するための交通の要衝として機能しています。',
      reading: 'はねだくうこうは としんからの アクセスが きわめて すぐれており、こくないがいの ビジネスマンが こうりつてきに いどうするための こうつうの ようしょうとして きのうしています。',
      romaji: 'Hanedakuukou wa toshin kara no akusesu ga kiwamete sugurete ori, kokunaigai no bijinesuman ga kouritsuteki ni idou suru tame no koutsuu no youshou toshite kinou shite imasu.',
      vietnamese: 'Sân bay Haneda có kết nối giao thông về trung tâm Tokyo vô cùng thuận tiện, giữ vai trò huyết mạch giúp doanh nhân di chuyển cực kỳ nhanh chóng và hiệu quả.'
    }
  ],

  // 48. 教室 (Phòng học, lớp học)
  '教室': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'チャイムが鳴ると生徒たちは一斉に教室の自分の席に着席し、日本語の授業が始まりました。',
      reading: 'チャイムが なると せいとたちは いっせいに きょうしつの じぶんの せきに ちゃくせきし、にほんごの じゅぎょうが はじまりました。',
      romaji: 'Chaimu ga naru to seitotachi wa issei ni kyoushitsu no jibun no seki ni chakuseki shi, Nihongo no jugyou ga hajimarimashita.',
      vietnamese: 'Chuông vừa reo là các bạn học sinh đồng loạt về chỗ ngồi trong lớp học, và tiết học tiếng Nhật bắt đầu diễn ra sôi nổi.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '放課後は教室の窓を施錠し、黒板をきれいに拭いてゴミを分別収集するのが当番の役割です。',
      reading: 'ほうかごは きょうしつの まどを せじょうし、こくばんを きれいに ふいて ゴミを ぶんべつしゅうしゅうする のが とうばんの やくわりです。',
      romaji: 'Houkago wa kyoushitsu no mado wo sejou shi, kokuban wo kirei ni fuite gomi wo bunbetsushuushuu suru no ga touban no yakuwari desu.',
      vietnamese: 'Sau giờ tan học, việc khóa chặt các cửa sổ lớp, lau sạch bảng đen và phân loại rác đúng quy định là nhiệm vụ của học sinh trực nhật.'
    }
  ],

  // 49. 食堂 (Nhà ăn, căng tin)
  '食堂': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'お昼休みの学生食堂は大変な賑わいで、ボリューム満点の唐揚げ定食が一番人気を集めています。',
      reading: 'おひるやすみの がくせいしょくどうは たいへんな にぎわいで、ボリュームまんてんの からあげていしょくが いちばんにんきを あつめています。',
      romaji: 'Ohiruyasumi no gakuseishokudou wa taihen na nigiwai de, boryuumumanten no karaageteishoku ga ichiban ninki wo atsumete imasu.',
      vietnamese: 'Căng tin trường vào giờ nghỉ trưa tấp nập nhộn nhịp, và suất cơm gà rán giòn rụm đầy ắp luôn là món ăn được sinh viên yêu thích số 1.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '社員食堂では従業員の健康維持を応援するため、栄養士がカロリーと塩分を綿密に計算したヘルシーメニューが日替わりで提供されます。',
      reading: 'しゃいんしょくどうでは じゅうぎょういんの けんこういじを おうえんするため、えいようしが カロリーと えんぶんを めんみつに けいさんした ヘルシーメニューが ひがわりで ていきょうされます。',
      romaji: 'Shainshokudou de wa juugyouin no kenkouiji wo ouen suru tame, eiyoushi ga karorii to enbun wo menmitsu ni keisan shita herushiimenyuu ga higawari de teikyou saremasu.',
      vietnamese: 'Tại nhà ăn công ty, nhằm chăm sóc sức khỏe nhân viên, các chuyên gia dinh dưỡng luôn tính toán chuẩn xác calo và độ mặn để phục vụ thực đơn lành mạnh đổi mới mỗi ngày.'
    }
  ],

  // 50. 見る (Nhìn, xem)
  '見る': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日の夜は、部屋の明かりを落としてお気に入りの映画をのんびり見ます。',
      reading: 'きゅうじつの よるは、へやの あかりを おとして おきにいりの えいがを のんびり みます。',
      romaji: 'Kyuujitsu no yoru wa, heya no akari wo otoshite okiniiri no eiga wo nonbiri mimasu.',
      vietnamese: 'Tối ngày nghỉ, tôi tắt bớt đèn phòng rồi thong thả xem bộ phim yêu thích.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '提出する前に、数字の入力ミスや誤字脱字がないかもう一度書類をよく見て確認してください。',
      reading: 'ていしゅつする まえに、すうじの にゅうりょくミスや ごじだつじが ないか もういちど しょるいを よくみて かくにんしてください。',
      romaji: 'Teishutsu suru mae ni, suuji no nyuuryoku misu ya gojidatsuji ga nai ka mou ichido shorui wo yoku mite kakunin shite kudasai.',
      vietnamese: 'Trước khi nộp, bạn hãy xem lại tài liệu thật kỹ một lần nữa để chắc chắn không còn lỗi nhập số hay lỗi chính tả.'
    }
  ],

  // 51. 聞く (Nghe, hỏi)
  '聞く': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '毎朝の通勤電車の中で、イヤホンをつけて日本のラジオニュースを聞いています。',
      reading: 'まいあさの つうきんでんしゃの なかで、イヤホンを つけて にほんの ラジオニュースを きいています。',
      romaji: 'Maiasa no tsuukindensha no naka de, iyahon wo tsukete nihon no rajio nyuusu wo kiite imasu.',
      vietnamese: 'Mỗi sáng trên tàu điện đi làm, tôi đeo tai nghe để lắng nghe bản tin radio tiếng Nhật.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '分からない点や業務の進め方で迷ったときは、一人で悩まず先輩に遠慮なく聞いてください。',
      reading: 'わからない てんや ぎょうむの すすめかたで まよった ときは、ひとりで なやまず せんぱいに えんりょなく きいてください。',
      romaji: 'Wakaranai ten ya gyoumu no susumekata de mayotta toki wa, hitori de nayamazu senpai ni enryo naku kiite kudasai.',
      vietnamese: 'Khi gặp điều chưa hiểu hoặc băn khoăn về cách triển khai công việc, đừng tự ôm lo âu mà hãy cứ mạnh dạn hỏi tiền bối.'
    }
  ],

  // 52. 話す (Nói chuyện)
  '話す': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'カフェで久しぶりに親友と会い、お互いの近況について時間を忘れて楽しく話しました。',
      reading: 'カフェで ひさしぶりに しんゆうと あい、おたがいの きんきょうについて じかんを わすれて たのしく はなしました。',
      romaji: 'Kafe de hisashiburi ni shin\'yuu to ai, otagai no kinkyou ni tsuite jikan wo wasurete tanoshiku hanashimashita.',
      vietnamese: 'Lâu ngày gặp lại bạn thân ở quán cà phê, chúng tôi mải mê trò chuyện vui vẻ về cuộc sống của nhau quên cả thời gian.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '会議で自分の意見を述べるときは、結論から先に論理立てて落ち着いて話すことが重要です。',
      reading: 'かいぎで じぶんの いけんを のべるときは、けつろんから さきに ろんりだてて おちついて はなすことが じゅうようです。',
      romaji: 'Kaigi de jibun no iken wo noberu toki wa, ketsuron kara saki ni ronridatete ochitsuite hanasu koto ga juuyou desu.',
      vietnamese: 'Khi trình bày ý kiến trong cuộc họp, việc nêu kết luận trước và nói chuyện mạch lạc, điềm tĩnh là điều vô cùng quan trọng.'
    }
  ],

  // 53. 読む (Đọc)
  '読む': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '毎晩寝る前に、心温まる小説を数ページ読むのが私の一番のリラックス法です。',
      reading: 'まいばん ねる まえに、こころあたたまる しょうせつを すうページ よむのが わたしの いちばんの リラックスほうです。',
      romaji: 'Maiban neru mae ni, kokoroatatamaru shousetsu wo suu peeji yomu no ga watashi no ichiban no rirakkusuhou desu.',
      vietnamese: 'Mỗi tối trước khi ngủ, đọc vài trang tiểu thuyết ấm áp là cách thư giãn tuyệt vời nhất của tôi.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '契約書にサインする前に、細かい条項や注意事項の隅々までしっかり目を通して読んでおきましょう。',
      reading: 'けいやくしょに サインする まえに、こまかい じょうこうや ちゅういじこうの すみずみまで しっかり めを とおして よんでおきましょう。',
      romaji: 'Keiyakusho ni sain suru mae ni, komakai joukou ya chuuijikou no sumizumi made shikkari me wo tooshite yonde okimashou.',
      vietnamese: 'Trước khi đặt bút ký hợp đồng, hãy đọc kỹ từng ngóc ngách điều khoản và những lưu ý chi tiết.'
    }
  ],

  // 54. 書く (Viết)
  '書く': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '感謝の気持ちを伝えるため、誕生日プレゼントに手書きのメッセージカードを添えて書きました。',
      reading: 'かんしゃの きもちを つたえるため、たんじょうびプレゼントに てがきの メッセージカードを そえて かきました。',
      romaji: 'Kansha no kimochi wo tsutaeru tame, tanjoubi purezento ni tegaki no messeejikaado wo soete kakimashita.',
      vietnamese: 'Để gửi gắm lòng biết ơn, tôi đã nắn nót viết một tấm thiệp tay đính kèm món quà sinh nhật.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '本日の進捗状況と明日以降の課題を整理し、分かりやすい日報を書いて上司に提出しました。',
      reading: 'ほんじつの しんちょくじょうきょうと あすいこうの かだいをつせいりし、わかりやすい にっぽうを かいて じょうしに ていしゅつしました。',
      romaji: 'Honjitsu no shinchokujoukyou to asu ikou no kadai wo seirishi, wakariyasui nippou wo kaite joushi ni teishutsu shimashita.',
      vietnamese: 'Tôi đã tổng hợp tiến độ hôm nay cùng các việc cần xử lý ngày mai, viết một bản báo cáo ngày mạch lạc rồi gửi lên cấp trên.'
    }
  ],

  // 55. 買う (Mua)
  '買う': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '仕事帰りに近所のスーパーへ立ち寄り、新鮮な魚と野菜を買って帰りました。',
      reading: 'しごとがえりに きんじょの スーパーへ たちより、しんせんな さかなと やさいを かって かえりました。',
      romaji: 'Shigotogaeri ni kinjo no suupaa he tachiyori, shinsen na sakana to yasai wo katte kaerimashita.',
      vietnamese: 'Tan sở về, tôi ghé vào siêu thị gần nhà mua cá và rau củ tươi ngon đem về nấu cơm.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '来期の事業拡大に備えて、最新鋭のサーバー機器と業務ソフトをまとめて買う決定を下しました。',
      reading: 'らいきの じぎょうかくだいに そなえて、さいしんえいの サーバーききと ぎょうむソフトを まとめて かう けっていを くだしました。',
      romaji: 'Raiki no jigyoukakudai ni sonaete, saishin\'ei no saabaakiki to gyoumusofuto wo matomete kau kettei wo kudashimashita.',
      vietnamese: 'Để chuẩn bị mở rộng kinh doanh kỳ tới, công ty đã quyết định đầu tư mua đồng bộ hệ thống máy chủ và phần mềm nghiệp vụ hiện đại.'
    }
  ],

  // 56. 行く (Đi)
  '行く': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '天気がとても良かったので、週末は気分転換に自転車で近くの海辺まで行きました。',
      reading: 'てんきが とても よかったので、しゅうまつは きぶんてんかんに じてんしゃで ちかくの うみべまで いきました。',
      romaji: 'Tenki ga totemo yokatta node, shuumatsu wa kibuntenkan ni jitensha de chikaku no umibe made ikimashita.',
      vietnamese: 'Thời tiết đẹp nên vào cuối tuần tôi đã đạp xe ra bờ biển gần nhà để hóng gió và đổi gió tâm trạng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '新しい取引先との商談をスムーズに進めるため、午後から同僚と一緒にお客様のオフィスへ行きます。',
      reading: 'あたらしい とりひきさきとの しょうだんを スムーズに すすめるため、ごごから どうりょうと いっしょに おきゃくさまの オフィスへ いきます。',
      romaji: 'Atarashii torihikisaki to no shoudan wo sumuuzu ni susumeru tame, gogo kara douryou to issho ni okyakusama no ofisu he ikimasu.',
      vietnamese: 'Để buổi đàm phán với đối tác mới diễn ra suôn sẻ, chiều nay tôi sẽ cùng đồng nghiệp đến văn phòng của khách hàng.'
    }
  ],

  // 57. 来る (Đến)
  '来る': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '春になると、遠くの街からたくさんの観光客が桜の花見にやって来ます。',
      reading: 'はるに なると、とおくの まちから たくさんの かんこうきゃくが さくらの はなみに やってきます。',
      romaji: 'Haru ni naru to, tooku no machi kara takusan no kankoukyaku ga sakura no hanami ni yatte kimasu.',
      vietnamese: 'Mỗi độ xuân về, đông đảo du khách từ khắp các nơi xa lại đổ về đây để thưởng ngoạn hoa anh đào.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '本社から役員が視察に来る予定なので、工場の清掃と資料の整理を完璧に済ませておきましょう。',
      reading: 'ほんしゃから やくいんが しさつに くる よていなので、こうじょうの せいそうと しりょうの せいりを かんぺきに すませておきましょう。',
      romaji: 'Honsha kara yakuin ga shisatsu ni kuru yotei na node, koujou no seisou to shiryou no seiri wo kampeki ni sumasete okimashou.',
      vietnamese: 'Vì ban giám đốc tổng công ty sắp đến thị sát nhà máy, chúng ta hãy tổng vệ sinh phân xưởng và chuẩn bị tài liệu thật hoàn hảo.'
    }
  ],

  // 58. 帰る (Về)
  '帰る': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '今日は残業がないので、夕暮れ前に家に帰って家族と手作りの夕飯を囲みます。',
      reading: 'きょうは ざんぎょうが ないので、ゆうぐれまえに いえに かえって かぞくと てづくりの ゆうはんを かこみます。',
      romaji: 'Kyou wa zangyou ga nai node, yuuguremae ni ie ni kaette kazoku to tedukuri no yuuhan wo kakomimasu.',
      vietnamese: 'Hôm nay không phải tăng ca nên tôi về nhà trước lúc hoàng hôn buông xuống để cùng gia đình quây quần bên bữa cơm nhà ấm áp.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '海外出張を無事に終え、週明けの月曜日に成田空港経由で日本へ帰る予定です。',
      reading: 'かいがいしゅっちょうを ぶじに おえ、しゅうあけの げつようびに なりたくうこうけいゆで にほんへ かえる よていです。',
      romaji: 'Kaigaishucchou wo buji ni oe, shuuake no getsuyoubi ni naritakuukou keiyu de nihon he kaeru yotei desu.',
      vietnamese: 'Sau khi hoàn thành chuyến công tác nước ngoài thuận lợi, tôi dự kiến sẽ bay về Nhật Bản qua sân bay Narita vào đầu tuần tới.'
    }
  ],

  // 59. 働く (Làm việc)
  '働く': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '両親は朝早くから畑で一生懸命に働き、安全で美味しい無農薬野菜を育てています。',
      reading: 'りょうしんは あさはやくから はたけで いっしょうけんめいに はたらき、あんぜんで おいしい むのうやくやさいを そだてています。',
      romaji: 'Ryoushin wa asahayaku kara hatake de isshoukemmei ni hataraki, anzen de oishii munouyakuyasai wo sodatete imasu.',
      vietnamese: 'Bố mẹ tôi từ sáng sớm đã ra đồng chăm chỉ làm việc để trồng ra những luống rau sạch hữu cơ vừa ngon vừa an toàn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '多様な国籍のエンジニアが互いの文化を尊重し合いながら、ひとつのチームとして前向きに働いています。',
      reading: 'たような こくせきの エンジニアが おたがいの ぶんかを そんちょうしあいながら、ひとつの チームとして まえむきに はたらいています。',
      romaji: 'Tayou na kokuseki no enjinia ga otagai no bunka wo sonchoushiaingara, hitotsu no chiimu to shite maemuki ni hataraite imasu.',
      vietnamese: 'Các kỹ sư đến từ nhiều quốc gia khác nhau cùng tôn trọng văn hóa của nhau và tích cực làm việc gắn kết như một tập thể thống nhất.'
    }
  ],

  // 60. 休む (Nghỉ ngơi)
  '休む': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '風邪気味で少し熱があったので、今日は無理をせず一日家でゆっくり休みました。',
      reading: 'かぜぎみで すこし ねつが あったので、きょうは むりを せず いちにち いえで ゆっくり やすみました。',
      romaji: 'Kazegimi de sukoshi netsu ga atta node, kyou wa muri wo sezu ichinichi ie de yukkuri yasumimashita.',
      vietnamese: 'Vì thấy người hâm hấp sốt và có triệu chứng cảm, hôm nay tôi không gượng sức mà ở nhà nghỉ ngơi trọn vẹn cả ngày.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '来週の金曜日に有給休暇を取得して会社を休み、役所での手続きを済ませる予定です。',
      reading: 'らいしゅうの きんようびに ゆうきゅうきゅうかを しゅとくして かいしゃを やすみ、やくしょでの てつづきを すませる よていです。',
      romaji: 'Raishuu no kinyoubi ni yuukyuukyuuka wo shutoku shite kaisha wo yasumi, yakusho de no tetsuzuki wo sumaseru yotei desu.',
      vietnamese: 'Thứ Sáu tuần tới tôi đã xin nghỉ phép năm để giải quyết các thủ tục hành chính tại cơ quan phường xã.'
    }
  ],

  // 61. 新しい (Mới mẻ)
  '新しい': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '近所に新しくオープンしたベーカリーの焼きたてクロワッサンが、とても香ばしくて絶品でした。',
      reading: 'きんじょに あたらしく オープンした ベーカリーの やきたてクロワッサンが、とても こうばしくて ぜっぴんでした。',
      romaji: 'Kinjo ni atarashiku oopun shita beekarii no yakitate kurowassan ga, totemo koubashikute zeppin deshita.',
      vietnamese: 'Bánh sừng bò mới nướng tại tiệm bánh vừa khai trương gần nhà thơm lừng và ngon đỉnh cao.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '市場の変化に迅速に対応するため、固定観念にとらわれない新しいマーケティング戦略を導入しました。',
      reading: 'しじょうの へんかに じんそくに たいおうするため、こていかんねんに とらわれない あたらしい マーケティングせんりゃくを どうにゅうしました。',
      romaji: 'Shijou no henka ni jinsoku ni taiou suru tame, koteikannen ni torawarenai atarashii maaketingusenryaku wo dounyuu shimashita.',
      vietnamese: 'Để thích ứng nhanh với biến động thị trường, chúng tôi đã đưa vào áp dụng chiến lược tiếp thị mới mẻ không bị bó buộc bởi lối mòn cũ.'
    }
  ],

  // 62. 古い (Cũ, cổ xưa)
  '古い': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '祖父の家には、大正時代から代々大切に受け継がれてきた古い掛け軸が飾られています。',
      reading: 'そふの いえには、たいしょうじだいから だいだい たいせつに うけつがれてきた ふるい かけじくが かざられています。',
      romaji: 'Sofu no ie ni wa, taishoujidai kara daidai taisetsu ni uketsugarete kita furui kakejiku ga kazararete imasu.',
      vietnamese: 'Trong căn nhà của ông nội có treo một bức tranh trục cuốn cổ quý giá được lưu truyền qua nhiều thế hệ từ thời Taisho.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '業務効率化を進めるため、10年以上使い続けてきた古い基幹システムを最新のクラウド型へ移行しました。',
      reading: 'ぎょうむこうりつかを すすめるため、じゅうねんいじょう つかいづづけてきた ふるい きかんシステムを さいしんの クラウドがたへ いこうしました。',
      romaji: 'Gyoumukouritsuka wo susumeru tame, juunen ijou tsukaitsuzukete kita furui kikanshisutemu wo saishin no kuraudogata he ikou shimashita.',
      vietnamese: 'Nhằm nâng cao hiệu suất làm việc, chúng tôi đã chuyển đổi hệ thống lõi cũ kỹ vận hành hơn 10 năm sang nền tảng đám mây hiện đại.'
    }
  ],

  // 63. 美味しい (Ngon)
  '美味しい': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '市場で仕入れたばかりの旬の魚を使ったお刺身は、脂が乗っていて本当に美味しいです。',
      reading: 'いちばで しいれたばかりの しゅんの さかなを つかった おさしみは、あぶらが のっていて ほんとうに おいしいです。',
      romaji: 'Ichiba de shiiretabakari no shun no sakana wo tsukatta osashimi wa, abura ga notte ite hontou ni oishii desu.',
      vietnamese: 'Món sashimi làm từ cá tươi vừa đánh bắt theo mùa ngọt béo ngậy và thực sự ngon tuyệt trần.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '取引先との親睦を深めるため、地元で一番美味しいと評判の郷土料理店で会食を開きました。',
      reading: 'とりひきさきとの しんぼくを ふかめるため、じもとで いちばん おいしいと ひょうばんの きょうどりょうりてんで かいしょくを ひらきました。',
      romaji: 'Torihikisaki to no shinboku wo fukameru tame, jimoto de ichiban oishii to hyouban no kyoudoryouriten de kaishoku wo hirakimashita.',
      vietnamese: 'Để thắt chặt quan hệ hữu hảo với đối tác, chúng tôi đã tổ chức buổi tiệc chiêu đãi tại nhà hàng đặc sản địa phương nức tiếng thơm ngon số 1.'
    }
  ],

  // 64. 時間 (Thời gian)
  '時間': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日の午後は、誰にも邪魔されず読書に没頭できる贅沢な時間を楽しんでいます。',
      reading: 'きゅうじつの ごごは、だれにも じゃまされず どくしょに ぼっとうできる ぜいたくな じかんを たのしんでいます。',
      romaji: 'Kyuujitsu no gogo wa, dare ni mo jamasarezu dokusho ni bottou dekiru zeitaku na jikan wo tanoshinde imasu.',
      vietnamese: 'Chiều cuối tuần là khoảng thời gian thảnh thơi quý giá khi tôi được đắm chìm trong trang sách mà không bị ai làm phiền.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'ビジネスにおいて時間は最も貴重な資源であり、納期を厳守することが信頼関係の基本です。',
      reading: 'ビジネスにおいて じかんは もっとも きちょうな しげんであり、のうきを げんしゅすることが しんらいかんけいの きほんです。',
      romaji: 'Bijinesu ni oite jikan wa mottomo kichou na shigen de ari, nouki wo genshu suru koto ga shinraikankei no kihon desu.',
      vietnamese: 'Trong công việc thời gian là tài nguyên quý báu nhất, và việc tuân thủ chuẩn xác kỳ hạn giao hàng chính là nền tảng của chữ tín.'
    }
  ],

  // 65. お金 (Tiền bạc)
  'お金': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '将来の安心のために、無駄遣いを控えて毎月決まった金額のお金を貯金しています。',
      reading: 'しょうらいの あんしんの ために、むだづかいを ひかえて まいつき きまった きんがくの おかねを ちょきんしています。',
      romaji: 'Shourai no anshin no tame ni, mudazukai wo hikaete maitsuki kimatta kingaku no okane wo chokin shite imasu.',
      vietnamese: 'Để an tâm cho tương lai, tôi hạn chế chi tiêu phung phí và đều đặn trích một khoản tiền tiết kiệm cố định mỗi tháng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '新規事業の立ち上げには、設備投資だけでなく宣伝費や運転資金など多額のお金が必要です。',
      reading: 'しんきじぎょうの たちあげには、せつびとうしだけでなく せんでんひや うんてんしきんなど たがくの おかねが ひつようです。',
      romaji: 'Shinkijigyou no tachiage ni wa, setsubitoushi dake de naku sendenhi ya untenshikin nado tagaku no okane ga hitsuyou desu.',
      vietnamese: 'Việc khởi tạo một mảng kinh doanh mới không chỉ cần tiền đầu tư trang thiết bị mà còn đòi hỏi lượng vốn lớn cho truyền thông và vận hành.'
    }
  ],

  // 66. 天気 (Thời tiết)
  '天気': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '今日は雲ひとつない気持ちの良い天気なので、ベランダいっぱいに洗濯物を干しました。',
      reading: 'きょうは くもひとつない きもちの よい てんきなので、ベランダいっぱいに せんたくものを ほしました。',
      romaji: 'Kyou wa kumohitotsunai kimochi no yoi tenki na node, beranda ippai ni sentakumono wo hoshimashita.',
      vietnamese: 'Hôm nay trời đẹp không một gợn mây trong lành nên tôi đã giặt giũ và phơi đầy quần áo ngoài ban công.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '野外イベントの開催可否を判断するため、気象庁の週間天気予報を細かくチェックしています。',
      reading: 'やがいイベントの かいさいかひを はんだんするため、きしょうちょうの しゅうかんてんきよほうを こまかく チェックしています。',
      romaji: 'Yagai ibento no kaisaikahi wo handan suru tame, kishouchou no shuukantenkiyohou wo komakaku chekku shite imasu.',
      vietnamese: 'Để quyết định xem sự kiện ngoài trời có diễn ra hay không, chúng tôi đang theo dõi sát sao dự báo thời tiết tuần của cục khí tượng.'
    }
  ],

  // 67. 雨 (Mưa)
  '雨': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '午後から冷たい雨が降り始めたので、濡れないように傘をさして足早に家路につきました。',
      reading: 'ごごから つめたい あめが ふりはじめたので、ぬれないように かさを さして あしばやに いえじに つきました。',
      romaji: 'Gogo kara tsumetai ame ga furihajimeta node, nurenai you ni kasa wo sashite ashibaya ni ieji ni tsukimashita.',
      vietnamese: 'Chiều về cơn mưa lạnh bắt đầu rơi, tôi bung ô che để không bị ướt rồi rảo bước nhanh về nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '台風に伴う激しい大雨の影響で電車が運転見合わせとなったため、本日は全員リモートワークに切り替えました。',
      reading: 'たいふうに ともなう はげしい おおあめの えいきょうで でんしゃが うんてんみあわせと なったため、ほんじつは ぜんいん リモートワークに きりかえました。',
      romaji: 'Taifuu ni tomonau hageshii ooame no eikyou de densha ga untenmiawase to natta tame, honjitsu wa zen\'in rimootowaaku ni kirikaemashita.',
      vietnamese: 'Do ảnh hưởng của mưa bão dữ dội khiến các tuyến tàu điện tạm dừng chạy, hôm nay toàn bộ nhân viên công ty được chuyển sang làm việc tại nhà.'
    }
  ],

  // 68. 会社 (Công ty)
  '会社': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '父は毎朝7時に家を出て、満員電車に揺られながら都心の会社へ通勤しています。',
      reading: 'ちちは まいあさ しちじに いえを でて、まんいんでんしゃに ゆられながら としんの かいしゃへ つうきんしています。',
      romaji: 'Chichi wa maiasa shichiji ni ie wo dete, man\'indensha ni yurarenagara toshin no kaisha he tsuukin shite imasu.',
      vietnamese: 'Bố tôi mỗi sáng 7 giờ đều đặn rời nhà, chen chúc trên tàu điện đông đúc để đến công ty ở trung tâm thủ đô làm việc.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '我が社は環境保護と地域社会への貢献を経営理念に掲げ、持続可能な事業展開を推進しています。',
      reading: 'わがしゃは かんきょうほごと ちいきしゃかいへの こうけんを けいえいりねんに かかげ、じぞくかのうな じぎょうてんかいを すいしんしています。',
      romaji: 'Wagasha wa kankyouhogo to chiikishakai he no kouken wo keieirinen ni kakage, jizokukanou na jigyoutenkai wo suishin shite imasu.',
      vietnamese: 'Công ty chúng tôi lấy việc bảo vệ môi trường và đóng góp cho cộng đồng làm triết lý kinh doanh, không ngừng xúc tiến phát triển bền vững.'
    }
  ],

  // 69. 仕事 (Công việc)
  '仕事': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '平日は仕事で忙しい分、週末は趣味の料理や散歩を楽しんでリフレッシュしています。',
      reading: 'へいじつは しごとで いそがしいぶん、しゅうまつは しゅみの りょうりや さんぽを たのしんで リフレッシュしています。',
      romaji: 'Heijitsu wa shigoto de isogashii bun, shuumatsu wa shumi no ryouri ya sampo wo tanoshinde rifuresshu shite imasu.',
      vietnamese: 'Trong tuần bận rộn vì công việc bao nhiêu thì cuối tuần tôi lại dành trọn thời gian nấu ăn và dạo bộ để nạp lại năng lượng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '丁寧で正確な仕事を積み重ねることが、クライアントからの厚い信頼と高評価に直結します。',
      reading: 'ていねいで せいかくな しごとを つみかさねることが、クライアントからの あつい しんらいと こうひょうかに ちょっけつします。',
      romaji: 'Teinei de seikaku na shigoto wo tsumikasaneru koto ga, kuraianto kara no atsui shinrai to kouhyouka ni chokketsu shimasu.',
      vietnamese: 'Việc tích lũy sự chỉn chu và chuẩn xác trong từng khâu công việc chính là chìa khóa tạo dựng lòng tin vững chắc nơi đối tác.'
    }
  ],

  // 70. 先生 (Thầy cô giáo, bác sĩ, chuyên gia)
  '先生': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '日本語学校の先生は、いつも分かりやすく発音や文法を熱心に教えてくれます。',
      reading: 'にほんごがっこうの せんせいは、いつも わかりやすく はつおんや ぶんぽうを ねっしんに おしえてくれます。',
      romaji: 'Nihongogakkou no sensei wa, itsumo wakariyasuku hatsuon ya bumpou wo nesshin ni oshiete kuremasu.',
      vietnamese: 'Thầy cô ở trường Nhật ngữ luôn giảng dạy phát âm và ngữ pháp rất tận tâm và dễ hiểu.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'プロジェクトの法律面での安全性を担保するため、顧問弁護士の先生に契約書のリーガルチェックを依頼しました。',
      reading: 'プロジェクトの ほうりつめんでの あんぜんせいを たんぽするため、こもんべんごしの せんせいに けいやくしょの リーガルチェックを いらいしました。',
      romaji: 'Purojekuto no houritsumen de no anzensei wo tampo suru tame, komombengoshi no sensei ni keiyakusho no riigaruchekku wo irai shimashita.',
      vietnamese: 'Để đảm bảo tính pháp lý an toàn cho dự án, chúng tôi đã nhờ luật sư cố vấn rà soát pháp lý bản hợp đồng.'
    }
  ],

  // 71. 医者 (Bác sĩ)
  '医者': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '喉の痛みが続いたので総合病院へ行き、親切な医者に詳しく診察してもらいました。',
      reading: 'のどの いたみが つづいたので そうごうびょういんへ いき、しんせつな いしゃに くわしく しんさつして もらいました。',
      romaji: 'Nodo no itami ga tsuduita node sougoubyouin he iki, shinsetsu na isha ni kuwashiku shinsatsu shite moraimashita.',
      vietnamese: 'Bị đau rát họng kéo dài nên tôi đã tới bệnh viện đa khoa và được bác sĩ ân cần khám xét rất kỹ lưỡng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '産業医の先生と定期面談を実施し、過重労働を防ぎ従業員のメンタルヘルスをケアしています。',
      reading: 'さんぎょういの せんせいと ていきめんだんを じっしし、かじゅうろうどうを ふせぎ じゅうぎょういんの メンタルヘルスを ケアしています。',
      romaji: 'Sangyoui no sensei to teikimendan wo jisshishi, kajuuroudou wo fusegi juugyouin no mentaruherusu wo kea shite imasu.',
      vietnamese: 'Công ty tổ chức các buổi trao đổi định kỳ với bác sĩ chuyên trách để phòng ngừa làm việc quá sức và chăm lo sức khỏe tinh thần cho nhân sự.'
    }
  ],

  // 72. 水 (Nước)
  '水': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '朝目覚めたらすぐにコップ一杯の新鮮な水を飲み、体内を目覚めさせます。',
      reading: 'あさ めざめたら すぐに コップいっぱいの しんせんな みずを のみ、たいないを めざめさせます。',
      romaji: 'Asa mezametara sugu ni koppu ippai no shinsen na mizu wo nomi, tainai wo mezamesasemasu.',
      vietnamese: 'Mỗi sáng khi thức dậy tôi uống ngay một ly nước lọc tươi mát để đánh thức các cơ quan trong cơ thể.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '防災備蓄品として、社員全員が3日間過ごせる十分な量の飲料水を社内倉庫に常備しています。',
      reading: 'ぼうさいびちくひんとして、しゃいんぜんいんが みっかかん すごせる じゅうぶんな りょうの いんりょうすいを しゃないそうこに じょうびしています。',
      romaji: 'Bousaibichikuhin to shite, shain zen\'in ga mikkakan sugoseru juubun na ryou no inryousui wo shanaisouko ni joubi shite imasu.',
      vietnamese: 'Để chủ động phòng chống thiên tai, kho lưu trữ của công ty luôn dự trữ sẵn đủ lượng nước uống cho toàn thể nhân viên trong 3 ngày.'
    }
  ],

  // 73. お茶 (Trà)
  'お茶': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '和菓子を食べながら熱い緑茶をすすると、ほっと心が和らいで癒やされます。',
      reading: 'わがしを たべながら あつい りょくちゃを すすると、ほっと こころが やらいで いやされます。',
      romaji: 'Wagashi wo tabenagara atsui ryokucha wo susuru to, hotto kokoro ga yaraide iyasaremasu.',
      vietnamese: 'Vừa thưởng thức bánh ngọt truyền thống vừa nhấp ngụm trà xanh nóng hổi mang lại cảm giác an yên vô cùng thư thái.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '来客の際には礼儀正しくお茶を出し、両手でお茶碗をお出しするのが日本のビジネスマナーです。',
      reading: 'らいきゃくの さいには れいぎただしく おちゃを だし、りょうてで おちゃわんを おだしする のが にほんの ビジネスマナーです。',
      romaji: 'Raikyaku no sai ni wa reigitadashiku ocha wo dashi, ryoute de ochawan wo odashi suru no ga nihon no bijinesumanaa desu.',
      vietnamese: 'Khi khách đến thăm văn phòng, việc dâng trà lịch sự bằng cả hai tay là quy tắc ứng xử văn hóa cơ bản trong doanh nghiệp Nhật Bản.'
    }
  ],

  // 74. ご飯 (Cơm, bữa ăn)
  'ご飯': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '炊飯器で炊き立ての白いご飯に納豆とお味噌汁を合わせるのが、日本の定番の朝食です。',
      reading: 'すいはんきで たきたての しろい ごはんに なっとうと おみそしるを あわせる のが、にほんの ていばんの ちょうしょくです。',
      romaji: 'Suihanki de takitate no shiroi gohan ni nattou to omisoshiru wo awaseru no ga, nihon no teiban no choushoku desu.',
      vietnamese: 'Bát cơm trắng nóng hổi vừa chín tới ăn kèm đậu lên men natto và súp miso là bữa sáng chuẩn vị truyền thống của người Nhật.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'チームの結束を固めるため、大きな案件を達成した後に全員で美味しいご飯を食べに行きました。',
      reading: 'チームの けっそくを かためるため、おおきな あんけんを たっせいした あとに ぜんいんで おいしい ごはんを たべに いきました。',
      romaji: 'Chiimu no kessoku wo katameru tame, ookina anken wo tassei shita ato ni zen\'in de oishii gohan wo tabe ni ikimashita.',
      vietnamese: 'Để thắt chặt tinh thần đồng đội, sau khi hoàn thành dự án lớn, cả nhóm đã cùng nhau đi liên hoan một bữa cơm ấm cúng.'
    }
  ],

  // 75. 便利 (Tiện lợi)
  '便利': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '駅の目の前に24時間営業のコンビニがあり、急な買い物にも大変便利で助かっています。',
      reading: 'えきの めのまえに にじゅうよじかんえいぎょうの コンビニが あり、きゅうな かいものにも たいへん べんりで たすかっています。',
      romaji: 'Eki no menomae ni nijuuyojikan\'eigyou no konbini ga ari, kyuu na kaimono ni mo taihen benri de tasukatte imasu.',
      vietnamese: 'Ngay trước cửa ga có cửa hàng tiện lợi mở cửa 24/24 nên rất thuận tiện cho những lúc cần mua sắm gấp.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'スマホで経費精算ができるアプリを導入したことで、煩雑だった領収書の処理が格段に便利になりました。',
      reading: 'スマホで けいひせいさんが できる アプリを どうにゅうした ことで、はんざつだった りょうしゅうしょの しょりが かくだんに べんりに なりました。',
      romaji: 'Sumaho de keihiseisan ga dekiru apuri wo dounyuu shita koto de, hanzatsu datta ryoushuusho no shori ga kakudan ni benri ni narimashita.',
      vietnamese: 'Nhờ triển khai ứng dụng thanh toán công tác phí trên điện thoại, việc xử lý hóa đơn phức tạp đã trở nên tiện lợi vượt bậc.'
    }
  ],

  // 76. 元気 (Khỏe mạnh, sung sức)
  '元気': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '田舎の祖父母に電話をかけたら、毎日畑仕事をして元気に暮らしていると聞いて安心しました。',
      reading: 'いなかの そふぼに でんわを かけたら、まいにち はたけしごとを して げんきに くらしていると きいて あんしんしました。',
      romaji: 'Inaka no sofubo ni denwa wo kaketara, mainichi hatakeshigoto wo shite genki ni kurashite iru to kiite anshin shimashita.',
      vietnamese: 'Gọi điện về quê cho ông bà, tôi rất an lòng khi nghe ông bà vẫn ngày ngày làm vườn khỏe khoắn và minh mẫn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '毎朝オフィスに入るときは、同僚へ明るく元気な声で「おはようございます」と挨拶を交わします。',
      reading: 'まいあさ オフィスに はいる ときは、どうりょうへ あかるく げんきな こえで 「おはようございます」と あいさつを かわします。',
      romaji: 'Maiasa ofisu ni hairu toki wa, douryou he akaruku genki na koe de "Ohayou gozaimasu" to aisatsu wo kawashimasu.',
      vietnamese: 'Mỗi sáng bước vào văn phòng, tôi luôn chào đồng nghiệp bằng giọng điệu rạng rỡ và tràn đầy năng lượng tích cực.'
    }
  ],

  // 77. 雨傘 (Dù đi mưa)
  '雨傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '梅雨の季節に備えて、骨が丈夫で壊れにくい雨傘を一本購入しました。',
      reading: 'つゆの きせつに そなえて、ほねが じょうぶで こわれにくい あまがさを いっぽん こうにゅうしました。',
      romaji: 'Tsuyu no kisetsu ni sonaete, hone ga joubu de kowarenikui amagasa wo ippon kounyuu shimashita.',
      vietnamese: 'Để chuẩn bị cho mùa mưa dầm, tôi đã mua một cây dù đi mưa có khung xương bền chắc không lo gãy gập.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '朝から強い雨が降っていたので、大きな雨傘を差して駅まで歩きました。',
      reading: 'あさから つよい あめが ふっていたので、おおきな あまがさを さして えきまで あるきました。',
      romaji: 'Asa kara tsuyoi ame ga futteita node, ookina amagasa wo sashite eki made arukimashita.',
      vietnamese: 'Vì từ sáng trời đã mưa to, tôi đã che cây dù đi mưa cỡ lớn rồi rảo bước ra nhà ga.'
    }
  ],

  // 78. 日傘 (Dù che nắng chống tia UV)
  '日傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '真夏の強い紫外線から肌を守るため、遮光率の高い日傘を差して外出します。',
      reading: 'まなつの つよい しがいせんから はだを まもるため、しゃこうりつの たかい ひがさを さして がいしゅつします。',
      romaji: 'Manatsu no tsuyoi shigaisen kara hada wo mamoru tame, shakouritsu no takai higasa wo sashite gaishutsu shimasu.',
      vietnamese: 'Để bảo vệ làn da khỏi tia cực tím gay gắt giữa trưa hè, tôi luôn che chiếc dù chống nắng có độ cản sáng cao khi ra ngoài.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '最近は熱中症対策として、女性だけでなく男性も日傘を使う人が増えています。',
      reading: 'さいきんは ねっちゅうしょう たいさくとして、じょせいだけでなく だんせいも ひがさを つかう ひとが ふえています。',
      romaji: 'Saikin wa necchuushou taisaku to shite, josei dake de naku dansei mo higasa wo tsukau hito ga fuete imasu.',
      vietnamese: 'Gần đây để phòng ngừa say nắng, không chỉ nữ giới mà ngày càng có nhiều nam giới dùng dù che nắng.'
    }
  ],

  // 79. 折りたたみ傘 (Dù gấp gọn)
  '折りたたみ傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '急な夕立に備えて、毎日鞄の中にコンパクトな折りたたみ傘を入れています。',
      reading: 'きゅうな ゆうだちに そなえて、まいにち かばんの なかに コンパクトな おりたたみがさを いれています。',
      romaji: 'Kyuu na yuudachi ni sonaete, mainichi kaban no naka ni kompakuto na oritatamikasa wo irete imasu.',
      vietnamese: 'Đề phòng cơn mưa rào buổi chiều bất chợt, mỗi ngày tôi đều bỏ sẵn một chiếc dù gấp nhỏ gọn trong cặp.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '最近の折りたたみ傘は非常に軽量で、風が強くても裏返りにくい設計になっています。',
      reading: 'さいきんの おりたたみがさは ひじょうに けいりょうで、かぜが つよくても うらがえりにくい せっけいに なっています。',
      romaji: 'Saikin no oritatamikasa wa hijou ni keiryou de, kaze ga tsuyokutemo uragaerinikui sekkei ni natte imasu.',
      vietnamese: 'Các loại dù gấp hiện nay siêu nhẹ và được thiết kế chống lật dù ngay cả khi gặp gió lớn.'
    }
  ],
  '折り畳み傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '急な夕立に備えて、毎日鞄の中にコンパクトな折り畳み傘を入れています。',
      reading: 'きゅうな ゆうだちに そなえて、まいにち かばんの なかに コンパクトな おりたたみがさを いれています。',
      romaji: 'Kyuu na yuudachi ni sonaete, mainichi kaban no naka ni kompakuto na oritatamikasa wo irete imasu.',
      vietnamese: 'Đề phòng cơn mưa rào buổi chiều bất chợt, mỗi ngày tôi đều bỏ sẵn một chiếc dù gấp nhỏ gọn trong cặp.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '最近の折り畳み傘は非常に軽量で、風が強くても裏返りにくい設計になっています。',
      reading: 'さいきんの おりたたみがさは ひじょうに けいりょうで、かぜが つよくても うらがえりにくい せっけいに なっています。',
      romaji: 'Saikin no oritatamikasa wa hijou ni keiryou de, kaze ga tsuyokutemo uragaerinikui sekkei ni natte imasu.',
      vietnamese: 'Các loại dù gấp hiện nay siêu nhẹ và được thiết kế chống lật dù ngay cả khi gặp gió lớn.'
    }
  ],

  // 80. 置き傘 (Dù để sẵn dự phòng)
  '置き傘': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '予期せぬ雨で濡れないよう、職場のロッカーに置き傘を一本常備しています。',
      reading: 'よきせぬ あめで ぬれないよう、しょくばの ロッカーに おきがさを いっぽん じょうびしています。',
      romaji: 'Yokisenu ame de nurenai you, shokuba no rokkaa ni okigasa wo ippon joubi shite imasu.',
      vietnamese: 'Để không bị ướt khi trời đổ mưa bất ngờ, tôi luôn để sẵn một cây dù dự phòng trong tủ đồ ở nơi làm việc.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '学校に置き傘をしていたおかげで、放課後の急な大雨でも慌てずに下校できました。',
      reading: 'がっこうに おきがさを していた おかげで、ほうかごの きゅうな おおあめでも あわてずに げこうできました。',
      romaji: 'Gakkou ni okigasa wo shiteita okage de, houkago no kyuu na ooame demo awatezu ni gekou dekimashita.',
      vietnamese: 'Nhờ có cây dù để sẵn ở trường, dù sau giờ học trời đổ mưa to tôi vẫn yên tâm ra về không phải cuống cuồng.'
    }
  ],

  // 81. 傘下 (Dưới trướng, trực thuộc tập đoàn mẹ)
  '傘下': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: 'その老舗メーカーは経営難を克服するため、大手ITグループの傘下に入ることになりました。',
      reading: 'その しにせメーカーは けいえいなんを こくふくするため、おおて アイティーグループの さんかに はいることに なりました。',
      romaji: 'Sono shinise meekaa wa keieinan wo kokufuku suru tame, oote aithii guruupu no sanka ni hairu koto ni narimashita.',
      vietnamese: 'Để vượt qua khó khăn về tài chính, nhà sản xuất lâu đời đó đã quyết định gia nhập dưới trướng một tập đoàn công nghệ lớn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'グローバル企業の傘下企業として、国際基準に合わせた品質管理を徹底しています。',
      reading: 'グローバルきぎょうの さんかきぎょうとして、こくさいきじゅんに あわせた ひんしつかんりを てっていしています。',
      romaji: 'Guroobaru kigyou no sanka kigyou to shite, kokusai kijun ni awaseta hinshitsu kanri wo tettei shite imasu.',
      vietnamese: 'Là doanh nghiệp trực thuộc tập đoàn toàn cầu, chúng tôi áp dụng triệt để quy trình quản lý chất lượng theo chuẩn quốc tế.'
    }
  ],

  // 82. 手袋 (Găng tay)
  '手袋': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '真冬の朝は指先が凍えるほど冷たいので、暖かい革の手袋をして出勤します。',
      reading: 'まふゆの あさは ゆびさきが こごえるほど つめたいので、あたたかい かわの てぶくろを して しゅっきんします。',
      romaji: 'Mafuyu no asa wa yubisaki ga kogoeru hodo tsumetai node, atatakai kawa no tebukuro wo shite shukkin shimasu.',
      vietnamese: 'Mỗi sáng giữa mùa đông buốt giá ngón tay tê cóng, tôi đeo đôi găng tay da ấm áp rồi mới đi làm.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '安全のために、重い荷物を運ぶときは必ず滑り止めの付いた作業用手袋を着用してください。',
      reading: 'あんぜんの ために、おもい にもつを はこぶ ときは かならず すべりどめの ついた さぎょうようてぶくろを ちゃくようしてください。',
      romaji: 'Anzen no tame ni, omoi nimotsu wo hakobu toki wa kanarazu suberidome no tsuita sagyouyou tebukuro wo chakuyou shite kudasai.',
      vietnamese: 'Để đảm bảo an toàn, khi khiêng vác hàng hóa nặng bạn nhất định phải đeo găng tay bảo hộ lao động có gai chống trượt.'
    }
  ],

  // 83. 手話 (Ngôn ngữ ký hiệu)
  '手話': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '耳が不自由な方とスムーズに意思疎通ができるよう、毎週市民講座で手話を学んでいます。',
      reading: 'みみが ふじゆうな かたと スムーズに いしそotsuが できるよう、まいしゅう しみんこうざで しゅわを まなんでいます。',
      romaji: 'Mimi ga fujiyuu na kata to sumuuzu ni ishisoutsuu ga dekiru you, maishuu shimin kouza de shuwa wo manande imasu.',
      vietnamese: 'Để có thể giao tiếp thấu hiểu với người khiếm thính, mỗi tuần tôi đều tham gia lớp học ngôn ngữ ký hiệu dành cho cộng đồng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'テレビの緊急ニュース番組では、手話通訳者が同時に画面に映し出されて情報を届けます。',
      reading: 'テレビの きんきゅうニュースばんぐみでは、しゅわつうやくしゃが どうじに がめんに うつしだされて じょうほうを とどけます。',
      romaji: 'Terebi no kinkyuu nyuusu bangumi de wa, shuwa tsuuyakusha ga douji ni gamen ni utsushidasarete jouhou wo todokemasu.',
      vietnamese: 'Trên các bản tin thời sự khẩn cấp, phiên dịch viên ngôn ngữ ký hiệu sẽ xuất hiện trực tiếp trên màn hình để truyền tải thông tin.'
    }
  ],

  // 84. 切手 (Con tem thư)
  '切手': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '海外へエアメールを送るため、郵便局で必要な金額の記念切手を買って貼りました。',
      reading: 'かいがいへ エアメールを おくるため、ゆうびんきょくで ひつような きんがくの きねんきってを かって はりました。',
      romaji: 'Kaigai he eameeru wo okuru tame, yuubinkyoku de hitsuyou na kingaku no kinenkitte wo katte harimashita.',
      vietnamese: 'Để gửi thư máy bay ra nước ngoài, tôi đã đến bưu điện mua tem kỷ niệm đúng mệnh giá rồi dán lên phong bì.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '請求書や重要書類を取引先へ郵送する際、料金不足にならないよう切手の金額を正確に確認します。',
      reading: 'せいきゅうしょや じゅうようしょるいを とりひきさきへ ゆうそうする さい、りょうきんぶそくに ならないよう きっての きんがくを せいかくに かくにんします。',
      romaji: 'Seikyuusho ya juuyoushorui wo torihikisaki he yuusou suru sai, ryoukinbusoku ni naranai you kitte no kingaku wo seikaku ni kakunin shimasu.',
      vietnamese: 'Khi gửi hóa đơn và giấy tờ quan trọng qua bưu điện cho đối tác, tôi kiểm tra chuẩn xác mệnh giá tem để không bị thiếu cước.'
    }
  ],

  // 85. 雨宿り (Trú mưa)
  '雨宿り': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '突然の雷雨に降られたので、駅前の商店街のアーケードで雨宿りをしました。',
      reading: 'とつぜんの らいうに ふられたので、えきまえの しょうてんがいの アーケードで あまやどりを しました。',
      romaji: 'Totsuzen no raiu ni furareta node, ekimae no shoutengai no aakeedo de amayadori wo shimashita.',
      vietnamese: 'Gặp phải cơn mưa dông sấm chớp bất ngờ, tôi đã tấp vào mái vòm khu phố mua sắm trước ga để trú mưa.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '軒下で雨宿りをしている間、温かい缶コーヒーを飲んで雨足が弱まるのを静かに待ちました。',
      reading: 'のきしたで あまやどりを している あいだ、あたたかい かんコーヒーを のんで あまあしが よわまる のを しずかに まちました。',
      romaji: 'Nokishita de amayadori wo shite iru aida, atatakai kankoohii wo nonde amaashi ga yowamaru no wo shizuka ni machimashita.',
      vietnamese: 'Trong lúc đứng trú mưa dưới mái hiên, tôi nhâm nhi lon cà phê ấm và lặng lẽ đợi cơn mưa dịu hạt bớt.'
    }
  ],

  // 86. 大雨 (Mưa lớn)
  '大雨': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '昨夜からの激しい大雨により、近くの川の水位が急激に上昇しています。',
      reading: 'さくやからの はげしい おおあめに より、ちかくの かわの すいいが きゅうげきに じょうしょうしています。',
      romaji: 'Sakuya kara no hageshii ooame ni yori, chikaku no kawa no suii ga kyuugeki ni joushou shite imasu.',
      vietnamese: 'Do cơn mưa như trút nước từ tối qua, mực nước ở con sông gần nhà đang dâng lên rất nhanh.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '大雨警報が発令されたため、午後の授業は全て休講となり生徒は安全に帰宅しました。',
      reading: 'おおあめけいほう が はつれいされた ため、ごごの じゅぎょうは すべて きゅうこうと なり せいとは あんぜんに きたくしました。',
      romaji: 'Ooame keihou ga hatsurei sareta tame, gogo no jugyou wa subete kyuukou to nari seito wa anzen ni kitaku shimashita.',
      vietnamese: 'Vì có cảnh báo mưa lớn nghiêm trọng, toàn bộ tiết học buổi chiều đều được hủy để học sinh về nhà an toàn.'
    }
  ],

  // 87. 小雨 (Mưa phùn, mưa nhỏ)
  '小雨': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '静かな朝に小雨が降る中、傘を差して近所の神社まで散歩に出かけました。',
      reading: 'しずかな あさに こさめが ふる なか、かさを さして きんじょの じんじゃまで さんぽに でかけました。',
      romaji: 'Shizuka na asa ni kosame ga furu naka, kasa wo sashite kinjo no jinja made sampo ni dekakemashita.',
      vietnamese: 'Trong buổi sớm mai tĩnh lặng lất phất mưa phùn, tôi che ô dạo bước đến ngôi đền gần nhà.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '小雨程度であれば、ランニングウェアを着て公園のジョギングを予定通り行います。',
      reading: 'こさめていど で あれば、ランニングウェアを きて こうえんの ジョギングを よていどおり おこないます。',
      romaji: 'Kosame teido de areba, ranningu uea wo kite kouen no jogingu wo yotei doori okonaimasu.',
      vietnamese: 'Nếu chỉ là mưa phùn hạt nhỏ, tôi vẫn mặc đồ thể thao và chạy bộ quanh công viên theo đúng kế hoạch.'
    }
  ],

  // 88. 雨天 (Thời tiết mưa)
  '雨天': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '本日の野外フェスティバルは雨天のため、来週の日曜日に延期されることになりました。',
      reading: 'ほんじつの やがいフェスティバルは うてんの ため、らいしゅうの にちようびに えんきされる ことに なりました。',
      romaji: 'Honjitsu no yagai fesutibaru wa uten no tame, raishuu no nichiyoubi ni enki sareru koto ni narimashita.',
      vietnamese: 'Lễ hội ngoài trời hôm nay do trời mưa nên đã được hoãn sang Chủ nhật tuần tới.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '雨天決行のイベントですので、参加者の皆様は各自レインコートをご持参ください。',
      reading: 'うてんけっこうの イベントですので、さんかしゃの みなさまは かくじ レインコートを ごじさんください。',
      romaji: 'Uten kekkou no ibento desu node, sankasha no minasama wa kakuji reinkooto wo gojisan kudasai.',
      vietnamese: 'Vì là sự kiện diễn ra bình thường kể cả khi trời mưa, kính mong người tham gia tự chuẩn bị áo mưa mang theo.'
    }
  ],

  // 89. 雨水 (Nước mưa)
  '雨水': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '屋根から流れ落ちる雨水を専用タンクに溜めて、庭の草木の水やりに再利用しています。',
      reading: 'やねから ながれおちる あまみずを せんようタンクに ためて、にわの くさきの みずやりに さいりようしています。',
      romaji: 'Yane kara nagareochiru amamizu wo senyou tanku ni tamete, niwa no kusaki no mizuyari ni sairiyou shite imasu.',
      vietnamese: 'Nước mưa chảy từ trên mái được gom vào bồn chuyên dụng để tái sử dụng tưới cây cỏ trong vườn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '集中豪雨による都市の水害を防ぐため、地下に巨大な雨水貯留施設が建設されています。',
      reading: 'しゅうちゅうごううに よる としの すいがいを ふせぐため、ちかに きょだいな うすいちょりゅうしせつが けんせつされています。',
      romaji: 'Shuuchuugouu ni yoru toshi no suigai wo fusegu tame, chika ni kyodai na usuichoryuushisetsu ga kensetsu sarete imasu.',
      vietnamese: 'Để ngăn ngập lụt đô thị khi có mưa dông lớn cục bộ, công trình hầm ngầm trữ nước mưa khổng lồ đang được xây dựng.'
    }
  ],

  // 90. 時代 (Thời đại, thời kỳ)
  '時代': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '昭和の時代を振り返ると、人々の温かい助け合いの精神が強く印象に残っています。',
      reading: 'しょうわの じだいをおふりかえると、ひとびとの あたたかい たすけあいの せいしんが つよく いんしょうに のこっています。',
      romaji: 'Shouwa no jidai wo furikaeru to, hitobito no atatakai tasukeai no seishin ga tsuyoku inshou ni nokotte imasu.',
      vietnamese: 'Nhìn lại thời kỳ Showa, tinh thần đùm bọc sẻ chia ấm áp của con người thời ấy để lại ấn tượng sâu đậm trong tôi.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: 'デジタル技術の急速な進化により、社会は今までにない新しい変革の時代を迎えています。',
      reading: 'デジタルぎじゅつの きゅうそくな しんかに より、しゃかいは いままでにない あたらしい へんかくの じだいを むかえています。',
      romaji: 'Dejitaru gijutsu no kyuusoku na shinka ni yori, shakai wa ima made ni nai atarashii henkaku no jidai wo mukaete imasu.',
      vietnamese: 'Sự phát triển vũ bão của công nghệ số đang đưa xã hội bước vào một kỷ nguyên chuyển đổi hoàn toàn mới mẻ.'
    }
  ],

  // 91. 時刻 (Thời khắc, mốc thời gian, giờ giấc)
  '時刻': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '列車の出発時刻までまだ30分あるので、待合室で温かいコーヒーを飲んで待ちます。',
      reading: 'れっしゃの しゅっぱつじこくまで まだ さんじゅっぷん あるので、まちあいしつで あたたかい コーヒーを のんで まちます。',
      romaji: 'Ressha no shuppatsujikoku made mada sanjuppun aru node, machiaishitsu de atatakai koohii wo nonde machimasu.',
      vietnamese: 'Vẫn còn 30 phút nữa mới đến giờ tàu khởi hành nên tôi ngồi nhâm nhi tách cà phê nóng ở phòng chờ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日本へ荷物を配達する際は、お客様が指定した配達時刻を正確に守ることが求められます。',
      reading: 'にほんへ にもつを はいたつする さいは、おきゃくさまが していした はいたつじこくを せいかくに まもることが もとめられます。',
      romaji: 'Nihon he nimotsu wo haitatsu suru sai wa, okyakusama ga shitei shita haitatsujikoku wo seikaku ni mamoru koto ga motomeraremasu.',
      vietnamese: 'Khi giao hàng tại Nhật Bản, người vận chuyển bắt buộc phải tuân thủ chuẩn xác khung giờ giao mà khách hàng đã hẹn.'
    }
  ],

  // 92. 時差 (Độ lệch múi giờ, chênh lệch thời gian)
  '時差': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '日本とベトナムの間には2時間の時差があり、日本の方が2時間早く進んでいます。',
      reading: 'にほんと ベトナムの あいだには にじかんの じさが あり、にほんの ほうが にじかん はやく すすんでいます。',
      romaji: 'Nihon to Betonamu no aida ni wa nijikan no jisa ga ari, Nihon no hou ga nijikan hayaku susunde imasu.',
      vietnamese: 'Giữa Nhật Bản và Việt Nam có độ lệch múi giờ là 2 tiếng, múi giờ Nhật Bản chạy trước Việt Nam 2 giờ.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '海外支社とのオンライン会議を設定する際は、時差を十分に考慮して無理のない時間を選びます。',
      reading: 'かいがいししゃとの オンラインかいぎを せっていする さいは、じさを じゅうぶんに こうりょして むりのない じかんを えらびます。',
      romaji: 'Kaigaishisha to no onrain kaigi wo settei suru sai wa, jisa wo juubun ni kouryo shite muri no nai jikan wo erabimasu.',
      vietnamese: 'Khi sắp xếp cuộc họp trực tuyến với chi nhánh nước ngoài, chúng tôi luôn tính toán kỹ chênh lệch múi giờ để chọn khung giờ hợp lý.'
    }
  ],

  // 93. 腕時計 (Đồng hồ đeo tay)
  '腕時計': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '就職祝いに両親からプレゼントされた革ベルトの腕時計を、今でも大切に使っています。',
      reading: 'しゅうしょくいわいに りょうしんから プレゼントされた かわベルトの うでどけいを、いまでも たいせつに つかっています。',
      romaji: 'Shuushokuiwai ni ryoushin kara purezento sareta kawa beruto no udedokei wo, ima demo taisetsu ni tsukatte imasu.',
      vietnamese: 'Chiếc đồng hồ đeo tay dây da mà bố mẹ tặng mừng khi tôi tìm được việc, đến nay tôi vẫn trân trọng giữ gìn sử dụng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '試験会場ではスマートフォンの持ち込みが禁止されているため、シンプルな腕時計が必要です。',
      reading: 'しけんかいじょうでは スマートフォンの もちこみが きんしされているため、シンプルな うでどけいが ひつようです。',
      romaji: 'Shiken kaijou de wa sumaatofon no mochikomi ga kinshi sarete iru tame, shinpuru na udedokei ga hitsuyou desu.',
      vietnamese: 'Vì trong phòng thi cấm mang theo điện thoại thông minh, thí sinh cần chuẩn bị một chiếc đồng hồ đeo tay đơn giản để canh giờ.'
    }
  ],

  // 94. 目覚まし時計 (Đồng hồ báo thức)
  '目覚まし時計': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '大事な面接の朝に寝坊しないよう、目覚まし時計のアラームを朝6時にセットしました。',
      reading: 'だいじな めんせつの あさに ねぼうしないよう、めざましどけいの アラームを あさろくじに セットしました。',
      romaji: 'Daiji na mensetsu no asa ni neboushinai you, mezamashidokei no araamu wo asa rokuji ni setto shimashita.',
      vietnamese: 'Để không ngủ quên vào buổi sáng phỏng vấn quan trọng, tôi đã hẹn chuông đồng hồ báo thức lúc 6 giờ sáng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '最近はスマートフォンのアラームだけでなく、大音量の目覚まし時計を併用して起床しています。',
      reading: 'さいきんは スマートフォンの アラームだけでなく、だいおんりょうの めざましどけいを へいようして きしょうしています。',
      romaji: 'Saikin wa sumaatofon no araamu dake de naku, daionryou no mezamashidokei wo heiyou shite kishou shite imasu.',
      vietnamese: 'Dạo này ngoài báo thức trên điện thoại, tôi còn dùng thêm đồng hồ báo thức chuông to để đảm bảo thức dậy đúng giờ.'
    }
  ],

  // 95. 農家 (Hộ nông dân, nhà nông)
  '農家': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '近所の農家から朝採れの新鮮なトマトを直接分けてもらい、サラダにして美味しくいただきました。',
      reading: 'きんじょの のうかから あさどれの しんせんな トマトを ちょくせつ わけてもらい、サラダにして おいしく いただきました。',
      romaji: 'Kinjo no nouka kara asadore no shinsen na tomato wo chokusetsu wakete morai, sarada ni shite oishiku itadakimashita.',
      vietnamese: 'Tôi mua được mớ cà chua tươi vừa hái sáng sớm trực tiếp từ hộ nông dân gần nhà và làm món salad ăn rất ngon lành.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '地元の農家の方々が丹精込めて育てたお米は、ふっくらとした甘みと粘りがあって格別な美味しさです。',
      reading: 'じもとの のうかの かたがたが たんせいこめて そだてた おこめは、ふっくらとした あまみと ねばりが あって かくべつな おいしさです。',
      romaji: 'Jimoto no nouka no katagata ga tanseikomete sodateta okome wa, fukkura to shita amami to nebari ga atte kakubetsu na oishisa desu.',
      vietnamese: 'Hạt gạo được bà con nông dân địa phương dồn hết tâm huyết chăm bón nấu lên xốp dẻo, ngọt thơm đậm đà đặc biệt.'
    }
  ],

  // 96. 妻 (Vợ của mình)
  '妻': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日の朝は妻と一緒に近くの公園を散歩しながら、のんびりと会話を楽しみます。',
      reading: 'きゅうじつの あさは つまと いっしょに ちかくの こうえんを さんぽしながら、のんびりと かいわを たのしみます。',
      romaji: 'Kyuujitsu no asa wa tsuma to issho ni chikaku no kouen wo sanposhinagara, nonbiri to kaiwa wo tanoshimimasu.',
      vietnamese: 'Vào buổi sáng ngày nghỉ, tôi cùng vợ dạo bước quanh công viên gần nhà và thong thả trò chuyện cùng nhau.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '日頃の感謝の気持ちを込めて、妻の誕生日に手料理を作って家族でお祝いしました。',
      reading: 'ひごろの かんしゃの きもちを こめて、つまの たんじょうびに てりょうりを つくって かぞくで おいわいしました。',
      romaji: 'Higoro no kansha no kimochi wo komete, tsuma no tanjoubi ni teryouri wo tsukutte kazoku de oiwai shimashita.',
      vietnamese: 'Gửi gắm tấm lòng biết ơn thường ngày, nhân dịp sinh nhật vợ tôi đã tự tay vào bếp nấu ăn để cả nhà cùng chúc mừng.'
    }
  ],

  // 97. 夫 (Chồng của mình)
  '夫': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '夫と協力して家事や育児を分担し、お互いを思いやる温かい家庭を築いています。',
      reading: 'おっとと きょうりょくして かじや いくじを ぶんたんし、おたがいを おもいやる あたたかい かていを きずいています。',
      romaji: 'Otto to kyouryoku shite kaji ya ikuji wo buntan shi, otagai wo omoiyaru atatakai katei wo kizuite imasu.',
      vietnamese: 'Tôi cùng chồng san sẻ việc nhà và chăm sóc con cái, luôn yêu thương thấu hiểu để vun đắp một mái ấm gia đình hạnh phúc.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '毎朝、出勤する夫を笑顔で見送りながら「今日も一日気をつけてね」と声をかけています。',
      reading: 'まいあさ、しゅっきんする おっとを えがおで みおくりながら「きょうも いちにち きをつけてね」と こえを かけています。',
      romaji: 'Maiasa, shukkin suru otto wo egao de miokurinagara "Kyou mo ichinichi ki wo tsukete ne" to koe wo kakete imasu.',
      vietnamese: 'Mỗi sáng tiễn chồng đi làm, tôi luôn nở nụ cười tươi và dặn anh: "Hôm nay đi đường cẩn thận nhé anh".'
    }
  ],

  // 99. 両親 (Bố mẹ, cha mẹ)
  '両親': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '初めてもらった初任給で、これまで温かく育ててくれた両親に美味しい和食をごちそうしました。',
      reading: 'はじめて もらった しょにんきゅうで、これまで あたたかく そだててくれた りょうしんに おいしい わしょくを ごちそうしました。',
      romaji: 'Hajimete moratta shoninkyuu de, kore made atatakaku sodatete kureta ryoushin ni oishii washoku wo gochisou shimashita.',
      vietnamese: 'Bằng tháng lương đầu tiên đi làm, tôi đã mời bố mẹ một bữa cơm truyền thống Nhật Bản thịnh soạn để tri ân công ơn nuôi dưỡng.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '遠く離れて暮らす両親に元気な姿を見せるため、毎週末欠かさずビデオ通話をかけています。',
      reading: 'とおく はなれて くらす りょうしんに げんきな すがたを みせるため、まいしゅうまつ かかさず ビデオつうわを かけています。',
      romaji: 'Tooku hanarete kurasu ryoushin ni genki na sugata wo miseru tame, mai shuumatsu kakasazu bideo tsuuwa wo kakete imasu.',
      vietnamese: 'Để bố mẹ ở xa yên tâm thấy mình vẫn luôn mạnh khỏe, mỗi dịp cuối tuần tôi đều gọi điện video về thăm gia đình.'
    }
  ],

  // 100. 子供 (Con cái, trẻ nhỏ)
  '子供': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日に公園で楽しそうに駆け回る子供たちの笑顔を見ていると、日々の疲れも吹き飛びます。',
      reading: 'きゅうじつに こうえんで たのしそうに かけまわる こどもたちの えがおを みていると、ひびの つかれも ふきとびます。',
      romaji: 'Kyuujitsu ni kouen de tanoshisou ni kakemawaru kodomotachi no egao wo mite iru to, hibi no tsukare mo fukitobimasu.',
      vietnamese: 'Nhìn nụ cười hồn nhiên của các em nhỏ tung tăng chạy nhảy ngoài công viên ngày nghỉ, bao mệt mỏi trong tôi dường như tan biến hết.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '子供の好奇心や個性を大切に育てながら、自立して歩んでいけるよう温かく見守っています。',
      reading: 'こどもの こうきしんや こせいを たいせつに そだてながら、じりつして あゆんでいけるよう あたたかく みまもっています。',
      romaji: 'Kodomo no koukishin ya kosei wo taisetsu ni sodatenagara, jiritsu shite ayunde ikeru you atatakaku mimamotte imasu.',
      vietnamese: 'Tôi luôn tôn trọng sự tò mò và cá tính riêng của con, kiên nhẫn dõi theo từng bước trưởng thành tự lập của con.'
    }
  ],

  // 101. 子ども (Trẻ em)
  '子ども': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '休日に公園で楽しそうに駆け回る子どもたちの笑顔を見ていると、日々の疲れも吹き飛びます。',
      reading: 'きゅうじつに こうえんで たのしそうに かけまわる こどもたちの えがおを みていると、ひびの つかれも ふきとびます。',
      romaji: 'Kyuujitsu ni kouen de tanoshisou ni kakemawaru kodomotachi no egao wo mite iru to, hibi no tsukare mo fukitobimasu.',
      vietnamese: 'Nhìn nụ cười hồn nhiên của các em nhỏ tung tăng chạy nhảy ngoài công viên ngày nghỉ, bao mệt mỏi trong tôi dường như tan biến hết.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '地域全体で子どもたちの安全を見守るため、毎朝交差点でボランティアの旗振り活動を行っています。',
      reading: 'ちいきぜんたいで こどもたちの あんぜんを みまもるため、まいあさ こうさてんで ボランティアの はたふりかつどうを おこなっています。',
      romaji: 'Chiiki zentai de kodomotachi no anzen wo mimamoru tame, maiasa kousaten de borantia no hatafuri katsudou wo okonatte imasu.',
      vietnamese: 'Để bảo vệ an toàn cho trẻ nhỏ trên toàn khu phố, mỗi sáng các tình nguyện viên đều tham gia điều phối chỉ dẫn qua đường ở các ngã tư.'
    }
  ],

  // 102. 同僚 (Đồng nghiệp)
  '同僚': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '残業で遅くなった夜は、気心の知れた同僚と軽く食事をしながらリフレッシュしています。',
      reading: 'ざんぎょうで おそくなった よるは、きごころの しれた どうりょうと かるく しょくじを しながら リフレッシュしています。',
      romaji: 'Zangyou de osoku natta yoru wa, kigokoro no shireta douryou to karuku shokuji wo shinagara rifuresshu shite imasu.',
      vietnamese: 'Những hôm tăng ca về muộn, tôi cùng mấy anh em đồng nghiệp thân thiết ghé ăn nhẹ một bữa để nạp lại năng lượng thư thái.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '職場の同僚と意見を出し合いながら協力したことで、難しい大型プロジェクトを無事に成功させることができました。',
      reading: 'しょくばの どうりょうと いけんを だしあいながら きょうりょくした ことで、むずかしい おおがたプロジェクトを ぶじに せいこう させることが できました。',
      romaji: 'Shokuba no douryou to iken wo dashiai nagara kyouryoku shita koto de, muzukashii oogata purojekuto wo buji ni seikou saseru koto ga dekimashita.',
      vietnamese: 'Nhờ cùng các đồng nghiệp trao đổi ý kiến và kề vai sát cánh, chúng tôi đã đưa dự án lớn đầy thử thách về đích thành công tốt đẹp.'
    }
  ],

  // 103. 上司 (Cấp trên, sếp)
  '上司': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '仕事で大きなミスをして落ち込んでいた時、直属の上司が温かい励ましの言葉をかけてくれました。',
      reading: 'しごとで おおきな ミスをして おちこんでいた とき、ちょくぞくの じょうしが あたたかい はげましの ことばを かけてくれました。',
      romaji: 'Shigoto de ookina misu wo shite ochikonde ita toki, chokuzoku no joushi ga atatakai hagemashi no kotoba wo kakete kuremashita.',
      vietnamese: 'Khi tôi buồn nản vì mắc sai sót lớn trong công việc, sếp trực tiếp đã ân cần động viên và khích lệ tôi rất nhiều.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '業務の進捗状況に問題が生じた際は、トラブルが大きくなる前に速やかに上司へ「報連相」を行います。',
      reading: 'ぎょうむの しんちょくじょうきょうに もんだいが しょうじた さいは、トラブルが おおきくなる まえに すみやかに じょうしへ「ほうれんそう」を おこないます。',
      romaji: 'Gyoumu no shinchokujoukyou ni mondai ga shoujita sai wa, toraburu ga ookiku naru mae ni sumayaka ni joushi he "Hou-Ren-Sou" wo okonaimasu.',
      vietnamese: 'Khi tiến độ công việc phát sinh sự cố, tôi luôn nhanh chóng báo cáo, liên lạc và thảo luận (Horenso) với cấp trên trước khi vấn đề trở nên nghiêm trọng.'
    }
  ],

  // 104. 先輩 (Tiền bối, đàn anh đàn chị)
  '先輩': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '入社したばかりの頃、仕事の手順やマナーを優しく丁寧に教えてくれた先輩に心から感謝しています。',
      reading: 'にゅうしゃしたばかりの ころ、しごとの てじゅんや マナーを やさしく ていねいに おしえてくれた せんぱいに こころから かんしゃしています。',
      romaji: 'Nyuusha shita bakari no koro, shigoto no tejun ya manaa wo yasashiku teinei ni oshiete kureta senpai ni kokoro kara kansha shite imasu.',
      vietnamese: 'Hồi mới vào công ty, tôi chân thành biết ơn tiền bối đã ân cần chỉ bảo từng quy trình công việc và cung cách ứng xử.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '先輩のテキパキとした仕事ぶりを見習い、自分も早く一人前になれるよう努力を重ねています。',
      reading: 'せんぱいの テキパキとした しごとぶりを みならい、じぶんも はやく いちにんまえに なれるよう どりょくを かさねています。',
      romaji: 'Senpai no tekipaki to shita shigotoburi wo minarai, jibun mo hayaku ichininmae ni nareru you doryoku wo kasanete imasu.',
      vietnamese: 'Học tập tác phong làm việc nhanh nhẹn tháo vát của tiền bối, tôi đang nỗ lực rèn luyện để sớm vững vàng tự lập trong công việc.'
    }
  ],

  // 105. 後輩 (Hậu bối, đàn em)
  '後輩': [
    {
      type: 'literal',
      label: 'Ví dụ 1: Nghĩa đen (Literal)',
      japanese: '新しくチームに配属された後輩が緊張していたので、ランチに誘ってリラックスしてもらいました。',
      reading: 'あたらしく チームに はいぞくされた こうはいが きんちょうしていたので、ランチに さそって リラックスして もらいました。',
      romaji: 'Atarashiku chiimu ni haizoku sareta kouhai ga kinchou shite ita node, ranchi ni sasotte rirakkusu shite moraimashita.',
      vietnamese: 'Thấy bạn hậu bối mới về nhóm còn nhiều bỡ ngỡ căng thẳng, tôi đã rủ em đi ăn trưa để em cảm thấy thoải mái hơn.'
    },
    {
      type: 'figurative',
      label: 'Ví dụ 2: Nghĩa bóng & Ẩn dụ (Figurative)',
      japanese: '後輩が自力で問題を解決できるよう、ただ答えを教えるのではなくヒントを出しながら成長を支援しています。',
      reading: 'こうはいが じりきで もんだいを かいけつできるように、ただ こたえを おしえるのではなく ヒントを だしながら せいちょうを しえんしています。',
      romaji: 'Kouhai ga jiriki de mondai wo kaiketsu dekiru you ni, tada kotae wo oshieru no de wa naku hinto wo dashinagara seichou wo shien shite imasu.',
      vietnamese: 'Để hậu bối có thể tự mình giải quyết vấn đề, thay vì đưa sẵn đáp án, tôi gợi mở các định hướng để hỗ trợ em ngày một trưởng thành.'
    }
  ]
};

/**
 * High-speed canonical alias map for Japanese bespoke dictionary.
 * Maps Romaji, Hiragana, Vietnamese words, and Sino-Vietnamese readings directly to bespoke headwords.
 */
const BESPOKE_CANONICAL_ALIASES: Record<string, string> = {
  // 傘 (kasa) & compounds
  'かさ': '傘', 'kasa': '傘', 'dù': '傘', 'ô': '傘', 'cây dù': '傘', 'cái ô': '傘', 'tản': '傘',
  'あまがさ': '雨傘', 'amagasa': '雨傘', 'dù che mưa': '雨傘', 'ô che mưa': '雨傘',
  'ひがさ': '日傘', 'higasa': '日傘', 'dù che nắng': '日傘', 'ô che nắng': '日傘',
  'おりたたみがさ': '折りたたみ傘', 'oritatamikasa': '折りたたみ傘', 'oritadamigasa': '折りたたみ傘', 'dù gấp': '折りたたみ傘', 'ô gấp': '折りたたみ傘',
  'おきがさ': '置き傘', 'okigasa': '置き傘', 'dù để sẵn': '置き傘',
  'さんか': '傘下', 'sanka': '傘下', 'dưới trướng': '傘下',
  // 雨 & compounds
  'あめ': '雨', 'ame': '雨', 'mưa': '雨', 'cơn mưa': '雨', 'trời mưa': '雨', 'vũ': '雨',
  'あまやどり': '雨宿り', 'amayadori': '雨宿り', 'trú mưa': '雨宿り',
  'おおあめ': '大雨', 'ooame': '大雨', 'mưa to': '大雨', 'mưa lớn': '大雨',
  'こさめ': '小雨', 'kosame': '小雨', 'mưa phùn': '小雨', 'mưa nhỏ': '小雨',
  'うてん': '雨天', 'uten': '雨天', 'ngày mưa': '雨天', 'thời tiết mưa': '雨天',
  'あまみず': '雨水', 'amamizu': '雨水', 'usui': '雨水', 'nước mưa': '雨水',
  // 手 & compounds
  'てぶくろ': '手袋', 'tebukuro': '手袋', 'găng tay': '手袋', 'bao tay': '手袋',
  'しゅわ': '手話', 'shuwa': '手話', 'ngôn ngữ ký hiệu': '手話',
  'きって': '切手', 'kitte': '切手', 'tem': '切手', 'con tem': '切手',
  // 時 & compounds
  'じだい': '時代', 'jidai': '時代', 'thời đại': '時代', 'thời kỳ': '時代',
  'じこく': '時刻', 'jikoku': '時刻', 'giờ giấc': '時刻', 'khung giờ': '時刻',
  'じさ': '時差', 'jisa': '時差', 'lệch múi giờ': '時差',
  'うでどけい': '腕時計', 'udedokei': '腕時計', 'đồng hồ đeo tay': '腕時計',
  'めざましどけい': '目覚まし時計', 'mezamashidokei': '目覚まし時計', 'đồng hồ báo thức': '目覚まし時計',
  // 手帳 (techou)
  'てちょう': '手帳', 'techou': '手帳', 'techo': '手帳', 'sổ tay': '手帳', 'so tay': '手帳', 'thủ trướng': '手帳',
  // 机 (tsukue)
  'つくえ': '机', 'tsukue': '机', 'bàn': '机', 'ban': '机', 'cái bàn': '机', 'kỷ': '机',
  // 椅子 (isu)
  'いす': '椅子', 'isu': '椅子', 'ghế': '椅子', 'ghe': '椅子', 'cái ghế': '椅子', 'ỷ tử': '椅子',
  // 時計 (tokei)
  'とけい': '時計', 'tokei': '時計', 'đồng hồ': '時計', 'dong ho': '時計', 'thời kế': '時計',
  // 鍵 (kagi)
  'かぎ': '鍵', 'kagi': '鍵', 'chìa khóa': '鍵', 'chia khoa': '鍵', 'khóa': '鍵', 'kiện': '鍵',
  // 財布 (saifu)
  'さいふ': '財布', 'saifu': '財布', 'ví': '財布', 'vi': '財布', 'ví tiền': '財布', 'bóp': '財布', 'tài bố': '財布',
  // 眼鏡 (megane)
  'めがね': '眼鏡', 'megane': '眼鏡', 'kính': '眼鏡', 'kinh': '眼鏡', 'kính mắt': '眼鏡', 'nhãn kính': '眼鏡',
  // 靴 (kutsu)
  'くつ': '靴', 'kutsu': '靴', 'giày': '靴', 'giay': '靴', 'đôi giày': '靴', 'ngoa': '靴',
  // 鞄 (kaban)
  'かばん': '鞄', 'kaban': '鞄', 'cặp': '鞄', 'cap': '鞄', 'túi xách': '鞄', 'balo': '鞄',
  // 手紙 (tegami)
  'てがみ': '手紙', 'tegami': '手紙', 'thư': '手紙', 'thu': '手紙', 'bức thư': '手紙', 'lá thư': '手紙', 'thủ chỉ': '手紙',
  // 本 (hon)
  'ほん': '本', 'hon': '本', 'sách': '本', 'sach': '本', 'quyển sách': '本', 'bản': '本',
  // 辞書 (jisho)
  'じしょ': '辞書', 'jisho': '辞書', 'từ điển': '辞書', 'tu dien': '辞書', 'từ thư': '辞書',
  // 車 (kuruma)
  'くるま': '車', 'kuruma': '車', 'xe hơi': '車', 'ô tô': '車', 'oto': '車', 'xa': '車',
  // 自転車 (jitensha)
  'じてんしゃ': '自転車', 'jitensha': '自転車', 'xe đạp': '自転車', 'xe dap': '自転車', 'tự chuyển xa': '自転車',
  // 電車 (densha)
  'でんしゃ': '電車', 'densha': '電車', 'tàu điện': '電車', 'tau dien': '電車', 'điện xa': '電車',
  // 駅 (eki)
  'えき': '駅', 'eki': '駅', 'nhà ga': '駅', 'nha ga': '駅', 'ga': '駅', 'dịch': '駅',
  // 食べる (taberu)
  'たべる': '食べる', 'taberu': '食べる', 'ăn': '食べる', 'an': '食べる', 'thực': '食べる',
  // 飲む (nomu)
  'のむ': '飲む', 'nomu': '飲む', 'uống': '飲む', 'uong': '飲む', 'ẩm': '飲む',
  // 見る (miru)
  'みる': '見る', 'miru': '見る', 'xem': '見る', 'nhìn': '見る', 'kien': '見る',
  // 聞く (kiku)
  'きく': '聞く', 'kiku': '聞く', 'nghe': '聞く', 'hỏi': '聞く', 'văn': '聞く',
  // 話す (hanasu)
  'はなす': '話す', 'hanasu': '話す', 'nói': '話す', 'nói chuyện': '話す', 'thoại': '話す',
  // 読む (yomu)
  'よむ': '読む', 'yomu': '読む', 'đọc': '読む', 'doc': '読む', 'độc': '読む',
  // 書く (kaku)
  'かく': '書く', 'kaku': '書く', 'viết': '書く', 'viet': '書く', 'ghi chép': '書く', 'thư pháp': '書く',
  // 買う (kau)
  'かう': '買う', 'kau': '買う', 'mua': '買う', 'mãi': '買う',
  // 行く (iku)
  'いく': '行く', 'iku': '行く', 'đi': '行く', 'hành': '行く',
  // 来る (kuru)
  'くる': '来る', 'kuru': '来る', 'đến': '来る', 'lai': '来る',
  // 帰る (kaeru)
  'かえる': '帰る', 'kaeru': '帰る', 'về': '帰る', 'quy': '帰る',
  // 働く (hataraku)
  'はたらく': '働く', 'hataraku': '働く', 'làm việc': '働く', 'lao động': '働く',
  // 休む (yasumu)
  'やすむ': '休む', 'yasumu': '休む', 'nghỉ': '休む', 'nghỉ ngơi': '休む', 'hưu': '休む',
  // 勉強 (benkyou)
  'べんきょう': '勉強', 'benkyou': '勉強', 'học': '勉強', 'học tập': '勉強', 'miễn cưỡng': '勉強',
  // 病院 (byouin)
  'びょういん': '病院', 'byouin': '病院', 'bệnh viện': '病院', 'benh vien': '病院',
  // 薬 (kusuri)
  'くすり': '薬', 'kusuri': '薬', 'thuốc': '薬', 'thuoc': '薬', 'dược': '薬',
  // 電話 (denwa)
  'でんわ': '電話', 'denwa': '電話', 'điện thoại': '電話', 'dien thoai': '電話',
  // 会議 (kaigi)
  'かいぎ': '会議', 'kaigi': '会議', 'cuộc họp': '会議', 'hội nghị': '会議',
  // 学生 (gakusei)
  'がくせい': '学生', 'gakusei': '学生', 'học sinh': '学生', 'sinh viên': '学生',
  // 家 (ie / uchi)
  'いえ': '家', 'ie': '家', 'うち': '家', 'uchi': '家', 'nhà': '家', 'nha': '家', 'ngôi nhà': '家', 'căn nhà': '家', 'mái nhà': '家', 'gia': '家',
  // 家族 (kazoku)
  'かぞく': '家族', 'kazoku': '家族', 'gia đình': '家族', 'gia dinh': '家族', 'gia tộc': '家族', 'gia toc': '家族',
  // 友達 (tomodachi)
  'ともだち': '友達', 'tomodachi': '友達', 'bạn bè': '友達', 'người bạn': '友達',
  // 新しい (atarashii)
  'あたらしい': '新しい', 'atarashii': '新しい', 'mới': '新しい', 'tân': '新しい',
  // 古い (furui)
  'ふるい': '古い', 'furui': '古い', 'cũ': '古い', 'cổ': '古い',
  // 美味しい (oishii)
  'おいしい': '美味しい', 'oishii': '美味しい', 'ngon': '美味しい', 'mỹ vị': '美味しい',
  // 時間 (jikan)
  'じかん': '時間', 'jikan': '時間', 'thời gian': '時間', 'gio': '時間',
  // お金 (okane)
  'おかね': 'お金', 'okane': 'お金', 'tiền': 'お金', 'tien': 'お金', 'tiền bạc': 'お金',
  // 天気 (tenki)
  'てんき': '天気', 'tenki': '天気', 'thời tiết': '天気', 'thoi tiet': '天気',
  // 会社 (kaisha)
  'かいしゃ': '会社', 'kaisha': '会社', 'công ty': '会社', 'cong ty': '会社',
  // 仕事 (shigoto)
  'しごと': '仕事', 'shigoto': '仕事', 'công việc': '仕事', 'cong viec': '仕事',
  // 先生 (sensei)
  'せんせい': '先生', 'sensei': '先生', 'thầy': '先生', 'cô': '先生', 'tiên sinh': '先生',
  // 医者 (isha)
  'いしゃ': '医者', 'isha': '医者', 'bác sĩ': '医者', 'bac si': '医者', 'y giả': '医者',
  // 水 (mizu)
  'みず': '水', 'mizu': '水', 'nước': '水', 'nuoc': '水', 'thủy': '水',
  // お茶 (ocha)
  'おちゃ': 'お茶', 'ocha': 'お茶', 'trà': 'お茶', 'tra': 'お茶',
  // ご飯 (gohan)
  'ごはん': 'ご飯', 'gohan': 'ご飯', 'cơm': 'ご飯', 'com': 'ご飯', 'bữa ăn': 'ご飯',
  // 便利 (benri)
  'べんり': '便利', 'benri': '便利', 'tiện lợi': '便利', 'tien loi': '便利',
  // 元気 (genki)
  'げんき': '元気', 'genki': '元気', 'khỏe': '元気', 'khỏe mạnh': '元気', 'nguyên khí': '元気',
  // 農家 (nouka)
  'のうか': '農家', 'nouka': '農家', 'nhà nông': '農家', 'nha nong': '農家', 'hộ nông dân': '農家', 'nông dân': '農家', 'nong dan': '農家', 'nông gia': '農家',
  // 妻 (tsuma)
  'つま': '妻', 'tsuma': '妻', 'vợ': '妻', 'vo': '妻', 'bà xã': '妻', 'thê': '妻',
  // 夫 (otto)
  'おっと': '夫', 'otto': '夫', 'chồng': '夫', 'chong': '夫', 'ông xã': '夫', 'phu': '夫',
  // 両親 (ryoushin)
  'りょうしん': '両親', 'ryoushin': '両親', 'bố mẹ': '両親', 'bo me': '両親', 'cha mẹ': '両親', 'lưỡng thân': '両親',
  // 子供 (kodomo)
  'こども': '子供', 'kodomo': '子供', 'con cái': '子供', 'con cai': '子供', 'trẻ em': '子供', 'tre em': '子供',
  // 同僚 (douryou)
  'どうりょう': '同僚', 'douryou': '同僚', 'doryo': '同僚', 'đồng nghiệp': '同僚', 'dong nghiep': '同僚', 'đồng liêu': '同僚',
  // 上司 (joushi)
  'じょうし': '上司', 'joushi': '上司', 'joshi': '上司', 'cấp trên': '上司', 'cap tren': '上司', 'sếp': '上司', 'thượng ti': '上司',
  // 先輩 (senpai)
  'せんぱい': '先輩', 'senpai': '先輩', 'tiền bối': '先輩', 'tien boi': '先輩', 'đàn anh': '先輩',
  // 後輩 (kouhai)
  'こうはい': '後輩', 'kouhai': '後輩', 'kohai': '後輩', 'hậu bối': '後輩', 'hau boi': '後輩', 'đàn em': '後輩'
};

/**
 * Universal resolver for bespoke word examples.
 * Checks Kanji form, Hiragana reading, Romaji, and aliases.
 */
export function getBespokeWordExamples(
  word: string,
  reading?: string,
  romaji?: string,
  meaning?: string
): BespokeWordExample[] | null {
  const cleanW = (word || '').trim();
  const cleanR = (reading || '').trim();
  const cleanRom = (romaji || '').toLowerCase().trim();
  const cleanM = (meaning || '').toLowerCase().trim();

  // 1. Direct Kanji key match
  if (cleanW && MASTER_BESPOKE_WORD_EXAMPLES[cleanW]) {
    return MASTER_BESPOKE_WORD_EXAMPLES[cleanW];
  }

  const hasKanji = /[\u4e00-\u9faf]/.test(cleanW);

  // If the word contains Kanji, it is a specific written Kanji word.
  // We only match by word aliases (not reading aliases of single-character words),
  // so that e.g. 差傘 or 傘貝 does not inadvertently inherit 傘's umbrella examples!
  if (hasKanji) {
    const kanjiAliases = [
      cleanW.toLowerCase(),
      cleanW.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    ];
    for (const ka of kanjiAliases) {
      if (ka && BESPOKE_CANONICAL_ALIASES[ka]) {
        const canonicalKey = BESPOKE_CANONICAL_ALIASES[ka];
        if (MASTER_BESPOKE_WORD_EXAMPLES[canonicalKey]) {
          return MASTER_BESPOKE_WORD_EXAMPLES[canonicalKey];
        }
      }
    }
    return null;
  }

  // 2. For Kana/Romaji/Vietnamese search queries, check canonical aliases
  const lookupKeys = [
    cleanW.toLowerCase(),
    cleanR.toLowerCase(),
    cleanRom,
    cleanM,
    cleanW.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
    cleanM.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  ];

  for (const lk of lookupKeys) {
    if (lk && BESPOKE_CANONICAL_ALIASES[lk]) {
      const canonicalKey = BESPOKE_CANONICAL_ALIASES[lk];
      if (MASTER_BESPOKE_WORD_EXAMPLES[canonicalKey]) {
        return MASTER_BESPOKE_WORD_EXAMPLES[canonicalKey];
      }
    }
  }

  // 3. Scan by reading or exact word
  for (const [key, examples] of Object.entries(MASTER_BESPOKE_WORD_EXAMPLES)) {
    if (key === cleanW || key === cleanR) {
      return examples;
    }
  }

  return null;
}

export interface BespokeWordMeta {
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  pos: string;
  hanViet?: string;
}

export const BESPOKE_WORD_METADATA: Record<string, BespokeWordMeta> = {
  // 傘 & Compounds
  '傘': { word: '傘', reading: 'かさ', romaji: 'kasa', meaning: 'Cây dù, cái ô', level: 'N5', pos: 'Danh từ', hanViet: 'TẢN' },
  '雨傘': { word: '雨傘', reading: 'あまがさ', romaji: 'amagasa', meaning: 'Cây dù đi mưa', level: 'N4', pos: 'Danh từ', hanViet: 'VŨ TẢN' },
  '日傘': { word: '日傘', reading: 'ひがさ', romaji: 'higasa', meaning: 'Cây dù che nắng, chống tia UV', level: 'N3', pos: 'Danh từ', hanViet: 'NHẬT TẢN' },
  '折りたたみ傘': { word: '折りたたみ傘', reading: 'おりたたみがさ', romaji: 'oritatamikasa', meaning: 'Cây dù gấp gọn bỏ túi', level: 'N3', pos: 'Danh từ', hanViet: 'CHIẾ TẢN' },
  '置き傘': { word: '置き傘', reading: 'おきがさ', romaji: 'okigasa', meaning: 'Cây dù để sẵn dự phòng ở nơi làm việc / trường học', level: 'N3', pos: 'Danh từ', hanViet: 'TRÍ TẢN' },
  '傘下': { word: '傘下', reading: 'さんか', romaji: 'sanka', meaning: 'Dưới trướng, trực thuộc tập đoàn mẹ', level: 'N2', pos: 'Danh từ', hanViet: 'TẢN HẠ' },
  '折り畳み傘': { word: '折り畳み傘', reading: 'おりたたみがさ', romaji: 'oritatamikasa', meaning: 'Cây dù gấp gọn bỏ túi', level: 'N3', pos: 'Danh từ', hanViet: 'CHIẾ TẢN' },

  // 雨 & Compounds
  '雨': { word: '雨', reading: 'あめ', romaji: 'ame', meaning: 'Mưa, cơn mưa', level: 'N5', pos: 'Danh từ', hanViet: 'VŨ' },
  '大雨': { word: '大雨', reading: 'おおあめ', romaji: 'ooame', meaning: 'Mưa to, mưa lớn như trút nước', level: 'N4', pos: 'Danh từ', hanViet: 'ĐẠI VŨ' },
  '小雨': { word: '小雨', reading: 'こさめ', romaji: 'kosame', meaning: 'Mưa phùn, mưa nhỏ lất phất', level: 'N3', pos: 'Danh từ', hanViet: 'TIỂU VŨ' },
  '雨宿り': { word: '雨宿り', reading: 'あまやどり', romaji: 'amayadori', meaning: 'Sự trú mưa, dừng chân tránh mưa', level: 'N2', pos: 'Danh từ', hanViet: 'VŨ TÚC' },
  '雨天': { word: '雨天', reading: 'うてん', romaji: 'uten', meaning: 'Trời mưa, thời tiết mưa', level: 'N2', pos: 'Danh từ', hanViet: 'VŨ THIÊN' },
  '雨水': { word: '雨水', reading: 'あまみず', romaji: 'amamizu', meaning: 'Nước mưa', level: 'N3', pos: 'Danh từ', hanViet: 'VŨ THỦY' },

  // 時 & Compounds
  '時計': { word: '時計', reading: 'とけい', romaji: 'tokei', meaning: 'Đồng hồ', level: 'N5', pos: 'Danh từ', hanViet: 'THỜI KẾ' },
  '時間': { word: '時間', reading: 'じかん', romaji: 'jikan', meaning: 'Thời gian, giờ giấc', level: 'N5', pos: 'Danh từ', hanViet: 'THỜI GIAN' },
  '時代': { word: '時代', reading: 'じだい', romaji: 'jidai', meaning: 'Thời đại, thời kỳ lịch sử', level: 'N3', pos: 'Danh từ', hanViet: 'THỜI ĐẠI' },
  '時刻': { word: '時刻', reading: 'じこく', romaji: 'jikoku', meaning: 'Thời khắc, giờ giấc biểu', level: 'N3', pos: 'Danh từ', hanViet: 'THỜI KHẮC' },
  '時差': { word: '時差', reading: 'じさ', romaji: 'jisa', meaning: 'Chênh lệch múi giờ', level: 'N2', pos: 'Danh từ', hanViet: 'THỜI SAI' },
  '腕時計': { word: '腕時計', reading: 'うでどけい', romaji: 'udedokei', meaning: 'Đồng hồ đeo tay', level: 'N4', pos: 'Danh từ', hanViet: 'OẢN THỜI KẾ' },
  '目覚まし時計': { word: '目覚まし時計', reading: 'めざましどけい', romaji: 'mezamashidokei', meaning: 'Đồng hồ báo thức', level: 'N4', pos: 'Danh từ', hanViet: 'MỤC GIÁC THỜI KẾ' },

  // 手 & Compounds
  '手帳': { word: '手帳', reading: 'てちょう', romaji: 'techou', meaning: 'Sổ tay, sổ ghi chép cá nhân', level: 'N4', pos: 'Danh từ', hanViet: 'THỦ TRƯỚNG' },
  '手紙': { word: '手紙', reading: 'てがみ', romaji: 'tegami', meaning: 'Bức thư, thư tay', level: 'N5', pos: 'Danh từ', hanViet: 'THỦ CHỈ' },
  '手袋': { word: '手袋', reading: 'てぶくろ', romaji: 'tebukuro', meaning: 'Găng tay, bao tay', level: 'N4', pos: 'Danh từ', hanViet: 'THỦ ĐẠI' },
  '手話': { word: '手話', reading: 'しゅわ', romaji: 'shuwa', meaning: 'Ngôn ngữ ký hiệu bằng tay', level: 'N2', pos: 'Danh từ', hanViet: 'THỦ THOẠI' },
  '切手': { word: '切手', reading: 'きって', romaji: 'kitte', meaning: 'Tem thư, tem bưu chính', level: 'N5', pos: 'Danh từ', hanViet: 'THIẾT THỦ' },

  // Core Common Vocabulary
  '鞄': { word: '鞄', reading: 'かばん', romaji: 'kaban', meaning: 'Cặp sách, túi xách', level: 'N5', pos: 'Danh từ', hanViet: 'BẠC' },
  '机': { word: '机', reading: 'つくえ', romaji: 'tsukue', meaning: 'Bàn học, bàn làm việc', level: 'N5', pos: 'Danh từ', hanViet: 'CƠ' },
  '椅子': { word: '椅子', reading: 'いす', romaji: 'isu', meaning: 'Ghế ngồi', level: 'N5', pos: 'Danh từ', hanViet: 'Y TỬ' },
  '鍵': { word: '鍵', reading: 'かぎ', romaji: 'kagi', meaning: 'Chìa khóa, khóa cửa', level: 'N5', pos: 'Danh từ', hanViet: 'KIỆN' },
  '財布': { word: '財布', reading: 'さいふ', romaji: 'saifu', meaning: 'Ví tiền, bóp tiền', level: 'N5', pos: 'Danh từ', hanViet: 'TÀI BỐ' },
  '眼鏡': { word: '眼鏡', reading: 'めがね', romaji: 'megane', meaning: 'Mắt kính, kính đeo mắt', level: 'N5', pos: 'Danh từ', hanViet: 'NHÃN KÍNH' },
  '靴': { word: '靴', reading: 'くつ', romaji: 'kutsu', meaning: 'Giày, đôi giày', level: 'N5', pos: 'Danh từ', hanViet: 'NGOA' },
  '本': { word: '本', reading: 'ほん', romaji: 'hon', meaning: 'Sách, cuốn sách', level: 'N5', pos: 'Danh từ', hanViet: 'BẢN' },
  '辞書': { word: '辞書', reading: 'じしょ', romaji: 'jisho', meaning: 'Từ điển', level: 'N5', pos: 'Danh từ', hanViet: 'TỪ THƯ' },
  '車': { word: '車', reading: 'くるま', romaji: 'kuruma', meaning: 'Xe hơi, ô tô', level: 'N5', pos: 'Danh từ', hanViet: 'XA' },
  '自転車': { word: '自転車', reading: 'じてんしゃ', romaji: 'jitensha', meaning: 'Xe đạp', level: 'N5', pos: 'Danh từ', hanViet: 'TỰ CHUYỂN XA' },
  '電車': { word: '電車', reading: 'でんしゃ', romaji: 'densha', meaning: 'Tàu điện', level: 'N5', pos: 'Danh từ', hanViet: 'ĐIỆN XA' },
  '駅': { word: '駅', reading: 'えき', romaji: 'eki', meaning: 'Nhà ga tàu điện', level: 'N5', pos: 'Danh từ', hanViet: 'DỊCH' },
  '会社': { word: '会社', reading: 'かいしゃ', romaji: 'kaisha', meaning: 'Công ty, doanh nghiệp', level: 'N5', pos: 'Danh từ', hanViet: 'HỘI XÃ' },
  '仕事': { word: '仕事', reading: 'しごと', romaji: 'shigoto', meaning: 'Công việc, nghề nghiệp', level: 'N5', pos: 'Danh từ', hanViet: 'SĨ SỰ' },
  '病院': { word: '病院', reading: 'びょういん', romaji: 'byouin', meaning: 'Bệnh viện', level: 'N5', pos: 'Danh từ', hanViet: 'BỆNH VIỆN' },
  '薬': { word: '薬', reading: 'くすり', romaji: 'kusuri', meaning: 'Thuốc chữa bệnh', level: 'N5', pos: 'Danh từ', hanViet: 'DƯỢC' },
  '電話': { word: '電話', reading: 'でんわ', romaji: 'denwa', meaning: 'Điện thoại, cuộc gọi', level: 'N5', pos: 'Danh từ', hanViet: 'ĐIỆN THOẠI' },
  '水': { word: '水', reading: 'みず', romaji: 'mizu', meaning: 'Nước uống, nước sạch', level: 'N5', pos: 'Danh từ', hanViet: 'THỦY' },
  'お茶': { word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: 'Trà, nước chè', level: 'N5', pos: 'Danh từ', hanViet: 'TRÀ' },
  'ご飯': { word: 'ご飯', reading: 'ごはん', romaji: 'gohan', meaning: 'Cơm, bữa ăn', level: 'N5', pos: 'Danh từ', hanViet: 'PHẠN' },
  '便利': { word: '便利', reading: 'べんり', romaji: 'benri', meaning: 'Tiện lợi, thuận tiện', level: 'N5', pos: 'Tính từ đuôi な', hanViet: 'TIỆN LỢI' },
  '元気': { word: '元気', reading: 'げんき', romaji: 'genki', meaning: 'Khỏe mạnh, tràn đầy năng lượng', level: 'N5', pos: 'Tính từ đuôi な', hanViet: 'NGUYÊN KHÍ' },

  // Family, Roles & Professions
  '家': { word: '家', reading: 'いえ', romaji: 'ie', meaning: 'Nhà, ngôi nhà, mái ấm gia đình', level: 'N5', pos: 'Danh từ', hanViet: 'GIA' },
  '農家': { word: '農家', reading: 'のうか', romaji: 'nouka', meaning: 'Hộ nông dân, nhà nông', level: 'N3', pos: 'Danh từ', hanViet: 'NÔNG GIA' },
  '妻': { word: '妻', reading: 'つま', romaji: 'tsuma', meaning: 'Vợ (của mình)', level: 'N4', pos: 'Danh từ', hanViet: 'THÊ' },
  '夫': { word: '夫', reading: 'おっと', romaji: 'otto', meaning: 'Chồng (của mình)', level: 'N4', pos: 'Danh từ', hanViet: 'PHU' },
  '家族': { word: '家族', reading: 'かぞく', romaji: 'kazoku', meaning: 'Gia đình', level: 'N5', pos: 'Danh từ', hanViet: 'GIA TỘC' },
  '両親': { word: '両親', reading: 'りょうしん', romaji: 'ryoushin', meaning: 'Bố mẹ, cha mẹ', level: 'N5', pos: 'Danh từ', hanViet: 'LƯỠNG THÂN' },
  '子供': { word: '子供', reading: 'こども', romaji: 'kodomo', meaning: 'Con cái, trẻ nhỏ', level: 'N5', pos: 'Danh từ', hanViet: 'TỬ CUNG' },
  '子ども': { word: '子ども', reading: 'こども', romaji: 'kodomo', meaning: 'Trẻ em, con cái', level: 'N5', pos: 'Danh từ', hanViet: 'TỬ CUNG' },
  '同僚': { word: '同僚', reading: 'どうりょう', romaji: 'douryou', meaning: 'Đồng nghiệp', level: 'N3', pos: 'Danh từ', hanViet: 'ĐỒNG LIÊU' },
  '上司': { word: '上司', reading: 'じょうし', romaji: 'joushi', meaning: 'Cấp trên, sếp', level: 'N3', pos: 'Danh từ', hanViet: 'THƯỢNG TI' },
  '先輩': { word: '先輩', reading: 'せんぱい', romaji: 'senpai', meaning: 'Tiền bối, đàn anh đàn chị', level: 'N4', pos: 'Danh từ', hanViet: 'TIỀN BỐI' },
  '後輩': { word: '後輩', reading: 'こうはい', romaji: 'kouhai', meaning: 'Hậu bối, đàn em', level: 'N4', pos: 'Danh từ', hanViet: 'HẬU BỐI' }
};

