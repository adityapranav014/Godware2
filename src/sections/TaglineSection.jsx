import Marquee from "../components/Marquee";
import Section from "../components/layout/Section";

const TaglineSection = () => {
  const items = [
    "Strength",
    "Power",
    "Endurance",
    "Victory",
    "Excellence",
    "Discipline",
    "Performance"
  ];

  return (
    <Section background="dark" padding="none" className="bg-dark-900 border-y border-dark-700" containerClassName="w-full max-w-full">
      <Marquee items={items} className="text-white bg-dark-800/50" iconClassName="text-gold-500" />
    </Section>
  );
};

export default TaglineSection;
