import { Truck, Gem, ShieldCheck, Users, Droplet, RotateCcw, Flame, Wind, Zap } from "lucide-react";
import Marquee from "../components/Marquee";
import Section from "../components/layout/Section";

const TaglineSection = () => {
  const items = [
    { text: "Free Shipping", icon: Truck },
    { text: "Premium Quality", icon: Gem },
    { text: "10K+ Athletes", icon: Users },
    { text: "Sweat-Wicking", icon: Droplet },
    { text: "Money-Back Guarantee", icon: RotateCcw },
    { text: "Selling Fast", icon: Flame },
    { text: "Breathable Fabric", icon: Wind },
    { text: "Peak Performance", icon: Zap }
  ];

  return (
    <Section background="dark" padding="none" className="bg-dark-900 border-y border-dark-700" containerClassName="w-full max-w-full">
      <Marquee items={items} className="text-white bg-dark-800/50" iconClassName="text-black" />
    </Section>
  );
};

export default TaglineSection;
