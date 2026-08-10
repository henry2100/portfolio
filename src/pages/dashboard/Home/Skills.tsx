import SkillCard from "components/molecules/SkillCard";
import { skillData } from "../../../mockData/skillData";
import { Code2, Server, Database, Wrench } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "components/atoms/MotionWrapper";

const categories = [
  { key: "Frontend", icon: Code2 },
  { key: "Backend", icon: Server },
  { key: "Database", icon: Database },
  { key: "Tools & Platforms", icon: Wrench },
];

const Skills = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-12 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          Skills & Technologies
        </span>
      </FadeUp>

      {categories.map(({ key, icon: Icon }) => {
        const items = skillData.filter((skill) => skill.category === key);

        return (
          <div key={key} className="w-full flex flex-col gap-6">
            <FadeUp>
              <div className="w-full flex items-center gap-3">
                <Icon className="w-6 h-6 text-Primary flex-shrink-0" />
                <span className="font-semibold text-xl mobile:text-lg text-Secondary group-hover:text-Primary uppercase tracking-wide">
                  {key}
                </span>
                <span className="flex-1 border-b border-Primary/30" />
                <span className="text-xs text-GrayCustom whitespace-nowrap">
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
    </div>
  );
};

export default Skills;
