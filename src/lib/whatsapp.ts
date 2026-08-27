import { recordMoqClick } from './login';

export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'Mr.Sachin Kaluskar';

export interface WhatsAppInquiryParams {
  productName: string;
  productSlug?: string;
  price?: number;
  quantity?: number;
  variantName?: string;
}

/**
 * Generates initial message for WhatsApp inquiry.
 */
export function generateWhatsAppMessage(params: WhatsAppInquiryParams): string {
  const { productName, productSlug, price, quantity = 25, variantName } = params;

  let message = `Hello Zizziq Team,:\n\n`;
  message += `* Im Intrested In This Product: ${productName}\n`;
  if (variantName) {
    message += `* Variant: ${variantName}\n`;
  }
  if (price) {
    message += `* Original Unit Price: ₹${price.toLocaleString('en-IN')} / piece\n`;
    message += `* Total Estimated Price (${quantity} pcs): ₹${(price * quantity).toLocaleString('en-IN')}\n`;
  }
  message += `* Quantity / MOQ: ${quantity}\n\n`;
  message += `Destination: Japan\n\n`;
  message += `Please share your B2B price, MOQ, lead time, customization options and export/shipping details.\n\n`;
  message += `Thank you.`;

  return message;
}

/**
 * Constructs the wa.me URL with phone number and auto-generated encoded message.
 */
export function getWhatsAppUrl(params: WhatsAppInquiryParams, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const message = generateWhatsAppMessage(params);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab with the auto-generated message,
 * and automatically records the MOQ button click in the login side.
 */
export function openWhatsAppInquiry(params: WhatsAppInquiryParams, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER): void {
  // Record MOQ click in the login tracker
  recordMoqClick(params.productName, params.price);

  const url = getWhatsAppUrl(params, phoneNumber);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
