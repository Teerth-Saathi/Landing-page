import { ImageResponse } from 'next/og';
export const alt = 'TeerthSaathi — Pilgrimage Journeys With Care';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f6f3eb',
        color: '#183e32',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 90,
        borderBottom: '18px solid #b8552b',
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 6, color: '#a64b24' }}>
        TEERTHSAATHI
      </div>
      <div style={{ fontSize: 82, marginTop: 32, fontWeight: 700 }}>
        Journeys With Care.
      </div>
      <div style={{ fontSize: 30, marginTop: 30 }}>
        Delhi NCR → Mathura & Vrindavan
      </div>
      <div style={{ fontSize: 24, marginTop: 18 }}>
        2 Days · 1 Night · Founding journey coming soon
      </div>
    </div>,
    size,
  );
}
