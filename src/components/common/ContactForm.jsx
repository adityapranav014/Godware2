import { useState } from 'react';
import { Clock3, Send, ShieldCheck, Sparkles } from 'lucide-react';
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
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#080808] to-[#050505] p-6 shadow-[0_35px_80px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-amber-500/30 blur-[80px]" />
          <div className="absolute -left-4 bottom-10 h-28 w-28 rounded-full bg-cyan-400/25 blur-[80px]" />
        </div>

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.5em] text-white/60 font-machina">Inquiry</p>
              <h3 className="text-2xl font-semibold text-white font-machina">Start the conversation</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80">
              <Sparkles size={14} />
              <span>3-hour reply</span>
            </div>
          </div>
          <p className="max-w-xl text-sm text-white/70 font-manrope">
            Share your vision, goals, and constraints. We will respond via WhatsApp with a tailored approach.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Icon size={18} className="text-white" />
                    <p className="text-sm font-semibold font-manrope">{fact.label}</p>
                  </div>
                  <p className="text-xs leading-tight text-white/60 font-manrope">
                    {fact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="text"
            name="name"
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
