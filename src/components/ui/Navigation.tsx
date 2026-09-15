"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { House, User, FolderOpen, Envelope } from "@phosphor-icons/react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-10 h-[72px] backdrop-blur-md bg-background/50 border-b border-white/5">
      <Link href="/" className="group flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-white text-sm">
          ND
        </div>
        <span className="font-medium tracking-tighter text-lg">nda.dev</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/work" icon={<FolderOpen size={18} />} label="Work" />
        <NavLink href="/about" icon={<User size={18} />} label="About" />
        <NavLink href="/contact" icon={<Envelope size={18} />} label="Contact" />
      </div>

      <button className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium transition-transform active:scale-95 hover:opacity-90">
        Let&apos;s talk
      </button>
    </nav>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm font-medium"
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">{icon}</span>
      {label}
    </Link>
  );
}
