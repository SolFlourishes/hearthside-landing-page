export function CultivatesLogo({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hearthside Cultivates Logo"
    >
      {/* The Hearth Arch - consistent across all products */}
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />

      {/* Growing plant/tree icon - represents cultivation and growth */}
      <g transform="translate(100, 70)">
        {/* Trunk */}
        <rect x="-3" y="15" width="6" height="25" fill="#8B4513" rx="1" />

        {/* Leaves - layered for depth */}
        <path d="M -15 25 Q -15 15 -5 15 Q 0 10 5 15 Q 15 15 15 25 Z" fill="#16A34A" />
        <path d="M -12 18 Q -12 10 -3 10 Q 0 6 3 10 Q 12 10 12 18 Z" fill="#22C55E" />
        <path d="M -8 12 Q -8 6 0 6 Q 8 6 8 12 Z" fill="#4ADE80" />

        {/* Small sprout coming from side - represents new growth */}
        <path d="M 6 30 Q 12 28 14 22" stroke="#22C55E" strokeWidth="2" fill="none" />
        <circle cx="14" cy="20" r="3" fill="#4ADE80" />
      </g>

      {/* Product name text inside the arch */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#16A34A"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        HEARTHSIDE
      </text>

      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#22C55E"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        CULTIVATES
      </text>
    </svg>
  )
}
