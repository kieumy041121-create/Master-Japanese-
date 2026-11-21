import React, { useState, useEffect, useRef } from 'react';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import {
  Headphones,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Radio,
  X,
  Gauge,
  ListMusic,
} from 'lucide-react';

interface PodcastTrack {
  id: string;
  japanese: string;
  reading: string;
  vietnamese: string;
  category: string;
  level: 'N1' | 'N2' | 'N3';
}

const PODCAST_PLAYLISTS: Record<string, { title: string; tracks: PodcastTrack[] }> = {
  news: {
    title: 'Thời Sự Báo Chí & Kinh Tế',
    tracks: [
      {
        id: 'pod_news_1',
        japanese: '半導体大手の投資が加速し、熊本を中心にサプライチェーンの再構築が進んでいる。',
        reading: 'はんどうたいおおてのとうしがかそくし、くまもとをちゅうしんにサプライチェーンのさいこうちくがすすんでいる。',
        vietnamese: 'Làn sóng đầu tư của các ông lớn bán dẫn đang tăng tốc, việc tái thiết chuỗi cung ứng quanh trọng tâm Kumamoto đang tiến triển.',
        category: 'Công nghệ & Bán dẫn',
        level: 'N1',
      },
      {
        id: 'pod_news_2',
        japanese: '日銀の金融政策決定会合において、追加利上げの是非を巡る議論が白熱している。',
        reading: 'にちぎんのきんゆうせいさくけっていかいごうにおいて、ついかりあげのぜひをめぐるぎろんがはくねつしている。',
        vietnamese: 'Tại cuộc họp quyết định chính sách tiền tệ của Ngân hàng Trung ương Nhật Bản (BOJ), các cuộc tranh luận về tính đúng sai của việc tiếp tục tăng lãi suất đang diễn ra vô cùng sôi nổi.',
        category: 'Kinh tế & Nikkei',
        level: 'N1',
      },
      {
        id: 'pod_news_3',
        japanese: '特定技能２号の対象分野拡大に伴い、長期滞在を見据えた外国人材の支援策が急務となっている。',
        reading: 'とくていぎのうにごうのたいしょうぶんやかくだいにともない、ちょうきたいざいをみすえたがいこくじんざいのしえんさくがきゅうむとなっている。',
        vietnamese: 'Cùng với việc mở rộng các lĩnh vực thuộc diện Visa Kỹ năng đặc định số 2, các chính sách hỗ trợ nhân lực người nước ngoài hướng tới cư trú dài hạn đang trở thành nhiệm vụ cấp bách.',
        category: 'Visa & Chính sách',
        level: 'N2',
      },
    ],
  },
  keigo: {
    title: 'Keigo Công Sở Sinh Tồn',
    tracks: [
      {
        id: 'pod_keigo_1',
        japanese: '大変恐縮ではございますが、本件について今週中にお返事を頂戴できれば幸いに存じます。',
        reading: 'たいへんきょうしゅくではございますが、ほんけんについてこんしゅうちゅうにおへんじをちょうだいできればさいわいにぞんじます。',
        vietnamese: 'Dù vô cùng áy náy khi làm phiền, chúng tôi rất lấy làm vinh hạnh nếu có thể nhận được hồi âm của quý ngài trong tuần này.',
        category: 'Kushon Kotoba',
        level: 'N2',
      },
      {
        id: 'pod_keigo_2',
        japanese: '滅相もございません。私どもの力不足でお手数をおかけし、深くお詫び申し上げます。',
        reading: 'めっそうもございません。わたくしどものちからぶそくでおてすうをおかけし、ふかくおわびもうしあげます。',
        vietnamese: 'Đâu dám nhận lời khen ngợi ấy ạ. Do năng lực chúng tôi còn non kém đã làm phiền quý vị, chúng tôi xin thành thật xin lỗi.',
        category: 'Khiêm nhường phản xạ',
        level: 'N1',
      },
      {
        id: 'pod_keigo_3',
        japanese: 'お取り込み中誠に恐れ入りますが、５分ほどお時間を拝借してもよろしいでしょうか。',
        reading: 'おとりこみちゅうまことに恐れ入りますが、ごふんほどおじかんをはいしゃくしてもよろしいでしょうか。',
        vietnamese: 'Rất xin lỗi vì làm phiền lúc anh/chị đang bận rộn, nhưng em có thể xin phép mượn khoảng 5 phút được không ạ?',
        category: 'Xin phép cấp trên',
        level: 'N2',
      },
    ],
  },
  idioms: {
    title: 'Yojijukugo & Quán Dụng Ngữ',
    tracks: [
      {
        id: 'pod_idiom_1',
        japanese: '一期一会。生涯に一度きりの出会いと考え、真心を尽くしてもてなす。',
        reading: 'いちごいちえ。しょうがいにいちどきりのであいとかんがえ、まごころをつくしてもてなす。',
        vietnamese: 'Nhất kỳ nhất hội. Hãy xem mỗi cuộc tao ngộ trong đời đều chỉ có một lần duy nhất để đối đãi bằng cả tấm lòng chân thành.',
        category: 'Trà đạo & Thiền',
        level: 'N2',
      },
      {
        id: 'pod_idiom_2',
        japanese: '雨降って地固まる。苦難を乗り越えた後には、かえって絆や基盤が強固になる。',
        reading: 'あめふってじかたまる。くなんをのりこえたあとには、かえってきずなやきばんがきょうこになる。',
        vietnamese: 'Mưa tan thì đất rắn chắc lại. Sau khi cùng nhau vượt qua giông bão, nền tảng và sự gắn kết càng trở nên bền chặt hơn.',
        category: 'Kotowaza',
        level: 'N2',
      },
      {
        id: 'pod_idiom_3',
        japanese: '臥薪嘗胆。将来の成功や雪辱を期して、長期にわたる苦難を耐え忍ぶ。',
        reading: 'がしんしょうたん。しょうらいのせいこうやせつじょくをきして、ちょうきにわたるくなんをたえしのぶ。',
        vietnamese: 'Nằm gai nếm mật. Chịu đựng mọi gian khổ thử thách trong thời gian dài để hướng tới thành công và ngày phục thù trong tương lai.',
        category: 'Yojijukugo',
        level: 'N1',
      },
    ],
  },
};

