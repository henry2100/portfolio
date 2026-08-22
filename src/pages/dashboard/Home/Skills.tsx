import SkillCard from "components/molecules/SkillCard";
import { skillData } from "../../../mockData/skillData";
import { Code2, Server, Database, Wrench } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";
import SectionTitle from "components/atoms/SectionTitle";

const categories = [
  { key: "Frontend", icon: Code2 },
  { key: "Backend", icon: Server },
  { key: "Database", icon: Database },
  { key: "Tools & Platforms", icon: Wrench },
];

const Skills = () => {
  return (
    <SectionContainer className="flex flex-col gap-12 justify-start items-center">
      <SectionTitle>Skills & Technologies</SectionTitle>

      {categories.map(({ key, icon: Icon }) => {
        const items = skillData.filter((skill) => skill.category === key);

        return (
          <div key={key} className="w-full flex flex-col gap-6">
            <FadeUp>
              <div className="w-full flex items-center gap-3">
                <Icon className="w-6 h-6 text-Primary flex-shrink-0" />
                <span className="font-semibold text-xl mobile:text-lg group-hover:text-Primary uppercase tracking-wide" style={{ color: 'var(--site-text-secondary)' }}>
                  {key}
                </span>
                <span className="flex-1 border-b border-Primary/30" />
                <span className="text-xs whitespace-nowrap" style={{ color: 'var(--site-text-gray)' }}>
                  {items.length} {items.length === 1 ? "skill" : "skills"}
                </span>
              </div>
            </FadeUp>

            <StaggerContainer
              className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-5"
              staggerDelay={0.05}
            >
              {items.map((skill) => (
                <StaggerItem key={skill._id} className="h-full">
                  <SkillCard {...skill} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );
      })}
    </SectionContainer>
  );
};

export default Skills;
