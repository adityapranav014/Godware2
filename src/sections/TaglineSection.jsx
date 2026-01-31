import Marquee from "../components/Marquee";
import TaglineText from "../components/TaglineText";
import Section from "../components/layout/Section";

const TaglineSection = () => {
  const items = [
    "Strength",
    "Power",
    "Endurance",
    "Victory",
    "Excellence",
  ];

  const navLinksData = [
    "T-Shirts",
    "Shorts",
    "Trousers",
    "Accessories",
  ];

  return (
    <Section background="dark" padding="medium" className="space-y-10 text-white" containerClassName="w-full max-w-full">
      <Marquee items={items} className="text-white bg-ink border-y border-white/10" />

      <TaglineText />

      <Marquee
        items={navLinksData}
        reverse={true}
        className="text-white bg-transparent border-y border-white/10"
        iconClassName="stroke-gold stroke-2 text-white/80"
        icon="material-symbols-light:square"
      />
    </Section>
  );
};

export default TaglineSection;
