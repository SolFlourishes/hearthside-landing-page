export function FoundationLogo({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hearthside Foundation Logo"
    >
      {/* The Hearth Arch - consistent across all products */}
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />

      {/* Classical pillar/column icon - represents strength and foundation */}
      <g transform="translate(100, 70)">
        {/* Capital (top of column) */}
        <rect x="-14" y="-5" width="28" height="4" fill="#6366F1" rx="1" />
        <rect x="-12" y="-1" width="24" height="3" fill="#4F46E5" />

        {/* Column shaft with fluting detail */}
        <rect x="-10" y="2" width="20" height="30" fill="#6366F1" />
        <line x1="-5" y1="2" x2="-5" y2="32" stroke="#4F46E5" strokeWidth="1" />
        <line x1="0" y1="2" x2="0" y2="32" stroke="#4F46E5" strokeWidth="1" />
        <line x1="5" y1="2" x2="5" y2="32" stroke="#4F46E5" strokeWidth="1" />

        {/* Base */}
        <rect x="-12" y="32" width="24" height="3" fill="#4F46E5" />
        <rect x="-14" y="35" width="28" height="4" fill="#6366F1" rx="1" />

        {/* Supporting hands on both sides - community supporting the foundation */}
        <path d="M -18 25 Q -16 28 -14 26" stroke="#818CF8" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 18 25 Q 16 28 14 26" stroke="#818CF8" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Product name text inside the arch */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#6366F1"
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
        fill="#4F46E5"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        FOUNDATION
      </text>
    </svg>
  )
}
