export function ElderLogo({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Elder Program Logo"
    >
      {/* The Hearth Arch - consistent across all products */}
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />

      {/* Heart with hands icon - represents care, support, and community */}
      <g transform="translate(100, 75)">
        {/* Heart shape */}
        <path
          d="M 0 -8 
             C -2 -12, -8 -12, -10 -8 
             C -12 -4, -12 0, 0 12 
             C 12 0, 12 -4, 10 -8 
             C 8 -12, 2 -12, 0 -8 Z"
          fill="#DC2626"
        />

        {/* Supporting hands underneath */}
        <g transform="translate(0, 5)">
          {/* Left hand */}
          <path
            d="M -15 8 Q -12 12 -8 10 L -6 8"
            stroke="#C2410C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Right hand */}
          <path d="M 15 8 Q 12 12 8 10 L 6 8" stroke="#C2410C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Small sparkle to show impact */}
        <circle cx="-12" cy="-10" r="1.5" fill="#FEF3C7" />
        <circle cx="12" cy="-10" r="1.5" fill="#FEF3C7" />
      </g>

      {/* Product name text inside the arch */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#DC2626"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        ELDER
      </text>

      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#991B1B"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        PROGRAM
      </text>
    </svg>
  )
}
