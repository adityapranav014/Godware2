/**
 * Utility functions for WhatsApp integration
 */

import { CONTACT_INFO } from '../constants';

/**
 * Format contact form data for WhatsApp message
 * @param {Object} formData - Form data object with name, email, and message
 * @returns {string} Formatted WhatsApp message
 */
export const formatWhatsAppMessage = (formData) => {
  const { name, email, message } = formData;
  
  const formattedMessage = `*New Contact Form Submission*

*Name:* ${name}
*Email:* ${email}

*Message:*
${message}

_Sent from GOD WEAR Website Contact Form_`;

  return encodeURIComponent(formattedMessage);
};

/**
 * Open WhatsApp with pre-filled message
 * @param {string} message - Encoded message to send
 */
export const openWhatsApp = (message) => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Send contact form via WhatsApp
 * @param {Object} formData - Form data object
 */
export const sendWhatsAppMessage = (formData) => {
  const message = formatWhatsAppMessage(formData);
  openWhatsApp(message);
};
