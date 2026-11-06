import React from 'react';
import { MISSION_1_ITEMS } from '../data/mission1Data';
import { Mission1CardItem } from '../types';
import { X, Lock, CheckCircle2, Sparkles, Award, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1CollectionAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  collectedCardIds: string[];
  onSelectCard: (item: Mission1CardItem) => void;
  onFinishMission: () => void;
}

export const Mission1CollectionAlbum: React.FC<Mission1CollectionAlbumProps> = ({
  isOpen,
  onClose,
  collectedCardIds,
  onSelectCard,
  onFinishMission,
}) => {
  if (!isOpen) return null;

  const totalCards = MISSION_1_ITEMS.length;
  const collectedCount = collectedCardIds.length;
  const isAllCollected = collectedCount === totalCards;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="wood-panel w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl flex flex-col bg-[#FFFBF2] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b-2 border-[#8C4B2D]/20 bg-[#F7EBD2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8C4B2D] text-[#D99A35] flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#8C4B2D]">
                  Album Koleksi Pusaka Nusantara
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#8C4B2D] text-white text-xs font-black tabular-nums">
                  {collectedCount} / {totalCards}
                </span>
              </div>
              <p className="text-xs font-bold text-[#8C4B2D]/75">
                Kumpulkan seluruh 8 kartu dari peta untuk membuka Lencana Penjelajah Budaya
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progres Bar Banner */}
        <div className="px-5 py-3 bg-[#FFF8EB] border-b border-[#8C4B2D]/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C4B2D]">
            <Sparkles className="w-4 h-4 text-[#D99A35]" />
            <span>Kartu Budaya Terkumpul: <strong>{collectedCount}/{totalCards}</strong></span>
          </div>

          <div className="w-36 sm:w-56 h-3 rounded-full bg-[#EAD7B9] overflow-hidden p-0.5 border border-[#8C4B2D]/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D99A35] to-[#527D65] transition-all duration-300"
              style={{ width: `${(collectedCount / totalCards) * 100}%` }}
            />
          </div>
        </div>

        {/* 8 Cards Gallery Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {MISSION_1_ITEMS.map((item, index) => {
              const isFound = collectedCardIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isFound) {
                      sound.playWoodClick();
                      onSelectCard(item);
                    }
                  }}
                  className={`rounded-2xl border-2 overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                    isFound
                      ? 'bg-white border-[#8C4B2D] shadow-md hover:-translate-y-1 hover:shadow-xl cursor-pointer group'
                      : 'bg-[#EBDDC5]/50 border-dashed border-[#8C4B2D]/30 opacity-70'
                  }`}
                >
                  {/* Card Thumbnail / Silhouette */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#2D1B10] flex items-center justify-center p-1">
                    {isFound ? (
                      <>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#527D65] text-white flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-3 text-center text-[#8C4B2D]/60">
                        <Lock className="w-7 h-7 mb-1" />
                        <span className="text-[11px] font-black uppercase tracking-wider">Terkunci</span>
                      </div>
                    )}

                    {/* Order Tag */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="p-3 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#8C4B2D] line-clamp-1">
                        {isFound ? item.name : '??? Belum Ditemukan'}
                      </h4>
                      <p className="text-[11px] font-bold text-[#527D65] line-clamp-1 mt-0.5">
                        {isFound ? item.region : item.region}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#8C4B2D]/15">
                      {isFound ? (
                        <span className="text-[10px] font-bold text-[#D99A35] flex items-center gap-1 group-hover:text-[#8C4B2D]">
                          <span>Buka Kartu</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#8C4B2D]/60 italic">
                          Cari di peta
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7EBD2] border-t-2 border-[#8C4B2D]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-bold text-[#8C4B2D]">
            {isAllCollected ? (
              <span className="text-[#527D65] font-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Selamat! Semua 8 kartu budaya berhasil dikumpulkan!</span>
              </span>
            ) : (
              <span>Cari titik budaya yang tersisa di peta Nusantara untuk menyelesaikan misi.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAllCollected && (
              <button
                onClick={() => {
                  sound.playBadgeChime();
                  onFinishMission();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Lihat Lencana Penjelajah</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playWoodClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border border-[#8C4B2D]/30 text-[#8C4B2D] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Lanjut Menjelajah Peta
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
