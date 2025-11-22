interface HearthArchProps {
  className?: string
  [key: string]: any
}

export function HearthArch({ className = "", ...props }: HearthArchProps) {
  return (
    <svg
      viewBox="0 0 100 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      aria-label="Hearthside Works Logo"
    >
      <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#E97551" strokeWidth="16" fill="none" strokeLinecap="round" />
    </svg>
  )
}
