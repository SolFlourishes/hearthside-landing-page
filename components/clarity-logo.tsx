export function ClarityLogo({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Clarity Coach Logo"
    >
      {/* The Hearth Arch - IDENTICAL to HearthArch and Leadership Leader */}
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />

      {/* Speech bubble sits ON TOP of the arch */}
      <g transform="translate(100, 70)">
        {/* Main bubble circle */}
        <circle cx="0" cy="0" r="22" fill="#0891B2" />

        {/* Three dots inside bubble */}
        <circle cx="-10" cy="0" r="3" fill="white" />
        <circle cx="0" cy="0" r="3" fill="white" />
        <circle cx="10" cy="0" r="3" fill="white" />

        {/* Bubble tail pointing to arch */}
        <path d="M -6 20 L 0 28 L 6 20" fill="#0891B2" />
      </g>

      {/* Text inside the arch */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#0891B2"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        CLARITY
      </text>

      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#E97551"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        COACH
      </text>
    </svg>
  )
}
