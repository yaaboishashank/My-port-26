import { useRef, useState } from 'react';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext.jsx';
import usePortfolio from './hooks/usePortfolio.js';
import usePortfolioMotion from './hooks/usePortfolioMotion.js';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import Hero from './components/sections/Hero.jsx';
import TechRibbon from './components/sections/TechRibbon.jsx';
import SelectedWork from './components/sections/SelectedWork.jsx';
import Skills from './components/sections/Skills.jsx';
import About from './components/sections/About.jsx';
import Education from './components/sections/Education.jsx';
import Profiles from './components/sections/Profiles.jsx';
import Contact from './components/sections/Contact.jsx';
import ProjectDialog from './components/projects/ProjectDialog.jsx';

function Portfolio() {
  const portfolio = usePortfolio();
  const scopeRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const { motionEnabled } = usePreferences();
  const { navigate, smootherRef } = usePortfolioMotion(scopeRef, motionEnabled, portfolio);
  return (
    <div ref={scopeRef} onClick={navigate}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Header name={portfolio.profile.name} />
          <main id="main">
            <Hero profile={portfolio.profile} profiles={portfolio.profiles} />
            <TechRibbon technologies={portfolio.technologies} />
            <SelectedWork projects={portfolio.projects} onOpen={setSelectedProject} />
            <Skills groups={portfolio.skillGroups} />
            <About profile={portfolio.profile} />
            <Education entries={portfolio.education} />
            <Profiles profiles={portfolio.profiles} />
            <Contact profile={portfolio.profile} profiles={portfolio.profiles} />
          </main>
          <Footer name={portfolio.profile.name} />
        </div>
      </div>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          email={portfolio.profile.email}
          onClose={() => setSelectedProject(null)}
          smootherRef={smootherRef}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <Portfolio />
    </PreferencesProvider>
  );
}
