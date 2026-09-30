import Link from 'next/link';
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label="TeerthSaathi Journeys With Care — home"
    >
      <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path
          d="M6 32h28M9 28h22M13 28V17l7-10 7 10v11M17 28v-8h6v8M20 7V2m0 0h7l-3 3h-4M4 37h32M10 42h20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Teerth<span className="brand-accent">Saathi</span>
        <small>JOURNEYS WITH CARE</small>
      </span>
    </Link>
  );
}
