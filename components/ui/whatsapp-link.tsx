import { MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';
export function WhatsAppLink({
  children = 'WhatsApp Us',
  className = 'button button-outline',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
