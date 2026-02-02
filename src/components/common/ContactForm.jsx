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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="text"
            name="name"
            autocomplete="on"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            required
            error={errors.name}
            className="bg-black/40 border-white/10 text-white placeholder-white/50 focus:border-amber-400 focus:ring-0 shadow-inner shadow-black/40 rounded-[20px]"
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
            className="bg-black/40 border-white/10 text-white placeholder-white/50 focus:border-amber-400 focus:ring-0 shadow-inner shadow-black/40 rounded-[20px]"
          />
        </div>

        <Input
          type="tel"
          name="phone"
          autocomplete="on"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number (Optional)"
          className="bg-black/40 border-white/10 text-white placeholder-white/50 focus:border-amber-400 focus:ring-0 shadow-inner shadow-black/40 rounded-[20px]"
        />

        <Input
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project *"
          required
          rows={6}
          error={errors.message}
          className="bg-black/40 border-white/10 text-white placeholder-white/50 focus:border-amber-400 focus:ring-0 shadow-inner shadow-black/40 rounded-[20px] min-h-[170px]"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="cta-gradient group text-white text-xl py-3 px-10 rounded-2xl border border-transparent backdrop-blur-md shadow-[0_15px_40px_rgba(255,202,6,0.35)] transition duration-300 hover:-translate-y-0.5"
          >
            <div className="relative overflow-hidden w-max flex gap-1 font-manrope font-medium">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Send Message <span>→</span>
              </div>
              <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                Send Message <span>→</span>
              </div>
            </div>
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactForm;
