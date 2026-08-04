import { roleToExperienceCard } from '../../data/githubProfile';
import type { Role } from '../../data/resume';
import ExperienceCard from './ExperienceCard';
import styles from './ExperienceList.module.css';

export default function ExperienceList({ roles }: { roles: Role[] }) {
  const cards = roles.map(roleToExperienceCard);
  return (
    <div className={styles.list}>
      {cards.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
