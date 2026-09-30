import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Photo Credits',
  alternates: { canonical: '/credits' },
};
export default function Credits() {
  return (
    <main id="main" className="container legal section">
      <h1>Photo credits</h1>
      <p>
        Destination photographs are used under Creative Commons licenses. Images
        are resized and cropped in the page layouts, with decorative overlays.
        These photo adaptations retain their respective licenses.
      </p>
      <h2>Prem Mandir, Vrindavan</h2>
      <p>
        “PremMandirSideViewFromCanteen” by KuwarOnline, via{' '}
        <a href="https://commons.wikimedia.org/wiki/File:PremMandirSideViewFromCanteen.jpg">
          Wikimedia Commons
        </a>
        . Licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-sa/3.0/">
          CC BY-SA 3.0
        </a>
        .
      </p>
      <h2>Vishram Ghat, Mathura</h2>
      <p>
        “Vishram Ghat” by Umang108, via{' '}
        <a href="https://commons.wikimedia.org/wiki/File:Vishram_Ghat.jpg">
          Wikimedia Commons
        </a>
        . Licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          CC BY-SA 4.0
        </a>
        .
      </p>
    </main>
  );
}
