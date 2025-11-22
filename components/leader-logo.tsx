export function LeaderLogo({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Leadership Leader Logo"
    >
      {/* The Hearth Arch - IDENTICAL to HearthArch and Clarity Coach */}
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />

      {/* Mountain sits ON TOP of the arch at y=90 (arch top is around y=60) */}
      <g transform="translate(100, 90)">
        {/* Main mountain peak */}
        <path d="M 0 0 L 18 30 L -18 30 Z" fill="#059669" />

        {/* Left side peak */}
        <path d="M -13 12 L -25 30 L -5 30 Z" fill="#047857" />

        {/* Right side peak */}
        <path d="M 13 12 L 25 30 L 5 30 Z" fill="#047857" />

        {/* Snow cap on main peak */}
        <path d="M 0 0 L 8 8 L -8 8 Z" fill="white" />

        {/* Flag at summit */}
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#047857" strokeWidth="1.5" />
        <path d="M 0 -8 L 6 -5 L 0 -3" fill="#E97551" />
      </g>

      {/* Text inside the arch */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#059669"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        LEADERSHIP
      </text>

      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#047857"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        LEADER
      </text>
    </svg>
  )
}
