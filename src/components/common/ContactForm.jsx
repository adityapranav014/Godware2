import { useState } from 'react';
import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import { Input } from '../ui';
import { sendWhatsAppMessage, validateContactForm } from '../../utils';

const quickFacts = [
  {
    icon: ShieldCheck,
    label: 'Dedicated Partner',
    description: 'Strategists walk you through every milestone.'
  },
  {
    icon: Clock3,
    label: '3h Response',
    description: 'WhatsApp reply within three hours.'
  },
  {
    icon: Sparkles,
    label: 'Studio Crafted',
    description: 'Concepts aligned with premium brand systems.'
  }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    sendWhatsAppMessage({
      ...formData,
      phone: formData.phone || 'Not provided'
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        
        {/* Name & Email - Mobile: Stack, Desktop: Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="text"
            name="name"
            autocomplete="on"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            required
            error={errors.name}
            className="bg-dark-900 border-dark-700 text-white placeholder-dark-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 rounded-xl transition-all"
          />
          <Input
            type="email"
            name="email"
            autocomplete="on"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address *"
            required
            error={errors.email}
            className="bg-dark-900 border-dark-700 text-white placeholder-dark-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 rounded-xl transition-all"
          />
        </div>

        {/* Phone */}
        <Input
          type="tel"
          name="phone"
          autocomplete="on"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number (Optional)"
          className="bg-dark-900 border-dark-700 text-white placeholder-dark-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 rounded-xl transition-all"
        />

        {/* Message */}
        <Input
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project *"
          required
          rows={5}
          error={errors.message}
          className="bg-dark-900 border-dark-700 text-white placeholder-dark-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 rounded-xl min-h-[140px] sm:min-h-[160px] transition-all"
        />

        {/* Submit Button - Thumb-friendly */}
        <div className="pt-2">
          <button
            type="submit"
            className="group w-full py-4 md:py-5 px-8 md:px-10 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-dark-900 text-base sm:text-lg md:text-lg font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-500/30 active:scale-100"
          >
            <span className="flex items-center justify-center gap-2 font-sans">
              Send Message
              <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
