import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Clock3, MessageSquare } from 'lucide-react';
import { Input } from '../ui';
import { sendWhatsAppMessage, validateContactForm } from '../../utils';
import { shake, errorFlash, svgIconDraw, isMobile } from '../../utils/animations';
import { trustIndicatorsData, contactFormLabelsData } from '../../assets/data';

const iconMap = { ShieldCheck, Clock3 };
const trustIndicators = trustIndicatorsData.map(t => ({ ...t, icon: iconMap[t.iconName] }));

const ContactForm = () => {
  const formRef = useRef(null);
  const fieldWrappersRef = useRef({});
  const submitBtnRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  // SVG icon draw + lift hover on submit button (desktop only)
  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn || isMobile()) return;
    const onEnter = () => {
      gsap.to(btn, { y: -3, duration: 0.25, ease: 'power2.out', overwrite: true });
      btn.querySelectorAll('svg').forEach(svg => svgIconDraw(svg, 0.45));
    };
    const onLeave = () => {
      gsap.to(btn, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)', overwrite: true });
    };
    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      shake(formRef.current, 8);
      Object.keys(validation.errors).forEach(field => {
        const wrapper = fieldWrappersRef.current[field];
        if (wrapper) errorFlash(wrapper);
      });
      return;
    }
    sendWhatsAppMessage({ ...formData, phone: formData.phone || 'Not provided' });
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  const fieldStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 0,
    boxShadow: 'none',
    paddingLeft: 0,
    paddingRight: 0,
  };

  const fieldClass = 'text-white placeholder-white/20 focus:ring-0 focus:border-gold-500/50 transition-colors duration-200 text-sm py-4 font-sans bg-transparent rounded-none';

  return (
    <div className="space-y-8">

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <MessageSquare size={11} strokeWidth={2} className="text-gold-500/80 shrink-0" />
          <span className="editorial-label-gold">Send a Message</span>
        </div>
        <p className="section-muted">We reply within 3 hours on business days.</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-0">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
          <div ref={el => { fieldWrappersRef.current.name = el; }}>
            <Input
              type="text" name="name" autocomplete="on"
              value={formData.name} onChange={handleChange}
              placeholder="Full Name *" required error={errors.name}
              className={fieldClass} style={fieldStyle}
            />
          </div>
          <div ref={el => { fieldWrappersRef.current.email = el; }}>
            <Input
              type="email" name="email" autocomplete="on"
              value={formData.email} onChange={handleChange}
              placeholder="Email *" required error={errors.email}
              className={fieldClass} style={fieldStyle}
            />
          </div>
        </div>

        <Input
          type="tel" name="phone" autocomplete="on"
          value={formData.phone} onChange={handleChange}
          placeholder="Phone (optional)"
          className={fieldClass} style={fieldStyle}
        />

        <div ref={el => { fieldWrappersRef.current.message = el; }}>
          <Input
            type="textarea" name="message"
            value={formData.message} onChange={handleChange}
            placeholder="Tell us about your order *" required rows={4} error={errors.message}
            className={`${fieldClass} min-h-30`} style={fieldStyle}
          />
        </div>

        {/* Submit */}
        <div className="pt-8">
          <button
            ref={submitBtnRef}
            type="submit"
            className="group w-full sm:w-auto px-10 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-medium font-sans text-dark-950 bg-white hover:bg-gold-200 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
          >
            Send Message
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </form>

      {/* Trust strip */}
      <div className="flex gap-6 pt-2">
        {trustIndicators.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon size={11} className="text-white/30 shrink-0" />
            <span className="editorial-label">{text}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ContactForm;
