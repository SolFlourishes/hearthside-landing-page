import Link from "next/link"

export function Footer() {
  const footerLinks = {
    Products: [
      { name: "The Clarity Coach", href: "#" },
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Guardian Program", href: "#" },
    ],
    Services: [
      { name: "Hearthside Cultivates", href: "#" },
      { name: "Workshops", href: "#" },
      { name: "Consulting", href: "#" },
      { name: "Training", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Our Mission", href: "#" },
      { name: "Hearthside Foundation", href: "#" },
      { name: "Contact", href: "#" },
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Support", href: "#" },
      { name: "Community", href: "#" },
    ],
  }

  return (
    <footer className="bg-[#1F2937] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4">Hearthside Works</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Creating communities of belonging where everyone can flourish through meaningful connection.
            </p>
            <p className="font-serif text-[#FFC72C] italic">Hear Me, See Me, Know Me.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-[#FFC72C] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Hearthside Works, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/60 hover:text-[#FFC72C] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 hover:text-[#FFC72C] transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/60 hover:text-[#FFC72C] transition-colors text-sm">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