export const FloatingPodcastBar: React.FC = () => {
  const [selectedPlaylistKey, setSelectedPlaylistKey] = useState<string>('news');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [includeVietnameseVoice, setIncludeVietnameseVoice] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const playlist = PODCAST_PLAYLISTS[selectedPlaylistKey] || PODCAST_PLAYLISTS.news;
  const currentTrack = playlist.tracks[currentTrackIndex] || playlist.tracks[0];

  // Sync bookmark state
  useEffect(() => {
    if (currentTrack) {
      setIsBookmarked(srsVaultService.isBookmarked(currentTrack.japanese));
    }
  }, [currentTrack]);

  const handleToggleBookmark = () => {
    if (!currentTrack) return;
    const nowBookmarked = srsVaultService.toggleBookmark({
      japanese: currentTrack.japanese,
      reading: currentTrack.reading,
      vietnamese: currentTrack.vietnamese,
      level: currentTrack.level,
      type: 'phrase',
      source: `Podcast: ${playlist.title}`,
      contextSentence: currentTrack.japanese,
      contextTranslation: currentTrack.vietnamese,
    });
    setIsBookmarked(nowBookmarked);
    speechService.playSuccessSound();
  };

  // Play current track logic
  const playTrack = (track: PodcastTrack) => {
    setIsPlaying(true);
    speechService.speak(track.japanese, speechRate);

    // If Vietnamese voice is enabled, wait 3.5s and then speak Vietnamese, then auto-advance
    if (includeVietnameseVoice) {
      setTimeout(() => {
        speechService.speak(track.vietnamese, 1.0);
        setTimeout(() => {
          if (isLooping) {
            handleNextTrack();
          }
        }, 3500);
      }, 4000);
    } else {
      setTimeout(() => {
        if (isLooping) {
          handleNextTrack();
        }
      }, 5000);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      playTrack(currentTrack);
    }
  };

  const handleNextTrack = () => {
    speechService.stop();
    const nextIdx = (currentTrackIndex + 1) % playlist.tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      playTrack(playlist.tracks[nextIdx]);
    }
  };

  const handlePrevTrack = () => {
    speechService.stop();
    const prevIdx = (currentTrackIndex - 1 + playlist.tracks.length) % playlist.tracks.length;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      playTrack(playlist.tracks[prevIdx]);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 transition-all">
      {isMinimized ? (
        /* MINIMIZED SLEEK FLOATING PILL */
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/50 shadow-2xl hover:border-indigo-400 text-xs text-white cursor-pointer group"
          title="Mở Máy Nghe Thụ Động Podcast"
        >
          <div className="relative">
            <Headphones className={`w-4 h-4 text-cyan-400 ${isPlaying ? 'animate-bounce' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <span className="font-bold font-mono">Podcast Mode</span>
          <span className="text-[10px] text-slate-400 max-w-[120px] truncate font-jp">
            {currentTrack.japanese.slice(0, 15)}...
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-indigo-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        /* EXPANDED FLOATING PLAYER DOCK */
        <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-700/60 rounded-3xl p-4 w-[340px] sm:w-[420px] shadow-2xl space-y-3 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Máy Nghe Thụ Động (Podcast)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Thu nhỏ"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Playlist selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {Object.entries(PODCAST_PLAYLISTS).map(([key, pl]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedPlaylistKey(key);
                  setCurrentTrackIndex(0);
                  speechService.stop();
                  setIsPlaying(false);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedPlaylistKey === key
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {pl.title}
              </button>
            ))}
          </div>

          {/* Current Track Info */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                {currentTrack.category} · {currentTrack.level}
              </span>
              <span className="font-mono">
                {currentTrackIndex + 1} / {playlist.tracks.length}
              </span>
            </div>
            <p className="text-sm font-jp font-bold text-white line-clamp-2 leading-relaxed">
              {currentTrack.japanese}
            </p>
            <p className="text-xs text-emerald-300/90 font-sans line-clamp-2">
              👉 {currentTrack.vietnamese}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevTrack}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Bài trước"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={handleTogglePlay}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white cursor-pointer shadow-lg shadow-indigo-900/40"
                title={isPlaying ? 'Tạm dừng' : 'Phát'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={handleNextTrack}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Bài tiếp"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Speed & Options */}
            <div className="flex items-center gap-1.5">
              {/* Speed toggle */}
              <button
                onClick={() => {
                  const rates = [0.8, 1.0, 1.25];
                  const nextRate = rates[(rates.indexOf(speechRate) + 1) % rates.length];
                  setSpeechRate(nextRate);
                }}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
                title="Đổi tốc độ phát"
              >
                {speechRate}x
              </button>

              {/* Bilingual toggle */}
              <button
                onClick={() => setIncludeVietnameseVoice(!includeVietnameseVoice)}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                  includeVietnameseVoice
                    ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
                title="Bật/Tắt đọc dịch nghĩa tiếng Việt kèm theo"
              >
                <Radio className="w-3.5 h-3.5" />
              </button>

              {/* Bookmark 1-Touch */}
              <button
                onClick={handleToggleBookmark}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  isBookmarked
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={isBookmarked ? 'Đã lưu vào Sổ tay SRS' : 'Lưu vào Sổ tay SRS 1-chạm'}
              >
                {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
