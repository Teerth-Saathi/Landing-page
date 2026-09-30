'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand } from './ui/brand';
const links = [
  ['Home', '/'],
  ['Journey', '/#journey'],
  ['Why TeerthSaathi', '/#why'],
  ['About', '/#about'],
  ['FAQs', '/#faqs'],
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container nav-wrap">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-green nav-cta" href="/#interest">
          Join the Journey <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/#interest" onClick={() => setOpen(false)}>
            Join the Journey ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
