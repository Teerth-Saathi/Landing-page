import Link from 'next/link';
import { Brand } from './ui/brand';
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Brand light />
          <p>
            Meaningful journeys.
            <br />A little more care, every step of the way.
          </p>
        </div>
        <div>
          <h3>Let’s stay connected</h3>
          <a href="tel:+918851155104">+91 8851155104</a>
          <a href="mailto:teerthsaathi@gmail.com">teerthsaathi@gmail.com</a>
          <a
            href="https://www.instagram.com/teerthsaathi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram · @teerthsaathi
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/journeys/mathura-vrindavan">Our founding journey</Link>
          <Link href="/#about">Our story</Link>
          <Link href="/#faqs">Frequently asked questions</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} TeerthSaathi. Journeys With Care.
        </span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/credits">Photo Credits</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
