import { Truck, Gem, ShieldCheck, Users, Droplet, RotateCcw, Flame, Wind, Zap } from "lucide-react";
import Marquee from "../components/Marquee";
import Section from "../components/layout/Section";
import { taglineItemsData } from '../assets/data';

// Icon map for tagline items
const iconMap = {
  Truck,
  Gem,
  ShieldCheck,
  Users,
  Droplet,
  RotateCcw,
  Flame,
  Wind,
  Zap
};

// Create items array with actual icon components
const items = taglineItemsData.map(item => ({
  ...item,
  icon: iconMap[item.iconName]
}));

const TaglineSection = () => {
  return (
    <Section background="dark" padding="none" className="bg-dark-950 border-y border-dark-700" containerClassName="w-full max-w-full"
      style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6), inset 0 -2px 8px rgba(0,0,0,0.4)' }}>
      <Marquee items={items} className="text-white bg-dark-950/80" iconClassName="text-black" />
    </Section>
  );
};

export default TaglineSection;
