import type { ExperienceCardData } from '../../data/githubProfile';
import ExpandableCard from './ExpandableCard';
import styles from './ExperienceList.module.css';

export default function ExperienceCard({ item }: { item: ExperienceCardData }) {
  const summary = (
    <div className={styles.expRow}>
      <div className={styles.expTop}>
        <span className={styles.role}>{item.role}</span>
        <span className={styles.at}>
          @ <span className={styles.company}>{item.company}</span>
        </span>
        <span className={styles.dates}>{item.dates}</span>
      </div>
      <p className={styles.summary}>{item.summary}</p>
    </div>
  );

  const detail = (
    <ul className={styles.points}>
      {item.detail.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  );

  return <ExpandableCard anchorId={`profile-exp-${item.id}`} summary={summary} detail={detail} />;
}
