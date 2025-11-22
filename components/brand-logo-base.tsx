import type React from "react"

interface BrandLogoBaseProps {
  icon: React.ReactNode
  productName: string[]
  textColors: string[]
  className?: string
}

/**
 * Base component for all Hearthside Works product logos
 * Ensures consistent hearth arch branding across all products
 */
export function BrandLogoBase({ icon, productName, textColors, className = "" }: BrandLogoBaseProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img">
      {/* The Hearth Arch - consistent across all Hearthside Works products */}
      <path d="M 20 120 A 80 80 0 0 1 180 120" stroke="#E97551" strokeWidth="16" strokeLinecap="round" fill="none" />

      {/* Product-specific icon sits on top of the arch */}
      <g transform="translate(100, 40)">{icon}</g>

      {/* Product name text inside the arch */}
      <text
        x="100"
        y="105"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="16"
        fill={textColors[0]}
      >
        {productName[0]}
      </text>
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="16"
        fill={textColors[1]}
      >
        {productName[1]}
      </text>
    </svg>
  )
}
