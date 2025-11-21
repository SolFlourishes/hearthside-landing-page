export function LeaderLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="#10B981" fillOpacity="0.1" />
      <circle cx="50" cy="50" r="48" stroke="#10B981" strokeWidth="2" />

      {/* Mountain/Peak Shape - representing leadership growth */}
      <path
        d="M 30 65 L 50 35 L 70 65 Z"
        fill="none"
        stroke="#10B981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Person at the peak */}
      <circle cx="50" cy="35" r="5" fill="#10B981" />

      {/* Supporting team members */}
      <circle cx="38" cy="55" r="3" fill="#10B981" fillOpacity="0.6" />
      <circle cx="50" cy="55" r="3" fill="#10B981" fillOpacity="0.6" />
      <circle cx="62" cy="55" r="3" fill="#10B981" fillOpacity="0.6" />

      {/* Connection lines */}
      <line x1="50" y1="40" x2="38" y2="52" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="40" x2="50" y2="52" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="40" x2="62" y2="52" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}
