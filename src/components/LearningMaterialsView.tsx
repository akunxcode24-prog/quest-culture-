import React, { useState } from 'react';
import { LEARNING_SUMMARY } from '../data/culturalData';
import { BookOpen, Layers, Globe, HeartHandshake, ChevronDown, ChevronUp, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const LearningMaterialsView: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <BookOpen className="w-5 h-5 text-[#8C4B2D]" />;
      case 1: return <Layers className="w-5 h-5 text-[#315B70]" />;
      case 2: return <Globe className="w-5 h-5 text-[#527D65]" />;
      default: return <HeartHandshake className="w-5 h-5 text-[#D99A35]" />;
    }
  };

  const toggleExpand = (idx: number) => {
    sound.playWoodClick();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleReadAloud = (text: string) => {
    sound.playSuccessChime();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-[#D99A35]" />
          <span>Buku Panduan Petualang Budaya</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
          Ringkasan materi dasar kebudayaan Indonesia untuk siswa SD kelas IV–VI
        </p>
      </div>

      <div className="space-y-4">
        {LEARNING_SUMMARY.map((topic, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="wood-panel rounded-2xl border-2 border-[#8C4B2D]/40 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-[#8C4B2D]/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFBF2] border border-[#8C4B2D]/20 flex items-center justify-center shrink-0">
                    {getIcon(idx)}
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider">
                      Modul 0{idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#8C4B2D]">
                      {topic.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-[#8C4B2D]">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-[#8C4B2D]/15 bg-[#FFFBF2]/70 space-y-3">
                  <p className="text-xs sm:text-base font-medium text-[#3B2011] leading-relaxed">
                    {topic.content}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleReadAloud(`${topic.title}. ${topic.content}`)}
                      className="px-3 py-1.5 rounded-xl bg-[#F7EBD2] hover:bg-[#EAD0A3] border border-[#8C4B2D]/30 text-xs font-bold text-[#8C4B2D] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Bacakan Materi</span>
                    </button>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#527D65]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Konsep Dasar Terverifikasi</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
