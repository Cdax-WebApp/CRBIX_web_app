// components/WhatsAppButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const SUPPORT_PHONE = '918308818374'; // dont add + to the number
  const DEFAULT_MESSAGE = 'Hello! I need help with your service.';
  const BUSINESS_NAME = 'Careear Tech Academy';
  
  const whatsappUrl = `https://wa.me/${SUPPORT_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label={`Chat with ${BUSINESS_NAME} on WhatsApp`}
      title={`Chat with ${BUSINESS_NAME}`}
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;