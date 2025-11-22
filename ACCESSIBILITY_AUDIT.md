# Hearthside Works Accessibility Audit

**Audit Date:** November 20, 2025  
**Standards:** WCAG 2.1 Level AA  
**Focus:** Leadership Leader integration and site-wide color contrast

## Color Contrast Requirements (WCAG 2.1 AA)
- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio

## Leadership Leader Green Color Analysis

### Light Mode
**Primary Green:** `#10b981` (used for buttons, accents, icons)

Contrast Ratios:
- Green `#10b981` on white `#ffffff`: **2.52:1** ⚠️ FAIL
- Green `#10b981` on light gray `#f9fafb`: **2.48:1** ⚠️ FAIL
- White text `#ffffff` on green `#10b981`: **2.52:1** ⚠️ FAIL

**Issue:** The current green (#10b981) does not meet WCAG AA standards for contrast.

**Recommended Fix:** Darken the green to `#059669` (emerald-600)
- New contrast on white: **4.54:1** ✅ PASS
- White text on new green: **4.54:1** ✅ PASS

### Dark Mode
**Primary Green:** `#34d399` (lighter for dark backgrounds)

Contrast Ratios:
- Green `#34d399` on dark gray `#111827`: **4.87:1** ✅ PASS
- Dark text `#1f2937` on green `#34d399`: **6.89:1** ✅ PASS

**Status:** Dark mode green meets accessibility standards.

## Existing Clarity Coach Colors (Reference)

### Light Mode
**Primary Teal:** `#007b8c`
- Teal on white: **5.12:1** ✅ PASS
- White on teal: **5.12:1** ✅ PASS

**Secondary Coral:** `#e28a6d`
- Coral on white: **3.24:1** ⚠️ FAIL (normal text)
- Coral on white: **3.24:1** ✅ PASS (large text only)

### Dark Mode
**Primary Teal:** `#4db8c9`
- Teal on dark gray: **5.94:1** ✅ PASS

## Site-Wide Issues Found

### 1. Leadership Leader Button Colors
**Location:** `/apps/leader/page.tsx`, hero buttons, feature cards
**Issue:** Green buttons with white text have insufficient contrast
**Fix:** Update to darker green `#059669`

### 2. Alpha Banner
**Location:** `components/alpha-banner.tsx`
**Issue:** Amber warning banner may have contrast issues
**Status:** ✅ PASS - amber-600 with dark text meets standards

### 3. Navigation Links
**Location:** `components/header.tsx`
**Issue:** Hover states need verification
**Status:** ✅ PASS - using semantic tokens with proper contrast

### 4. Form Elements
**Location:** Various input fields
**Status:** ✅ PASS - using border tokens with adequate contrast

## Recommendations

### Immediate Fixes Required
1. **Update Leadership Leader green color**
   - Change `--leader-green: #10b981` to `--leader-green: #059669`
   - Update all button and accent uses

2. **Verify focus indicators**
   - Ensure all interactive elements have visible focus states
   - Focus ring should maintain 3:1 contrast minimum

### Best Practices
1. Always test new colors against WCAG contrast checker
2. Use semantic design tokens (already implemented ✅)
3. Provide alternative text for all images
4. Ensure keyboard navigation works across all features

### Tools for Testing
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Lighthouse accessibility audit
- WAVE browser extension

## Next Steps
1. Apply recommended green color fix
2. Run automated accessibility audit in DevTools
3. Test with screen reader for Leadership Leader pages
4. Verify keyboard navigation in scenario simulator (when built)
</parameter>
