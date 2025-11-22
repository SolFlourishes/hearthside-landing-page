export function LeaderLogo({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orange arch - identical to Clarity Coach */}
      <path d="M 20 130 A 80 80 0 0 1 180 130" stroke="#E97551" strokeWidth="28" fill="none" strokeLinecap="round" />

      {/* Mountain sits ON TOP of the arch */}
      <g transform="translate(100, 70)">
        {/* Main mountain peak */}
        <path d="M 0 0 L 20 35 L -20 35 Z" fill="#059669" stroke="#047857" strokeWidth="2" />

        {/* Side peaks for mountain range effect */}
        <path d="M -15 15 L -28 35 L -8 35 Z" fill="#047857" opacity="0.8" />
        <path d="M 15 15 L 28 35 L 8 35 Z" fill="#047857" opacity="0.8" />

        {/* Snow cap on main peak */}
        <path d="M 0 0 L 9 10 L -9 10 Z" fill="white" />

        {/* Small flag at summit */}
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#047857" strokeWidth="2" />
        <path d="M 0 -10 L 7 -7 L 0 -4" fill="#059669" />
      </g>

      {/* Text inside the arch */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="#059669"
        fontFamily="Georgia, serif"
        letterSpacing="2"
      >
        LEADERSHIP
      </text>

      <text
        x="100"
        y="162"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="#047857"
        fontFamily="Georgia, serif"
        letterSpacing="2"
      >
        LEADER
      </text>
    </svg>
  )
}
