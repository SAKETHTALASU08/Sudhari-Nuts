import { ADMIN_WHATSAPP } from './constants';

export const buildWhatsAppUrl = (items, total) => {
  let message = `Hello! I'd like to place an order from Sudhari Nuts:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.flavor) {
      message += ` (${item.flavor})`;
    }
    message += ` — ${item.quantity} kg × ₹${item.price}/kg = ₹${(item.quantity * item.price).toLocaleString('en-IN')}\n`;
  });

  message += `\n──────────────\n`;
  message += `Total: ₹${total.toLocaleString('en-IN')}\n\n`;
  message += `Please confirm availability and delivery details. Thank you! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
};
