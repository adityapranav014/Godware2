import { useState } from 'react';
import { Clock3, ShieldCheck, MessageSquare } from 'lucide-react';
import { Input } from '../ui';
import { sendWhatsAppMessage, validateContactForm } from '../../utils';

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

  /* Shared input style — recessed (inset shadow = field is "pressed into" the card) */
  const inputDepthStyle = {
    background: 'linear-gradient(180deg, #111115 0%, #141418 100%)',
    border: 'none',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)',
  };

  const inputClassName = "text-white placeholder-dark-500 focus:ring-2 focus:ring-gold-500/30 rounded-xl transition-all text-sm py-3.5 sm:py-3";

  return (
    <div className="space-y-5">
      {/* Form heading */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(201,139,58,0.15) 0%, rgba(201,139,58,0.05) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(201,139,58,0.1)',
          }}
        >
          <MessageSquare size={14} className="text-gold-500" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-dark-400 font-sans">Send a Message</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">

        {/* Name & Email */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Input
            type="text"
            name="name"
            autocomplete="on"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            required
            error={errors.name}
            className={inputClassName}
            style={inputDepthStyle}
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
            className={inputClassName}
            style={inputDepthStyle}
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
          className={inputClassName}
          style={inputDepthStyle}
        />

        {/* Message */}
        <Input
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your order *"
          required
          rows={5}
          error={errors.message}
          className={`${inputClassName} min-h-[130px] sm:min-h-[150px]`}
          style={inputDepthStyle}
        />

        {/* Submit Button — Elevated (Level 3 shadow, top highlight = "light hitting the top") */}
        <div className="pt-1">
          <button
            type="submit"
            className="group w-full py-4 md:py-5 px-8 md:px-10 text-dark-900 text-base sm:text-lg font-bold rounded-xl active:scale-[0.97] transition-all duration-300 cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #d4a04a 0%, #b8872e 50%, #a67724 100%)',
              borderTop: '1px solid rgba(255,255,255,0.3)',
              borderBottom: '2px solid rgba(0,0,0,0.3)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.3), 0 6px 20px rgba(201,139,58,0.2)',
            }}
          >
            <span className="flex items-center justify-center gap-2 font-sans">
              Send
              <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </form>

      {/* Trust indicators — recessed strip */}
      <div className="flex flex-wrap gap-4 justify-center pt-2">
        {[
          { icon: ShieldCheck, text: "Your data is safe" },
          { icon: Clock3, text: "3h response time" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.text} className="flex items-center gap-1.5 text-[10px] text-dark-500 font-sans">
              <Icon size={11} className="text-dark-500" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactForm;
