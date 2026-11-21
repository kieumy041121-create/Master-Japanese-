import React, { useState, useEffect, Suspense } from 'react';
import { JLPTLevel, DivisionId } from './types';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LabLoadingSkeleton } from './components/common/LabLoadingSkeleton';
import { AppHeader } from './components/navigation/AppHeader';
import { SubmoduleToolbar } from './components/navigation/SubmoduleToolbar';
import { QuickJumpModal } from './components/navigation/QuickJumpModal';
import { UserGuideModal } from './components/navigation/UserGuideModal';
import { AiSenseiModal } from './components/aiSensei/AiSenseiModal';
import { AiSenseiFloatingButton } from './components/aiSensei/AiSenseiFloatingButton';
import { ModernDashboard } from './components/dashboard/ModernDashboard';
import { SrsFlashcardVaultModal } from './components/srs/SrsFlashcardVaultModal';
import { JlptOfficialSimulatorModal } from './components/jlpt/JlptOfficialSimulatorModal';
import { WowWeaponsHubModal, WowWeaponId } from './components/wow/WowWeaponsHubModal';
import { FloatingPodcastBar } from './components/common/FloatingPodcastBar';
import { ALL_CURRICULUM_MODULES } from './data/curriculumStructure';
import { VocabMaster } from './components/division1/VocabMaster';
import { KanjiStudio } from './components/division1/KanjiStudio';
import { KanjiUniverseMacroModule } from './components/kanjiUniverse/KanjiUniverseMacroModule';
import { DailyNikkiWorkspace } from './components/daily/DailyNikkiWorkspace';
import { OmniverseSanctuaryHub, OmniverseInitialView } from './components/omniverse/OmniverseSanctuaryHub';
import { srsVaultService } from './services/srsVaultService';
import { SlangRadar } from './components/division1/SlangRadar';
import { ContextGenerator } from './components/division1/ContextGenerator';
import { ContextualAudioLens } from './components/division1/ContextualAudioLens';
import { SinoVietnameseOnyomiLab } from './components/division1/SinoVietnameseOnyomiLab';
import { KanjiFamilyTreeLab } from './components/division1/KanjiFamilyTreeLab';
import { SynonymNuanceLab } from './components/division1/SynonymNuanceLab';
import { AntonymJukugoLab } from './components/division1/AntonymJukugoLab';
import { PastPapers } from './components/division2/PastPapers';
import { AiExamGenerator } from './components/division2/AiExamGenerator';
import { JapanTruthRoadmap } from './components/division2/JapanTruthRoadmap';
import { DeepReading } from './components/division2/DeepReading';
import { NewsBrowser } from './components/division2/NewsBrowser';
import { PracticalReading } from './components/division2/PracticalReading';
import { TranslationChallenge } from './components/division2/TranslationChallenge';
import { ReadingTrapDeconstructLab } from './components/division2/ReadingTrapDeconstructLab';
import { SpeedReadingSkimmingLab } from './components/division2/SpeedReadingSkimmingLab';
import { OfficialDocumentReaderLab } from './components/division2/OfficialDocumentReaderLab';
import { PitchShadowingLab } from './components/division3/PitchShadowingLab';
import { FieldAudioLibrary } from './components/division3/FieldAudioLibrary';
import { DictationChallenge } from './components/division3/DictationChallenge';
import { SurvivalRoleplay } from './components/division3/SurvivalRoleplay';
import { DebateArena } from './components/division3/DebateArena';
import { PhoneticReductionLab } from './components/division3/PhoneticReductionLab';
import { AizuchiReflexLab } from './components/division3/AizuchiReflexLab';
import { JlptChokkaiSokkaiLab } from './components/division3/JlptChokkaiSokkaiLab';
import { IntonationNuanceLab } from './components/division3/IntonationNuanceLab';
import { EmergencyDialogueSimulator } from './components/division3/EmergencyDialogueSimulator';
import { CabinInterpretingStudio } from './components/cabin/CabinInterpretingStudio';
import { SenpaiKouhaiForum } from './components/division4/SenpaiKouhaiForum';
import { KeigoEmailAssistant } from './components/division4/KeigoEmailAssistant';
import { HorensoSimulator } from './components/division4/HorensoSimulator';
import { ProjectLogisticsCrisis } from './components/division4/ProjectLogisticsCrisis';
import { SdgsCsrPlanner } from './components/division4/SdgsCsrPlanner';
import { KushonNegotiation } from './components/division4/KushonNegotiation';
import { VirtualWorkspaceSim } from './components/division4/VirtualWorkspaceSim';
import { CorporateCrisisGuide } from './components/division4/CorporateCrisisGuide';
import { MeishiExchangeMasteryLab } from './components/division4/MeishiExchangeMasteryLab';
import { NomikaiEtiquetteLab } from './components/division4/NomikaiEtiquetteLab';
import { RingishoNemawashiLab } from './components/division4/RingishoNemawashiLab';
import { Kaizen5SHiyariLab } from './components/division4/Kaizen5SHiyariLab';
import { NichietuWorkplaceBridgeLab } from './components/division4/NichietuWorkplaceBridgeLab';
import { YojijukugoLab } from './components/division5/YojijukugoLab';
import { ConfusingGrammarLab } from './components/division5/ConfusingGrammarLab';
import { OnomatopoeiaMaster } from './components/division5/OnomatopoeiaMaster';
import { DokkaiSpeedScanner } from './components/division5/DokkaiSpeedScanner';
import { JobInterviewSimulator } from './components/division5/JobInterviewSimulator';
import { RareKanjiVariantLab } from './components/division5/RareKanjiVariantLab';
import { ClassicalBungoGrammarLab } from './components/division5/ClassicalBungoGrammarLab';
import { NuanceParticleMatrixLab } from './components/division5/NuanceParticleMatrixLab';
import { NaturalCollocationRefactorLab } from './components/division5/NaturalCollocationRefactorLab';
import { ListeningTrapDeconstructLab } from './components/division5/ListeningTrapDeconstructLab';
import { KanjiHomophoneLab } from './components/division1/KanjiHomophoneLab';
import { PrefixSuffixMatrixLab } from './components/division1/PrefixSuffixMatrixLab';
import { ReversibleKanjiLab } from './components/division1/ReversibleKanjiLab';
import { AuthorStanceLab } from './components/division2/AuthorStanceLab';
import { MultimodalReadingLab } from './components/division2/MultimodalReadingLab';
import { TameguchiReflexLab } from './components/division3/TameguchiReflexLab';
import { CustomerClaimRecoveryLab } from './components/division3/CustomerClaimRecoveryLab';
import { ConferenceNoteTakingLab } from './components/division3/ConferenceNoteTakingLab';
import { InvertedSyntaxLab } from './components/division5/InvertedSyntaxLab';
import { MacroEditorialLexiconLab } from './components/division5/MacroEditorialLexiconLab';
import { RadicalEncyclopedia } from './components/division1/RadicalEncyclopedia';
import { TatemaeHonneDecoder } from './components/cultural/TatemaeHonneDecoder';
import { KisetsukanMatsuriLab } from './components/cultural/KisetsukanMatsuriLab';
import { WashokuMannersMaster } from './components/cultural/WashokuMannersMaster';
import { MeiwakuOmoiyariLab } from './components/cultural/MeiwakuOmoiyariLab';
import { ZoutouOmotenashiGuide } from './components/cultural/ZoutouOmotenashiGuide';
import { UchiSotoDecoder } from './components/cultural/UchiSotoDecoder';
import { BushidoGamanLab } from './components/cultural/BushidoGamanLab';
import { OnsenSentoEtiquette } from './components/cultural/OnsenSentoEtiquette';
import { OtakuSubcultureHub } from './components/cultural/OtakuSubcultureHub';
import { EngimonoYokaiGuide } from './components/cultural/EngimonoYokaiGuide';
import { GeographyHistoryLab } from './components/cultural/GeographyHistoryLab';
import { JapanVietnamBusinessLab } from './components/cultural/JapanVietnamBusinessLab';
import { ArtsLinguisticsMaster } from './components/cultural/ArtsLinguisticsMaster';
import { EconomySportsHub } from './components/cultural/EconomySportsHub';
import { SocietyTraditionsGuide } from './components/cultural/SocietyTraditionsGuide';
import { ShodoKanjiPhilosophyLab } from './components/cultural/ShodoKanjiPhilosophyLab';
import { KeigoMatrix5Lab } from './components/cultural/KeigoMatrix5Lab';
import { KojiSeigoMasteryLab } from './components/cultural/KojiSeigoMasteryLab';
import { KanseiKotobaHub } from './components/cultural/KanseiKotobaHub';
import { DouonIgigoMaster } from './components/cultural/DouonIgigoMaster';
import { SadouZenPhilosophyLab } from './components/cultural/SadouZenPhilosophyLab';
import { NohKabukiTheatricalLab } from './components/cultural/NohKabukiTheatricalLab';
import { AmaePsychologyLab } from './components/cultural/AmaePsychologyLab';
import { DouchouPressureLab } from './components/cultural/DouchouPressureLab';
import { WakaHyakuninIsshuLab } from './components/cultural/WakaHyakuninIsshuLab';
import { KankonsousaiRitualsLab } from './components/cultural/KankonsousaiRitualsLab';
import { ShintoKotodamaLab } from './components/cultural/ShintoKotodamaLab';
import { MonozukuriKintsugiLab } from './components/cultural/MonozukuriKintsugiLab';
import { KaigoMindfulnessLab } from './components/cultural/KaigoMindfulnessLab';
import { ShimaguniSaigaiLab } from './components/cultural/ShimaguniSaigaiLab';
import { DajareWordplayLab } from './components/edutainment/DajareWordplayLab';
import { AnimeLingoDecoder } from './components/edutainment/AnimeLingoDecoder';
import { NazonazoRiddleMaster } from './components/edutainment/NazonazoRiddleMaster';
import { GenZSlangHub } from './components/edutainment/GenZSlangHub';
import { RomComDramaLab } from './components/edutainment/RomComDramaLab';
import { ShiritoriWordChainLab } from './components/edutainment/ShiritoriWordChainLab';
import { JPopLyricalPoetryLab } from './components/edutainment/JPopLyricalPoetryLab';
import { KaraokeCultureLab } from './components/edutainment/KaraokeCultureLab';
import { GamingEsportsLingoLab } from './components/edutainment/GamingEsportsLingoLab';
import { HissatsuwazaBattleLab } from './components/edutainment/HissatsuwazaBattleLab';
import { JapanEncyclopediaHub } from './components/encyclopedia/JapanEncyclopediaHub';
import { ThematicVocabMaster } from './components/thematicVocab/ThematicVocabMaster';
import { BjtMasteryLab } from './components/bjt/BjtMasteryLab';
import { JapaneseIdiomIllustratedHub } from './components/idioms/JapaneseIdiomIllustratedHub';
import { speechService } from './services/speechService';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<JLPTLevel>('N1');
  const [activeDivision, setActiveDivision] = useState<DivisionId>('vocab_kanji');
  const [activeSubModule, setActiveSubModule] = useState<number>(1);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isAiSenseiOpen, setIsAiSenseiOpen] = useState<boolean>(false);
  const [isSrsVaultOpen, setIsSrsVaultOpen] = useState<boolean>(false);
  const [isJlptSimulatorOpen, setIsJlptSimulatorOpen] = useState<boolean>(false);
  const [isWowHubOpen, setIsWowHubOpen] = useState<boolean>(false);
  const [wowInitialWeapon, setWowInitialWeapon] = useState<WowWeaponId>('ar_vision');
  const [isKanjiUniverseOpen, setIsKanjiUniverseOpen] = useState<boolean>(false);
  const [isDailyNikkiOpen, setIsDailyNikkiOpen] = useState<boolean>(false);
  const [isOmniverseOpen, setIsOmniverseOpen] = useState<boolean>(false);
  const [omniverseInitialView, setOmniverseInitialView] = useState<OmniverseInitialView>('hub');
  const [srsDueCount, setSrsDueCount] = useState<number>(() => srsVaultService.getDueCards().length);
  const [kanjiUniverseChar, setKanjiUniverseChar] = useState<string>('海');
  const [isDashboard, setIsDashboard] = useState<boolean>(true);
  const [aiSenseiQuery, setAiSenseiQuery] = useState<string | undefined>(undefined);
  const [aiSenseiInitialTab, setAiSenseiInitialTab] = useState<
    | 'chat'
    | 'vocab_assistant'
    | 'drill_arena'
    | 'exam_vault'
    | 'culture'
    | 'lectures'
    | 'clinic'
    | 'voice_roleplay'
    | 'smart_reader'
    | 'b2b_email'
    | 'adaptive_jlpt'
    | 'kanji_mnemonic'
    | 'pitch_coach'
    | 'translation_lab'
    | 'context_collocation'
    | undefined
  >(undefined);

  // Fast Mode (Siêu Tốc - 120fps, phản xạ tức thì <5ms, không giật lag)
  const [isFastMode, setIsFastMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kotoba_fast_mode') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleFastMode = () => {
    setIsFastMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('kotoba_fast_mode', next ? 'true' : 'false');
      } catch {}
      if (next) {
        document.documentElement.classList.add('fast-mode');
        speechService.playSuccessSound();
      } else {
        document.documentElement.classList.remove('fast-mode');
      }
      return next;
    });
  };

  useEffect(() => {
    if (isFastMode) {
      document.documentElement.classList.add('fast-mode');
    } else {
      document.documentElement.classList.remove('fast-mode');
    }
  }, [isFastMode]);

  // Global keyboard shortcuts (Ctrl+K or / for QuickJump, Ctrl+J for AI Sensei, Alt+H for Dashboard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key.toLowerCase() === 'k') ||
        (e.metaKey && e.key.toLowerCase() === 'k') ||
        (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName))
      ) {
        e.preventDefault();
        setIsQuickJumpOpen(true);
      } else if (
        (e.ctrlKey && e.key.toLowerCase() === 'j') ||
        (e.metaKey && e.key.toLowerCase() === 'j')
      ) {
        e.preventDefault();
        setIsAiSenseiOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsDashboard((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsSrsVaultOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsJlptSimulatorOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsDailyNikkiOpen(false);
        setIsOmniverseOpen(false);
        setIsKanjiUniverseOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsKanjiUniverseOpen(false);
        setIsOmniverseOpen(false);
        setIsDailyNikkiOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setIsKanjiUniverseOpen(false);
        setIsDailyNikkiOpen(false);
        setIsOmniverseOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch division handler
  const handleSwitchDivision = (divId: DivisionId) => {
    setIsDashboard(false);
    setActiveDivision(divId);
    const firstMod = ALL_CURRICULUM_MODULES.find((m) => m.divisionId === divId);
    if (firstMod) {
      setActiveSubModule(firstMod.id);
    }
  };

  const handleSelectModule = (divisionId: DivisionId, moduleId: number) => {
    setIsDashboard(false);
    setActiveDivision(divisionId);
    setActiveSubModule(moduleId);
  };

  const handleOpenAiSenseiWithQuery = (
    query?: string,
    initialTab:
      | 'chat'
      | 'vocab_assistant'
      | 'drill_arena'
      | 'exam_vault'
      | 'culture'
      | 'lectures'
      | 'clinic'
      | 'voice_roleplay'
      | 'smart_reader'
      | 'b2b_email'
      | 'adaptive_jlpt'
      | 'kanji_mnemonic'
      | 'pitch_coach'
      | 'translation_lab'
      | 'context_collocation' = 'chat'
  ) => {
    setAiSenseiQuery(query);
    setAiSenseiInitialTab(initialTab);
    setIsAiSenseiOpen(true);
  };

  const handleOpenKanjiUniverse = (char?: string) => {
    if (char) setKanjiUniverseChar(char);
    setIsDailyNikkiOpen(false);
    setIsOmniverseOpen(false);
    setIsKanjiUniverseOpen(true);
  };

  const handleOpenDailyNikki = () => {
    setIsKanjiUniverseOpen(false);
    setIsOmniverseOpen(false);
    setIsDailyNikkiOpen(true);
  };

  const handleOpenOmniverse = (view: OmniverseInitialView = 'hub') => {
    setOmniverseInitialView(view);
    setIsKanjiUniverseOpen(false);
    setIsDailyNikkiOpen(false);
    setSrsDueCount(srsVaultService.getDueCards().length);
    setIsOmniverseOpen(true);
  };

  if (isKanjiUniverseOpen) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-clip">
        <KanjiUniverseMacroModule
          initialKanji={kanjiUniverseChar}
          onExit={() => setIsKanjiUniverseOpen(false)}
          onOpenFullSrsModal={() => setIsSrsVaultOpen(true)}
        />
        <SrsFlashcardVaultModal
          isOpen={isSrsVaultOpen}
          onClose={() => setIsSrsVaultOpen(false)}
        />
      </div>
    );
  }

  if (isDailyNikkiOpen) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-clip">
        <DailyNikkiWorkspace
          onExit={() => setIsDailyNikkiOpen(false)}
          onOpenSrsVault={() => setIsSrsVaultOpen(true)}
        />
        <SrsFlashcardVaultModal
          isOpen={isSrsVaultOpen}
          onClose={() => setIsSrsVaultOpen(false)}
        />
      </div>
    );
  }

  if (isOmniverseOpen) {
    return (
      <div className="min-h-screen bg-[#0d1016] text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 overflow-x-clip">
        <OmniverseSanctuaryHub
          initialView={omniverseInitialView}
          srsDueCount={srsDueCount}
          onOpenSrsVault={() => setIsSrsVaultOpen(true)}
          onSrsUpdated={() => setSrsDueCount(srsVaultService.getDueCards().length)}
          onClose={() => setIsOmniverseOpen(false)}
        />
        <SrsFlashcardVaultModal
          isOpen={isSrsVaultOpen}
          onClose={() => {
            setIsSrsVaultOpen(false);
            setSrsDueCount(srsVaultService.getDueCards().length);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-clip">
      {/* Universal Clean Header Navigation */}
      <AppHeader
        activeDivision={activeDivision}
        onSwitchDivision={handleSwitchDivision}
        currentLevel={currentLevel}
        onSetLevel={setCurrentLevel}
        onOpenQuickJump={() => setIsQuickJumpOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAiSensei={() => {
          setAiSenseiQuery(undefined);
          setAiSenseiInitialTab(undefined);
          setIsAiSenseiOpen(true);
        }}
        onOpenSrsVault={() => setIsSrsVaultOpen(true)}
        onOpenJlptSimulator={() => setIsJlptSimulatorOpen(true)}
        onOpenWowHub={() => {
          setWowInitialWeapon('ar_vision');
          setIsWowHubOpen(true);
        }}
        onOpenKanjiUniverse={() => handleOpenKanjiUniverse()}
        onOpenDailyNikki={handleOpenDailyNikki}
        onOpenOmniverse={() => handleOpenOmniverse('hub')}
        isDashboard={isDashboard}
        isKanjiUniverseActive={isKanjiUniverseOpen}
        isDailyNikkiActive={isDailyNikkiOpen}
        isOmniverseActive={isOmniverseOpen}
        onToggleDashboard={() => setIsDashboard((prev) => !prev)}
        isFastMode={isFastMode}
        onToggleFastMode={handleToggleFastMode}
      />

      {/* Submodule Toolbar: Category Filters, Linear Pagination & Module Tabs */}
      {!isDashboard && (
        <SubmoduleToolbar
          activeDivision={activeDivision}
          activeSubModule={activeSubModule}
          onSelectSubModule={setActiveSubModule}
          onOpenQuickJump={() => setIsQuickJumpOpen(true)}
          currentLevel={currentLevel}
          onBackToDashboard={() => setIsDashboard(true)}
        />
      )}

      {/* Quick Jump Search Modal (Ctrl+K or /) */}
      <QuickJumpModal
        isOpen={isQuickJumpOpen}
        onClose={() => setIsQuickJumpOpen(false)}
        onSelectModule={handleSelectModule}
        activeModuleId={activeSubModule}
      />

      {/* Full User Guide & Navigation Tour Modal */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateToModule={handleSelectModule}
      />

      {/* AI Sensei - Senior University Professor Academic Modal */}
      <AiSenseiModal
        isOpen={isAiSenseiOpen}
        onClose={() => {
          setIsAiSenseiOpen(false);
          setAiSenseiQuery(undefined);
          setAiSenseiInitialTab(undefined);
        }}
        currentLevel={currentLevel}
        onSetLevel={setCurrentLevel}
        initialQuery={aiSenseiQuery}
        initialTab={aiSenseiInitialTab}
        onClearInitialQuery={() => {
          setAiSenseiQuery(undefined);
          setAiSenseiInitialTab(undefined);
        }}
      />

      {/* Sổ Tay Trí Nhớ 3D & Anki Export Modal (SuperMemo SM-2) */}
      <SrsFlashcardVaultModal
        isOpen={isSrsVaultOpen}
        onClose={() => setIsSrsVaultOpen(false)}
      />

      {/* Thao Trường Thi Thật JLPT Chống Gian Lận (180 Scaled Score & Radar) */}
      <JlptOfficialSimulatorModal
        isOpen={isJlptSimulatorOpen}
        onClose={() => setIsJlptSimulatorOpen(false)}
        initialLevel={currentLevel}
      />

      {/* Trung Tâm 5 Siêu Vũ Khí Tương Lai (Future Lab Suite) */}
      <WowWeaponsHubModal
        isOpen={isWowHubOpen}
        onClose={() => setIsWowHubOpen(false)}
        initialWeapon={wowInitialWeapon}
      />

      {/* Floating AI Sensei Trigger (Available in all 101 Labs & Encyclopedia) */}
      <AiSenseiFloatingButton
        onClick={() => {
          setAiSenseiQuery(undefined);
          setAiSenseiInitialTab(undefined);
          setIsAiSenseiOpen(true);
        }}
      />

      {/* Máy Nghe Thụ Động Podcast Mode (Floating Audio Bar) */}
      <FloatingPodcastBar />

      {/* Main Workspace Canvas (No overflow, responsive padding) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {isDashboard ? (
          <ModernDashboard
            currentLevel={currentLevel}
            onSetLevel={setCurrentLevel}
            onSelectDivision={(divId, modId) => {
              handleSwitchDivision(divId);
              if (modId) setActiveSubModule(modId);
            }}
            onOpenAiSenseiWithQuery={handleOpenAiSenseiWithQuery}
            onOpenAiSenseiWithTab={(q, tab) => handleOpenAiSenseiWithQuery(q, tab)}
            onOpenQuickJump={() => setIsQuickJumpOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenSrsVault={() => setIsSrsVaultOpen(true)}
            onOpenJlptSimulator={() => setIsJlptSimulatorOpen(true)}
            onOpenWowHub={(weaponId) => {
              setWowInitialWeapon(weaponId || 'ar_vision');
              setIsWowHubOpen(true);
            }}
            onOpenKanjiUniverse={handleOpenKanjiUniverse}
            onOpenDailyNikki={handleOpenDailyNikki}
            onOpenOmniverse={handleOpenOmniverse}
            isFastMode={isFastMode}
            onToggleFastMode={handleToggleFastMode}
          />
        ) : (
          <ErrorBoundary onResetToDashboard={() => setIsDashboard(true)}>
            <Suspense fallback={<LabLoadingSkeleton label="Đang kích hoạt môi trường học chuyên sâu..." />}>
              {/* Render Active Sub-Module out of 102 curriculum modules */}
              {activeSubModule === 1 && <VocabMaster currentLevel={currentLevel} />}
        {activeSubModule === 2 && (
          <KanjiStudio
            currentLevel={currentLevel}
            onOpenAiSensei={(q, tab) => handleOpenAiSenseiWithQuery(q, tab || 'vocab_assistant')}
            onOpenKanjiUniverse={handleOpenKanjiUniverse}
          />
        )}
        {activeSubModule === 31 && <RadicalEncyclopedia onSelectKanjiForCanvas={() => setActiveSubModule(2)} />}
        {activeSubModule === 3 && <SlangRadar />}
        {activeSubModule === 4 && <ContextGenerator />}
        {activeSubModule === 5 && <ContextualAudioLens />}
        {activeSubModule === 82 && <SinoVietnameseOnyomiLab currentLevel={currentLevel} />}
        {activeSubModule === 83 && <KanjiFamilyTreeLab currentLevel={currentLevel} />}
        {activeSubModule === 84 && <SynonymNuanceLab currentLevel={currentLevel} />}
        {activeSubModule === 85 && <AntonymJukugoLab currentLevel={currentLevel} />}
        {activeSubModule === 103 && <KanjiHomophoneLab currentLevel={currentLevel} />}
        {activeSubModule === 104 && <PrefixSuffixMatrixLab currentLevel={currentLevel} />}
        {activeSubModule === 105 && <ReversibleKanjiLab currentLevel={currentLevel} />}
        {activeSubModule === 113 && <ThematicVocabMaster onBackToDashboard={() => setIsDashboard(true)} />}

        {activeSubModule === 6 && <PastPapers currentLevel={currentLevel} />}
        {activeSubModule === 7 && (
          <AiExamGenerator
            currentLevel={currentLevel}
            onOpenAiSensei={handleOpenAiSenseiWithQuery}
          />
        )}
        {activeSubModule === 8 && <JapanTruthRoadmap />}
        {activeSubModule === 9 && <DeepReading currentLevel={currentLevel} />}
        {activeSubModule === 10 && (
          <NewsBrowser onOpenAiSensei={handleOpenAiSenseiWithQuery} />
        )}
        {activeSubModule === 11 && (
          <PracticalReading onOpenAiSensei={handleOpenAiSenseiWithQuery} />
        )}
        {activeSubModule === 12 && <TranslationChallenge />}
        {activeSubModule === 86 && <ReadingTrapDeconstructLab currentLevel={currentLevel} />}
        {activeSubModule === 87 && <SpeedReadingSkimmingLab currentLevel={currentLevel} />}
        {activeSubModule === 88 && <OfficialDocumentReaderLab currentLevel={currentLevel} />}
        {activeSubModule === 106 && <AuthorStanceLab currentLevel={currentLevel} />}
        {activeSubModule === 107 && <MultimodalReadingLab currentLevel={currentLevel} />}

        {activeSubModule === 13 && <PitchShadowingLab />}
        {activeSubModule === 14 && <FieldAudioLibrary />}
        {activeSubModule === 15 && <DictationChallenge currentLevel={currentLevel} />}
        {activeSubModule === 16 && <SurvivalRoleplay />}
        {activeSubModule === 17 && <DebateArena />}
        {activeSubModule === 89 && <PhoneticReductionLab currentLevel={currentLevel} />}
        {activeSubModule === 90 && <AizuchiReflexLab currentLevel={currentLevel} />}
        {activeSubModule === 91 && <JlptChokkaiSokkaiLab currentLevel={currentLevel} />}
        {activeSubModule === 92 && <IntonationNuanceLab currentLevel={currentLevel} />}
        {activeSubModule === 93 && <EmergencyDialogueSimulator currentLevel={currentLevel} />}
        {activeSubModule === 102 && <CabinInterpretingStudio currentLevel={currentLevel} onOpenAiSensei={handleOpenAiSenseiWithQuery} />}
        {activeSubModule === 108 && <TameguchiReflexLab currentLevel={currentLevel} />}
        {activeSubModule === 109 && <CustomerClaimRecoveryLab currentLevel={currentLevel} />}
        {activeSubModule === 110 && <ConferenceNoteTakingLab currentLevel={currentLevel} />}

        {activeSubModule === 18 && <SenpaiKouhaiForum />}
        {activeSubModule === 19 && <KeigoEmailAssistant />}
        {activeSubModule === 20 && <HorensoSimulator />}
        {activeSubModule === 21 && <ProjectLogisticsCrisis />}
        {activeSubModule === 22 && <SdgsCsrPlanner />}
        {activeSubModule === 23 && <KushonNegotiation />}
        {activeSubModule === 24 && <VirtualWorkspaceSim />}
        {activeSubModule === 25 && <CorporateCrisisGuide />}
        {activeSubModule === 77 && <MeishiExchangeMasteryLab currentLevel={currentLevel} />}
        {activeSubModule === 78 && <NomikaiEtiquetteLab currentLevel={currentLevel} />}
        {activeSubModule === 79 && <RingishoNemawashiLab currentLevel={currentLevel} />}
        {activeSubModule === 80 && <Kaizen5SHiyariLab currentLevel={currentLevel} />}
        {activeSubModule === 81 && <NichietuWorkplaceBridgeLab currentLevel={currentLevel} />}
        {activeSubModule === 115 && (
          <BjtMasteryLab
            onBackToDashboard={() => setIsDashboard(true)}
            onOpenAiSenseiWithQuery={handleOpenAiSenseiWithQuery}
          />
        )}
        {activeSubModule === 116 && (
          <JapaneseIdiomIllustratedHub
            onBackToDashboard={() => setIsDashboard(true)}
            onOpenAiSenseiWithQuery={handleOpenAiSenseiWithQuery}
            currentLevel={currentLevel}
          />
        )}

        {/* 12 Phân hệ PH5 Đột phá Luyện thi JLPT Chuyên sâu (+5 Nạp thêm vô hạn) */}
        {activeSubModule === 26 && <YojijukugoLab currentLevel={currentLevel} />}
        {activeSubModule === 27 && <ConfusingGrammarLab currentLevel={currentLevel} />}
        {activeSubModule === 28 && <OnomatopoeiaMaster currentLevel={currentLevel} />}
        {activeSubModule === 29 && <DokkaiSpeedScanner currentLevel={currentLevel} />}
        {activeSubModule === 30 && <JobInterviewSimulator currentLevel={currentLevel} />}
        {activeSubModule === 62 && <RareKanjiVariantLab currentLevel={currentLevel} />}
        {activeSubModule === 63 && <ClassicalBungoGrammarLab currentLevel={currentLevel} />}
        {activeSubModule === 64 && <NuanceParticleMatrixLab currentLevel={currentLevel} />}
        {activeSubModule === 65 && (
          <NaturalCollocationRefactorLab
            currentLevel={currentLevel}
            onOpenAiSenseiWithQuery={(q) => handleOpenAiSenseiWithQuery(q)}
          />
        )}
        {activeSubModule === 66 && <ListeningTrapDeconstructLab currentLevel={currentLevel} />}
        {activeSubModule === 111 && <InvertedSyntaxLab currentLevel={currentLevel} />}
        {activeSubModule === 112 && <MacroEditorialLexiconLab currentLevel={currentLevel} />}

        {/* 30 Chuyên đề: Học Ngôn Ngữ Qua Văn Hóa & Tâm Lý Học (+5 Nạp thêm & Giải mã chuyên sâu) */}
        {activeSubModule === 32 && <TatemaeHonneDecoder currentLevel={currentLevel} />}
        {activeSubModule === 33 && <KisetsukanMatsuriLab currentLevel={currentLevel} />}
        {activeSubModule === 34 && <WashokuMannersMaster currentLevel={currentLevel} />}
        {activeSubModule === 35 && <MeiwakuOmoiyariLab currentLevel={currentLevel} />}
        {activeSubModule === 36 && <ZoutouOmotenashiGuide currentLevel={currentLevel} />}
        {activeSubModule === 37 && <UchiSotoDecoder currentLevel={currentLevel} />}
        {activeSubModule === 38 && <BushidoGamanLab currentLevel={currentLevel} />}
        {activeSubModule === 39 && <OnsenSentoEtiquette currentLevel={currentLevel} />}
        {activeSubModule === 40 && <OtakuSubcultureHub currentLevel={currentLevel} />}
        {activeSubModule === 41 && <EngimonoYokaiGuide currentLevel={currentLevel} />}
        {activeSubModule === 42 && <GeographyHistoryLab currentLevel={currentLevel} />}
        {activeSubModule === 43 && <JapanVietnamBusinessLab currentLevel={currentLevel} />}
        {activeSubModule === 44 && <ArtsLinguisticsMaster currentLevel={currentLevel} />}
        {activeSubModule === 45 && <EconomySportsHub currentLevel={currentLevel} />}
        {activeSubModule === 46 && <SocietyTraditionsGuide currentLevel={currentLevel} />}
        {activeSubModule === 47 && <ShodoKanjiPhilosophyLab currentLevel={currentLevel} />}
        {activeSubModule === 48 && <KeigoMatrix5Lab currentLevel={currentLevel} />}
        {activeSubModule === 49 && <KojiSeigoMasteryLab currentLevel={currentLevel} />}
        {activeSubModule === 50 && <KanseiKotobaHub currentLevel={currentLevel} />}
        {activeSubModule === 51 && <DouonIgigoMaster currentLevel={currentLevel} />}
        {activeSubModule === 67 && <SadouZenPhilosophyLab currentLevel={currentLevel} />}
        {activeSubModule === 68 && <NohKabukiTheatricalLab currentLevel={currentLevel} />}
        {activeSubModule === 69 && <AmaePsychologyLab currentLevel={currentLevel} />}
        {activeSubModule === 70 && <DouchouPressureLab currentLevel={currentLevel} />}
        {activeSubModule === 71 && <WakaHyakuninIsshuLab currentLevel={currentLevel} />}
        {activeSubModule === 72 && <KankonsousaiRitualsLab currentLevel={currentLevel} />}
        {activeSubModule === 73 && <ShintoKotodamaLab currentLevel={currentLevel} />}
        {activeSubModule === 74 && <MonozukuriKintsugiLab currentLevel={currentLevel} />}
        {activeSubModule === 75 && <KaigoMindfulnessLab currentLevel={currentLevel} />}
        {activeSubModule === 76 && <ShimaguniSaigaiLab currentLevel={currentLevel} />}

        {/* 10 Phân hệ: Nihon Edutainment (Chơi Mà Học - Giải Trí & Văn Hóa Đời Sống) */}
        {activeSubModule === 52 && <DajareWordplayLab currentLevel={currentLevel} />}
        {activeSubModule === 53 && <AnimeLingoDecoder currentLevel={currentLevel} />}
        {activeSubModule === 54 && <NazonazoRiddleMaster currentLevel={currentLevel} />}
        {activeSubModule === 55 && <GenZSlangHub currentLevel={currentLevel} />}
        {activeSubModule === 56 && <RomComDramaLab currentLevel={currentLevel} />}
        {activeSubModule === 57 && <ShiritoriWordChainLab currentLevel={currentLevel} />}
        {activeSubModule === 58 && <JPopLyricalPoetryLab currentLevel={currentLevel} />}
        {activeSubModule === 59 && <KaraokeCultureLab currentLevel={currentLevel} />}
        {activeSubModule === 60 && <GamingEsportsLingoLab currentLevel={currentLevel} />}
        {activeSubModule === 61 && <HissatsuwazaBattleLab currentLevel={currentLevel} />}

        {/* PH8: Bách Khoa Toàn Thư Nhật Bản (8 Trụ Cột Tri Thức + 10 Mở Rộng) */}
        {((activeSubModule >= 94 && activeSubModule <= 101) || activeDivision === 'japan_encyclopedia') && (
          <JapanEncyclopediaHub
            currentLevel={currentLevel}
            initialSectionId={
              activeSubModule === 94
                ? 'geography_admin'
                : activeSubModule === 95
                ? 'history_politics'
                : activeSubModule === 96
                ? 'tradition_arts'
                : activeSubModule === 97
                ? 'washoku_cuisine'
                : activeSubModule === 98
                ? 'society_customs'
                : activeSubModule === 99
                ? 'pop_culture'
                : activeSubModule === 100
                ? 'travel_practical'
                : activeSubModule === 101
                ? 'lifelong_learning'
                : 'geography_admin'
            }
            onOpenAiSenseiWithQuery={handleOpenAiSenseiWithQuery}
          />
        )}
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] px-6 py-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Kotoba Infinity 言葉無限</span>
            <span>·</span>
            <span>Hệ sinh thái Tiếng Nhật & Luyện thi JLPT Toàn diện</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 flex-wrap">
            <span>102 Chuyên mục Chuyên sâu</span>
            <span>·</span>
            <span>Dịch Cabin Thượng Đỉnh (Simultaneous Interpreting)</span>
            <span>·</span>
            <span>8 Phân Hệ Chuẩn Hóa (PH1 - PH8)</span>
            <span>·</span>
            <span>10 Chuyên mục Từ vựng & Hán tự</span>
            <span>·</span>
            <span>10 Chuyên mục Đọc hiểu & JLPT</span>
            <span>·</span>
            <span>11 Chuyên mục Nghe nói & Phản xạ (kèm Cabin)</span>
            <span>·</span>
            <span>13 Chuyên đề Doanh nghiệp</span>
            <span>·</span>
            <span>30 Chuyên đề Văn hóa & Tâm lý học</span>
            <span>·</span>
            <span>10 Phân hệ Đột phá N2-N1</span>
            <span>·</span>
            <span>10 Phân hệ Nihon Edutainment</span>
            <span>·</span>
            <span>8 Trụ Cột Bách Khoa Toàn Thư Nhật Bản (+10)</span>
            <span>·</span>
            <span>Tìm kiếm nhanh Ctrl+K</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
