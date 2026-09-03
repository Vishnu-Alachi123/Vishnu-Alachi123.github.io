import { useState } from 'react';
import type { ContributionCalendar, ContributionDay } from '../../data/contributions';
import styles from './ContributionGraph.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS: Record<number, string> = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };
const LEVELS = [0, 1, 2, 3, 4] as const;

/**
 * How strongly a level-N square shows its entry's brand color. The remainder
 * is mixed with --level-0 (the empty-square color) so lighter levels fade
 * toward the background correctly in both themes.
 */
const COLOR_MIX = { 0: 0, 1: 35, 2: 55, 3: 78, 4: 100 } as const;

/** Brand color when the day carries one, otherwise GitHub's own green scale. */
function squareBackground(day: ContributionDay): string {
  if (!day.color || day.level === 0) return `var(--level-${day.level})`;
  return `color-mix(in srgb, ${day.color} ${COLOR_MIX[day.level]}%, var(--level-0))`;
}

type Props = {
  title: string;
  calendar: ContributionCalendar;
  emptyMessage: string;
  /** when set, the detail panel adds a link out to the real activity for that day */
  dayLink?: (day: ContributionDay) => string;
};

function monthLabelForWeek(week: ContributionCalendar['weeks'][number], prevMonth: number): string {
  const first = week[0];
  if (!first) return '';
  const month = new Date(first.date + 'T00:00:00').getMonth();
  return month !== prevMonth ? MONTHS[month] : '';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ContributionGraph({ title, calendar, emptyMessage, dayLink }: Props) {
  const [selected, setSelected] = useState<ContributionDay | null>(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {calendar.available && (
          <span className={styles.total}>{calendar.totalContributions.toLocaleString()} contributions</span>
        )}
      </div>

      {!calendar.available ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <div className={styles.scroller}>
          <div className={styles.months}>
            {(() => {
              let prevMonth = -1;
              return calendar.weeks.map((week, i) => {
                const label = monthLabelForWeek(week, prevMonth);
                if (label) prevMonth = new Date(week[0].date + 'T00:00:00').getMonth();
                return (
                  <span key={i} className={styles.monthLabel}>
                    {label}
                  </span>
                );
              });
            })()}
          </div>

          <div className={styles.body}>
            <div className={styles.dayLabels}>
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <span key={d} className={styles.dayLabel}>
                  {DAY_LABELS[d] ?? ''}
                </span>
              ))}
            </div>
            <div className={styles.grid}>
              {calendar.weeks.map((week, wi) => (
                <div key={wi} className={styles.week}>
                  {week.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      className={`${styles.day} ${selected?.date === day.date ? styles.selected : ''}`}
                      style={{ background: squareBackground(day) }}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                      aria-label={`${formatDate(day.date)}: ${day.note ?? `${day.count} contribution${day.count === 1 ? '' : 's'}`}`}
                      onClick={() => setSelected((cur) => (cur?.date === day.date ? null : day))}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footRow}>
            <div className={styles.detail}>
              {selected ? (
                <>
                  <span className={styles.detailDate}>{formatDate(selected.date)}</span>
                  <span className={styles.detailNote}>
                    {selected.note ?? `${selected.count} contribution${selected.count === 1 ? '' : 's'}`}
                    {dayLink && (
                      <>
                        {' · '}
                        <a href={dayLink(selected)} target="_blank" rel="noopener noreferrer">
                          View on GitHub ↗
                        </a>
                      </>
                    )}
                  </span>
                </>
              ) : (
                <span className={styles.detailHint}>Click a square to see what was happening that day.</span>
              )}
            </div>
            {calendar.legend ? (
              <div className={styles.legend}>
                {calendar.legend.map((item) => (
                  <span key={item.label} className={styles.legendItem}>
                    <span className={styles.legendSwatch} style={{ background: item.color }} />
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.legend}>
                Less
                {LEVELS.map((l) => (
                  <span key={l} className={styles.legendSwatch} style={{ background: `var(--level-${l})` }} />
                ))}
                More
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
