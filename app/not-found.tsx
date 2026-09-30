import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container legal section">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>This path doesn’t lead anywhere.</h1>
      <p>Let’s get you back to the journey.</p>
      <Link href="/" className="button button-green">
        Return home
      </Link>
    </main>
  );
}
