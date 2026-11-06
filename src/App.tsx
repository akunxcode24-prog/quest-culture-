/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, Mission } from './types';
import { MISSIONS_DATA } from './data/culturalData';
import { sound } from './utils/audio';
import { LandingHero } from './components/LandingHero';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MissionMapView } from './components/MissionMapView';
import { CulturalGalleryView } from './components/CulturalGalleryView';
import { LearningMaterialsView } from './components/LearningMaterialsView';
import { AchievementsView } from './components/AchievementsView';
import { Mission1View } from './components/Mission1View';
import { Mission2View } from './components/Mission2View';
import { Mission3View } from './components/Mission3View';
import { Mission4View } from './components/Mission4View';
import { MissionDetailModal } from './components/MissionDetailModal';
import { SettingsModal } from './components/SettingsModal';

const STORAGE_KEY = 'culturequest_student_session';

export type AppTab = NavTab | 'misi-1' | 'misi-2' | 'misi-3' | 'misi-4';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<AppTab>('beranda');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.getMuted());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch {
        // Ignore
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleStartAdventure = (nickname: string) => {
    // Generate anonymous researcher ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newProfile: UserProfile = {
      username: nickname,
      anonymousId: `CQ-${randomNum}`,
      joinedAt: new Date().toISOString(),
      level: 1,
      levelTitle: 'Penjelajah Pemula',
      xp: 150,
      stars: 12,
      completedMissions: [],
      unlockedBadges: ['badge-1', 'badge-2'],
    };

    setUser(newProfile);
    setActiveTab('beranda');
    showToast(`🎉 Selamat datang di petualangan Nusantara, ${nickname}!`);
  };

  const handleToggleAudio = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    sound.setMuted(nextState);
  };

  const handleResetUser = () => {
    setUser(null);
    setActiveTab('beranda');
    showToast('Profil penjelajah telah diganti.');
  };

  const handleCompleteMissionPreview = (missionId: string) => {
    if (!user) return;
    if (!user.completedMissions.includes(missionId)) {
      const updatedUser: UserProfile = {
        ...user,
        stars: user.stars + 3,
        xp: user.xp + 100,
        completedMissions: [...user.completedMissions, missionId],
      };
      setUser(updatedUser);
      showToast('🌟 Hebat! Kamu mendapatkan +3 Bintang & +100 XP Budaya!');
    }
  };

  // If user hasn't started yet, render the landing page inspired by the reference illustration
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7EBD2]">
        <LandingHero
          onStartAdventure={handleStartAdventure}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isAudioMuted={isAudioMuted}
          onToggleAudio={handleToggleAudio}
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isAudioMuted={isAudioMuted}
          onToggleAudio={handleToggleAudio}
          onResetUser={handleResetUser}
          currentUsername=""
        />

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#8C4B2D] text-white text-xs sm:text-sm font-bold shadow-2xl border-2 border-[#D99A35] animate-in fade-in slide-in-from-bottom-3">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  const handleSelectMission = (mission: Mission) => {
    if (mission.id === 'misi-1') {
      sound.playSuccessChime();
      setActiveTab('misi-1');
    } else if (mission.id === 'misi-2') {
      sound.playSuccessChime();
      setActiveTab('misi-2');
    } else if (mission.id === 'misi-3') {
      sound.playSuccessChime();
      setActiveTab('misi-3');
    } else if (mission.id === 'misi-4') {
      sound.playSuccessChime();
      setActiveTab('misi-4');
    } else {
      setSelectedMission(mission);
    }
  };

  // Once started, show the Student Adventure Hub
  return (
    <div className="min-h-screen bg-[#F7EBD2] flex flex-col justify-between selection:bg-[#D99A35] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={
          activeTab === 'misi-1' || activeTab === 'misi-2' || activeTab === 'misi-3' || activeTab === 'misi-4'
            ? 'beranda'
            : activeTab
        }
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        username={user.username}
        stars={user.stars}
        xp={user.xp}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onChangeProfile={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        {activeTab === 'misi-1' && (
          <Mission1View
            user={user}
            onBackToDashboard={() => setActiveTab('beranda')}
            onUpdateUser={(updated) => setUser(updated)}
            onGoToMission2Teaser={() => {
              setActiveTab('misi-2');
              sound.playSuccessChime();
              showToast('🔍 Selamat Datang di Misi 2: Detektif Jenis Warisan Budaya!');
            }}
          />
        )}

        {activeTab === 'misi-2' && (
          <Mission2View
            user={user}
            onBackToDashboard={() => setActiveTab('beranda')}
            onUpdateUser={(updated) => setUser(updated)}
            onGoToMission3Teaser={() => {
              setActiveTab('misi-3');
              sound.playSuccessChime();
              showToast('🛡️ Selamat Datang di Misi 3: Penjaga Warisan Budaya!');
            }}
          />
        )}

        {activeTab === 'misi-3' && (
          <Mission3View
            user={user}
            onBackToDashboard={() => setActiveTab('beranda')}
            onUpdateUser={(updated) => setUser(updated)}
            onGoToMission4Teaser={() => {
              setActiveTab('misi-4');
              sound.playSuccessChime();
              showToast('🌟 Selamat Datang di Misi 4: Aksi Kecil, Dampak Bermakna!');
            }}
          />
        )}

        {activeTab === 'misi-4' && (
          <Mission4View
            user={user}
            onBackToDashboard={() => setActiveTab('beranda')}
            onUpdateUser={(updated) => setUser(updated)}
          />
        )}

        {activeTab === 'beranda' && (
          <DashboardView
            user={user}
            missions={MISSIONS_DATA.map((m) => {
              if (m.id === 'misi-1' && user.completedMissions.includes('misi-1')) {
                return { ...m, status: 'available' };
              }
              if (m.id === 'misi-2' && user.completedMissions.includes('misi-2')) {
                return { ...m, status: 'available' };
              }
              if (m.id === 'misi-3' && user.completedMissions.includes('misi-3')) {
                return { ...m, status: 'available' };
              }
              if (m.id === 'misi-4' && user.completedMissions.includes('misi-4')) {
                return { ...m, status: 'available' };
              }
              return m;
            })}
            onSelectMission={handleSelectMission}
            onNavigateToMap={() => setActiveTab('peta')}
          />
        )}

        {activeTab === 'peta' && (
          <MissionMapView onBackToHome={() => setActiveTab('beranda')} />
        )}

        {activeTab === 'koleksi' && <CulturalGalleryView />}

        {activeTab === 'materi' && <LearningMaterialsView />}

        {activeTab === 'pencapaian' && <AchievementsView user={user} />}
      </main>

      {/* Mission Detail Modal */}
      <MissionDetailModal
        mission={selectedMission}
        onClose={() => setSelectedMission(null)}
        onCompletePreview={handleCompleteMissionPreview}
        onStartMission1={() => {
          setSelectedMission(null);
          setActiveTab('misi-1');
        }}
        onStartMission2={() => {
          setSelectedMission(null);
          setActiveTab('misi-2');
        }}
        onStartMission3={() => {
          setSelectedMission(null);
          setActiveTab('misi-3');
        }}
        onStartMission4={() => {
          setSelectedMission(null);
          setActiveTab('misi-4');
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onResetUser={handleResetUser}
        currentUsername={user.username}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#8C4B2D] text-white text-xs sm:text-sm font-black shadow-2xl border-2 border-[#D99A35] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footnote */}
      <footer className="border-t border-[#8C4B2D]/15 bg-[#F4E3C1]/50 py-4 px-4 text-center text-xs font-semibold text-[#8C4B2D]/75">
        <p>CultureQuest &copy; 2026 &middot; Jelajahi, Kenali, Lestarikan Warisan Budaya Indonesia</p>
        <p className="text-[10px] text-[#8C4B2D]/60 mt-0.5">Media Pembelajaran Berbasis Petualangan Budaya Digital &middot; Tahap 1</p>
      </footer>
    </div>
  );
}
