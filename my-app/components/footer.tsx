import Link from "next/link"

export function Footer() {
  const footerLinks = {
    Divisions: [
      { name: "Hearthside Games", href: "/games" },
      { name: "Hearthside Stories", href: "/stories" },
      { name: "Hearthside Care", href: "/care" },
      { name: "Hearthside Cultivates", href: "/cultivates" },
    ],
    Products: [
      { name: "Clarity Coach", href: "http://clarity.hearthsideworks.com", external: true },
      { name: "Project Cohesion", href: "/games/project-cohesion" },
      { name: "Elder Program", href: "/elder-program" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Commitments", href: "/commitments" },
      { name: "Hearthside Foundation", href: "/foundation" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Support", href: "/contact" },
      { name: "Community", href: "/care" },
    ],
  }

  return (
    <footer className="bg-[#1F2937] dark:bg-[#111827] text-white py-16">
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
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-[#FFC72C] transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-white/70 hover:text-[#FFC72C] transition-colors">
                        {link.name}
                      </Link>
                    )}
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
            <Link href="/commitments" className="text-white/60 hover:text-[#FFC72C] transition-colors text-sm">
              Privacy & Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
