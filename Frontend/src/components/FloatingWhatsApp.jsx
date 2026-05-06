import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp({
  phone = '#',
  label = 'Contact on WhatsApp',
  tooltip = 'Chat with us'
}) {
  return (
    <a
    //   href={`https://wa.me/${phone}`}
        href={phone}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 group"
      aria-label={label}
    >
      <MessageCircle className="text-white" size={28} />
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
        {tooltip}
      </span>
    </a>
  );
}
