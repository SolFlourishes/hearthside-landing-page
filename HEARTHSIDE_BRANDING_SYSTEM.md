# Hearthside Works Extensible Branding System

## The Hearth Symbol

The **hearth arch** is the core brand symbol representing the Hearthside Works mission: bringing kith and kin together around the hearthside to grow, develop, and connect.

All Hearthside Works products share this consistent hearth arch foundation.

## Brand Architecture

### Core Components

1. **HearthArch** (`components/hearth-arch.tsx`)
   - The standalone hearth symbol used in the main site header
   - Orange arch (#E97551) with 16px stroke width
   - Path: `M 10 50 A 40 40 0 0 1 90 50`

2. **Product Logo Pattern**
   - Each product extends the hearth arch by adding:
     - A distinctive icon sitting ON TOP of the arch
     - Product name text INSIDE the arch (two lines)
     - Product-specific colors for text

### Existing Product Logos

#### Clarity Coach (`components/clarity-logo.tsx`)
- **Icon**: Teal speech bubble with three dots (#0891B2)
- **Text Colors**: 
  - "CLARITY" in teal (#0891B2)
  - "COACH" in orange (#E97551)
- **Symbolism**: Communication and conversation

#### Leadership Leader (`components/leader-logo.tsx`)
- **Icon**: Green mountain range with flag (#059669, #047857)
- **Text Colors**: 
  - "LEADERSHIP" in emerald (#059669)
  - "LEADER" in dark emerald (#047857)
- **Symbolism**: Growth, achievement, and reaching new heights

## Creating New Product Logos

### Template Structure

\`\`\`tsx
export function NewProductLogo({ size = 200, className = '' }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Product Name Logo"
    >
      {/* REQUIRED: The Hearth Arch - DO NOT MODIFY */}
      <path 
        d="M 20 140 A 80 80 0 0 1 180 140" 
        stroke="#E97551" 
        strokeWidth="16" 
        fill="none" 
        strokeLinecap="round" 
      />

      {/* Product-specific icon - sits ON TOP at y=70-90 range */}
      <g transform="translate(100, 80)">
        {/* Your icon SVG here */}
      </g>

      {/* Product name - INSIDE arch at y=133 and y=152 */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="[YOUR_COLOR_1]"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        FIRST LINE
      </text>

      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="[YOUR_COLOR_2]"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        SECOND LINE
      </text>
    </svg>
  )
}
\`\`\`

### Design Guidelines

1. **Hearth Arch** (REQUIRED - IDENTICAL FOR ALL PRODUCTS)
   - Path: `M 20 140 A 80 80 0 0 1 180 140`
   - Stroke: `#E97551`
   - Stroke Width: `16`
   - Stroke Linecap: `round`

2. **Icon Placement**
   - Position: Centered at x=100, y=70-90
   - Must sit ON TOP of the arch (not floating above or inside)
   - Should be simple, recognizable, and meaningful

3. **Text Styling**
   - Font: Georgia serif (matches Hearthside Works brand)
   - Size: 18px
   - Weight: Bold
   - Letter Spacing: 1
   - Two lines positioned at y=133 and y=152
   - Use product-specific colors that meet WCAG AA contrast (4.5:1 on white)

4. **Color Selection**
   - Choose colors that represent your product's purpose
   - Ensure accessibility compliance (contrast ratio ≥ 4.5:1)
   - Consider using different shades for visual hierarchy

## Implementation in Pages

### Services Section
\`\`\`tsx
import { YourProductLogo } from './your-product-logo'

const services = [
  {
    title: "Your Product Name",
    logoComponent: YourProductLogo,
    // ... other properties
  }
]
\`\`\`

### Product Pages
\`\`\`tsx
import { YourProductLogo } from '@/components/your-product-logo'

<YourProductLogo size={200} />
\`\`\`

## Benefits of This System

1. **Brand Consistency** - All products share the hearth arch symbol
2. **Scalability** - SVG works at any size without quality loss
3. **Extensibility** - Easy to add new products following the template
4. **Maintainability** - Centralized logo components, not scattered image files
5. **Accessibility** - Proper ARIA labels and semantic markup
6. **Performance** - No image loading delays, smaller file sizes

## Future Products

When creating new Hearthside Works products, follow this branding system to maintain visual consistency and reinforce the core mission of bringing people together around the hearthside.
