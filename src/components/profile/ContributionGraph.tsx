import { useState } from 'react';
import type { ContributionCalendar, ContributionDay } from '../../data/contributions';
import styles from './ContributionGraph.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS: Record<number, string> = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };
const LEVELS = [0, 1, 2, 3, 4] as const;

type Props = {
  title: string;
  calendar: ContributionCalendar;
  emptyMessage: string;
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

export default function ContributionGraph({ title, calendar, emptyMessage }: Props) {
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
                      style={{ background: `var(--level-${day.level})` }}
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
                  </span>
                </>
              ) : (
                <span className={styles.detailHint}>Click a square to see what was happening that day.</span>
              )}
            </div>
            <div className={styles.legend}>
              Less
              {LEVELS.map((l) => (
                <span key={l} className={styles.legendSwatch} style={{ background: `var(--level-${l})` }} />
              ))}
              More
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
