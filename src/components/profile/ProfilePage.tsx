import { useMemo, useState } from 'react';
import { useResume } from '../../hooks/useResume';
import { useGithubContributions } from '../../hooks/useGithubContributions';
import { useProfileSettings } from '../../hooks/useProfileSettings';
import { buildExperienceCalendar } from '../../data/experienceCalendar';
import ProfileHeader from './ProfileHeader';
import ContributionGraph from './ContributionGraph';
import RepoList from './RepoList';
import ExperienceList from './ExperienceList';
import ContactCard from './ContactCard';
import BlogSection from './BlogSection';
import SettingsPanel from './SettingsPanel';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { roles } = useResume();
  const realCalendar = useGithubContributions();
  // recomputed against today's actual date on every load — never goes stale
  const experienceCalendar = useMemo(() => buildExperienceCalendar(), []);
  const { settings, setTheme, togglePin, moveRepo } = useProfileSettings();

  return (
    <div className="wrap">
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ProfileHeader onOpenSettings={() => setSettingsOpen(true)} />
        </aside>

        <div className={styles.content}>
          <section id="overview" className="section">
            <div className="section-head">
              <h2>Overview</h2>
              <p>
                Two views of activity: real GitHub contributions, and effort during internships. Click
                any square for details.
              </p>
            </div>
            <div className={styles.graphs}>
              <ContributionGraph
                title="Open Source Activity"
                calendar={realCalendar}
                emptyMessage="Live GitHub data hasn't synced yet — check back soon."
              />
              <ContributionGraph
                title="Professional Experience"
                calendar={experienceCalendar}
                emptyMessage="Experience activity data isn't available yet."
              />
            </div>
          </section>

          <section id="repositories" className="section">
            <div className="section-head">
              <h2>Repositories</h2>
              <p>Pinned first, then everything else. Click a repo to expand its README-style detail.</p>
            </div>
            <RepoList settings={settings} />
          </section>

          <section id="experience" className="section">
            <div className="section-head">
              <h2>Experience</h2>
              <p>Where I&apos;ve worked. Click a role to expand what I actually did.</p>
            </div>
            <ExperienceList roles={roles} />
          </section>

          <section id="blog" className="section">
            <div className="section-head">
              <h2>Blog</h2>
              <p>Writing about what I&apos;m building and learning.</p>
            </div>
            <BlogSection />
          </section>

          <section id="contact" className="section">
            <div className="section-head">
              <h2>Contact</h2>
              <p>Open to internships, collaboration, and hard problems.</p>
            </div>
            <ContactCard />
          </section>
        </div>
      </div>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        setTheme={setTheme}
        togglePin={togglePin}
        moveRepo={moveRepo}
      />
    </div>
  );
}
