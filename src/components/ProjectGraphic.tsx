/**
 * Blueprint-style banner illustrations for each project card.
 * Animated elements use the global g-* utility classes (see index.css),
 * which are disabled under prefers-reduced-motion.
 */

type Props = { id: string };

export default function ProjectGraphic({ id }: Props) {
  switch (id) {
    case 'findr':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="Findr discovery radar">
          <circle className="g-radar" cx="202" cy="66" r="6" fill="none" stroke="#52c7ff" strokeWidth="2" />
          <circle
            className="g-radar"
            cx="202"
            cy="66"
            r="6"
            fill="none"
            stroke="#52c7ff"
            strokeWidth="2"
            style={{ animationDelay: '1.3s' }}
          />
          <path
            d="M120 52c0-8 6-14 14-14s14 6 14 14c0 10-14 22-14 22-0 0-14-12-14-22z"
            fill="rgba(82,199,255,.12)"
            stroke="#52c7ff"
            strokeWidth="2"
          />
          <path
            d="M282 34c0-7 5-12 12-12s12 5 12 12c0 9-12 19-12 19s-12-10-12-19z"
            fill="none"
            stroke="#52c7ff"
            strokeWidth="2"
          />
          <path
            d="M300 88c0-6 5-11 11-11s11 5 11 11c0 8-11 17-11 17s-11-9-11-17z"
            fill="none"
            stroke="#52c7ff"
            strokeWidth="2"
          />
          <path
            d="M188 58c0-8 6-14 14-14s14 6 14 14c0 11-14 24-14 24s-14-13-14-24z"
            fill="rgba(255,180,84,.2)"
            stroke="#ffb454"
            strokeWidth="2"
          />
          <circle cx="202" cy="58" r="4" fill="#ffb454" />
          <text x="16" y="118" fill="#6f7a88" fontFamily="monospace" fontSize="9">
            DISCOVER · NEARBY · [ 27 RESULTS ]
          </text>
        </svg>
      );

    case 'ops':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="AI operations agent request flow">
          <rect x="18" y="52" width="76" height="26" rx="4" fill="none" stroke="#6f7a88" strokeWidth="1.5" />
          <text x="26" y="69" fill="#aab4c1" fontFamily="monospace" fontSize="9">
            "is DITA up?"
          </text>
          <path
            d="M170 38 200 53 200 83 170 98 140 83 140 53Z"
            fill="rgba(82,199,255,.12)"
            stroke="#52c7ff"
            strokeWidth="2"
          />
          <text x="152" y="72" fill="#52c7ff" fontFamily="monospace" fontSize="10">
            MCP
          </text>
          <path className="g-flow" d="M96 65 H138" stroke="#52c7ff" strokeWidth="2" />
          <path className="g-flow" d="M202 60 H298" stroke="#52c7ff" strokeWidth="2" />
          <path className="g-flow" d="M202 76 H298" stroke="#52c7ff" strokeWidth="2" />
          <rect x="300" y="40" width="86" height="20" rx="3" fill="none" stroke="#ffb454" strokeWidth="1.5" />
          <rect x="300" y="70" width="86" height="20" rx="3" fill="none" stroke="#6f7a88" strokeWidth="1.5" />
          <text x="308" y="54" fill="#ffb454" fontFamily="monospace" fontSize="8">
            get-status
          </text>
          <text x="308" y="84" fill="#aab4c1" fontFamily="monospace" fontSize="8">
            run-check
          </text>
        </svg>
      );

    case 'robot':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="Robot arm reaching for an object">
          <g
            stroke="#6f7a88"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          >
            <path d="M360 118 L360 78 L318 54 L280 74" />
          </g>
          <rect x="30" y="112" width="40" height="10" rx="2" fill="#11161d" stroke="#52c7ff" strokeWidth="2" />
          <g className="g-bob" stroke="#52c7ff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 112 L50 74 L98 48 L150 66" />
          </g>
          <circle cx="50" cy="112" r="6" fill="#11161d" stroke="#52c7ff" strokeWidth="2" />
          <circle cx="50" cy="74" r="5" fill="#11161d" stroke="#52c7ff" strokeWidth="2" />
          <circle cx="98" cy="48" r="5" fill="#11161d" stroke="#52c7ff" strokeWidth="2" />
          <g className="g-bob" stroke="#52c7ff" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M150 66 l14 -9 M150 66 l14 9" />
          </g>
          <rect x="250" y="70" width="42" height="42" rx="3" fill="rgba(255,180,84,.18)" stroke="#ffb454" strokeWidth="2" />
          <rect
            className="g-blink"
            x="243"
            y="63"
            width="56"
            height="56"
            fill="none"
            stroke="#52c7ff"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="243" y="56" fill="#52c7ff" fontFamily="monospace" fontSize="9">
            object · 0.98
          </text>
          <path
            d="M164 62 Q210 44 250 82"
            stroke="#ffb454"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 5"
            opacity="0.7"
          />
          <path d="M271 40 v12 M271 128 v-12 M335 91 h-12 M207 91 h12" stroke="#6f7a88" strokeWidth="1" />
        </svg>
      );

    case 'poker':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="Poker win-probability estimate">
          <g className="g-bob">
            <rect
              x="44"
              y="42"
              width="46"
              height="62"
              rx="6"
              fill="#12161d"
              stroke="#52c7ff"
              strokeWidth="2"
              transform="rotate(-8 67 73)"
            />
            <rect
              x="84"
              y="42"
              width="46"
              height="62"
              rx="6"
              fill="#12161d"
              stroke="#ffb454"
              strokeWidth="2"
              transform="rotate(6 107 73)"
            />
            <text x="54" y="80" fill="#52c7ff" fontFamily="monospace" fontSize="15" transform="rotate(-8 67 73)">
              A♠
            </text>
            <text x="94" y="80" fill="#ffb454" fontFamily="monospace" fontSize="15" transform="rotate(6 107 73)">
              K♥
            </text>
          </g>
          <path
            d="M184 100 C222 100 224 52 262 52 C300 52 302 96 340 96 L340 110 L184 110 Z"
            fill="rgba(82,199,255,.12)"
            stroke="#52c7ff"
            strokeWidth="2"
          />
          <line x1="262" y1="52" x2="262" y2="110" stroke="#ffb454" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="184" y="42" fill="#6f7a88" fontFamily="monospace" fontSize="9">
            P(win) = 0.71 · MONTE CARLO
          </text>
        </svg>
      );

    case 'leetswipe':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="Swipeable question card">
          <rect
            x="150"
            y="36"
            width="100"
            height="70"
            rx="8"
            fill="#12161d"
            stroke="#6f7a88"
            strokeWidth="1.5"
            transform="rotate(-6 200 71)"
          />
          <rect className="g-bob" x="150" y="30" width="100" height="70" rx="8" fill="#12161d" stroke="#52c7ff" strokeWidth="2" />
          <text x="166" y="60" fill="#aab4c1" fontFamily="monospace" fontSize="10">
            Two Sum
          </text>
          <text x="166" y="78" fill="#52c7ff" fontFamily="monospace" fontSize="9">
            #1 · Easy
          </text>
          <g strokeWidth="2" fill="none">
            <path d="M74 66 h38 M112 66 l-8 -6 M112 66 l-8 6" stroke="#ff8a8a" />
            <path d="M326 66 h-38 M288 66 l8 -6 M288 66 l8 6" stroke="#6fe3a0" />
          </g>
          <text x="56" y="92" fill="#ff8a8a" fontFamily="monospace" fontSize="9">
            skip
          </text>
          <text x="312" y="92" fill="#6fe3a0" fontFamily="monospace" fontSize="9">
            save
          </text>
        </svg>
      );

    case 'focusday':
      return (
        <svg viewBox="0 0 400 130" role="img" aria-label="Focus Day task list and progress ring">
          <g fontFamily="monospace" fontSize="10" fill="#aab4c1">
            <rect x="24" y="30" width="4" height="16" fill="#ff8a8a" />
            <rect x="34" y="32" width="12" height="12" rx="2" fill="none" stroke="#6fe3a0" strokeWidth="1.5" />
            <path d="M37 38 l3 3 l6 -6" stroke="#6fe3a0" strokeWidth="1.5" fill="none" />
            <text x="54" y="42">
              finish CSC 480 report
            </text>
            <rect x="24" y="56" width="4" height="16" fill="#ffb454" />
            <rect x="34" y="58" width="12" height="12" rx="2" fill="none" stroke="#6f7a88" strokeWidth="1.5" />
            <text x="54" y="68">
              gym · 30 min
            </text>
            <rect x="24" y="82" width="4" height="16" fill="#52c7ff" />
            <rect x="34" y="84" width="12" height="12" rx="2" fill="none" stroke="#6f7a88" strokeWidth="1.5" />
            <text x="54" y="94">
              read 10 pages
            </text>
          </g>
          <circle cx="332" cy="64" r="26" fill="none" stroke="rgba(120,150,190,.2)" strokeWidth="6" />
          <circle
            className="g-blink"
            cx="332"
            cy="64"
            r="26"
            fill="none"
            stroke="#52c7ff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="163"
            strokeDashoffset="60"
            transform="rotate(-90 332 64)"
          />
          <text x="318" y="68" fill="#fff" fontFamily="monospace" fontSize="11">
            63%
          </text>
        </svg>
      );

    default:
      return null;
  }
}
