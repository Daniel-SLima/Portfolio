"use client";

import React, { useState } from "react";
import { ProfileLensId } from "@/data/profileData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InteractiveQaPreview } from "@/components/InteractiveQaPreview";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ResumeDownloadModal } from "@/components/ResumeDownloadModal";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [activeLens, setActiveLens] = useState<ProfileLensId>("hybrid");
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-tech-grid">
      <Navbar
        activePage="home"
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      <main>
        <HeroSection
          activeLens={activeLens}
          onChangeLens={setActiveLens}
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />
        <ProjectsSection />
        <InteractiveQaPreview />
        <ExperienceTimeline activeLens={activeLens} />
        <SkillsMatrix activeLens={activeLens} />
        <AchievementsSection />
      </main>

      <Footer onOpenResumeModal={() => setResumeModalOpen(true)} />

      <ResumeDownloadModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
