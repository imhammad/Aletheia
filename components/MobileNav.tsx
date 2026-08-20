"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export function MobileNav({
  displayName,
  userEmail,
}: {
  displayName?: string;
  userEmail?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/topics", label: "Topics" },
    { href: "/roadmaps", label: "Roadmaps" },
    { href: "/quiz", label: "Find Your Path" },
    { href: "/career-planner", label: "Career Planner" },
  ];

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="text-charcoal">
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-cream z-50 flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="font-serif text-xl text-charcoal">Aletheia</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="text-charcoal">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6 font-sans text-lg">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-charcoal">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-pistachio-300 pt-6 mt-2">
              {displayName ? (
                <div className="flex flex-col gap-4">
                  <span className="text-charcoal/70" title={userEmail}>{displayName}</span>
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-block bg-charcoal text-cream px-5 py-2.5 rounded-md"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}