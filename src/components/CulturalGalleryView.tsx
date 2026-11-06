import React, { useState } from 'react';
import { CULTURAL_ITEMS } from '../data/culturalData';
import { CulturalItem } from '../types';
import { Search, Home, Music, Sparkles, Flame, Utensils, Landmark, Lightbulb, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

export const CulturalGalleryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedIsland, setSelectedIsland] = useState<string>('Semua');

  const categories = ['Semua', 'Rumah Adat', 'Pakaian Adat', 'Alat Musik', 'Seni Pertunjukan', 'Kuliner Tradisional'];
  const islands = ['Semua', 'Sumatera', 'Jawa', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'];

  const filteredItems = CULTURAL_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesIsland = selectedIsland === 'Semua' || item.island === selectedIsland;
    return matchesSearch && matchesCategory && matchesIsland;
  });

  const getCategoryIcon = (cat: CulturalItem['category']) => {
    switch (cat) {
      case 'Rumah Adat': return <Home className="w-4 h-4" />;
      case 'Alat Musik': return <Music className="w-4 h-4" />;
      case 'Pakaian Adat': return <Sparkles className="w-4 h-4" />;
      case 'Seni Pertunjukan': return <Flame className="w-4 h-4" />;
      case 'Kuliner Tradisional': return <Utensils className="w-4 h-4" />;
      default: return <Landmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-[#D99A35]" />
            <span>Koleksi Pusaka Budaya</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
            Ensiklopedia mini warisan budaya Indonesia untuk penjelajah cilik
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C4B2D]/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pusaka nusantara..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/30 text-xs sm:text-sm font-bold text-[#3B2011] placeholder-[#8C4B2D]/50 focus:outline-none focus:border-[#8C4B2D] shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs & Island Selector */}
      <div className="space-y-3">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playWoodClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#8C4B2D] text-white shadow-xs'
                    : 'bg-[#FFFBF2] text-[#8C4B2D] border border-[#8C4B2D]/25 hover:bg-[#F3E3C6]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Island Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold text-[#8C4B2D]/80">
          <span className="text-[11px] text-[#8C4B2D]/60 shrink-0">Wilayah:</span>
          {islands.map((island) => {
            const isActive = selectedIsland === island;
            return (
              <button
                key={island}
                onClick={() => {
                  sound.playWoodClick();
                  setSelectedIsland(island);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#527D65] text-white'
                    : 'bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D]'
                }`}
              >
                {island}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="wood-panel rounded-2xl p-4 sm:p-5 border-2 border-[#8C4B2D]/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#8C4B2D]">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D99A35]/20 text-[#8C4B2D] border border-[#D99A35]/40">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#8C4B2D] tracking-tight">
                {item.name}
              </h3>
              <p className="text-xs font-bold text-[#527D65] mt-0.5">
                📍 {item.region} ({item.island})
              </p>

              <p className="text-xs sm:text-sm text-[#4A2D1B] mt-2.5 font-medium leading-relaxed">
                {item.shortDescription}
              </p>
            </div>

            {/* Fun Fact Callout */}
            <div className="mt-4 p-3 rounded-xl bg-[#FFFBF2] border border-[#D99A35]/40 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[#D99A35] shrink-0 mt-0.5" />
              <p className="text-[11px] font-bold text-[#8C4B2D] leading-snug">
                {item.funFact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-10 rounded-2xl wood-panel text-center text-[#8C4B2D]">
          <p className="text-base font-bold">Tidak ada pusaka yang cocok dengan pencarian.</p>
          <p className="text-xs mt-1">Coba gunakan kata kunci lain atau ubah filter kategori.</p>
        </div>
      )}
    </div>
  );
};
