import Marquee from "../components/Marquee";
import Section from "../components/layout/Section";

const TaglineSection = () => {
  const items = [
    "Strength",
    "Power",
    "Endurance",
    "Victory",
    "Excellence",
  ];


  return (
    <Section background="dark" padding="medium" className="space-y-10 text-white" containerClassName="w-full max-w-full">
      <Marquee items={items} className="text-white bg-ink border-y border-white/10" />
    </Section>
  );
};

export default TaglineSection;
